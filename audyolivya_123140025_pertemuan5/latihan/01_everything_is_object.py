# Di Python, semua hal adalah objek: angka, string, list, bahkan fungsi.
angka = 10
teks = "Halo"
daftar = [1, 2, 3]

def sapa():
    return "Hai"

for item in (angka, teks, daftar, sapa):
    print(f"{item!r} -> tipe: {type(item).__name__}")

# Semua objek punya atribut dan method
print(teks.upper())        # method milik objek str
print(daftar.__len__())    # method khusus milik objek list
print(isinstance(angka, object))  # True: semuanya turunan 'object'