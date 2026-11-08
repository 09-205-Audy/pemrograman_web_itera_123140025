class Bentuk:
    def luas(self):
        raise NotImplementedError

class Persegi(Bentuk):
    def __init__(self, sisi):
        self.sisi = sisi
    def luas(self):
        return self.sisi ** 2

class Lingkaran(Bentuk):
    def __init__(self, r):
        self.r = r
    def luas(self):
        return 3.14 * self.r ** 2

# Satu pemanggilan yang sama, perilaku berbeda tergantung objeknya
for b in [Persegi(4), Lingkaran(3)]:
    print(type(b).__name__, "luas =", b.luas())