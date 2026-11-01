export interface WorkedExample {
  id: string
  level: 'Dasar' | 'Menengah' | 'HOTS / Soal Cerita'
  title: string
  question: string
  conceptKey: string
  diketahui: string
  ditanya: string
  rumus: string
  steps: string[]
  conclusion: string
}

export type WorkedExampleCategory =
  | 'bangun_datar'
  | 'bangun_ruang'
  | 'prisma'
  | 'lingkaran'
  | 'aritmatika'
  | 'pythagoras'

export const WORKED_EXAMPLES: Record<WorkedExampleCategory, WorkedExample[]> = {
  // =========================================================================
  // 1. BANGUN DATAR
  // =========================================================================
  bangun_datar: [
    {
      id: 'ex-bd-1',
      level: 'Dasar',
      title: 'Menghitung Keliling dan Luas Persegi Panjang',
      question:
        'Sebuah meja belajar berbentuk persegi panjang memiliki panjang 120 cm dan lebar 80 cm. Tentukan keliling dan luas permukaan meja belajar tersebut!',
      conceptKey:
        'Keliling adalah jumlah panjang seluruh sisi tepi, sedangkan luas adalah hasil kali panjang dengan lebar.',
      diketahui: 'Panjang (p) = 120 cm, Lebar (l) = 80 cm',
      ditanya: 'Keliling (K) dan Luas (L)',
      rumus: 'K = 2 × (p + l)  dan  L = p × l',
      steps: [
        'Hitung keliling meja: K = 2 × (120 + 80) = 2 × 200 = 400 cm.',
        'Hitung luas meja: L = 120 × 80 = 9.600 cm².',
      ],
      conclusion:
        'Jadi, keliling meja belajar tersebut adalah 400 cm dan luas permukaannya adalah 9.600 cm² (atau 0,96 m²).',
    },
    {
      id: 'ex-bd-2',
      level: 'Menengah',
      title: 'Luas Trapesium Sama Kaki dengan Teorema Pythagoras',
      question:
        'Sebuah trapesium sama kaki memiliki panjang sisi sejajar masing-masing 10 cm dan 22 cm. Jika panjang sisi miring (kaki trapesium) adalah 10 cm, hitunglah luas trapesium tersebut!',
      conceptKey:
        'Cari tinggi trapesium terlebih dahulu menggunakan teorema Pythagoras pada segitiga siku-siku di tepi trapesium.',
      diketahui: 'Sisi atas a = 10 cm, sisi bawah b = 22 cm, sisi miring c = 10 cm',
      ditanya: 'Tinggi (t) dan Luas trapesium (L)',
      rumus: 't = √(c² - x²)  dengan  x = (b - a) / 2, lalu  L = ½ × (a + b) × t',
      steps: [
        'Hitung alas segitiga tepi (x): x = (22 - 10) / 2 = 12 / 2 = 6 cm.',
        'Hitung tinggi trapesium dengan Pythagoras: t = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.',
        'Hitung luas trapesium: L = ½ × (10 + 22) × 8 = ½ × 32 × 8 = 16 × 8 = 128 cm².',
      ],
      conclusion: 'Jadi, tinggi trapesium adalah 8 cm dan luas trapesium tersebut adalah 128 cm².',
    },
    {
      id: 'ex-bd-3',
      level: 'HOTS / Soal Cerita',
      title: 'Biaya Pemasangan Rumput Taman Belah Ketupat',
      question:
        'Sebuah taman kota berbentuk belah ketupat memiliki panjang diagonal 16 meter dan 12 meter. Di seluruh permukaan taman akan ditanami rumput gajah mini dengan biaya Rp45.000,00 per meter persegi. Berapakah total biaya penanaman rumput tersebut?',
      conceptKey:
        'Luas belah ketupat dihitung dari setengah hasil kali kedua diagonalnya, lalu dikalikan tarif biaya per m².',
      diketahui: 'd₁ = 16 m, d₂ = 12 m, biaya per m² = Rp45.000,00',
      ditanya: 'Total biaya penanaman rumput taman',
      rumus: 'L = ½ × d₁ × d₂  dan  Total Biaya = Luas × Tarif per m²',
      steps: [
        'Hitung luas belah ketupat: L = ½ × 16 × 12 = 8 × 12 = 96 m².',
        'Hitung total biaya penanaman: Total = 96 × Rp45.000,00 = Rp4.320.000,00.',
      ],
      conclusion:
        'Jadi, luas taman kota adalah 96 m² dan total biaya yang diperlukan adalah Rp4.320.000,00.',
    },
  ],

  // =========================================================================
  // 2. BANGUN RUANG 3D
  // =========================================================================
  bangun_ruang: [
    {
      id: 'ex-br-1',
      level: 'Dasar',
      title: 'Volume dan Luas Permukaan Kubus & Balok',
      question:
        'Sebuah kotak perkakas berbentuk balok memiliki panjang 30 cm, lebar 20 cm, dan tinggi 15 cm. Berapakah volume kotak perkakas tersebut dan luas kertas kado yang dibutuhkan untuk membungkusnya?',
      conceptKey:
        'Volume balok adalah hasil kali ketiga dimensinya, sedangkan luas permukaan adalah jumlah luas 6 bidang sisinya.',
      diketahui: 'Panjang (p) = 30 cm, lebar (l) = 20 cm, tinggi (t) = 15 cm',
      ditanya: 'Volume (V) dan Luas Permukaan (LP)',
      rumus: 'V = p × l × t  dan  LP = 2 × (pl + pt + lt)',
      steps: [
        'Hitung volume balok: V = 30 × 20 × 15 = 600 × 15 = 9.000 cm³.',
        'Hitung luas permukaan balok: pl = 30 × 20 = 600; pt = 30 × 15 = 450; lt = 20 × 15 = 300.',
        'LP = 2 × (600 + 450 + 300) = 2 × 1.350 = 2.700 cm².',
      ],
      conclusion:
        'Jadi, volume kotak perkakas adalah 9.000 cm³ (9 liter) dan luas bahan pembungkus adalah 2.700 cm².',
    },
    {
      id: 'ex-br-2',
      level: 'Menengah',
      title: 'Luas Permukaan Limas Segiempat dengan Tinggi Sisi Tegak',
      question:
        'Sebuah monumen berbentuk limas segiempat memiliki alas persegi dengan panjang sisi 10 meter dan tinggi limas 12 meter. Tentukan luas seluruh permukaan monumen tersebut!',
      conceptKey:
        'Jangan salah mengalikan tinggi limas langsung ke segitiga sisi tegak! Cari dulu tinggi segitiga sisi tegak (tₛ) menggunakan teorema Pythagoras segitiga interior.',
      diketahui: 'Sisi alas s = 10 m, tinggi limas t = 12 m',
      ditanya: 'Luas Permukaan (LP = L_alas + 4 × L_segitiga)',
      rumus: 'tₛ = √(t² + (s/2)²)  lalu  LP = s² + 4 × (½ × s × tₛ)',
      steps: [
        'Tentukan setengah sisi alas: s/2 = 10 / 2 = 5 m.',
        'Hitung tinggi sisi tegak (tₛ) dengan Pythagoras: tₛ = √(12² + 5²) = √(144 + 25) = √169 = 13 m.',
        'Hitung luas alas persegi: L_alas = 10 × 10 = 100 m².',
        'Hitung luas 4 sisi tegak segitiga: 4 × (½ × 10 × 13) = 4 × 65 = 260 m².',
        'Hitung luas permukaan total: LP = 100 + 260 = 360 m².',
      ],
      conclusion: 'Jadi, luas seluruh permukaan monumen limas segiempat tersebut adalah 360 m².',
    },
    {
      id: 'ex-br-3',
      level: 'HOTS / Soal Cerita',
      title: 'Tenda Kerucut dan Garis Pelukis',
      question:
        'Sebuah tenda perkemahan berbentuk kerucut memiliki diameter alas 12 meter dan tinggi puncak 8 meter. Berapakah luas kain tenda yang dibutuhkan untuk membuat selimut tenda tersebut? (Gunakan π = 3,14)',
      conceptKey:
        'Kain tenda yang melingkar adalah selimut kerucut (L = π × r × s), dengan garis pelukis s dicari menggunakan Pythagoras jari-jari dan tinggi.',
      diketahui: 'Diameter d = 12 m → jari-jari r = 6 m, tinggi t = 8 m, π = 3,14',
      ditanya: 'Luas selimut kerucut (L_selimut)',
      rumus: 's = √(r² + t²)  lalu  L_selimut = π × r × s',
      steps: [
        'Hitung panjang garis pelukis (s): s = √(6² + 8²) = √(36 + 64) = √100 = 10 meter.',
        'Hitung luas selimut kerucut: L_selimut = 3,14 × 6 × 10 = 188,4 m².',
      ],
      conclusion: 'Jadi, luas kain tenda yang dibutuhkan untuk membuat selimut adalah 188,4 m².',
    },
  ],

  // =========================================================================
  // 3. PRISMA & TABUNG
  // =========================================================================
  prisma: [
    {
      id: 'ex-pr-1',
      level: 'Dasar',
      title: 'Volume Prisma Segitiga Siku-siku',
      question:
        'Sebuah potongan keju berbentuk prisma segitiga memiliki alas segitiga siku-siku dengan panjang sisi siku-sikunya 6 cm dan 8 cm. Jika tebal/tinggi prisma adalah 15 cm, tentukan volume potongan keju tersebut!',
      conceptKey:
        'Pada segitiga siku-siku, kedua sisi penyiku berperan sebagai alas dan tinggi segitiga.',
      diketahui: 'Alas segitiga a = 6 cm, tinggi segitiga t_alas = 8 cm, tinggi prisma t = 15 cm',
      ditanya: 'Volume prisma (V)',
      rumus: 'L_alas = ½ × a × t_alas  dan  V = L_alas × t',
      steps: [
        'Hitung luas alas segitiga siku-siku: L_alas = ½ × 6 × 8 = 24 cm².',
        'Hitung volume prisma: V = 24 × 15 = 360 cm³.',
      ],
      conclusion: 'Jadi, volume potongan keju berbentuk prisma segitiga tersebut adalah 360 cm³.',
    },
    {
      id: 'ex-pr-2',
      level: 'Menengah',
      title: 'Luas Permukaan Tabung Tertutup',
      question:
        'Sebuah kaleng cat tertutup berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 13 cm. Berapakah luas seluruh permukaan kaleng cat tersebut? (Gunakan π = 22/7)',
      conceptKey:
        'Tabung tertutup memiliki 2 bidang lingkaran (alas & tutup) dan 1 selimut persegi panjang: LP = 2πr(r + t).',
      diketahui: 'r = 7 cm, tinggi t = 13 cm, π = 22/7',
      ditanya: 'Luas permukaan tabung tertutup (LP)',
      rumus: 'LP = 2 × π × r × (r + t)',
      steps: [
        'Jumlahkan jari-jari dan tinggi: r + t = 7 + 13 = 20 cm.',
        'Substitusikan ke rumus luas permukaan: LP = 2 × (22/7) × 7 × 20.',
        'Sederhanakan pecahan: LP = 2 × 22 × 20 = 44 × 20 = 880 cm².',
      ],
      conclusion: 'Jadi, luas permukaan seluruh kaleng cat tertutup tersebut adalah 880 cm².',
    },
    {
      id: 'ex-pr-3',
      level: 'HOTS / Soal Cerita',
      title: 'Wadah Air Berbentuk Prisma Trapesium',
      question:
        'Sebuah bak penampungan air berbentuk prisma trapesium memiliki panjang sisi sejajar alas 120 cm dan 80 cm, serta tinggi trapesium 50 cm. Jika panjang bak (tinggi prisma) adalah 150 cm, berapa liter air maksimal yang dapat ditampung bak tersebut? (1 liter = 1.000 cm³)',
      conceptKey:
        'Cari luas penampang trapesium terlebih dahulu, kalikan dengan panjang bak, lalu konversi hasilnya ke liter.',
      diketahui: 'a = 120 cm, b = 80 cm, t_trapesium = 50 cm, panjang bak t_prisma = 150 cm',
      ditanya: 'Volume bak dalam satuan liter',
      rumus: 'L_trapesium = ½ × (a + b) × t_trapesium  lalu  V = L_trapesium × t_prisma',
      steps: [
        'Hitung luas penampang alas trapesium: L_alas = ½ × (120 + 80) × 50 = ½ × 200 × 50 = 100 × 50 = 5.000 cm².',
        'Hitung volume bak penampungan: V = 5.000 × 150 = 750.000 cm³.',
        'Konversikan satuan cm³ ke liter: 750.000 / 1.000 = 750 liter.',
      ],
      conclusion: 'Jadi, bak penampungan air tersebut dapat menampung maksimal 750 liter air.',
    },
  ],

  // =========================================================================
  // 4. LINGKARAN
  // =========================================================================
  lingkaran: [
    {
      id: 'ex-lk-1',
      level: 'Dasar',
      title: 'Panjang Busur Lingkaran',
      question:
        'Sebuah lingkaran memiliki jari-jari 14 cm dan sudut pusat sebesar 90°. Hitunglah panjang busur lingkaran yang terbentuk di hadapan sudut pusat tersebut! (Gunakan π = 22/7)',
      conceptKey:
        'Panjang busur sebanding dengan perbandingan sudut pusat terhadap satu putaran penuh 360° dikali keliling lingkaran.',
      diketahui: 'Jari-jari r = 14 cm, sudut pusat α = 90°, π = 22/7',
      ditanya: 'Panjang busur (P)',
      rumus: 'P = (α / 360°) × 2 × π × r',
      steps: [
        'Hitung pecahan sudut: 90° / 360° = ¼.',
        'Hitung keliling penuh: K = 2 × (22/7) × 14 = 88 cm.',
        'Hitung panjang busur: P = ¼ × 88 = 22 cm.',
      ],
      conclusion: 'Jadi, panjang busur lingkaran di hadapan sudut 90° tersebut adalah 22 cm.',
    },
    {
      id: 'ex-lk-2',
      level: 'Menengah',
      title: 'Luas Juring dan Tembereng Lingkaran Siku-siku',
      question:
        'Pada sebuah lingkaran dengan jari-jari 10 cm terdapat sudut pusat 90°. Hitunglah: (a) Luas juring lingkaran, dan (b) Luas tembereng di hadapan sudut tersebut! (Gunakan π = 3,14)',
      conceptKey:
        'Luas tembereng adalah selisih antara luas juring kipas lingkaran dengan luas segitiga di dalamnya: L_tembereng = L_juring - L_segitiga.',
      diketahui: 'Jari-jari r = 10 cm, sudut pusat α = 90°, π = 3,14',
      ditanya: 'Luas juring dan Luas tembereng',
      rumus: 'L_juring = (α / 360°) × π × r²  dan  L_tembereng = L_juring - (½ × r × r)',
      steps: [
        'Hitung luas juring: L_juring = (90° / 360°) × 3,14 × 10² = ¼ × 314 = 78,5 cm².',
        'Hitung luas segitiga siku-siku OAB: L_segitiga = ½ × 10 × 10 = 50 cm².',
        'Hitung luas tembereng: L_tembereng = 78,5 - 50 = 28,5 cm².',
      ],
      conclusion:
        'Jadi, luas juring lingkaran adalah 78,5 cm² dan luas temberengnya adalah 28,5 cm².',
    },
    {
      id: 'ex-lk-3',
      level: 'HOTS / Soal Cerita',
      title: 'Jarak Tempuh Roda Sepeda Berputar',
      question:
        'Sebuah sepeda memiliki roda dengan diameter 70 cm. Jika sepeda tersebut dikayuh sehingga rodanya berputar penuh sebanyak 500 kali di lintasan lurus, berapakah jarak total yang ditempuh sepeda dalam satuan meter? (Gunakan π = 22/7)',
      conceptKey:
        'Setiap 1 kali putaran penuh roda menempuh jarak sejauh 1 kali keliling lingkaran rodanya (Jarak = Banyak Putaran × Keliling).',
      diketahui: 'Diameter d = 70 cm → r = 35 cm, putaran n = 500 kali, π = 22/7',
      ditanya: 'Jarak total dalam meter',
      rumus: 'K = π × d  dan  Jarak = n × K',
      steps: [
        'Hitung keliling roda sepeda: K = (22/7) × 70 = 22 × 10 = 220 cm.',
        'Hitung jarak tempuh total: Jarak = 500 × 220 cm = 110.000 cm.',
        'Konversikan centimeter ke meter: 110.000 cm / 100 = 1.100 meter.',
      ],
      conclusion: 'Jadi, jarak total yang ditempuh sepeda setelah 500 putaran roda adalah 1.100 meter (1,1 km).',
    },
  ],

  // =========================================================================
  // 5. ARITMATIKA: POLA BILANGAN & BARISAN ARITMATIKA
  // =========================================================================
  aritmatika: [
    {
      id: 'ex-ar-1',
      level: 'Dasar',
      title: 'Menentukan Suku ke-n Barisan Aritmatika',
      question:
        'Diketahui barisan aritmatika: 7, 11, 15, 19, 23, ... Tentukanlah suku ke-25 (U₂₅) dari barisan tersebut!',
      conceptKey:
        'Identifikasi suku pertama (a) dan cari selisih tetap (b = U₂ - U₁), lalu masukkan ke rumus Uₙ = a + (n - 1)b.',
      diketahui: 'Suku pertama a = 7, beda b = 11 - 7 = 4, n = 25',
      ditanya: 'Suku ke-25 (U₂₅)',
      rumus: 'Uₙ = a + (n - 1)b',
      steps: [
        'Substitusikan nilai ke rumus: U₂₅ = 7 + (25 - 1) × 4.',
        'Hitung pengali: U₂₅ = 7 + 24 × 4.',
        'Lakukan perkalian lalu penjumlahan: U₂₅ = 7 + 96 = 103.',
      ],
      conclusion: 'Jadi, suku ke-25 dari barisan aritmatika tersebut adalah 103.',
    },
    {
      id: 'ex-ar-2',
      level: 'Menengah',
      title: 'Menemukan Rumus Barisan dari Dua Suku yang Diketahui',
      question:
        'Suatu barisan aritmatika diketahui memiliki suku ke-4 bernilai 17 dan suku ke-9 bernilai 37. Tentukan suku pertama (a), beda (b), dan suku ke-20 (U₂₀)!',
      conceptKey:
        'Eliminasi dua persamaan untuk mendapatkan beda b, lalu substitusi kembali untuk memperoleh suku pertama a.',
      diketahui: 'U₄ = a + 3b = 17  dan  U₉ = a + 8b = 37',
      ditanya: 'Nilai a, b, dan U₂₀',
      rumus: 'b = (U_m - U_n) / (m - n)  dan  Uₙ = a + (n - 1)b',
      steps: [
        'Kurangkan persamaan U₉ dengan U₄: (a + 8b) - (a + 3b) = 37 - 17 → 5b = 20 → b = 4.',
        'Substitusi nilai b ke persamaan U₄: a + 3(4) = 17 → a + 12 = 17 → a = 5.',
        'Hitung suku ke-20: U₂₀ = 5 + (20 - 1) × 4 = 5 + 19 × 4 = 5 + 76 = 81.',
      ],
      conclusion: 'Jadi, suku pertama a = 5, beda b = 4, dan suku ke-20 adalah 81.',
    },
    {
      id: 'ex-ar-3',
      level: 'HOTS / Soal Cerita',
      title: 'Kapasitas Tempat Duduk Gedung Bioskop',
      question:
        'Dalam suatu ruang bioskop, baris paling depan memiliki 16 kursi. Baris di belakangnya selalu memuat 3 kursi lebih banyak daripada baris di depannya. Jika bioskop tersebut memiliki total 15 baris kursi, berapakah jumlah seluruh kursi di dalam bioskop tersebut?',
      conceptKey:
        'Masalah ini merupakan penerapan deret aritmatika dengan suku pertama a = 16, beda b = 3, dan mencari S₁₅.',
      diketahui: 'a = 16, beda b = 3, banyak baris n = 15',
      ditanya: 'Jumlah seluruh kursi (S₁₅)',
      rumus: 'Sₙ = (n / 2) × [2a + (n - 1)b]',
      steps: [
        'Substitusikan nilai ke rumus deret: S₁₅ = (15 / 2) × [2(16) + (15 - 1)(3)].',
        'Hitung dalam tanda kurung siku: [32 + 14 × 3] = [32 + 42] = 74.',
        'Kalikan dengan n/2: S₁₅ = (15 / 2) × 74 = 15 × 37 = 555.',
      ],
      conclusion: 'Jadi, total seluruh kursi yang ada di dalam gedung bioskop tersebut adalah 555 kursi.',
    },
  ],

  // =========================================================================
  // 6. PYTHAGORAS & GEOMETRI
  // =========================================================================
  pythagoras: [
    {
      id: 'ex-py-1',
      level: 'Dasar',
      title: 'Menentukan Panjang Sisi Miring (Hipotenusa)',
      question:
        'Sebuah segitiga siku-siku memiliki panjang sisi penyiku masing-masing 9 cm dan 12 cm. Tentukan panjang sisi miringnya (hipotenusa)!',
      conceptKey:
        'Pada segitiga siku-siku, kuadrat sisi miring selalu sama dengan jumlah kuadrat kedua sisi siku-sikunya: c² = a² + b².',
      diketahui: 'Sisi siku-siku a = 9 cm, sisi siku-siku b = 12 cm',
      ditanya: 'Panjang sisi miring (c)',
      rumus: 'c = √(a² + b²)',
      steps: [
        'Hitung kuadrat sisi-sisi penyiku: a² = 9² = 81  dan  b² = 12² = 144.',
        'Jumlahkan kedua kuadrat: c² = 81 + 144 = 225.',
        'Tarik akar kuadrat: c = √225 = 15 cm.',
      ],
      conclusion: 'Jadi, panjang sisi miring segitiga siku-siku tersebut adalah 15 cm.',
    },
    {
      id: 'ex-py-2',
      level: 'Menengah',
      title: 'Menguji Jenis Segitiga (Kebalikan Pythagoras)',
      question:
        'Diketahui sebuah segitiga memiliki panjang sisi-sisi 7 cm, 9 cm, dan 12 cm. Berdasarkan panjang sisinya, apakah segitiga tersebut merupakan segitiga lancip, siku-siku, atau tumpul?',
      conceptKey:
        'Ambil sisi terpanjang sebagai c. Jika c² = a² + b² maka siku-siku, jika c² < a² + b² maka lancip, dan jika c² > a² + b² maka tumpul.',
      diketahui: 'a = 7 cm, b = 9 cm, sisi terpanjang c = 12 cm',
      ditanya: 'Jenis segitiga',
      rumus: 'Bandingkan c² dengan (a² + b²)',
      steps: [
        'Hitung jumlah kuadrat sisi pendek: a² + b² = 7² + 9² = 49 + 81 = 130.',
        'Hitung kuadrat sisi terpanjang: c² = 12² = 144.',
        'Bandingkan: 144 > 130, yang berarti c² > a² + b².',
      ],
      conclusion:
        'Karena kuadrat sisi terpanjang lebih besar dari jumlah kuadrat dua sisi lainnya (144 > 130), maka segitiga tersebut adalah Segitiga Tumpul.',
    },
    {
      id: 'ex-py-3',
      level: 'HOTS / Soal Cerita',
      title: 'Tangga Bersandar pada Tembok Rumah',
      question:
        'Sebuah tangga yang panjangnya 5 meter disandarkan pada dinding tembok sebuah rumah. Jika jarak ujung bawah tangga ke dinding tembok adalah 3 meter, berapakah tinggi ujung atas tangga dari permukaan tanah?',
      conceptKey:
        'Panjang tangga merupakan sisi miring (hipotenusa c), jarak ke dinding adalah sisi alas (a), dan tinggi dinding adalah sisi tegak (b).',
      diketahui: 'Panjang tangga c = 5 m, jarak dasar tangga ke dinding a = 3 m',
      ditanya: 'Tinggi ujung tangga di dinding (b)',
      rumus: 'b = √(c² - a²)',
      steps: [
        'Kuadratkan panjang tangga dan jarak alas: c² = 5² = 25  dan  a² = 3² = 9.',
        'Kurangkan kuadrat sisi miring dengan sisi alas: b² = 25 - 9 = 16.',
        'Tarik akar kuadrat: b = √16 = 4 meter.',
      ],
      conclusion:
        'Jadi, tinggi ujung atas tangga dari permukaan tanah adalah 4 meter (sesuai Triple Pythagoras 3-4-5).',
    },
  ],
}
