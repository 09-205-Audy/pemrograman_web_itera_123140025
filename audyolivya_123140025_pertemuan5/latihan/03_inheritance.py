class Hewan:
    def __init__(self, nama):
        self.nama = nama

    def bersuara(self):
        return "..."

class Kucing(Hewan):
    def bersuara(self):  # override method parent
        return "Meow"

class Anjing(Hewan):
    def __init__(self, nama, ras):
        super().__init__(nama)  # memanggil constructor parent
        self.ras = ras

    def bersuara(self):
        return "Guk guk"

k = Kucing("Tom")
a = Anjing("Rex", "Husky")
print(k.nama, "->", k.bersuara())
print(a.nama, a.ras, "->", a.bersuara())