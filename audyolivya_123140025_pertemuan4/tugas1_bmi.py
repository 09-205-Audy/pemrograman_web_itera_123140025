"""Tugas 1: Program penghitung BMI (Body Mass Index) sederhana."""


def baca_angka_positif(pesan):
    """Meminta input angka positif dari pengguna sampai nilainya valid.

    Parameter:
        pesan (str): teks yang ditampilkan saat meminta input.

    Mengembalikan:
        float: angka positif yang dimasukkan pengguna.
    """
    while True:
        teks = input(pesan).strip().replace(",", ".")  # "1,70" dianggap "1.70"
        try:
            angka = float(teks)
        except ValueError:
            print("Input harus berupa angka. Coba lagi.")
            continue

        if angka <= 0:
            print("Angka harus lebih besar dari 0. Coba lagi.")
            continue
        return angka


def hitung_bmi(berat, tinggi):
    """Menghitung nilai BMI.

    Parameter:
        berat (float): berat badan dalam kilogram (kg).
        tinggi (float): tinggi badan dalam meter (m).

    Mengembalikan:
        float: nilai BMI, yaitu berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi):
    """Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): nilai BMI.

    Mengembalikan:
        str: kategori berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    """Menjalankan program: baca input, hitung BMI, lalu cetak hasilnya."""
    print("=== Penghitung BMI ===")
    berat = baca_angka_positif("Masukkan berat badan (kg)            : ")
    tinggi = baca_angka_positif("Masukkan tinggi badan (m), cth 1.70 : ")

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print()
    print(f"Berat badan : {berat:.1f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()