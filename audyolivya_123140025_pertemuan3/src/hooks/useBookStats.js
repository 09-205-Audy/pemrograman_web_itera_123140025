import { useMemo } from 'react'

/**
 * Custom hook: menghitung statistik dari daftar buku.
 * useMemo membuat perhitungan hanya diulang saat daftar buku berubah.
 * @param {Array} books - daftar buku
 * @returns {Object} - total, jumlah per status, dan persentasenya
 */
function useBookStats(books) {
  return useMemo(() => {
    const total = books.length
    const hitung = (status) => books.filter((book) => book.status === status).length

    const milik = hitung('milik')
    const baca = hitung('baca')
    const beli = hitung('beli')

    // Persentase dibulatkan; jika belum ada buku, hasilnya 0 (hindari pembagian 0)
    const persen = (jumlah) => (total === 0 ? 0 : Math.round((jumlah / total) * 100))

    return {
      total,
      milik,
      baca,
      beli,
      persentase: { milik: persen(milik), baca: persen(baca), beli: persen(beli) },
    }
  }, [books])
}

export default useBookStats