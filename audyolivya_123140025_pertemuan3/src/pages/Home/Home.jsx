import BookForm from '../../components/BookForm/BookForm'
import BookFilter from '../../components/BookFilter/BookFilter'
import BookList from '../../components/BookList/BookList'
import { useBooks } from '../../context/BookContext'
import './Home.css'

// Halaman utama: form di kiri, pencarian + daftar buku di kanan
function Home() {
  const { books, filteredBooks } = useBooks()

  return (
    <div className="home">
      <aside className="home-form">
        <BookForm />
      </aside>

      <section className="home-list">
        <div className="home-list-header">
          <h2>Daftar Buku</h2>
          <p className="home-count">
            {filteredBooks.length === books.length
              ? `${books.length} buku`
              : `Menampilkan ${filteredBooks.length} dari ${books.length} buku`}
          </p>
        </div>
        <BookFilter />
        <BookList />
      </section>
    </div>
  )
}

export default Home