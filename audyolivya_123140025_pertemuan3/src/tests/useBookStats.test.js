import { renderHook } from '@testing-library/react'
import useBookStats from '../hooks/useBookStats'

const books = [
  { id: '1', title: 'A', author: 'X', status: 'milik' },
  { id: '2', title: 'B', author: 'Y', status: 'milik' },
  { id: '3', title: 'C', author: 'Z', status: 'baca' },
  { id: '4', title: 'D', author: 'W', status: 'beli' },
]

describe('useBookStats', () => {
  it('menghitung total dan jumlah buku per status', () => {
    const { result } = renderHook(() => useBookStats(books))
    expect(result.current.total).toBe(4)
    expect(result.current.milik).toBe(2)
    expect(result.current.baca).toBe(1)
    expect(result.current.beli).toBe(1)
  })

  it('menghitung persentase dan aman saat daftar kosong', () => {
    const terisi = renderHook(() => useBookStats(books))
    expect(terisi.result.current.persentase.milik).toBe(50)

    const kosong = renderHook(() => useBookStats([]))
    expect(kosong.result.current.persentase.milik).toBe(0)
  })
})