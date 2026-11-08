class Mahasiswa:
    """Class sederhana untuk menunjukkan class dan object."""
    kampus = "ITERA"  # atribut class (dimiliki semua objek)

    def __init__(self, nama, nim):
        self.nama = nama   # atribut instance
        self.nim = nim

    def perkenalan(self):
        return f"Saya {self.nama} ({self.nim}) dari {self.kampus}"

m1 = Mahasiswa("Budi", "121140001")
m2 = Mahasiswa("Sari", "121140002")
print(m1.perkenalan())
print(m2.perkenalan())