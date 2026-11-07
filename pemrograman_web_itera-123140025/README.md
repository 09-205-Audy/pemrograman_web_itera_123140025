# Mini POS Kantin Kampus

## Identitas
- **Nama Lengkap:** [IAudy Olivya Br Gurusinga]
- **NIM:** 123140025
- **Kelas Praktikum:** [RB]

## Deskripsi Aplikasi
Mini POS adalah aplikasi web kasir sederhana untuk kantin atau toko kampus. Kasir dapat memasukkan barang belanjaan, melihat subtotal dan total otomatis, mendapat diskon, lalu menghitung kembalian. Isi keranjang tersimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh.

Tujuan pembuatan: mempraktikkan validasi input form, perhitungan otomatis dengan JavaScript, dan manajemen data keranjang menggunakan `localStorage`.

## Panduan Menjalankan
1. Clone repository ini atau unduh sebagai ZIP.
2. Buka folder proyek di VS Code.
3. Install ekstensi **Live Server** (jika belum).
4. Klik kanan `index.html`, pilih **Open with Live Server**.
5. Aplikasi terbuka di browser (biasanya `http://127.0.0.1:5500`).

Alternatif: klik dua kali `index.html` agar terbuka langsung di browser.

## Daftar Fitur
- [x] Validasi nama barang (wajib, minimal 3 karakter)
- [x] Validasi harga satuan (angka, minimal Rp 500)
- [x] Validasi qty (bilangan bulat, minimal 1)
- [x] Pesan error merah di bawah input yang salah
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan
- [x] Subtotal per barang (harga x qty)
- [x] Total belanja otomatis
- [x] Diskon 10% untuk belanja minimal Rp 50.000
- [x] Kalkulator uang bayar dan kembalian (+ pesan jika uang kurang)
- [x] Tabel keranjang (No, Nama, Harga, Qty, Subtotal, Aksi)
- [x] Hapus item dengan perhitungan ulang otomatis
- [x] Penyimpanan keranjang di `localStorage`
- [x] Tombol Transaksi Baru untuk mengosongkan keranjang
- [x] Tampilan responsif dan format Rupiah

## Tangkapan Layar
| Tampilan | Gambar |
|---|---|
| Form input utama | ![Form](screenshots/form.png) |
| Validasi error | ![Error](screenshots/error.png) |
| Hasil perhitungan dan tabel | ![Hasil](screenshots/hasil.png) |

## Penjelasan Teknis Singkat
**1. Validasi input.** Tiga fungsi (`validasiNama`, `validasiHarga`, `validasiQty`) memeriksa nilai input. Jika salah, pesan error ditampilkan di elemen `<small class="error">` di bawah input dan fungsi mengembalikan `false`. Saat form di-submit, barang hanya masuk keranjang jika ketiga validasi bernilai `true`.

**2. Kalkulator.** Subtotal = harga x qty. Total belanja dihitung dengan `reduce()` yang menjumlahkan semua subtotal. Jika total >= Rp 50.000, diskon = 10% dari total. Total akhir = total - diskon. Kembalian = uang bayar - total akhir; jika uang bayar lebih kecil, muncul pesan uang belum mencukupi.

**3. LocalStorage.** Array `keranjang` diubah menjadi teks dengan `JSON.stringify()` lalu disimpan lewat `localStorage.setItem()` setiap kali ada perubahan (tambah atau hapus). Saat halaman dibuka, data diambil dengan `localStorage.getItem()` dan diubah kembali menjadi array dengan `JSON.parse()`. Tombol Transaksi Baru memanggil `localStorage.removeItem()` untuk membersihkan data.

## Struktur Folder
```
audyolivya_123140025_pertemuan1/
├── index.html
├── style.css
├── script.js
├── README.md
├── screenshots/
└── modul/
```