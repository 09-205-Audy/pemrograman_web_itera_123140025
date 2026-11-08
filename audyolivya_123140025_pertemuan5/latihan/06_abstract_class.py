from abc import ABC, abstractmethod

class Kendaraan(ABC):
    @abstractmethod
    def jalan(self):
        """Wajib diimplementasikan subclass."""

class Motor(Kendaraan):
    def jalan(self):
        return "Motor melaju dengan 2 roda"

class Mobil(Kendaraan):
    def jalan(self):
        return "Mobil melaju dengan 4 roda"

# k = Kendaraan()  # TypeError: tidak bisa instansiasi abstract class
for k in (Motor(), Mobil()):
    print(k.jalan())