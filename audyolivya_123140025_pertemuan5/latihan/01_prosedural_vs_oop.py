# ===== Gaya Prosedural =====
nama_1, saldo_1 = "Andi", 1000
def tambah_saldo(saldo, jumlah):
    return saldo + jumlah

saldo_1 = tambah_saldo(saldo_1, 500)
print("Prosedural:", nama_1, saldo_1)

# ===== Gaya OOP =====
class Rekening:
    def __init__(self, nama, saldo):
        self.nama = nama
        self.saldo = saldo

    def tambah_saldo(self, jumlah):
        self.saldo += jumlah

rek = Rekening("Andi", 1000)
rek.tambah_saldo(500)
print("OOP:", rek.nama, rek.saldo)