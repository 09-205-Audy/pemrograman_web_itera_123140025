import { useBooks } from '../../context/BookContext'
import useBookStats from '../../hooks/useBookStats'
import StatCard from '../../components/StatCard/StatCard'
import './Stats.css'

// Halaman statistik: ringkasan jumlah buku per status (memakai custom hook)
function Stats() {
  const { books } = useBooks()
  const { total, milik, baca, beli, persentase } = useBookStats(books)

  return (
    <section className="stats">
      <h2>Statistik Koleksi Buku</h2>
      {total === 0 ? (
        <p className="stats-empty">Belum ada data. Tambahkan buku di halaman Beranda.</p>
      ) : (
        <div className="stats-grid">
          <StatCard label="Total buku" value={total} tone="total" />
          <StatCard label="Dimiliki" value={milik} percent={persentase.milik} tone="milik" />
          <StatCard label="Sedang dibaca" value={baca} percent={persentase.baca} tone="baca" />
          <StatCard label="Ingin dibeli" value={beli} percent={persentase.beli} tone="beli" />
        </div>
      )}
    </section>
  )
}

export default Stats