import { useBooks } from '../../context/BookContext'
import BookItem from '../BookItem/BookItem'
import './BookList.css'

// Menampilkan daftar buku hasil filter dan pencarian
function BookList() {
  const { books, filteredBooks, setEditingBook, deleteBook } = useBooks()

  const handleEdit = (book) => {
    setEditingBook(book)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // naik ke form (berguna di HP)
  }

  const handleDelete = (id) => {
    if (window.confirm('Hapus buku ini?')) deleteBook(id)
  }

  if (books.length === 0) {
    return <p className="list-empty">Belum ada buku. Tambahkan buku pertamamu lewat form.</p>
  }

  if (filteredBooks.length === 0) {
    return <p className="list-empty">Tidak ada buku yang cocok dengan pencarian atau filter.</p>
  }

  return (
    <ul className="book-list">
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </ul>
  )
}

export default BookList