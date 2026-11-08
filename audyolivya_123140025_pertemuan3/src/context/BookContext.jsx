import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'
import { STORAGE_KEY } from '../constants'

// Context: wadah data yang bisa dibaca oleh semua komponen di dalam Provider
const BookContext = createContext(null)

/**
 * Provider: menyimpan state buku dan menyediakan fungsi untuk mengubahnya.
 */
export function BookProvider({ children }) {
  // Daftar buku otomatis tersimpan di localStorage
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, [])
  const [filterStatus, setFilterStatus] = useState('semua')
  const [keyword, setKeyword] = useState('')
  const [editingBook, setEditingBook] = useState(null) // buku yang sedang diedit

  // Tambah buku baru di urutan paling atas (array baru, bukan mengubah yang lama)
  const addBook = ({ title, author, status }) => {
    const newBook = { id: `${Date.now()}`, title, author, status }
    setBooks((prev) => [newBook, ...prev])
  }

  // Ubah data satu buku berdasarkan id
  const updateBook = (id, changes) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...changes } : book)))
    setEditingBook(null)
  }

  // Hapus satu buku berdasarkan id
  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
    setEditingBook((current) => (current?.id === id ? null : current))
  }

  // Buku yang lolos filter status dan pencarian (judul atau penulis)
  const filteredBooks = useMemo(() => {
    const kata = keyword.trim().toLowerCase()
    return books
      .filter((book) => filterStatus === 'semua' || book.status === filterStatus)
      .filter(
        (book) =>
          book.title.toLowerCase().includes(kata) || book.author.toLowerCase().includes(kata)
      )
  }, [books, filterStatus, keyword])

  const value = {
    books,
    filteredBooks,
    filterStatus,
    setFilterStatus,
    keyword,
    setKeyword,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Hook bantu agar komponen mudah mengakses Context.
 * Contoh pemakaian: const { books, addBook } = useBooks()
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam <BookProvider>')
  }
  return context
}