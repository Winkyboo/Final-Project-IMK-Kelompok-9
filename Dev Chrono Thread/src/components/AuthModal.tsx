import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { X, Lock, Mail, User, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';
import { saveUserProfile } from '../lib/firebaseStore';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: FirebaseUser, isNewUser: boolean) => void;
  currentGuestProfile: Omit<UserProfile, 'xpToNextLevel'>; // used to seed new user profile
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess, currentGuestProfile }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(currentGuestProfile?.username || 'student_weaver');
  const [schoolTag, setSchoolTag] = useState(currentGuestProfile?.schoolTag || 'BINUS');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccessMsg(null);

    // Minor client sanity checks
    if (!email.includes('@')) {
      setError('Please provide a valid educational or custom email address.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Key string (password) must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Seed Firestore database with current guest's profile info
        const initialProfile: UserProfile = {
          username: username.trim() || 'student_weaver',
          schoolTag: schoolTag.toUpperCase() || 'EXTERNAL',
          xp: currentGuestProfile.xp || 120,
          level: Math.floor((currentGuestProfile.xp || 120) / 400) + 1,
          xpToNextLevel: 400 - ((currentGuestProfile.xp || 120) % 400),
          streakCount: currentGuestProfile.streakCount || 3,
          streakStatus: currentGuestProfile.streakStatus || [true, true, true, false, false, false, false],
          lastClaimedDate: currentGuestProfile.lastClaimedDate || null,
          gameHistory: currentGuestProfile.gameHistory || [],
          badges: currentGuestProfile.badges || ['badge-1']
        };

        await saveUserProfile(user.uid, initialProfile);
        setSuccessMsg('Account registered successfully! Synchronizing system data...');
        setTimeout(() => {
          onAuthSuccess(user, true);
          onClose();
        }, 1500);

      } else {
        // Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg('Authentication validated. Access granted to Chrono terminal.');
        setTimeout(() => {
          onAuthSuccess(userCredential.user, false);
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      let firebaseError = 'Authentication pipeline failed.';
      if (err.code === 'auth/email-already-in-use') {
        firebaseError = 'This email is already linked to another academic cadet.';
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        firebaseError = 'Invalid node credential strings. Please check your credentials.';
      } else if (err?.message) {
        firebaseError = err.message;
      }
      setError(firebaseError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-elegant-dark/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-elegant-card border border-elegant-purple/35 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        {/* Top visual glow banner */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-elegant-purple via-elegant-cyan to-elegant-orange"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-elegant-purple/15 rounded-lg transition duration-200 cursor-pointer"
          title="Dismiss Auth terminal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-elegant-cyan/15 rounded-full flex items-center justify-center border border-elegant-cyan/35 mb-3 text-elegant-cyan">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-white">
            {isSignUp ? 'Establish Cloud Uplink' : 'Chrono Account Login'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp 
              ? 'Synchronize your academic training vector and credentials database.'
              : 'Sign in to import and back up levels, XP progress, and badges.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1">
                  Cadet Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={18}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-elegant-dark/80 border border-elegant-purple/15 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elegant-cyan focus:ring-1 focus:ring-elegant-cyan/20 transition duration-200"
                    placeholder="student_weaver"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1">
                  Univ / School
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={schoolTag}
                  onChange={(e) => setSchoolTag(e.target.value)}
                  className="w-full bg-elegant-dark/80 border border-elegant-purple/15 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elegant-cyan focus:ring-1 focus:ring-elegant-cyan/20 transition duration-200"
                  placeholder="BINUS"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1">
              Terminal Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-elegant-dark/80 border border-elegant-purple/15 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elegant-cyan focus:ring-1 focus:ring-elegant-cyan/20 transition duration-200"
                placeholder="cadet@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1">
              Cipher Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-elegant-dark/80 border border-elegant-purple/15 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-elegant-cyan focus:ring-1 focus:ring-elegant-cyan/20 transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Feedback Area */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 flex gap-2 items-start"
            >
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-300 leading-normal">{error}</p>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-elegant-green/10 border border-elegant-green/30 rounded-xl p-3 flex gap-2 items-start"
            >
              <CheckCircle2 className="w-4 h-4 text-elegant-green shrink-0 mt-0.5 animate-bounce" />
              <p className="text-[11px] text-elegant-green leading-normal font-mono font-medium">{successMsg}</p>
            </motion.div>
          )}

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-elegant-cyan to-elegant-purple text-slate-950 hover:from-cyan-400 hover:to-purple-500 font-black rounded-lg text-xs flex items-center justify-center gap-2 transition duration-200 ease-in-out shadow-lg shadow-elegant-cyan/15 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Interrogating Node Server...
              </>
            ) : (
              isSignUp ? 'Create Cloud Uplink' : 'Initialize Credentials Match'
            )}
          </button>
        </form>

        {/* Modal Switch link */}
        <div className="mt-6 pt-4 border-t border-elegant-purple/10 text-center text-xs">
          <span className="text-slate-400">
            {isSignUp ? 'Already have an academic profile?' : 'New Cadet to Chrono-Thread?'}
          </span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccessMsg(null);
            }}
            className="ml-1 text-elegant-cyan hover:text-cyan-300 font-bold hover:underline cursor-pointer"
          >
            {isSignUp ? 'Sign In Now' : 'Create Account'}
          </button>
        </div>

        {/* Local Storage Disclaimer */}
        <p className="mt-4 text-[10px] text-slate-500 text-center leading-relaxed">
          🔒 Secure authentication provided via Firebase credentials protocol. We respect your security and privacy.
        </p>
      </motion.div>
    </div>
  );
}
