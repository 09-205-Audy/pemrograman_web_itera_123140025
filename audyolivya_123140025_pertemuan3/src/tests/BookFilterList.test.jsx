import { render, screen, fireEvent } from '@testing-library/react'
import BookFilter from '../components/BookFilter/BookFilter'
import BookList from '../components/BookList/BookList'
import { BookProvider } from '../context/BookContext'
import { STORAGE_KEY } from '../constants'

const contoh = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', status: 'baca' },
  { id: '2', title: 'Clean Code', author: 'Robert Martin', status: 'milik' },
]

const renderHalaman = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contoh))
  return render(
    <BookProvider>
      <BookFilter />
      <BookList />
    </BookProvider>
  )
}

describe('BookFilter dan BookList', () => {
  beforeEach(() => localStorage.clear())

  it('mencari buku berdasarkan judul atau nama penulis', () => {
    renderHalaman()
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'robert' } })
    expect(screen.getByText('Clean Code')).toBeInTheDocument()
    expect(screen.queryByText('Atomic Habits')).not.toBeInTheDocument()
  })

  it('memfilter buku berdasarkan status', () => {
    renderHalaman()
    fireEvent.click(screen.getByRole('button', { name: 'Sedang dibaca' }))
    expect(screen.getByText('Atomic Habits')).toBeInTheDocument()
    expect(screen.queryByText('Clean Code')).not.toBeInTheDocument()
  })
})