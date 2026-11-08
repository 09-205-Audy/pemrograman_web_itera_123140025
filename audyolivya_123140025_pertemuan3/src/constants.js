// Daftar status buku yang dipakai di seluruh aplikasi
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang dibaca' },
  { value: 'beli', label: 'Ingin dibeli' },
]

// Mengubah nilai status (misalnya "baca") menjadi teks tampilan
export const STATUS_LABEL = {
  milik: 'Dimiliki',
  baca: 'Sedang dibaca',
  beli: 'Ingin dibeli',
}

// Kunci penyimpanan data buku di localStorage
export const STORAGE_KEY = 'daftarBukuPribadi'