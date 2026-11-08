import { useState, useEffect } from 'react'

/**
 * Custom hook: useState yang otomatis tersimpan di localStorage.
 * @param {string} key - kunci penyimpanan di localStorage
 * @param {*} initialValue - nilai awal jika belum ada data tersimpan
 * @returns {[*, Function]} - pasangan [nilai, fungsi pengubah], seperti useState
 */
function useLocalStorage(key, initialValue) {
  // Fungsi di dalam useState hanya dijalankan sekali, saat komponen pertama dibuat
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      // Data rusak atau localStorage tidak tersedia: pakai nilai awal
      console.error(`Gagal membaca localStorage "${key}":`, error)
      return initialValue
    }
  })

  // Setiap nilai berubah, simpan ulang ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Gagal menyimpan localStorage "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage