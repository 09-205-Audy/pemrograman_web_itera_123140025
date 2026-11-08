import { useState, useEffect } from 'react'
import { useBooks } from '../../context/BookContext'
import { STATUS_OPTIONS } from '../../constants'
import './BookForm.css'

const EMPTY_FORM = { title: '', author: '', status: 'milik' }

// Validasi: kolom judul dan penulis wajib diisi
function validate({ title, author }) {
  const errors = {}
  if (title.trim() === '') errors.title = 'Judul buku wajib diisi.'
  if (author.trim() === '') errors.author = 'Nama penulis wajib diisi.'
  return errors
}

// Form ini dipakai untuk menambah DAN mengedit buku (tergantung editingBook)
function BookForm() {
  const { addBook, updateBook, editingBook, setEditingBook } = useBooks()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const isEditing = Boolean(editingBook)

  // Saat tombol Edit ditekan, isi form dengan data buku tersebut
  useEffect(() => {
    if (editingBook) {
      const { title, author, status } = editingBook
      setForm({ title, author, status })
      setErrors({})
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingBook])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined })) // hapus error kolom ini
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return // berhenti, buku tidak disimpan
    }

    const data = { title: form.title.trim(), author: form.author.trim(), status: form.status }
    if (isEditing) {
      updateBook(editingBook.id, data)
    } else {
      addBook(data)
    }
    setForm(EMPTY_FORM)
    setErrors({})
  }

  const handleCancel = () => setEditingBook(null)

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="form-field">
        <label htmlFor="book-title">Judul buku</label>
        <input
          id="book-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Contoh: Atomic Habits"
          className={errors.title ? 'input-error' : ''}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <p className="error-text" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="book-author">Penulis</label>
        <input
          id="book-author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          placeholder="Contoh: James Clear"
          className={errors.author ? 'input-error' : ''}
          aria-invalid={Boolean(errors.author)}
        />
        {errors.author && (
          <p className="error-text" role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="book-status">Status</label>
        <select id="book-status" name="status" value={form.status} onChange={handleChange}>
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan perubahan' : 'Tambah buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

export default BookForm