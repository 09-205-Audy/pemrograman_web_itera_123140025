"""Modul math_operations: geometri (luas dan keliling) dan konversi suhu."""

# Konstanta
PI = 3.14159


def _pastikan_positif(nilai, nama):
    """Memastikan sebuah ukuran bernilai positif.

    Parameter:
        nilai (float): ukuran yang diperiksa.
        nama (str): nama ukuran, dipakai pada pesan error.

    Mengembalikan:
        None. Jika nilai tidak positif, muncul ValueError.
    """
    if nilai <= 0:
        raise ValueError(f"{nama} harus lebih besar dari 0")


# ---------- Geometri ----------
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Mengembalikan:
        float: luas persegi, yaitu sisi * sisi.
    """
    _pastikan_positif(sisi, "Sisi")
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Mengembalikan:
        float: keliling persegi, yaitu 4 * sisi.
    """
    _pastikan_positif(sisi, "Sisi")
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Mengembalikan:
        float: luas persegi panjang, yaitu panjang * lebar.
    """
    _pastikan_positif(panjang, "Panjang")
    _pastikan_positif(lebar, "Lebar")
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Mengembalikan:
        float: keliling persegi panjang, yaitu 2 * (panjang + lebar).
    """
    _pastikan_positif(panjang, "Panjang")
    _pastikan_positif(lebar, "Lebar")
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Mengembalikan:
        float: luas lingkaran, yaitu PI * jari_jari * jari_jari.
    """
    _pastikan_positif(jari_jari, "Jari-jari")
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Mengembalikan:
        float: keliling lingkaran, yaitu 2 * PI * jari_jari.
    """
    _pastikan_positif(jari_jari, "Jari-jari")
    return 2 * PI * jari_jari


# ---------- Konversi suhu ----------
def celsius_ke_fahrenheit(celsius):
    """Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Mengembalikan:
        float: suhu dalam Fahrenheit, yaitu celsius * 9 / 5 + 32.
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Mengembalikan:
        float: suhu dalam Kelvin, yaitu celsius + 273.15.
    """
    return celsius + 273.15