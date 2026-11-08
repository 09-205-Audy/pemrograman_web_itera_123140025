"""Program utama: memakai modul math_operations dengan dua cara impor."""

# Cara impor 1: impor seluruh modul. Fungsinya dipanggil dengan awalan nama modul.
import math_operations

# Cara impor 2: impor fungsi tertentu saja. Fungsinya dipanggil langsung.
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

GARIS = "=" * 56


def tampilkan_judul(teks):
    """Mencetak judul bagian dengan garis pemisah.

    Parameter:
        teks (str): judul yang ditampilkan.
    """
    print()
    print(GARIS)
    print(f" {teks}")
    print(GARIS)


def demo_persegi():
    """Menguji fungsi luas dan keliling persegi dengan beberapa sisi."""
    tampilkan_judul("PERSEGI")
    for sisi in (5, 12):
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"Sisi {sisi:>5.2f} | Luas = {luas:>8.2f} | Keliling = {keliling:>8.2f}")


def demo_persegi_panjang():
    """Menguji fungsi luas dan keliling persegi panjang dengan beberapa ukuran."""
    tampilkan_judul("PERSEGI PANJANG")
    for panjang, lebar in ((8, 3), (10, 4)):
        luas = math_operations.luas_persegi_panjang(panjang, lebar)
        keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
        print(f"{panjang:>5.2f} x {lebar:<5.2f} | Luas = {luas:>8.2f} | Keliling = {keliling:>8.2f}")


def demo_lingkaran():
    """Menguji fungsi luas dan keliling lingkaran dengan beberapa jari-jari."""
    tampilkan_judul("LINGKARAN")
    print(f"Konstanta PI = {math_operations.PI}")
    for jari_jari in (7, 10):
        luas = math_operations.luas_lingkaran(jari_jari)
        keliling = math_operations.keliling_lingkaran(jari_jari)
        print(f"r = {jari_jari:>5.2f} | Luas = {luas:>8.2f} | Keliling = {keliling:>8.2f}")


def demo_suhu():
    """Menguji fungsi konversi suhu dengan beberapa nilai Celsius."""
    tampilkan_judul("KONVERSI SUHU")
    print(f"{'Celsius':>10}{'Fahrenheit':>14}{'Kelvin':>12}")
    for celsius in (0, 37, 100):
        fahrenheit = celsius_ke_fahrenheit(celsius)
        kelvin = celsius_ke_kelvin(celsius)
        print(f"{celsius:>8.2f} C{fahrenheit:>12.2f} F{kelvin:>10.2f} K")


def demo_input_salah():
    """Menunjukkan bahwa ukuran yang tidak valid ditolak dengan pesan error."""
    tampilkan_judul("UJI INPUT TIDAK VALID")
    try:
        math_operations.luas_persegi(-3)
    except ValueError as galat:
        print(f"Sisi -3 ditolak: {galat}")


def main():
    """Menjalankan semua demo secara berurutan."""
    print("DEMO MODUL math_operations")
    demo_persegi()
    demo_persegi_panjang()
    demo_lingkaran()
    demo_suhu()
    demo_input_salah()


if __name__ == "__main__":
    main()