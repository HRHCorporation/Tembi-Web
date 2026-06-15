# Panduan Pengguna Admin — Tembi Historical Home

> Dokumen ini menjelaskan cara menggunakan setiap fitur di panel admin Tembi Web.  
> Panel admin dapat diakses melalui `/admin`.
>
> **Catatan Screenshot:** Ganti file placeholder di folder `docs/screenshots/` dengan screenshot asli sesuai nama file yang tertera pada setiap bagian.

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Navigasi Sidebar](#2-navigasi-sidebar)
3. [Home Carousel](#3-home-carousel)
4. [Rooms (Kamar)](#4-rooms-kamar)
5. [Food](#5-food)
6. [Venue](#6-venue)
7. [Collections (Koleksi)](#7-collections-koleksi)
8. [Blog](#8-blog)
9. [Event](#9-event)
10. [Page Banner](#10-page-banner)
11. [Invoice (Booking)](#11-invoice-booking)
12. [Tips Umum](#12-tips-umum)

---

## 1. Gambaran Umum

Panel admin Tembi adalah sistem manajemen konten (CMS) untuk website **Tembi — Historical Home**, sebuah boutique heritage hotel dan venue di Yogyakarta. Melalui panel ini, admin dapat:

- Mengelola konten halaman publik (kamar, venue, blog, event, koleksi, makanan)
- Mengatur tampilan beranda (carousel, banner)
- Memantau invoice booking tamu

Semua konten mendukung **dua bahasa**: Bahasa Indonesia dan Bahasa Inggris. Setiap form selalu menyediakan field terpisah untuk masing-masing bahasa.

---

## 2. Navigasi Sidebar

Sidebar berada di sisi kiri layar dan berisi semua menu utama admin.

> 📸 **Screenshot:** `docs/screenshots/dashboard/sidebar.png`  
> *(Tampilkan screenshot sidebar dalam keadaan terbuka penuh, semua menu terlihat)*

![Sidebar Navigasi](./screenshots/dashboard/sidebar.png)

| Menu | Sub-menu | Keterangan |
|------|----------|------------|
| Dashboard | — | Halaman ringkasan |
| Home Carousel | — | Kelola slide gambar di beranda |
| Rooms | Room Setup, Room Management | Master data dan data kamar utama |
| Food | Catering, Our Menu, Our Package, Menu Highlight, Celebrate | Konten makanan & katering |
| Venue | Venue Facilities, Venue Management | Master fasilitas dan data venue |
| Collections | Collection Category, Collection Management | Kategori dan item koleksi |
| Blog | — | Artikel blog |
| Event | — | Data event/acara |
| Page Banner | — | Banner header untuk halaman publik |

---

## 3. Home Carousel

**URL:** `/admin/carousel`

Carousel adalah deretan gambar yang berputar di halaman beranda (homepage).

---

### 3.1 Daftar Carousel

> 📸 **Screenshot:** `docs/screenshots/carousel/list.png`  
> *(Tampilkan halaman daftar carousel dengan tabel dan tombol Add Carousel)*

![Daftar Carousel](./screenshots/carousel/list.png)

Tabel menampilkan:
- Judul (Indonesia & Inggris)
- Gambar preview
- Status aktif/nonaktif
- Tombol aksi: **Edit** dan **Delete**

---

### 3.2 Menambah Carousel Baru

> 📸 **Screenshot:** `docs/screenshots/carousel/create-form.png`  
> *(Tampilkan form tambah carousel — semua field terlihat)*

![Form Tambah Carousel](./screenshots/carousel/create-form.png)

1. Klik tombol **Add Carousel** di bagian atas tabel.
2. Isi form:

| Field | Keterangan |
|-------|------------|
| Title Indonesia | Judul slide dalam Bahasa Indonesia |
| Title English | Judul slide dalam Bahasa Inggris |
| Image | Upload gambar (JPG/PNG/WebP) |
| Status | `Active` agar tampil, `Inactive` untuk menyembunyikan |

3. Setelah gambar dipilih, **Image Cropper** akan muncul untuk memotong gambar.

> 📸 **Screenshot:** `docs/screenshots/carousel/image-cropper.png`  
> *(Tampilkan image cropper setelah gambar dipilih)*

![Image Cropper](./screenshots/carousel/image-cropper.png)

4. Klik **Save** untuk menyimpan.

---

### 3.3 Mengedit Carousel

> 📸 **Screenshot:** `docs/screenshots/carousel/edit-form.png`  
> *(Tampilkan form edit carousel dengan data yang sudah terisi dan gambar lama tampil sebagai preview)*

![Form Edit Carousel](./screenshots/carousel/edit-form.png)

1. Klik tombol **Edit** pada baris yang ingin diubah.
2. Perbarui field yang diinginkan. Untuk mengganti gambar, upload gambar baru.
3. Klik **Save**.

---

### 3.4 Menghapus Carousel

> 📸 **Screenshot:** `docs/screenshots/carousel/delete-confirm.png`  
> *(Tampilkan dialog konfirmasi hapus)*

![Konfirmasi Hapus](./screenshots/carousel/delete-confirm.png)

Klik tombol **Delete** → konfirmasi → data dihapus.

---

## 4. Rooms (Kamar)

Modul Rooms dibagi menjadi **Room Setup** (master data pendukung) dan **Room Management** (data kamar utama). Pastikan Room Setup sudah terisi sebelum membuat kamar baru.

---

### 4.1 Room Setup — Tiers

**URL:** `/admin/rooms/master/tiers`

Klasifikasi/kategori kamar (contoh: Standard, Deluxe, Suite).

> 📸 **Screenshot:** `docs/screenshots/rooms/tiers-list.png`  
> *(Tampilkan daftar tiers yang sudah ada)*

![Daftar Room Tiers](./screenshots/rooms/tiers-list.png)

> 📸 **Screenshot:** `docs/screenshots/rooms/tiers-create.png`  
> *(Tampilkan form tambah tier baru)*

![Form Tambah Tier](./screenshots/rooms/tiers-create.png)

**Field:** Name (Indonesia), Name (English)

---

### 4.2 Room Setup — Mattress

**URL:** `/admin/rooms/master/mattress`

Tipe kasur yang tersedia (contoh: King Bed, Twin Bed, Queen Bed).

> 📸 **Screenshot:** `docs/screenshots/rooms/mattress-list.png`  
> *(Tampilkan daftar mattress)*

![Daftar Mattress](./screenshots/rooms/mattress-list.png)

**Field:** Name (Indonesia), Name (English)

---

### 4.3 Room Setup — Facilities

**URL:** `/admin/rooms/master/fasilities`

Daftar fasilitas yang dapat dilekatkan pada kamar (contoh: AC, TV, WiFi).

> 📸 **Screenshot:** `docs/screenshots/rooms/facilities-list.png`  
> *(Tampilkan daftar facilities dengan kolom icon)*

![Daftar Facilities](./screenshots/rooms/facilities-list.png)

> 📸 **Screenshot:** `docs/screenshots/rooms/facilities-create.png`  
> *(Tampilkan form tambah facility termasuk icon picker)*

![Form Tambah Facility](./screenshots/rooms/facilities-create.png)

**Field:** Name (Indonesia), Name (English), Icon (dari icon picker)

---

### 4.4 Room Setup — Rules

**URL:** `/admin/rooms/master/homerules`

Aturan penginapan (contoh: Dilarang Merokok, No Pets).

> 📸 **Screenshot:** `docs/screenshots/rooms/rules-list.png`  
> *(Tampilkan daftar house rules)*

![Daftar Rules](./screenshots/rooms/rules-list.png)

**Field:** Name (Indonesia), Name (English)

---

### 4.5 Room Setup — Policies

**URL:** `/admin/rooms/master/policies`

Kebijakan kamar (contoh: Check-in 14:00, Deposit diperlukan).

> 📸 **Screenshot:** `docs/screenshots/rooms/policies-list.png`  
> *(Tampilkan daftar policies)*

![Daftar Policies](./screenshots/rooms/policies-list.png)

**Field:** Name (Indonesia), Name (English)

---

### 4.6 Room Setup — Amenities

**URL:** `/admin/rooms/amenties`

Fasilitas tambahan di dalam kamar (contoh: Hair Dryer, Coffee Maker, Mini Bar).

> 📸 **Screenshot:** `docs/screenshots/rooms/amenities-list.png`  
> *(Tampilkan daftar amenities)*

![Daftar Amenities](./screenshots/rooms/amenities-list.png)

**Field:** Name (Indonesia), Name (English), Icon

---

### 4.7 Room Management

**URL:** `/admin/rooms/main`

Halaman utama untuk mengelola data kamar yang tampil di website publik.

> 📸 **Screenshot:** `docs/screenshots/rooms/room-list.png`  
> *(Tampilkan tabel daftar kamar dengan semua kolom — nama, harga, tier, tombol aksi)*

![Daftar Kamar](./screenshots/rooms/room-list.png)

---

#### Menambah Kamar Baru

> 📸 **Screenshot:** `docs/screenshots/rooms/room-create-basic.png`  
> *(Tampilkan bagian atas form — field title, subtitle, deskripsi)*

![Form Kamar — Informasi Utama](./screenshots/rooms/room-create-basic.png)

> 📸 **Screenshot:** `docs/screenshots/rooms/room-create-detail.png`  
> *(Tampilkan bagian detail — price, guest, size, mattress, multi-select facility/policy/rules)*

![Form Kamar — Detail & Relasi](./screenshots/rooms/room-create-detail.png)

> 📸 **Screenshot:** `docs/screenshots/rooms/room-create-gallery.png`  
> *(Tampilkan komponen ImageUpload dengan multiple foto dan tombol Set Banner)*

![Form Kamar — Galeri Foto](./screenshots/rooms/room-create-gallery.png)

**Field lengkap:**

| Bagian | Field | Keterangan |
|--------|-------|------------|
| Informasi Utama | Title (IND / ENG) | Nama kamar |
| | Subtitle (IND / ENG) | Tagline kamar |
| Deskripsi | Description (IND / ENG) | Konten rich-text lengkap |
| Detail | Price (Rp) | Harga per malam, format otomatis |
| | Number of Guest | Kapasitas tamu |
| | Room Size (m²) | Luas kamar |
| | Mattress Type | Pilih dari master Mattress |
| Relasi | Facility | Multi-select fasilitas |
| | Policy | Multi-select kebijakan |
| | Room Rules | Multi-select aturan |
| Lainnya | Recommendation | Tandai sebagai kamar rekomendasi |
| | Room Tier | Pilih dari master Tiers |
| Galeri | Images | Upload hingga 5 foto (maks. 5 MB/foto), set 1 sebagai banner |

---

## 5. Food

### 5.1 Catering

**URL:** `/admin/food/catering`

Mengelola paket-paket katering yang ditawarkan.

> 📸 **Screenshot:** `docs/screenshots/food/catering-list.png`  
> *(Tampilkan tabel daftar catering)*

![Daftar Catering](./screenshots/food/catering-list.png)

> 📸 **Screenshot:** `docs/screenshots/food/catering-create-top.png`  
> *(Tampilkan bagian atas form — image, type, name, description, pax, hours)*

![Form Catering — Atas](./screenshots/food/catering-create-top.png)

> 📸 **Screenshot:** `docs/screenshots/food/catering-create-bottom.png`  
> *(Tampilkan bagian bawah form — title/subtitle/desc menu, card desc, highlight desc, tag input food package)*

![Form Catering — Bawah](./screenshots/food/catering-create-bottom.png)

**Field lengkap:**

| Field | Keterangan |
|-------|------------|
| Image | Upload & crop foto paket catering |
| Type of Catering | Pilih jenis katering |
| Catering Name (IND / ENG) | Nama paket |
| Catering Description (IND / ENG) | Deskripsi umum |
| Minimum Pax | Jumlah tamu minimum |
| Hours of Service (Min & Max) | Rentang jam layanan |
| Title Menu (IND / ENG) | Judul bagian menu |
| Subtitle Menu (IND / ENG) | Subjudul menu |
| Menu Description (IND / ENG) | Deskripsi menu |
| Card Description (IND / ENG) | Teks singkat untuk kartu preview |
| Highlight Menu Description (IND / ENG) | Keterangan highlight menu |
| Food Package Primary | Tag nama paket makanan (tekan Enter/Tab untuk tambah tag) |

---

### 5.2 Our Menu

**URL:** `/admin/food/menu`

Item menu makanan individual.

> 📸 **Screenshot:** `docs/screenshots/food/menu-list.png`  
> *(Tampilkan tabel daftar menu)*

![Daftar Menu](./screenshots/food/menu-list.png)

> 📸 **Screenshot:** `docs/screenshots/food/menu-create.png`  
> *(Tampilkan form tambah menu)*

![Form Tambah Menu](./screenshots/food/menu-create.png)

**Field:** Image (upload & crop), Name (IND / ENG), Description (IND / ENG), Category

---

### 5.3 Our Package

**URL:** `/admin/food/package`

Paket makanan bundling.

> 📸 **Screenshot:** `docs/screenshots/food/package-list.png`  
> *(Tampilkan tabel daftar package)*

![Daftar Package](./screenshots/food/package-list.png)

> 📸 **Screenshot:** `docs/screenshots/food/package-create.png`  
> *(Tampilkan form tambah package)*

![Form Tambah Package](./screenshots/food/package-create.png)

---

### 5.4 Menu Highlight

**URL:** `/admin/food/highlight`

Item makanan yang disorot di halaman food.

> 📸 **Screenshot:** `docs/screenshots/food/highlight-list.png`  
> *(Tampilkan tabel daftar highlight)*

![Daftar Menu Highlight](./screenshots/food/highlight-list.png)

> 📸 **Screenshot:** `docs/screenshots/food/highlight-create.png`  
> *(Tampilkan form tambah highlight)*

![Form Tambah Highlight](./screenshots/food/highlight-create.png)

---

### 5.5 Celebrate

**URL:** `/admin/celebrate`

Paket ruangan untuk perayaan (birthday, anniversary, dll).

> 📸 **Screenshot:** `docs/screenshots/food/celebrate-list.png`  
> *(Tampilkan tabel daftar celebrate)*

![Daftar Celebrate](./screenshots/food/celebrate-list.png)

> 📸 **Screenshot:** `docs/screenshots/food/celebrate-create.png`  
> *(Tampilkan form tambah celebrate)*

![Form Tambah Celebrate](./screenshots/food/celebrate-create.png)

---

## 6. Venue

### 6.1 Venue Facilities

**URL:** `/admin/vanue/facilities`

Master data fasilitas venue (contoh: Projector, Sound System, AC).

> 📸 **Screenshot:** `docs/screenshots/venue/facilities-list.png`  
> *(Tampilkan daftar venue facilities)*

![Daftar Venue Facilities](./screenshots/venue/facilities-list.png)

> 📸 **Screenshot:** `docs/screenshots/venue/facilities-create.png`  
> *(Tampilkan form tambah venue facility termasuk icon picker)*

![Form Tambah Venue Facility](./screenshots/venue/facilities-create.png)

**Field:** Name (IND / ENG), Icon

---

### 6.2 Venue Management

**URL:** `/admin/vanue/main`

Data venue/ruang yang bisa disewa untuk acara.

> 📸 **Screenshot:** `docs/screenshots/venue/venue-list.png`  
> *(Tampilkan tabel daftar venue)*

![Daftar Venue](./screenshots/venue/venue-list.png)

---

#### Menambah Venue Baru

> 📸 **Screenshot:** `docs/screenshots/venue/venue-create-info.png`  
> *(Tampilkan bagian Basic Information — nama, deskripsi)*

![Form Venue — Basic Info](./screenshots/venue/venue-create-info.png)

> 📸 **Screenshot:** `docs/screenshots/venue/venue-create-facilities.png`  
> *(Tampilkan komponen FacilitySelector dengan checkboxes dan opsi tandai sebagai add-on)*

![Form Venue — Facilities](./screenshots/venue/venue-create-facilities.png)

> 📸 **Screenshot:** `docs/screenshots/venue/venue-create-gallery.png`  
> *(Tampilkan komponen ImageUploadVenue dengan max 6 foto)*

![Form Venue — Galeri](./screenshots/venue/venue-create-gallery.png)

> 📸 **Screenshot:** `docs/screenshots/venue/venue-create-keys-services-notes.png`  
> *(Tampilkan tiga komponen VenueKeys, VenueServices, VenueNotes berderet)*

![Form Venue — Keys, Services, Notes](./screenshots/venue/venue-create-keys-services-notes.png)

**Field lengkap:**

| Bagian | Field | Keterangan |
|--------|-------|------------|
| Basic Information | Venue Name (IND / ENG) | Nama venue |
| | Venue Description (IND / ENG) | Deskripsi venue |
| Facility | Select Facilities | Pilih fasilitas; tandai yang add-on (berbayar) |
| Galeri Foto | Images | Upload hingga 6 foto (maks. 5 MB/foto), set 1 sebagai banner |
| Venue Keys | Label + Nilai (IND / ENG) | Info highlight venue, contoh: Kapasitas = 200 orang |
| Venue Services | Layanan (IND / ENG) | Layanan yang termasuk sewa venue |
| Venue Notes | Catatan (IND / ENG) | Syarat-syarat khusus venue |

---

## 7. Collections (Koleksi)

### 7.1 Collection Category

**URL:** `/admin/collections/master`

Kategori koleksi (contoh: Keramik, Batik, Wayang, Furniture Antik).

> 📸 **Screenshot:** `docs/screenshots/collections/category-list.png`  
> *(Tampilkan daftar kategori koleksi)*

![Daftar Collection Category](./screenshots/collections/category-list.png)

> 📸 **Screenshot:** `docs/screenshots/collections/category-create.png`  
> *(Tampilkan form tambah kategori)*

![Form Tambah Category](./screenshots/collections/category-create.png)

**Field:** Name (IND / ENG), Image (optional)

---

### 7.2 Collection Management

**URL:** `/admin/collections/main`

Item-item koleksi individual.

> 📸 **Screenshot:** `docs/screenshots/collections/collection-list.png`  
> *(Tampilkan tabel daftar koleksi)*

![Daftar Koleksi](./screenshots/collections/collection-list.png)

> 📸 **Screenshot:** `docs/screenshots/collections/collection-create.png`  
> *(Tampilkan form tambah item koleksi)*

![Form Tambah Koleksi](./screenshots/collections/collection-create.png)

**Field:** Name (IND / ENG), Description (IND / ENG), Image, Category (pilih dari master)

---

## 8. Blog

**URL:** `/admin/blogs`

Mengelola artikel blog yang tampil di website.

> 📸 **Screenshot:** `docs/screenshots/blog/blog-list.png`  
> *(Tampilkan tabel daftar artikel blog dengan kolom judul, tanggal, slug, dan tombol aksi)*

![Daftar Blog](./screenshots/blog/blog-list.png)

---

### 8.1 Menambah Blog Baru

> 📸 **Screenshot:** `docs/screenshots/blog/blog-create-info.png`  
> *(Tampilkan bagian Informasi Dasar — judul IND/ENG dan field slug yang di-disable)*

![Form Blog — Informasi Dasar](./screenshots/blog/blog-create-info.png)

> 📸 **Screenshot:** `docs/screenshots/blog/blog-create-editor.png`  
> *(Tampilkan rich-text editor TipTap dengan toolbar dan area konten)*

![Form Blog — Rich-Text Editor](./screenshots/blog/blog-create-editor.png)

> 📸 **Screenshot:** `docs/screenshots/blog/blog-create-thumbnail.png`  
> *(Tampilkan section thumbnail — file input, image cropper aktif, dan preview hasil crop dengan centang hijau)*

![Form Blog — Thumbnail & Cropper](./screenshots/blog/blog-create-thumbnail.png)

**Field lengkap:**

| Bagian | Field | Keterangan |
|--------|-------|------------|
| Informasi Dasar | Judul (IND / ENG) | Judul artikel |
| | Slug | Auto-generated dari judul Inggris, tidak bisa diedit |
| Konten Indonesia | Deskripsi & Konten | Rich-text editor (Bold, Italic, List, H2, dll) |
| Konten English | Description & Content | Rich-text editor |
| Thumbnail | Upload + Crop | Upload gambar → crop → preview hasil |

---

### 8.2 Mengedit Blog

> 📸 **Screenshot:** `docs/screenshots/blog/blog-edit.png`  
> *(Tampilkan form edit blog dengan data yang sudah terisi di editor)*

![Form Edit Blog](./screenshots/blog/blog-edit.png)

1. Klik **Edit** pada baris yang ingin diubah.
2. Perbarui field yang diinginkan.
3. Klik **Save**.

---

## 9. Event

**URL:** `/admin/event`

Mengelola event/acara di Tembi.

> 📸 **Screenshot:** `docs/screenshots/event/event-list.png`  
> *(Tampilkan tabel daftar event dengan kolom judul, tanggal, lokasi, hosted by, dan tombol aksi)*

![Daftar Event](./screenshots/event/event-list.png)

---

### 9.1 Menambah Event Baru

> 📸 **Screenshot:** `docs/screenshots/event/event-create-info.png`  
> *(Tampilkan bagian Basic Information — judul, slug, hosted by, date, time, location)*

![Form Event — Basic Info](./screenshots/event/event-create-info.png)

> 📸 **Screenshot:** `docs/screenshots/event/event-create-content.png`  
> *(Tampilkan rich-text editor untuk konten event IND & ENG)*

![Form Event — Konten](./screenshots/event/event-create-content.png)

> 📸 **Screenshot:** `docs/screenshots/event/event-create-thumbnail.png`  
> *(Tampilkan section thumbnail dengan image cropper)*

![Form Event — Thumbnail](./screenshots/event/event-create-thumbnail.png)

**Field lengkap:**

| Field | Keterangan |
|-------|------------|
| Title (IND / ENG) | Judul event |
| Slug | Auto-generated dari judul Inggris |
| Hosted By | Nama penyelenggara |
| Date Event | Tanggal pelaksanaan (date picker) |
| Time Event | Waktu mulai (time picker) |
| Location | Lokasi pelaksanaan |
| Konten (IND / ENG) | Deskripsi lengkap event (rich-text) |
| Thumbnail | Upload + crop gambar |

---

## 10. Page Banner

**URL:** `/admin/banner`

Banner header untuk halaman-halaman tertentu di website publik.

> 📸 **Screenshot:** `docs/screenshots/banner/banner-list.png`  
> *(Tampilkan tabel daftar banner per halaman)*

![Daftar Page Banner](./screenshots/banner/banner-list.png)

---

### 10.1 Mengedit Banner

> 📸 **Screenshot:** `docs/screenshots/banner/banner-edit-top.png`  
> *(Tampilkan bagian atas form edit — image upload dengan preview gambar lama, dan field title IND/ENG)*

![Form Edit Banner — Atas](./screenshots/banner/banner-edit-top.png)

> 📸 **Screenshot:** `docs/screenshots/banner/banner-edit-bottom.png`  
> *(Tampilkan bagian bawah form — subtitle IND/ENG dan rich-text editor deskripsi IND/ENG)*

![Form Edit Banner — Bawah](./screenshots/banner/banner-edit-bottom.png)

1. Temukan banner halaman yang ingin diubah di tabel → klik **Edit**.
2. Isi form:

| Field | Keterangan |
|-------|------------|
| Image | Upload gambar banner baru; gambar lama tampil sebagai referensi |
| Title Banner (IND / ENG) | Judul utama di atas banner |
| Subtitle (IND / ENG) | Subjudul opsional |
| Deskripsi (IND / ENG) | Teks deskripsi (rich-text: Bold, Italic, List, H2) |

3. Klik **Save**.

---

## 11. Invoice (Booking)

**URL:** `/admin/invoice`

Memantau semua transaksi booking kamar dari website publik.

> 📸 **Screenshot:** `docs/screenshots/invoice/invoice-list.png`  
> *(Tampilkan tabel invoice dengan kolom nama tamu, tanggal booking, kamar, total, status pembayaran)*

![Daftar Invoice](./screenshots/invoice/invoice-list.png)

> 📸 **Screenshot:** `docs/screenshots/invoice/invoice-detail.png`  
> *(Tampilkan halaman detail invoice — data tamu, kamar, tanggal, informasi pembayaran Xendit)*

![Detail Invoice](./screenshots/invoice/invoice-detail.png)

Tabel menampilkan:
- Nama tamu, email, nomor telepon
- Tanggal booking & tanggal menginap (check-in / check-out)
- Tipe kamar yang dipesan
- Total pembayaran
- Status: **Paid** / **Pending** / **Failed**

Klik baris invoice untuk melihat detail lengkap transaksi.

---

## 12. Tips Umum

### Rich-Text Editor (TipTap)

> 📸 **Screenshot:** `docs/screenshots/dashboard/editor-toolbar.png`  
> *(Tampilkan toolbar editor dengan semua tombol terlihat jelas)*

![Rich-Text Editor Toolbar](./screenshots/dashboard/editor-toolbar.png)

| Tombol | Fungsi |
|--------|--------|
| **B** | Bold — cetak tebal |
| **I** | Italic — cetak miring |
| **• List** | Bullet list |
| **H2** | Heading level 2 |
| **Clear** | Hapus semua formatting |

---

### Image Cropper

> 📸 **Screenshot:** `docs/screenshots/dashboard/image-cropper-active.png`  
> *(Tampilkan image cropper dengan kotak crop di atas gambar)*

![Image Cropper Aktif](./screenshots/dashboard/image-cropper-active.png)

Setelah memilih gambar, area crop muncul. Seret dan sesuaikan kotak crop ke area yang diinginkan. Hasil crop digunakan sebagai gambar final yang tersimpan.

---

### Multi-Select

> 📸 **Screenshot:** `docs/screenshots/dashboard/multi-select.png`  
> *(Tampilkan komponen multi-select dengan beberapa item terpilih sebagai tag)*

![Multi-Select Component](./screenshots/dashboard/multi-select.png)

Klik item dari dropdown untuk menambahkannya. Klik tanda **×** pada tag untuk menghapus pilihan.

---

### Tag Input

> 📸 **Screenshot:** `docs/screenshots/dashboard/tag-input.png`  
> *(Tampilkan komponen tag input dengan beberapa tag yang sudah diisi)*

![Tag Input Component](./screenshots/dashboard/tag-input.png)

Ketikkan nilai lalu tekan **Enter** (input Indonesia) atau **Tab** (input Inggris) untuk menambah tag. Klik **×** untuk menghapus tag.

---

### Notifikasi Toast

> 📸 **Screenshot:** `docs/screenshots/dashboard/toast-success.png`  
> *(Tampilkan notifikasi toast hijau "berhasil disimpan" di pojok kanan bawah)*

![Notifikasi Berhasil](./screenshots/dashboard/toast-success.png)

Setiap aksi akan menampilkan notifikasi di pojok kanan bawah:
- **Hijau** — aksi berhasil
- **Merah** — terjadi error

---

### Dark Mode

> 📸 **Screenshot:** `docs/screenshots/dashboard/dark-mode.png`  
> *(Tampilkan panel admin dalam dark mode — sidebar dan halaman utama)*

![Dark Mode](./screenshots/dashboard/dark-mode.png)

Toggle dark/light mode tersedia di header bagian kanan atas.

---

## Checklist Screenshot

Gunakan tabel berikut untuk melacak screenshot mana yang belum diambil:

| No | Path File | Status |
|----|-----------|--------|
| 1 | `screenshots/dashboard/sidebar.png` | ⬜ Belum |
| 2 | `screenshots/dashboard/editor-toolbar.png` | ⬜ Belum |
| 3 | `screenshots/dashboard/image-cropper-active.png` | ⬜ Belum |
| 4 | `screenshots/dashboard/multi-select.png` | ⬜ Belum |
| 5 | `screenshots/dashboard/tag-input.png` | ⬜ Belum |
| 6 | `screenshots/dashboard/toast-success.png` | ⬜ Belum |
| 7 | `screenshots/dashboard/dark-mode.png` | ⬜ Belum |
| 8 | `screenshots/carousel/list.png` | ⬜ Belum |
| 9 | `screenshots/carousel/create-form.png` | ⬜ Belum |
| 10 | `screenshots/carousel/image-cropper.png` | ⬜ Belum |
| 11 | `screenshots/carousel/edit-form.png` | ⬜ Belum |
| 12 | `screenshots/carousel/delete-confirm.png` | ⬜ Belum |
| 13 | `screenshots/rooms/tiers-list.png` | ⬜ Belum |
| 14 | `screenshots/rooms/tiers-create.png` | ⬜ Belum |
| 15 | `screenshots/rooms/mattress-list.png` | ⬜ Belum |
| 16 | `screenshots/rooms/facilities-list.png` | ⬜ Belum |
| 17 | `screenshots/rooms/facilities-create.png` | ⬜ Belum |
| 18 | `screenshots/rooms/rules-list.png` | ⬜ Belum |
| 19 | `screenshots/rooms/policies-list.png` | ⬜ Belum |
| 20 | `screenshots/rooms/amenities-list.png` | ⬜ Belum |
| 21 | `screenshots/rooms/room-list.png` | ⬜ Belum |
| 22 | `screenshots/rooms/room-create-basic.png` | ⬜ Belum |
| 23 | `screenshots/rooms/room-create-detail.png` | ⬜ Belum |
| 24 | `screenshots/rooms/room-create-gallery.png` | ⬜ Belum |
| 25 | `screenshots/food/catering-list.png` | ⬜ Belum |
| 26 | `screenshots/food/catering-create-top.png` | ⬜ Belum |
| 27 | `screenshots/food/catering-create-bottom.png` | ⬜ Belum |
| 28 | `screenshots/food/menu-list.png` | ⬜ Belum |
| 29 | `screenshots/food/menu-create.png` | ⬜ Belum |
| 30 | `screenshots/food/package-list.png` | ⬜ Belum |
| 31 | `screenshots/food/package-create.png` | ⬜ Belum |
| 32 | `screenshots/food/highlight-list.png` | ⬜ Belum |
| 33 | `screenshots/food/highlight-create.png` | ⬜ Belum |
| 34 | `screenshots/food/celebrate-list.png` | ⬜ Belum |
| 35 | `screenshots/food/celebrate-create.png` | ⬜ Belum |
| 36 | `screenshots/venue/facilities-list.png` | ⬜ Belum |
| 37 | `screenshots/venue/facilities-create.png` | ⬜ Belum |
| 38 | `screenshots/venue/venue-list.png` | ⬜ Belum |
| 39 | `screenshots/venue/venue-create-info.png` | ⬜ Belum |
| 40 | `screenshots/venue/venue-create-facilities.png` | ⬜ Belum |
| 41 | `screenshots/venue/venue-create-gallery.png` | ⬜ Belum |
| 42 | `screenshots/venue/venue-create-keys-services-notes.png` | ⬜ Belum |
| 43 | `screenshots/collections/category-list.png` | ⬜ Belum |
| 44 | `screenshots/collections/category-create.png` | ⬜ Belum |
| 45 | `screenshots/collections/collection-list.png` | ⬜ Belum |
| 46 | `screenshots/collections/collection-create.png` | ⬜ Belum |
| 47 | `screenshots/blog/blog-list.png` | ⬜ Belum |
| 48 | `screenshots/blog/blog-create-info.png` | ⬜ Belum |
| 49 | `screenshots/blog/blog-create-editor.png` | ⬜ Belum |
| 50 | `screenshots/blog/blog-create-thumbnail.png` | ⬜ Belum |
| 51 | `screenshots/blog/blog-edit.png` | ⬜ Belum |
| 52 | `screenshots/event/event-list.png` | ⬜ Belum |
| 53 | `screenshots/event/event-create-info.png` | ⬜ Belum |
| 54 | `screenshots/event/event-create-content.png` | ⬜ Belum |
| 55 | `screenshots/event/event-create-thumbnail.png` | ⬜ Belum |
| 56 | `screenshots/banner/banner-list.png` | ⬜ Belum |
| 57 | `screenshots/banner/banner-edit-top.png` | ⬜ Belum |
| 58 | `screenshots/banner/banner-edit-bottom.png` | ⬜ Belum |
| 59 | `screenshots/invoice/invoice-list.png` | ⬜ Belum |
| 60 | `screenshots/invoice/invoice-detail.png` | ⬜ Belum |

---

*Dokumen ini dibuat berdasarkan implementasi panel admin Tembi Web per Juni 2026.*  
*Perbarui checklist di atas dengan mengganti ⬜ menjadi ✅ setelah screenshot diambil dan disimpan.*
