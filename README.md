# Chrono Thread - Game Based Learning

## Anggota Kelompok
| Nama           | NRP        | Kelas     |
| ---            | ---        | ----------|
| Willy Marcelius | 5025241096 | Interaksi Manusia dan Komputer (A)       |
| Rendy Tanuwijaya | 5025241099           | Interaksi Manusia dan Komputer (A)       |

## Link Deploy Aplikasi
```
https://chrono-thread-1011441607029.asia-southeast1.run.app/
```

## Link Prototype Figma 
```
https://www.figma.com/design/KiAzxVFFFoaWLsfQEMcYFA/Untitled?node-id=0-1&t=2xsiM1T9MGmS9dQl-1
```

## Deskripsi Project

Chrono-Thread adalah aplikasi game berbasis cognitive training yang dirancang sebagai media latihan kognitif interaktif untuk generasi muda. Melalui dua mode permainan — Visual Puzzle dan Logika & Urutan — pengguna dapat melatih fokus visual dan memori prosedural secara menyenangkan, kapan saja dan di mana saja.

Chrono-Thread merupakan bagian dari tugas akhir mata kuliah Interaksi Manusia dan Komputer (IMK) yang dikerjakan oleh Kelompok 9 Tim B. Aplikasi ini dikembangkan menggunakan pendekatan User-Centered Design (UCD), mulai dari riset pengguna, pembuatan persona, perancangan wireframe, hingga evaluasi heuristik dan iterasi prototipe high-fidelity.

## Tujuan Aplikasi
- Menyediakan media latihan kognitif yang dapat dimainkan di sela-sela aktivitas padat
- Melatih fokus visual dan memori prosedural melalui pendekatan game
- Membangun kebiasaan latihan otak yang konsisten melalui sistem gamifikasi

## Fitur Utama

### Mode Permainan
- Visual Puzzle — Melatih fokus dan pengenalan pola visual
- Logika & Urutan — Melatih memori prosedural dan pemikiran algoritmik

### Sistem Gamifikasi
- XP & Level — Kumpulkan poin pengalaman dan naik level setiap sesi
- Streak Harian — Bonus XP untuk pengguna yang bermain setiap hari
- Badge Pencapaian — Koleksi lencana sebagai bukti perkembangan kognitif

### Progress & Feedback
- Progress Tracker — Grafik skor mingguan dengan filter 7 hari / 30 hari / semua
- Feedback Real-Time — Penjelasan langsung mengapa jawaban salah + highlight jawaban benar
- Review Jawaban — Analisis detail tiap soal setelah sesi selesai

### Kenyamanan Pengguna
- Dark Mode sebagai tema default (ramah mata untuk penggunaan malam)
- Onboarding 3 Slide untuk pengguna baru
- Pause Menu dengan opsi Lanjut, Ulangi, dan Keluar
- Mode masuk tanpa akun untuk mencoba tanpa perlu membuat akun

## Instalasi dan Pengaturan Lokal

Pastikan Anda telah menginstal **Node.js (v18 atau versi lebih tinggi)** di perangkat Anda.

### 1. Klon & Ekstrak
Ekstrak atau arahkan terminal ke direktori proyek Anda:
```bash
cd chrono-thread
```

### 2. Instal Dependensi
Instal seluruh paket konfigurasi dependensi yang diperlukan:
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Server)
Jalankan server pengembangan lokal pada alamat `http://localhost:3000`:
```bash
npm run dev
```

### 4. Kompilasi Produksi Langsung
Kompilasi aset aplikasi web menjadi modul statis teroptimasi yang siap dideploy pada direktori `/dist`:
```bash
npm run build
```