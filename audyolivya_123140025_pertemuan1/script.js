/* ==========================================================
   Mini POS Kantin Kampus - script.js
   Isi: validasi form, kalkulator, keranjang + localStorage
   ========================================================== */

// ---------- Konstanta ----------
const KUNCI_STORAGE = "keranjangMiniPOS";
const MIN_NAMA = 3;
const MIN_HARGA = 500;
const MIN_QTY = 1;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 10;

// ---------- Data (state) ----------
let keranjang = []; // setiap item: { nama, harga, qty }

// ---------- Elemen DOM ----------
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");
const inputBayar = document.getElementById("uang-bayar");
const isiKeranjang = document.getElementById("isi-keranjang");
const elTotalBelanja = document.getElementById("total-belanja");
const elDiskon = document.getElementById("nominal-diskon");
const elTotalAkhir = document.getElementById("total-akhir");
const elInfoDiskon = document.getElementById("info-diskon");
const elKembalian = document.getElementById("hasil-kembalian");
const btnReset = document.getElementById("btn-reset");

// ---------- Utilitas ----------
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// ---------- Validasi Form ----------
function tampilkanError(input, pesan) {
  document.getElementById("error-" + input.id).textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

function validasiNama() {
  const nilai = inputNama.value.trim();
  if (nilai.length < MIN_NAMA) {
    tampilkanError(inputNama, "Nama barang minimal " + MIN_NAMA + " karakter.");
    return false;
  }
  tampilkanError(inputNama, "");
  return true;
}

function validasiHarga() {
  const nilai = inputHarga.value.trim();
  const angka = Number(nilai);
  if (nilai === "" || isNaN(angka)) {
    tampilkanError(inputHarga, "Harga wajib diisi dengan angka.");
    return false;
  }
  if (angka < MIN_HARGA) {
    tampilkanError(inputHarga, "Harga minimal " + formatRupiah(MIN_HARGA) + ".");
    return false;
  }
  tampilkanError(inputHarga, "");
  return true;
}

function validasiQty() {
  const nilai = inputQty.value.trim();
  const angka = Number(nilai);
  if (nilai === "" || isNaN(angka)) {
    tampilkanError(inputQty, "Jumlah wajib diisi dengan angka.");
    return false;
  }
  if (!Number.isInteger(angka) || angka < MIN_QTY) {
    tampilkanError(inputQty, "Jumlah harus bilangan bulat minimal " + MIN_QTY + ".");
    return false;
  }
  tampilkanError(inputQty, "");
  return true;
}

// ---------- LocalStorage ----------
function simpanKeranjang() {
  localStorage.setItem(KUNCI_STORAGE, JSON.stringify(keranjang));
}

function muatKeranjang() {
  const data = localStorage.getItem(KUNCI_STORAGE);
  if (data) {
    try {
      keranjang = JSON.parse(data);
    } catch (e) {
      keranjang = []; // data rusak -> mulai dari kosong
    }
  }
}

// ---------- Kalkulator ----------
function hitungSubtotal(item) {
  return item.harga * item.qty;
}

function hitungTotalBelanja() {
  return keranjang.reduce((total, item) => total + hitungSubtotal(item), 0);
}

function hitungDiskon(total) {
  return total >= BATAS_DISKON ? (total * PERSEN_DISKON) / 100 : 0;
}

function hitungKembalian() {
  const total = hitungTotalBelanja();
  const totalAkhir = total - hitungDiskon(total);
  const nilai = inputBayar.value.trim();

  elKembalian.className = "kembalian";
  if (nilai === "" || totalAkhir === 0) {
    elKembalian.textContent = "";
    return;
  }

  const bayar = Number(nilai);
  if (bayar < totalAkhir) {
    elKembalian.textContent =
      "Uang belum mencukupi, kurang " + formatRupiah(totalAkhir - bayar) + ".";
    elKembalian.classList.add("kurang");
  } else {
    elKembalian.textContent = "Kembalian: " + formatRupiah(bayar - totalAkhir);
    elKembalian.classList.add("ok");
  }
}

// ---------- Tampilan ----------
function renderKeranjang() {
  isiKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    isiKeranjang.innerHTML =
      '<tr><td colspan="6" class="kosong">Keranjang masih kosong. Tambahkan barang lewat form.</td></tr>';
  }

  keranjang.forEach((item, index) => {
    const baris = document.createElement("tr");
    baris.innerHTML =
      "<td>" + (index + 1) + "</td>" +
      "<td></td>" +
      '<td class="num">' + formatRupiah(item.harga) + "</td>" +
      '<td class="num">' + item.qty + "</td>" +
      '<td class="num">' + formatRupiah(hitungSubtotal(item)) + "</td>" +
      '<td><button class="btn btn-hapus" data-index="' + index + '">Hapus</button></td>';
    // textContent dipakai agar nama barang aman dari injeksi HTML
    baris.children[1].textContent = item.nama;
    isiKeranjang.appendChild(baris);
  });

  renderRingkasan();
}

function renderRingkasan() {
  const total = hitungTotalBelanja();
  const diskon = hitungDiskon(total);

  elTotalBelanja.textContent = formatRupiah(total);
  elDiskon.textContent = "- " + formatRupiah(diskon);
  elTotalAkhir.textContent = formatRupiah(total - diskon);

  elInfoDiskon.textContent =
    diskon > 0
      ? "Selamat, diskon " + PERSEN_DISKON + "% berhasil didapat."
      : "Belanja minimal " + formatRupiah(BATAS_DISKON) + " dapat diskon " + PERSEN_DISKON + "%.";

  hitungKembalian();
}

// ---------- Aksi ----------
function tambahBarang(event) {
  event.preventDefault();

  // Jalankan semua validasi (bukan berhenti di yang pertama salah)
  const namaOk = validasiNama();
  const hargaOk = validasiHarga();
  const qtyOk = validasiQty();
  if (!(namaOk && hargaOk && qtyOk)) return;

  keranjang.push({
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value),
    qty: Number(inputQty.value),
  });

  simpanKeranjang();
  renderKeranjang();
  formBarang.reset();
  inputNama.focus();
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  renderKeranjang();
}

function transaksiBaru() {
  if (keranjang.length > 0 && !confirm("Kosongkan keranjang dan mulai transaksi baru?")) return;
  keranjang = [];
  localStorage.removeItem(KUNCI_STORAGE);
  inputBayar.value = "";
  formBarang.reset();
  [inputNama, inputHarga, inputQty].forEach((el) => tampilkanError(el, ""));
  renderKeranjang();
}

// ---------- Event Listener ----------
formBarang.addEventListener("submit", tambahBarang);
inputNama.addEventListener("input", validasiNama);
inputHarga.addEventListener("input", validasiHarga);
inputQty.addEventListener("input", validasiQty);
inputBayar.addEventListener("input", hitungKembalian);
btnReset.addEventListener("click", transaksiBaru);

// Event delegation: satu listener untuk semua tombol Hapus
isiKeranjang.addEventListener("click", (event) => {
  if (event.target.matches(".btn-hapus")) {
    hapusBarang(Number(event.target.dataset.index));
  }
});

// ---------- Inisialisasi ----------
muatKeranjang();
renderKeranjang();