"""Tugas 2: Pengelolaan data nilai mahasiswa."""

# Bobot penilaian (jumlahnya 100%)
BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

# Data mahasiswa: list berisi dictionary (kamu boleh mengganti nama dan nilainya)
data_mahasiswa = [
    {"nama": "Budi Santoso", "nim": "123140001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Citra Lestari", "nim": "123140002", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Dimas Pratama", "nim": "123140003", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Eka Putri", "nim": "123140004", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 58},
    {"nama": "Fajar Nugroho", "nim": "123140005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Gita Maharani", "nim": "123140006", "nilai_uts": 95, "nilai_uas": 92, "nilai_tugas": 98},
]


def hitung_nilai_akhir(mahasiswa):
    """Menghitung nilai akhir satu mahasiswa.

    Rumus: 30% * UTS + 40% * UAS + 30% * Tugas.

    Parameter:
        mahasiswa (dict): data mahasiswa dengan kunci nilai_uts, nilai_uas, dan nilai_tugas.

    Mengembalikan:
        float: nilai akhir, dibulatkan 2 angka desimal.
    """
    nilai = (
        BOBOT_UTS * mahasiswa["nilai_uts"]
        + BOBOT_UAS * mahasiswa["nilai_uas"]
        + BOBOT_TUGAS * mahasiswa["nilai_tugas"]
    )
    # Dibulatkan agar tidak ada selisih kecil akibat perhitungan desimal komputer
    return round(nilai, 2)


def tentukan_grade(nilai_akhir):
    """Menentukan grade huruf berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Mengembalikan:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar):
    """Menambahkan kunci nilai_akhir dan grade ke setiap mahasiswa.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.

    Mengembalikan:
        list: list baru berisi dictionary lengkap dengan nilai_akhir dan grade.
    """
    hasil = []
    for mahasiswa in daftar:
        nilai_akhir = hitung_nilai_akhir(mahasiswa)
        # {**mahasiswa, ...} menyalin data lama lalu menambah kunci baru
        hasil.append({
            **mahasiswa,
            "nilai_akhir": nilai_akhir,
            "grade": tentukan_grade(nilai_akhir),
        })
    return hasil


def cetak_tabel(daftar):
    """Mencetak tabel data mahasiswa yang rata ke terminal.

    Parameter:
        daftar (list): list dictionary yang sudah memiliki nilai_akhir dan grade.
    """
    garis = "-" * 62
    print(garis)
    print(f"{'No':<4}{'Nama':<22}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>8}")
    print(garis)
    for nomor, m in enumerate(daftar, start=1):
        print(f"{nomor:<4}{m['nama']:<22}{m['nim']:<14}{m['nilai_akhir']:>12.2f}{m['grade']:>8}")
    print(garis)


def cetak_mahasiswa(judul, mahasiswa):
    """Mencetak informasi lengkap satu mahasiswa.

    Parameter:
        judul (str): judul yang ditampilkan, misalnya "Nilai tertinggi".
        mahasiswa (dict): data mahasiswa yang sudah memiliki nilai_akhir dan grade.
    """
    print(f"{judul}")
    print(f"  Nama        : {mahasiswa['nama']}")
    print(f"  NIM         : {mahasiswa['nim']}")
    print(f"  UTS/UAS/Tgs : {mahasiswa['nilai_uts']} / {mahasiswa['nilai_uas']} / {mahasiswa['nilai_tugas']}")
    print(f"  Nilai akhir : {mahasiswa['nilai_akhir']:.2f}")
    print(f"  Grade       : {mahasiswa['grade']}")


def main():
    """Menjalankan program: hitung nilai, tampilkan tabel, lalu cari nilai tertinggi dan terendah."""
    daftar = proses_data(data_mahasiswa)

    print("DAFTAR NILAI MAHASISWA")
    cetak_tabel(daftar)

    # max() dan min() mencari dictionary dengan nilai_akhir terbesar dan terkecil
    tertinggi = max(daftar, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar, key=lambda m: m["nilai_akhir"])

    print()
    cetak_mahasiswa("Mahasiswa dengan nilai akhir TERTINGGI:", tertinggi)
    print()
    cetak_mahasiswa("Mahasiswa dengan nilai akhir TERENDAH:", terendah)


if __name__ == "__main__":
    main()