"""
library.py
Class Library: menyimpan dan mengelola koleksi item perpustakaan.
"""


class Library:
    """Mengelola koleksi item dalam atribut private __koleksi."""

    def __init__(self, nama):
        self._nama = nama
        self.__koleksi = []   # private: tidak bisa diubah langsung dari luar

    def tambah_item(self, item):
        """Menambah item. Ditolak jika ID sudah dipakai."""
        if self.cari_by_id(item.item_id) is not None:
            print(f"Gagal: ID {item.item_id} sudah terdaftar.")
            return False
        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        """
        Menampilkan katalog. Jika hanya_tersedia=True,
        hanya item yang belum dipinjam yang ditampilkan.
        POLYMORPHISM: get_detail() berbeda untuk tiap tipe item.
        """
        judul = "TERSEDIA" if hanya_tersedia else "LENGKAP"
        print(f"\n=== KATALOG {judul} - {self._nama} ===")
        ada = False
        for item in self.__koleksi:
            if hanya_tersedia and item.is_dipinjam:
                continue
            status = "Dipinjam" if item.is_dipinjam else "Tersedia"
            print(f"{item.get_detail()} | {status}")
            ada = True
        if not ada:
            print("(kosong)")

    def cari_by_id(self, item_id):
        """Mencari satu item berdasarkan ID. Return None jika tidak ada."""
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_by_judul(self, kata_kunci):
        """Mencari item yang judulnya mengandung kata kunci (tidak peka huruf besar/kecil)."""
        kata_kunci = kata_kunci.lower()
        return [i for i in self.__koleksi if kata_kunci in i.judul.lower()]

    @property
    def jumlah_item(self):
        """Jumlah total item di koleksi."""
        return len(self.__koleksi)