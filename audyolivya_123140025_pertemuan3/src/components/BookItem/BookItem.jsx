import PropTypes from 'prop-types'
import { STATUS_LABEL } from '../../constants'
import './BookItem.css'

// Komponen reusable: menampilkan satu buku beserta tombol Edit dan Hapus
function BookItem({ book, onEdit, onDelete }) {
  const { title, author, status } = book

  return (
    <li className={`book-item status-${status}`}>
      <div className="book-info">
        <h3>{title}</h3>
        <p className="book-author">{author}</p>
        <span className={`badge badge-${status}`}>{STATUS_LABEL[status]}</span>
      </div>
      <div className="book-actions">
        <button
          type="button"
          className="btn btn-small"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-danger"
          onClick={() => onDelete(book.id)}
          aria-label={`Hapus ${title}`}
        >
          Hapus
        </button>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookItem