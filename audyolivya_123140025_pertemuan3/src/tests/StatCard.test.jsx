import { render, screen } from '@testing-library/react'
import StatCard from '../components/StatCard/StatCard'

describe('StatCard', () => {
  it('menampilkan label, angka, dan persentase', () => {
    render(<StatCard label="Dimiliki" value={2} percent={50} tone="milik" />)
    expect(screen.getByText('Dimiliki')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('50% dari seluruh buku')).toBeInTheDocument()
  })
})