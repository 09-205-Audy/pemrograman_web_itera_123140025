import { render, screen, fireEvent } from '@testing-library/react'
import BookForm from '../components/BookForm/BookForm'
import { BookProvider } from '../context/BookContext'
import { STORAGE_KEY } from '../constants'

const renderForm = () =>
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  )

describe('BookForm', () => {
  beforeEach(() => localStorage.clear())

  it('menampilkan pesan error jika judul dan penulis kosong', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }))
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument()
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument()
  })

  it('menyimpan buku ke localStorage jika input valid', () => {
    renderForm()
    fireEvent.change(screen.getByLabelText('Judul buku'), { target: { value: 'Atomic Habits' } })
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'James Clear' } })
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }))

    const tersimpan = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(tersimpan).toHaveLength(1)
    expect(tersimpan[0].title).toBe('Atomic Habits')
  })
})