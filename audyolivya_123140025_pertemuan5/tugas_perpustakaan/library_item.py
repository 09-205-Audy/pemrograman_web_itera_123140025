"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.
"""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract class: dasar untuk semua item perpustakaan.
    Tidak bisa diinstansiasi langsung.
    """

    def __init__(self, item_id, judul, tahun):
        self._item_id = item_id    # protected: ID item
        self._judul = judul        # protected: judul item
        self.__tahun = tahun       # private: tahun terbit
        self.__dipinjam = False    # private: status peminjaman

    # ---------- PROPERTY (encapsulation) ----------
    @property
    def item_id(self):
        """Getter ID item (read-only)."""
        return self._item_id

    @property
    def judul(self):
        """Getter judul item (read-only)."""
        return self._judul

    @property
    def tahun(self):
        """Getter tahun terbit."""
        return self.__tahun

    @property
    def is_dipinjam(self):
        """True jika item sedang dipinjam."""
        return self.__dipinjam

    # ---------- METHOD UMUM ----------
    def pinjam(self):
        """Mengubah status menjadi dipinjam. Return True jika berhasil."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        """Mengubah status menjadi tersedia. Return True jika berhasil."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    # ---------- ABSTRACT METHOD ----------
    @abstractmethod
    def get_detail(self):
        """Mengembalikan string detail item (wajib di-override)."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda keterlambatan (wajib di-override)."""

    def __str__(self):
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[{self._item_id}] {self._judul} ({status})"


class Book(LibraryItem):
    """Subclass untuk buku. Denda Rp1.000 per hari."""
    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, tahun, penulis, jumlah_halaman):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def get_detail(self):
        """Detail khusus buku."""
        return (f"BUKU     | {self._item_id} | {self._judul} | "
                f"Penulis: {self._penulis} | {self._jumlah_halaman} hlm | "
                f"Tahun: {self.tahun}")

    def hitung_denda(self, hari_terlambat):
        """Denda buku = hari terlambat x Rp1.000."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Subclass untuk majalah. Denda Rp500 per hari."""
    DENDA_PER_HARI = 500

    def __init__(self, item_id, judul, tahun, edisi, penerbit):
        super().__init__(item_id, judul, tahun)
        self._edisi = edisi
        self._penerbit = penerbit

    def get_detail(self):
        """Detail khusus majalah."""
        return (f"MAJALAH  | {self._item_id} | {self._judul} | "
                f"Edisi: {self._edisi} | Penerbit: {self._penerbit} | "
                f"Tahun: {self.tahun}")

    def hitung_denda(self, hari_terlambat):
        """Denda majalah = hari terlambat x Rp500."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI