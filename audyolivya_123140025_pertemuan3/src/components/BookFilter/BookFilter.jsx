import { useBooks } from '../../context/BookContext'
import { STATUS_OPTIONS } from '../../constants'
import './BookFilter.css'

const FILTER_OPTIONS = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS]

// Pencarian (judul atau penulis) dan filter berdasarkan status
function BookFilter() {
  const { keyword, setKeyword, filterStatus, setFilterStatus } = useBooks()

  return (
    <div className="book-filter">
      <input
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Cari judul atau penulis..."
        aria-label="Cari buku"
      />
      <div className="filter-buttons" role="group" aria-label="Filter status buku">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`btn btn-filter ${filterStatus === value ? 'active' : ''}`}
            aria-pressed={filterStatus === value}
            onClick={() => setFilterStatus(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BookFilter