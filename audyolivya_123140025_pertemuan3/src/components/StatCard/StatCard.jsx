import PropTypes from 'prop-types'
import './StatCard.css'

// Komponen reusable: kartu angka statistik dengan bar persentase (opsional)
function StatCard({ label, value, percent, tone='total' }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {percent !== undefined && (
        <>
          <div className="stat-bar" aria-hidden="true">
            <div className="stat-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="stat-percent">{percent}% dari seluruh buku</p>
        </>
      )}
    </div>
  )
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percent: PropTypes.number,
  tone: PropTypes.oneOf(['total', 'milik', 'baca', 'beli']),
}

export default StatCard