/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent set to 'aistudio-build'
const geminiApiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Low-dependency JSON Database
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

interface UserData {
  uid: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'player' | 'admin';
  createdAt: string;
}

interface UserProgress {
  uid: string;
  coins: number;
  level: number;
  xp: number;
  title: string;
  unlockedStalls: string[];
  completedCount: number;
  lastUpdated: string;
}

interface DbSchema {
  users: { [email: string]: UserData }; // email lowercase
  progress: { [uid: string]: UserProgress };
  sessions: { [token: string]: { uid: string; expiresAt: number } };
}

function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const defaultData: DbSchema = {
      users: {},
      progress: {},
      sessions: {}
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
  } else {
    // Perform safety check to ensure it doesn't crash on invalid JSON
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      JSON.parse(content);
    } catch (e) {
      const defaultData: DbSchema = {
        users: {},
        progress: {},
        sessions: {}
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
    }
  }
}

// Initialize database
initDb();

function readDb(): DbSchema {
  try {
    initDb();
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data) as DbSchema;
  } catch (e) {
    return { users: {}, progress: {}, sessions: {} };
  }
}

function writeDb(data: DbSchema) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateUUID(): string {
  if (typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // fallback
    }
  }
  return crypto.randomBytes(16).toString("hex");
}

// Generate default progress for new players
function generateDefaultProgress(uid: string): UserProgress {
  return {
    uid,
    coins: 350, // Starting vendor capital
    level: 1,
    xp: 0,
    title: "Caliye (Pemula)", // Beginner title
    unlockedStalls: ["kelontong"], // starts with Grocery Sembako stall
    completedCount: 0,
    lastUpdated: new Date().toISOString()
  };
}

// Seed NPC competitors for leaderboard so it feels lively
const NPC_COMPETITORS = [
  { name: "Mbah Sunar (Jamu)", title: "Juragan Jamu", level: 12, coins: 2500, completedCount: 88 },
  { name: "Mas Joko (Buah)", title: "Pengiras", level: 8, coins: 1200, completedCount: 45 },
  { name: "Nyi Sri", title: "Bakul Sepuh", level: 15, coins: 4300, completedCount: 120 },
  { name: "Siti Rahma", title: "Sedulur", level: 5, coins: 850, completedCount: 22 },
  { name: "Kang Tejo", title: "Prakanca", level: 3, coins: 450, completedCount: 12 }
];

// Auth Middleware
function getAuthUser(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  const db = readDb();
  const session = db.sessions[token];
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    // Delete expired session
    delete db.sessions[token];
    writeDb(db);
    return null;
  }
  return session.uid;
}

// --- API AUTH ROUTES ---

// REGISTER API
app.post("/api/auth/register", (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    console.log(`[AUTH REGISTER] Request received for email: ${email}, name: ${name}`);
    
    if (!name || !email || !password) {
      console.warn("[AUTH REGISTER] Missing fields in payload");
      res.status(400).json({ error: "Nama, Email, dan Sandi harus diisi" });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = readDb();

    if (db.users[cleanEmail]) {
      console.warn(`[AUTH REGISTER] Email already registered: ${cleanEmail}`);
      res.status(400).json({ error: "Akun email sudah terdaftar" });
      return;
    }

    const uid = generateUUID();
    const passwordHash = hashPassword(password);

    const newUser: UserData = {
      uid,
      name,
      email: cleanEmail,
      passwordHash,
      role: "player",
      createdAt: new Date().toISOString()
    };

    db.users[cleanEmail] = newUser;
    db.progress[uid] = generateDefaultProgress(uid);

    // Auto-generate session token
    const token = crypto.randomBytes(32).toString("hex");
    db.sessions[token] = {
      uid,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days expiration
    };

    writeDb(db);
    console.log(`[AUTH REGISTER] Successfully registered user: ${cleanEmail}`);

    res.status(201).json({
      token,
      user: { name: newUser.name, email: newUser.email, role: newUser.role, uid },
      progress: db.progress[uid]
    });
  } catch (err: any) {
    console.error("[AUTH REGISTER] Registration error:", err);
    res.status(500).json({ error: "Gagal memproses pendaftaran akun baru", details: err.message });
  }
});

// LOGIN API
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    console.log(`[AUTH LOGIN] Attempt for email: ${email}`);

    if (!email || !password) {
      console.warn("[AUTH LOGIN] Missing email or password");
      res.status(400).json({ error: "Email dan Sandi harus diisikan" });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = readDb();
    const user = db.users[cleanEmail];

    if (!user) {
      console.warn(`[AUTH LOGIN] User not found: ${cleanEmail}`);
      res.status(401).json({ error: "Email atau kata sandi Anda salah" });
      return;
    }

    if (user.passwordHash !== hashPassword(password)) {
      console.warn(`[AUTH LOGIN] Password mismatch for: ${cleanEmail}`);
      res.status(401).json({ error: "Email atau kata sandi Anda salah" });
      return;
    }

    // Generate new session token
    const token = crypto.randomBytes(32).toString("hex");
    db.sessions[token] = {
      uid: user.uid,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
    };

    writeDb(db);

    const progress = db.progress[user.uid] || generateDefaultProgress(user.uid);
    console.log(`[AUTH LOGIN] Successfully logged in: ${cleanEmail}`);

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role, uid: user.uid },
      progress
    });
  } catch (err: any) {
    console.error("[AUTH LOGIN] Login error:", err);
    res.status(500).json({ error: "Gagal memproses masuk ke akun", details: err.message });
  }
});

// SOCIAL GOOGLE & APPLE API (SIGN-IN & SIGN-UP)
app.post("/api/auth/social", (req, res) => {
  try {
    const { email, name, provider } = req.body || {};
    console.log(`[AUTH SOCIAL] ${provider?.toUpperCase()} login/register attempt for email: ${email}, name: ${name}`);

    if (!email || !name || !provider) {
      console.warn("[AUTH SOCIAL] Missing email, name, or provider");
      res.status(400).json({ error: "Email, Nama, dan Provider harus dilampirkan" });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = readDb();
    let user = db.users[cleanEmail];
    let isNewRegistration = false;

    if (!user) {
      isNewRegistration = true;
      console.log(`[AUTH SOCIAL] Creating new user for: ${cleanEmail} via ${provider}`);
      const uid = generateUUID();
      // Generate random password hash since it's oauth
      const passwordHash = hashPassword(crypto.randomBytes(16).toString("hex"));

      const newUser: UserData = {
        uid,
        name: name,
        email: cleanEmail,
        passwordHash,
        role: "player",
        createdAt: new Date().toISOString()
      };

      db.users[cleanEmail] = newUser;
      db.progress[uid] = generateDefaultProgress(uid);
      user = newUser;
    }

    // Generate new session token
    const token = crypto.randomBytes(32).toString("hex");
    db.sessions[token] = {
      uid: user.uid,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
    };

    writeDb(db);

    const progress = db.progress[user.uid] || generateDefaultProgress(user.uid);
    console.log(`[AUTH SOCIAL] Successfully authenticated via ${provider}: ${cleanEmail}. Registration: ${isNewRegistration}`);

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role, uid: user.uid },
      progress,
      isNewRegistration
    });
  } catch (err: any) {
    console.error("[AUTH SOCIAL] error:", err);
    res.status(500).json({ error: "Gagal memproses otentikasi sosial", details: err.message });
  }
});

// ME API
app.get("/api/auth/me", (req, res) => {
  const uid = getAuthUser(req);
  if (!uid) {
    res.status(401).json({ error: "Sesi habis, silakan masuk kembali." });
    return;
  }

  const db = readDb();
  // Find user details corresponding to UID
  let foundUser: UserData | null = null;
  for (const email of Object.keys(db.users)) {
    if (db.users[email].uid === uid) {
      foundUser = db.users[email];
      break;
    }
  }

  if (!foundUser) {
    res.status(404).json({ error: "User tidak ditemukan" });
    return;
  }

  const progress = db.progress[uid] || generateDefaultProgress(uid);

  res.json({
    user: { name: foundUser.name, email: foundUser.email, role: foundUser.role, uid: foundUser.uid },
    progress
  });
});

// LOGOUT API
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const db = readDb();
    if (db.sessions[token]) {
      delete db.sessions[token];
      writeDb(db);
    }
  }
  res.json({ success: true, message: "Logged out successfully" });
});

// --- GAME RESUME & LEADERBOARD API ---

// SAVE PROGRESS API
app.post("/api/game/save", (req, res) => {
  const uid = getAuthUser(req);
  if (!uid) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { coins, level, xp, title, unlockedStalls, completedCount } = req.body;
  if (coins === undefined || level === undefined) {
    res.status(400).json({ error: "Invalid progress fields" });
    return;
  }

  const db = readDb();
  const currentProgress = db.progress[uid] || generateDefaultProgress(uid);

  const updatedProgress: UserProgress = {
    uid,
    coins: Number(coins),
    level: Number(level),
    xp: Number(xp),
    title: String(title),
    unlockedStalls: Array.isArray(unlockedStalls) ? unlockedStalls : currentProgress.unlockedStalls,
    completedCount: completedCount !== undefined ? Number(completedCount) : currentProgress.completedCount,
    lastUpdated: new Date().toISOString()
  };

  db.progress[uid] = updatedProgress;
  writeDb(db);

  res.json({ success: true, progress: updatedProgress });
});

// LEADERBOARD API
app.get("/api/game/leaderboard", (req, res) => {
  const db = readDb();
  const list: any[] = [];

  // Gather real authenticated users
  for (const email of Object.keys(db.users)) {
    const user = db.users[email];
    const progress = db.progress[user.uid] || generateDefaultProgress(user.uid);
    list.push({
      name: user.name,
      title: progress.title,
      level: progress.level,
      coins: progress.coins,
      completedCount: progress.completedCount
    });
  }

  // Mix in NPC competitors
  const allEntries = [...list, ...NPC_COMPETITORS];

  // Sort by levels descending, then coins descending
  allEntries.sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level;
    }
    return b.coins - a.coins;
  });

  res.json(allEntries.slice(0, 10));
});

// --- GEMINI AI CONVERSATION PROXY ---
app.post("/api/game/ai-chat", async (req, res) => {
  if (!aiClient) {
    res.json({
      reply: "Suasana pasar riuh rendah! Penjual ramah menyapa Anda. (Untuk mengaktifkan asisten AI interaktif dengan aksara Jawa, silakan hubungkan kunci API Gemini Anda di panel Settings > Secrets!)"
    });
    return;
  }

  const { message, characterName, rolePlayPrompt } = req.body;
  if (!message) {
    res.status(400).json({ error: "Pesan tidak boleh kosong" });
    return;
  }

  try {
    const systemPrompt = rolePlayPrompt ||
      `Anda adalah ${characterName || "Penjual senior bernama Mbah Sunar"} di Pasar Hanacaraka, sebuah pasar tradisional Javanese kuno. Anda harus berbincang dalam bahasa Indonesia bercampur aksen bahasa Jawa halus (Krama/Ngoko) yang hangat, ramah, dan mendidik pemain tentang tulisan Aksara Jawa. Sesekali berikan pujian dalam logat Jawa seperti "Sugeng, Cah Ayu!" atau "Cah Bagus!" dan jelaskan satu huruf Aksara Jawa (contoh: huruf HA (ꦲ) atau NA (ꦤ)) dengan gembira jika relevan. Jawablah maksimal dalam 3 kalimat agar santun dan nyaman dibaca.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      }
    });

    const reply = response.text || "Suasana pasar sangat riuh saat ini!";
    res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: "Gagal memproses pesan AI", details: err.message });
  }
});


// Serve final React Static Files in Production, and setup Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode serving static assets...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`========================================`);
    console.log(`  PASAR HANACARAKA running on port: ${PORT}`);
    console.log(`========================================`);
  });
}

startServer();
