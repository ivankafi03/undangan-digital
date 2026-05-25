<h1 align="center">
  Undangan Digital
</h1>

<p align="center">
  <b>Platform Pembuatan & Manajemen Undangan Pernikahan Digital</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Web Push-Notification-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

---

## Tentang Proyek

Platform web untuk membuat dan mengelola undangan pernikahan digital. Pengguna dapat memilih tema undangan, mengisi data pernikahan, dan menyebarkan tautan undangan secara online. Dilengkapi dengan panel admin untuk mengelola tema, pesanan, promo, dan broadcast notifikasi.

---

## Fitur Utama

### Untuk Member
| Fitur | Deskripsi |
|---|---|
| Buat Undangan | Pilih tema dan isi data pernikahan |
| Dashboard | Kelola undangan yang sudah dibuat |
| Lihat Undangan | Pratinjau undangan sebelum disebarkan |
| Notifikasi | Terima notifikasi via web push |

### Untuk Admin
| Fitur | Deskripsi |
|---|---|
| Dashboard Admin | Overview pesanan, pengguna, dan statistik |
| Kelola Tema | Tambah, edit, dan hapus tema undangan |
| Kelola Pesanan | Pantau dan proses pesanan masuk |
| Promo | Buat dan kelola kode promo / diskon |
| Broadcast | Kirim notifikasi ke seluruh pengguna |
| Pengaturan | Konfigurasi sistem platform |
| Manajemen Akun | Undang kolaborator, reset password, konfirmasi perubahan |

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Icon | Lucide React |
| Chart | Recharts |
| ORM | Prisma |
| Email | Nodemailer |
| Push Notification | Web Push API |
| Utilities | clsx, tailwind-merge |

---

## Struktur Proyek

```
src/
└── app/
    ├── (public)/         # Halaman publik (landing page undangan)
    ├── login/            # Halaman login member
    ├── register/         # Halaman registrasi
    ├── member/
    │   └── dashboard/    # Dashboard member (kelola undangan)
    ├── admin/
    │   ├── dashboard/    # Statistik & overview
    │   ├── tambah/       # Tambah tema baru
    │   ├── edit/         # Edit tema undangan
    │   ├── pesanan/      # Manajemen pesanan
    │   ├── promo/        # Kelola promo & diskon
    │   ├── broadcast/    # Kirim notifikasi massal
    │   ├── setting/      # Pengaturan sistem
    │   ├── accept-invitation/     # Terima undangan kolaborator
    │   ├── forgot-password/       # Lupa password
    │   ├── reset-password/        # Reset password
    │   └── confirm-password-change/ # Konfirmasi ubah password
    ├── actions/          # Server Actions
    └── api/              # API Routes

components/               # Komponen reusable
lib/                      # Utility & helper functions
prisma/                   # Skema database & migrasi
public/                   # Aset statis
```

---

## Cara Menjalankan

### Prasyarat
- Node.js `>=18`
- npm atau yarn

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/ivankafi03/undangan-digital.git
cd undangan-digital

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Isi variabel berikut di file .env

# 4. Generate Prisma client & jalankan migrasi
npx prisma migrate dev

# 5. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Environment Variables

```env
DATABASE_URL="file:./dev.db"

# Nodemailer (untuk email)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Web Push Notification
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

---

## Role Pengguna

| Role | Akses |
|---|---|
| Member | Buat undangan, kelola undangan, lihat dashboard pribadi |
| Admin | Kelola tema, pesanan, promo, broadcast, pengaturan sistem |

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Dibuat menggunakan Next.js & Prisma
</p>
