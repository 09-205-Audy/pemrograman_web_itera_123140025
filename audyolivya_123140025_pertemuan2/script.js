/* ==========================================================
   Catatan Kuliah ITERA - script.js
   Fitur ES6+: let/const, arrow function, template literals,
   async/await, class, destructuring, spread operator
   ========================================================== */

// ---------- Konstanta ----------
const KUNCI_STORAGE = "catatanKuliahITERA";
const URL_CUACA =
  "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
const URL_KUTIPAN = "https://dummyjson.com/quotes/random";

const NAMA_CUACA = {
  0: "Cerah", 1: "Cerah berawan", 2: "Berawan sebagian", 3: "Berawan",
  45: "Berkabut", 48: "Berkabut", 51: "Gerimis ringan", 53: "Gerimis",
  55: "Gerimis lebat", 61: "Hujan ringan", 63: "Hujan", 65: "Hujan lebat",
  80: "Hujan lokal ringan", 81: "Hujan lokal", 82: "Hujan lokal lebat",
  95: "Badai petir", 96: "Badai petir", 99: "Badai petir",
};

// ---------- Fungsi bantu (arrow function) ----------
const amankan = (teks) =>
  String(teks).replace(/[&<>"']/g, (k) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[k]
  );

const formatWaktu = (iso) =>
  new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

// ---------- Class 1: model satu catatan ----------
class TaskItem {
  constructor({
    id = `${Date.now()}${Math.floor(Math.random() * 1000)}`,
    judul,
    matkul,
    isi,
    sematan = false,
    dibuat = new Date().toISOString(),
    diubah = null,
  }) {
    this.id = id;
    this.judul = judul;
    this.matkul = matkul;
    this.isi = isi;
    this.sematan = sematan;
    this.dibuat = dibuat;
    this.diubah = diubah;
  }

  // Getter: teks waktu untuk ditampilkan di kartu
  get keteranganWaktu() {
    return this.diubah
      ? `Diubah ${formatWaktu(this.diubah)}`
      : `Dibuat ${formatWaktu(this.dibuat)}`;
  }
}

// ---------- Class 2: pengelola aplikasi ----------
class DashboardApp {
  constructor() {
    this.catatan = [];
    this.kataCari = "";
    this.filterMatkul = "semua";
    this.el = {
      sapaan: document.getElementById("sapaan"),
      waktu: document.getElementById("tanggal-waktu"),
      kutipanTeks: document.getElementById("kutipan-teks"),
      kutipanPenulis: document.getElementById("kutipan-penulis"),
      btnKutipan: document.getElementById("btn-kutipan"),
      cuacaSuhu: document.getElementById("cuaca-suhu"),
      cuacaInfo: document.getElementById("cuaca-info"),
      form: document.getElementById("form-catatan"),
      judulForm: document.getElementById("judul-form"),
      editId: document.getElementById("edit-id"),
      judul: document.getElementById("judul"),
      matkul: document.getElementById("matkul"),
      isi: document.getElementById("isi"),
      sematkan: document.getElementById("sematkan"),
      btnSimpan: document.getElementById("btn-simpan"),
      btnBatal: document.getElementById("btn-batal"),
      cari: document.getElementById("cari"),
      filter: document.getElementById("filter-matkul"),
      daftar: document.getElementById("daftar-catatan"),
      ringkasan: document.getElementById("ringkasan"),
      btnHapusSemua: document.getElementById("btn-hapus-semua"),
    };
  }

  // ----- Inisialisasi -----
  init() {
    this.muat();
    this.pasangEvent();
    this.render();
    this.perbaruiJam();
    setInterval(() => this.perbaruiJam(), 30000);
    this.muatCuaca();
    this.muatKutipan();
  }
stringify
  // ----- LocalStorage -----
  simpan() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(this.catatan));
  }

  muat() {
    try {
      const data = JSON.parse(localStorage.getItem(KUNCI_STORAGE)) ?? [];
      this.catatan = data.map((item) => new TaskItem(item));
    } catch (error) {
      this.catatan = []; // data rusak -> mulai dari kosong
    }
  }

  // ----- Operasi data (immutable: array lama tidak diubah) -----
  tambah(data) {
    this.catatan = [new TaskItem(data), ...this.catatan];
    this.simpan();
  }

  ubah(id, perubahan) {
    this.catatan = this.catatan.map((c) =>
      c.id === id
        ? new TaskItem({ ...c, ...perubahan, diubah: new Date().toISOString() })
        : c
    );
    this.simpan();
  }

  hapus(id) {
    this.catatan = this.catatan.filter((c) => c.id !== id);
    this.simpan();
  }

  toggleSematan(id) {
    const target = this.catatan.find((c) => c.id === id);
    if (target) this.ubah(id, { sematan: !target.sematan });
  }

  // Catatan yang lolos pencarian dan filter, yang disematkan di atas
  get catatanTampil() {
    const kata = this.kataCari.toLowerCase();
    return this.catatan
      .filter(({ judul, isi }) => `${judul} ${isi}`.toLowerCase().includes(kata))
      .filter(({ matkul }) => this.filterMatkul === "semua" || matkul === this.filterMatkul)
      .sort((a, b) => Number(b.sematan) - Number(a.sematan) || b.dibuat.localeCompare(a.dibuat));
  }

  // ----- Validasi form -----
  validasi({ judul, matkul, isi }) {
    const galat = {};
    if (judul.length < 3) galat.judul = "Judul minimal 3 karakter.";
    if (matkul.length < 3) galat.matkul = "Nama mata kuliah minimal 3 karakter.";
    if (isi.length < 10) galat.isi = "Isi catatan minimal 10 karakter.";
    return galat;
  }

  setError(nama, pesan) {
    document.getElementById(`error-${nama}`).textContent = pesan;
    document.getElementById(nama).classList.toggle("invalid", pesan !== "");
  }

  // ----- Event handler -----
  pasangEvent() {
    this.el.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.el.btnBatal.addEventListener("click", () => this.resetForm());
    this.el.btnKutipan.addEventListener("click", () => this.muatKutipan());

    this.el.cari.addEventListener("input", (e) => {
      this.kataCari = e.target.value.trim();
      this.renderDaftar();
    });

    this.el.filter.addEventListener("change", (e) => {
      this.filterMatkul = e.target.value;
      this.renderDaftar();
    });

    this.el.btnHapusSemua.addEventListener("click", () => {
      if (this.catatan.length === 0) return;
      if (!confirm("Hapus SEMUA catatan? Tindakan ini tidak bisa dibatalkan.")) return;
      this.catatan = [];
      this.simpan();
      this.resetForm();
      this.render();
    });

    // Event delegation: satu listener untuk semua tombol di kartu catatan
    this.el.daftar.addEventListener("click", (e) => {
      const tombol = e.target.closest("button[data-aksi]");
      if (!tombol) return;
      const { aksi, id } = tombol.dataset;

      if (aksi === "edit") this.mulaiEdit(id);
      if (aksi === "sematan") {
        this.toggleSematan(id);
        this.render();
      }
      if (aksi === "hapus" && confirm("Hapus catatan ini?")) {
        this.hapus(id);
        if (this.el.editId.value === id) this.resetForm();
        this.render();
      }
    });

    ["judul", "matkul", "isi"].forEach((nama) =>
      this.el[nama].addEventListener("input", () => this.setError(nama, ""))
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      judul: this.el.judul.value.trim(),
      matkul: this.el.matkul.value.trim(),
      isi: this.el.isi.value.trim(),
      sematan: this.el.sematkan.checked,
    };

    const galat = this.validasi(data);
    ["judul", "matkul", "isi"].forEach((nama) => this.setError(nama, galat[nama] ?? ""));
    if (Object.keys(galat).length > 0) return;

    const idEdit = this.el.editId.value;
    if (idEdit) {
      this.ubah(idEdit, data);
    } else {
      this.tambah(data);
    }
    this.resetForm();
    this.render();
  }

  mulaiEdit(id) {
    const catatan = this.catatan.find((c) => c.id === id);
    if (!catatan) return;
    const { judul, matkul, isi, sematan } = catatan;

    this.el.editId.value = id;
    this.el.judul.value = judul;
    this.el.matkul.value = matkul;
    this.el.isi.value = isi;
    this.el.sematkan.checked = sematan;
    this.el.judulForm.textContent = "Edit Catatan";
    this.el.btnSimpan.textContent = "Simpan perubahan";
    this.el.btnBatal.hidden = false;
    this.el.form.scrollIntoView({ behavior: "smooth", block: "center" });
    this.el.judul.focus();
  }

  resetForm() {
    this.el.form.reset();
    this.el.editId.value = "";
    this.el.judulForm.textContent = "Tambah Catatan";
    this.el.btnSimpan.textContent = "Simpan catatan";
    this.el.btnBatal.hidden = true;
    ["judul", "matkul", "isi"].forEach((nama) => this.setError(nama, ""));
  }

  // ----- Render (template literals) -----
  render() {
    this.renderFilter();
    this.renderDaftar();
  }

  renderFilter() {
    const daftarMatkul = [...new Set(this.catatan.map(({ matkul }) => matkul))].sort();
    if (!daftarMatkul.includes(this.filterMatkul)) this.filterMatkul = "semua";
           let pilihan = this.filterMatkul;
       if (!daftarMatkul.includes(pilihan)) pilihan = "semua";
       this.filterMatkul = pilihan;

    this.el.filter.innerHTML =
      `<option value="semua">Semua mata kuliah</option>` +
      daftarMatkul
        .map((m) => `<option value="${amankan(m)}">${amankan(m)}</option>`)
        .join("");
    this.el.filter.value = this.filterMatkul;
  }

  renderDaftar() {
    const tampil = this.catatanTampil;
    const total = this.catatan.length;

    this.el.ringkasan.textContent =
      tampil.length === total
        ? `${total} catatan`
        : `Menampilkan ${tampil.length} dari ${total} catatan`;

    if (tampil.length === 0) {
      this.el.daftar.innerHTML = `<li class="kosong">${
        total === 0
          ? "Belum ada catatan. Tulis catatan pertamamu lewat form."
          : "Tidak ada catatan yang cocok dengan pencarian."
      }</li>`;
      return;
    }

    this.el.daftar.innerHTML = tampil
      .map((c) => {
        const { id, judul, matkul, isi, sematan, keteranganWaktu } = c;
        return `
          <li class="catatan ${sematan ? "sematan" : ""}">
            <div class="catatan-kepala">
              <h3>${sematan ? "📌 " : ""}${amankan(judul)}</h3>
              <span class="badge">${amankan(matkul)}</span>
            </div>
            <p class="catatan-isi">${amankan(isi)}</p>
            <p class="catatan-meta">${keteranganWaktu}</p>
            <div class="catatan-aksi">
              <button class="btn btn-kecil" data-aksi="sematan" data-id="${id}">
                ${sematan ? "Lepas sematan" : "Sematkan"}
              </button>
              <button class="btn btn-kecil" data-aksi="edit" data-id="${id}">Edit</button>
              <button class="btn btn-kecil btn-bahaya" data-aksi="hapus" data-id="${id}">Hapus</button>
            </div>
          </li>`;
      })
      .join("");
  }

  // ----- Jam dan sapaan -----
  perbaruiJam() {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    const sapaan =
      jam < 11 ? "pagi" : jam < 15 ? "siang" : jam < 18 ? "sore" : "malam";

    this.el.sapaan.textContent = `Selamat ${sapaan}, catatan kuliahmu siap`;
    this.el.waktu.textContent = sekarang.toLocaleString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  // ----- Fungsi asinkron (async/await + fetch) -----
  async muatCuaca() {
    try {
      const respons = await fetch(URL_CUACA);
      if (!respons.ok) throw new Error(`Status ${respons.status}`);
      const { current_weather: { temperature, windspeed, weathercode } } = await respons.json();

      this.el.cuacaSuhu.textContent = `${temperature}°C`;
      this.el.cuacaInfo.textContent =
        `${NAMA_CUACA[weathercode] ?? "Cuaca tidak dikenal"} · angin ${windspeed} km/jam`;
    } catch (error) {
      this.el.cuacaSuhu.textContent = "--";
      this.el.cuacaInfo.textContent = "Data cuaca tidak bisa dimuat. Periksa koneksi internet.";
    }
  }

  async muatKutipan() {
    this.el.kutipanTeks.textContent = "Memuat kutipan...";
    this.el.kutipanPenulis.textContent = "";
    try {
      const respons = await fetch(URL_KUTIPAN);
      if (!respons.ok) throw new Error(`Status ${respons.status}`);
      const { quote, author } = await respons.json();

      this.el.kutipanTeks.textContent = `"${quote}"`;
      this.el.kutipanPenulis.textContent = `- ${author}`;
    } catch (error) {
      this.el.kutipanTeks.textContent = "Kutipan tidak bisa dimuat saat ini.";
    }
  }
}

// ---------- Jalankan aplikasi ----------
const app = new DashboardApp();
app.init();