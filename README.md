# Tembiweb

**Tembiweb** adalah aplikasi web modern yang dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**. Proyek ini dirancang dengan integrasi database **Prisma** (PostgreSQL) dan sistem pembayaran menggunakan **Xendit**.

## 📦 Detail Dependensi

Proyek ini menggunakan versi library yang spesifik untuk menjaga stabilitas dan performa:

### Core Stack

* **Next.js (`15.5.3`)**: Framework React dengan dukungan App Router dan Turbopack.
* **React (`19.1.0`)**: Versi terbaru React untuk performa rendering optimal.
* **TypeScript**: Menjamin keamanan tipe data di seluruh aplikasi.

### Database & Payments

* **Prisma Client (`^7.4.0`)**: ORM untuk interaksi database PostgreSQL.
* **Xendit SDK (`^7.0.0`)**: Integrasi Payment Gateway untuk memproses transaksi.

### UI & Utilities

* **Tailwind CSS (`^3.4.18`)**: Styling berbasis utility-first.
* **Lucide React & React Icons**: Library ikon untuk antarmuka pengguna.
* **jsPDF & jsPDF-AutoTable**: Digunakan untuk generate laporan dalam format PDF.
* **Date-fns & React Day Picker**: Pengelolaan tanggal dan pemilihan kalender.

---

## 🛠️ Panduan Instalasi & Prisma

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan lokal Anda.

### 1. Persiapan Environment

Buat file `.env` di direktori utama dan masukkan URL database Anda serta API Key Xendit:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
XENDIT_SECRET_KEY="xnd_development_..."

```

### 2. Instalasi Package

Instal semua dependensi yang diperlukan sesuai dengan `package.json`:

```bash
npm install

```

### 3. Konfigurasi Database (Prisma)

Proyek ini menggunakan Prisma untuk manajemen skema. Berikut adalah alur kerja utamanya:

* **Generate Client**: Jalankan ini setiap kali ada perubahan pada skema untuk memperbarui tipe data TypeScript.
```bash
npx prisma generate

```


* **Migrasi Database (Development)**: Gunakan perintah ini untuk membuat file migrasi dan memperbarui tabel di database lokal Anda.
```bash
npx prisma migrate dev --name deskripsi_perubahan

```


* **Sinkronisasi Produksi**: Saat melakukan deployment, gunakan perintah ini untuk menerapkan migrasi yang sudah ada tanpa mengubah skema.
```bash
npx prisma migrate deploy

```



---

## 🚀 Menjalankan Aplikasi

Aplikasi ini dikonfigurasi untuk menggunakan **Turbopack** guna mempercepat proses build saat pengembangan.

* **Mode Pengembangan**:
```bash
npm run dev

```


* **Membangun untuk Produksi**:
```bash
npm run build

```


* **Menjalankan Mode Produksi**:
```bash
npm run start

```



---

## 📂 Struktur Proyek Utama

* `/prisma`: Berisi `schema.prisma` dan file migrasi database.
* `/public`: Aset statis seperti gambar dan font.
* `/src`: Logika aplikasi, komponen UI, dan route Next.js.
