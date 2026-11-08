class AkunBank:
    def __init__(self, pemilik, saldo):
        self.pemilik = pemilik      # public
        self._cabang = "Lampung"    # protected (konvensi)
        self.__saldo = saldo        # private (name mangling)

    @property
    def saldo(self):                # getter, hanya baca
        return self.__saldo

    def setor(self, jumlah):
        if jumlah > 0:
            self.__saldo += jumlah

akun = AkunBank("Dina", 1000)
akun.setor(500)
print(akun.saldo)            # 1500 lewat property
# print(akun.__saldo)        # AttributeError (private)
print(akun._AkunBank__saldo) # bisa diakses, tapi TIDAK disarankan