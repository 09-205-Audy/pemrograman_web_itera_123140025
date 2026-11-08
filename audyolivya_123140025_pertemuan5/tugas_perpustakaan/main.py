"""
main.py
Skrip untuk menguji seluruh fungsionalitas sistem perpustakaan.
"""
from library_item import Book, Magazine
from member import Member
from library import Library


def tampilkan_hasil(judul, hasil):
    print(f"\n{judul}")
    if not hasil:
        print("  Tidak ditemukan.")
    for item in hasil:
        print("  ", item.get_detail())


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item
    print("=== 1. MENAMBAHKAN ITEM ===")
    perpus.tambah_item(Book("B001", "Python Dasar", 2022, "Budi Santoso", 300))
    perpus.tambah_item(Book("B002", "Pemrograman Web", 2021, "Siti Aminah", 250))
    perpus.tambah_item(Magazine("M001", "Tech Today", 2024, "Edisi 12", "Media Digital"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2023, "Edisi 5", "Pustaka Ilmu"))
    perpus.tambah_item(Book("B001", "Duplikat", 2020, "-", 100))  # uji ID ganda

    # 2. Menampilkan katalog
    perpus.tampilkan_katalog()

    # 3. Mencari item
    print("\n=== 2. PENCARIAN ===")
    tampilkan_hasil("Cari judul 'python':", perpus.cari_by_judul("python"))
    hasil_id = perpus.cari_by_id("M001")
    tampilkan_hasil("Cari ID 'M001':", [hasil_id] if hasil_id else [])
    tampilkan_hasil("Cari ID 'X999':", [])

    # 4. Status ketersediaan
    print("\n=== 3. PEMINJAMAN & STATUS KETERSEDIAAN ===")
    anggota = Member("A001", "Rina")
    anggota.pinjam_item(perpus.cari_by_id("B001"))
    anggota.pinjam_item(perpus.cari_by_id("M001"))
    print("Pinjam ulang B001:", anggota.pinjam_item(perpus.cari_by_id("B001")))
    anggota.tampilkan_pinjaman()
    perpus.tampilkan_katalog(hanya_tersedia=True)

    # 5. Pengembalian
    print("\n=== 4. PENGEMBALIAN ===")
    anggota.kembalikan_item(perpus.cari_by_id("B001"))
    perpus.tampilkan_katalog(hanya_tersedia=True)

    # 6. Polymorphism: hitung_denda berbeda tiap tipe
    print("\n=== 5. POLYMORPHISM: DENDA 3 HARI ===")
    for item in (perpus.cari_by_id("B001"), perpus.cari_by_id("M001")):
        print(f"{item.judul}: Rp{item.hitung_denda(3)}")


if __name__ == "__main__":
    main()