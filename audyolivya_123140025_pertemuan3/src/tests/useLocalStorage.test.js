import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear())

  it('memakai nilai awal jika localStorage masih kosong', () => {
    const { result } = renderHook(() => useLocalStorage('kunci-tes', ['awal']))
    expect(result.current[0]).toEqual(['awal'])
  })

  it('membaca data yang sudah tersimpan di localStorage', () => {
    localStorage.setItem('kunci-tes', JSON.stringify(['tersimpan']))
    const { result } = renderHook(() => useLocalStorage('kunci-tes', []))
    expect(result.current[0]).toEqual(['tersimpan'])
  })

  it('menyimpan nilai baru ke localStorage saat diubah', () => {
    const { result } = renderHook(() => useLocalStorage('kunci-tes', []))
    act(() => result.current[1](['buku baru']))
    expect(JSON.parse(localStorage.getItem('kunci-tes'))).toEqual(['buku baru'])
  })
})