"""
member.py
Class Member: anggota perpustakaan yang dapat meminjam item.
"""


class Member:
    """Anggota perpustakaan dengan daftar item yang sedang dipinjam."""

    def __init__(self, member_id, nama):
        self._member_id = member_id
        self._nama = nama
        self.__item_dipinjam = []   # private: daftar item yang dipinjam

    @property
    def member_id(self):
        return self._member_id

    @property
    def nama(self):
        return self._nama

    @property
    def jumlah_pinjaman(self):
        """Jumlah item yang sedang dipinjam."""
        return len(self.__item_dipinjam)

    def pinjam_item(self, item):
        """Meminjam item. Return True jika berhasil."""
        if item.pinjam():
            self.__item_dipinjam.append(item)
            return True
        return False

    def kembalikan_item(self, item):
        """Mengembalikan item. Return True jika berhasil."""
        if item in self.__item_dipinjam and item.kembalikan():
            self.__item_dipinjam.remove(item)
            return True
        return False

    def tampilkan_pinjaman(self):
        """Mencetak daftar pinjaman anggota."""
        print(f"Pinjaman {self._nama}:")
        if not self.__item_dipinjam:
            print("  (tidak ada)")
        for item in self.__item_dipinjam:
            print("  -", item)