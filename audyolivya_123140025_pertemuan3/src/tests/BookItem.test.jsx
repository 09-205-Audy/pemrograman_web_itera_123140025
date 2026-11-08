import { render, screen, fireEvent } from '@testing-library/react'
import BookItem from '../components/BookItem/BookItem'

const book = { id: '1', title: 'Atomic Habits', author: 'James Clear', status: 'baca' }

describe('BookItem', () => {
  it('menampilkan judul, penulis, dan label status', () => {
    render(<BookItem book={book} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Atomic Habits')).toBeInTheDocument()
    expect(screen.getByText('James Clear')).toBeInTheDocument()
    expect(screen.getByText('Sedang dibaca')).toBeInTheDocument()
  })

  it('memanggil onEdit dengan data buku saat tombol Edit diklik', () => {
    const onEdit = vi.fn()
    render(<BookItem book={book} onEdit={onEdit} onDelete={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit Atomic Habits' }))
    expect(onEdit).toHaveBeenCalledWith(book)
  })

  it('memanggil onDelete dengan id buku saat tombol Hapus diklik', () => {
    const onDelete = vi.fn()
    render(<BookItem book={book} onEdit={() => {}} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Atomic Habits' }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })
})