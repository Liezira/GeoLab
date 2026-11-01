import type { PrismShape } from '@/geometry/prism'

export type QuestionCategory =
  | 'bangun_datar'
  | 'bangun_ruang'
  | 'prisma'
  | 'lingkaran'
  | 'aritmatika'

export type QuestionType = 'single_choice' | 'true_false' | 'multi_select'
export type Difficulty = 'mudah' | 'sedang' | 'sulit'

export interface QuestionOption {
  id: string
  text: string
}

export interface QuestionStatement {
  id: string
  statement: string
  isCorrect: boolean
}

export interface QuestionExplanation {
  diketahui?: string
  ditanya?: string
  rumus?: string
  langkah: string[]
  kesimpulan: string
}

export interface Question3DConfig {
  type: 'solid' | 'prism'
  solidShape?: 'kubus' | 'balok' | 'limas_segiempat' | 'limas_segitiga' | 'kerucut' | 'bola'
  prismSides?: PrismShape
  dimA: number
  dimB?: number
  dimC?: number
  showInterior?: boolean
  showDiagonal?: boolean
  isHemisphere?: boolean
  labelAnnotation?: string
}

export interface Question {
  id: string
  category: QuestionCategory
  topicTitle: string
  difficulty: Difficulty
  type: QuestionType
  prompt: string
  contextNote?: string
  options?: QuestionOption[]
  statements?: QuestionStatement[]
  correctAnswer: string | string[] // 'A' | ['A', 'C']
  explanation: QuestionExplanation
  visual3d?: Question3DConfig
}

export const QUESTION_BANK: Question[] = [
  {
    "id": "bd-01",
    "category": "bangun_datar",
    "topicTitle": "Keliling & Luas Persegi",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah taman berbentuk persegi memiliki panjang sisi 14 meter. Berapakah luas taman tersebut?",
    "options": [
      {
        "id": "A",
        "text": "196 m²"
      },
      {
        "id": "B",
        "text": "56 m²"
      },
      {
        "id": "C",
        "text": "169 m²"
      },
      {
        "id": "D",
        "text": "216 m²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Panjang sisi persegi (s) = 14 m",
      "ditanya": "Luas persegi (L)",
      "rumus": "L = s × s = s²",
      "langkah": [
        "Substitusikan nilai s: L = 14 × 14",
        "Hitung hasil perkalian: 14² = 196"
      ],
      "kesimpulan": "Luas taman berbentuk persegi tersebut adalah 196 m²."
    }
  },
  {
    "id": "bd-02",
    "category": "bangun_datar",
    "topicTitle": "Keliling Persegi Panjang",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah lapangan berukuran panjang 25 meter dan lebar 15 meter. Seorang pelari mengelilingi lapangan tersebut sebanyak 2 putaran penuh. Berapakah jarak total yang ditempuh pelari?",
    "options": [
      {
        "id": "A",
        "text": "80 meter"
      },
      {
        "id": "B",
        "text": "160 meter"
      },
      {
        "id": "C",
        "text": "375 meter"
      },
      {
        "id": "D",
        "text": "750 meter"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Panjang (p) = 25 m, lebar (l) = 15 m, putaran = 2 kali",
      "ditanya": "Jarak total keliling 2 putaran",
      "rumus": "Keliling (K) = 2 × (p + l)",
      "langkah": [
        "K = 2 × (25 + 15) = 2 × 40 = 80 meter (1 putaran)",
        "Jarak total = 2 × 80 meter = 160 meter"
      ],
      "kesimpulan": "Jarak total yang ditempuh adalah 160 meter."
    }
  },
  {
    "id": "bd-03",
    "category": "bangun_datar",
    "topicTitle": "Luas Segitiga",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah segitiga memiliki panjang alas 18 cm dan tinggi 12 cm. Berapakah luas segitiga tersebut?",
    "options": [
      {
        "id": "A",
        "text": "72 cm²"
      },
      {
        "id": "B",
        "text": "216 cm²"
      },
      {
        "id": "C",
        "text": "108 cm²"
      },
      {
        "id": "D",
        "text": "144 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Alas (a) = 18 cm, tinggi (t) = 12 cm",
      "ditanya": "Luas segitiga (L)",
      "rumus": "L = ½ × a × t",
      "langkah": [
        "L = ½ × 18 × 12",
        "L = 9 × 12 = 108 cm²"
      ],
      "kesimpulan": "Luas segitiga tersebut adalah 108 cm²."
    }
  },
  {
    "id": "bd-04",
    "category": "bangun_datar",
    "topicTitle": "Luas Jajar Genjang",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Suatu jajar genjang memiliki panjang alas 16 cm dan sisi miring 10 cm. Jika tinggi yang tegak lurus alas adalah 8 cm, hitunglah luas jajar genjang tersebut!",
    "options": [
      {
        "id": "A",
        "text": "80 cm²"
      },
      {
        "id": "B",
        "text": "64 cm²"
      },
      {
        "id": "C",
        "text": "160 cm²"
      },
      {
        "id": "D",
        "text": "128 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Alas (a) = 16 cm, tinggi tegak lurus (t) = 8 cm, sisi miring (b) = 10 cm",
      "ditanya": "Luas jajar genjang (L)",
      "rumus": "L = a × t",
      "langkah": [
        "L = 16 × 8 = 128 cm²",
        "Catatan: sisi miring 10 cm tidak digunakan untuk mencari luas, melainkan untuk keliling."
      ],
      "kesimpulan": "Luas jajar genjang tersebut adalah 128 cm²."
    }
  },
  {
    "id": "bd-05",
    "category": "bangun_datar",
    "topicTitle": "Luas Belah Ketupat",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah belah ketupat memiliki panjang diagonal masing-masing 12 cm dan 16 cm. Berapakah luas belah ketupat tersebut?",
    "options": [
      {
        "id": "A",
        "text": "96 cm²"
      },
      {
        "id": "B",
        "text": "192 cm²"
      },
      {
        "id": "C",
        "text": "48 cm²"
      },
      {
        "id": "D",
        "text": "56 cm²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "d₁ = 12 cm, d₂ = 16 cm",
      "ditanya": "Luas belah ketupat (L)",
      "rumus": "L = ½ × d₁ × d₂",
      "langkah": [
        "L = ½ × 12 × 16",
        "L = 6 × 16 = 96 cm²"
      ],
      "kesimpulan": "Luas belah ketupat adalah 96 cm²."
    }
  },
  {
    "id": "bd-06",
    "category": "bangun_datar",
    "topicTitle": "Keliling Belah Ketupat & Pythagoras",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Sebuah belah ketupat memiliki panjang diagonal 12 cm dan 16 cm. Berapakah keliling belah ketupat tersebut?",
    "options": [
      {
        "id": "A",
        "text": "28 cm"
      },
      {
        "id": "B",
        "text": "40 cm"
      },
      {
        "id": "C",
        "text": "48 cm"
      },
      {
        "id": "D",
        "text": "52 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "d₁ = 12 cm (setengahnya 6 cm), d₂ = 16 cm (setengahnya 8 cm)",
      "ditanya": "Keliling belah ketupat (K = 4s)",
      "rumus": "s² = (½ d₁)² + (½ d₂)²",
      "langkah": [
        "s = √(6² + 8²) = √(36 + 64) = √100 = 10 cm",
        "Keliling = 4 × s = 4 × 10 = 40 cm"
      ],
      "kesimpulan": "Keliling belah ketupat adalah 40 cm."
    }
  },
  {
    "id": "bd-07",
    "category": "bangun_datar",
    "topicTitle": "Luas Layang-layang",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Luas layang-layang dengan panjang diagonal 14 cm dan 20 cm adalah...",
    "options": [
      {
        "id": "A",
        "text": "280 cm²"
      },
      {
        "id": "B",
        "text": "70 cm²"
      },
      {
        "id": "C",
        "text": "140 cm²"
      },
      {
        "id": "D",
        "text": "120 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "d₁ = 14 cm, d₂ = 20 cm",
      "ditanya": "Luas layang-layang",
      "rumus": "L = ½ × d₁ × d₂",
      "langkah": [
        "L = ½ × 14 × 20 = 7 × 20 = 140 cm²"
      ],
      "kesimpulan": "Luas layang-layang tersebut adalah 140 cm²."
    }
  },
  {
    "id": "bd-08",
    "category": "bangun_datar",
    "topicTitle": "Luas Trapesium",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah trapesium sama kaki memiliki panjang sisi sejajar 10 cm dan 18 cm. Jika tinggi trapesium 6 cm, berapakah luasnya?",
    "options": [
      {
        "id": "A",
        "text": "72 cm²"
      },
      {
        "id": "B",
        "text": "168 cm²"
      },
      {
        "id": "C",
        "text": "108 cm²"
      },
      {
        "id": "D",
        "text": "84 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Sisi sejajar a = 10 cm, b = 18 cm, tinggi t = 6 cm",
      "ditanya": "Luas trapesium (L)",
      "rumus": "L = ½ × (a + b) × t",
      "langkah": [
        "L = ½ × (10 + 18) × 6",
        "L = ½ × 28 × 6 = 14 × 6 = 84 cm²"
      ],
      "kesimpulan": "Luas trapesium tersebut adalah 84 cm²."
    }
  },
  {
    "id": "bd-09",
    "category": "bangun_datar",
    "topicTitle": "Keliling Trapesium Sama Kaki",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Trapesium sama kaki mempunyai sisi sejajar 12 cm dan 20 cm serta tinggi 3 cm. Berapakah keliling trapesium tersebut?",
    "options": [
      {
        "id": "A",
        "text": "42 cm"
      },
      {
        "id": "B",
        "text": "40 cm"
      },
      {
        "id": "C",
        "text": "48 cm"
      },
      {
        "id": "D",
        "text": "38 cm"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "a = 12 cm, b = 20 cm, t = 3 cm",
      "ditanya": "Keliling trapesium (K = a + b + 2 × kaki)",
      "rumus": "kaki = √(t² + ((b - a)/2)²)",
      "langkah": [
        "Selisih separuh alas = (20 - 12) / 2 = 4 cm",
        "Panjang kaki = √(3² + 4²) = √(9 + 16) = √25 = 5 cm",
        "Keliling = 12 + 20 + 2(5) = 32 + 10 = 42 cm"
      ],
      "kesimpulan": "Keliling trapesium sama kaki tersebut adalah 42 cm."
    }
  },
  {
    "id": "bd-10",
    "category": "bangun_datar",
    "topicTitle": "Teorema Pythagoras Sisi Miring",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 9 cm dan 12 cm. Berapakah panjang sisi miringnya (hipotenusa)?",
    "options": [
      {
        "id": "A",
        "text": "16 cm"
      },
      {
        "id": "B",
        "text": "15 cm"
      },
      {
        "id": "C",
        "text": "21 cm"
      },
      {
        "id": "D",
        "text": "18 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "a = 9 cm, b = 12 cm",
      "ditanya": "Sisi miring c",
      "rumus": "c² = a² + b²",
      "langkah": [
        "c² = 9² + 12² = 81 + 144 = 225",
        "c = √225 = 15 cm"
      ],
      "kesimpulan": "Panjang sisi miring segitiga siku-siku adalah 15 cm."
    }
  },
  {
    "id": "bd-11",
    "category": "bangun_datar",
    "topicTitle": "Triple Pythagoras",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Di antara kelompok ukuran panjang berikut, manakah yang merupakan kelompok Triple Pythagoras?",
    "options": [
      {
        "id": "A",
        "text": "6 cm, 8 cm, 12 cm"
      },
      {
        "id": "B",
        "text": "8 cm, 15 cm, 19 cm"
      },
      {
        "id": "C",
        "text": "7 cm, 24 cm, 25 cm"
      },
      {
        "id": "D",
        "text": "9 cm, 12 cm, 17 cm"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Ukuran segitiga",
      "ditanya": "Kelompok yang memenuhi c² = a² + b²",
      "rumus": "a² + b² = c²",
      "langkah": [
        "Uji B: 7² + 24² = 49 + 576 = 625",
        "25² = 625 (Sama persis, Triple Pythagoras sah)"
      ],
      "kesimpulan": "Kelompok 7, 24, 25 adalah Triple Pythagoras."
    }
  },
  {
    "id": "bd-12",
    "category": "bangun_datar",
    "topicTitle": "Identifikasi Jenis Segitiga",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah segitiga mempunyai panjang sisi 6 cm, 8 cm, dan 11 cm. Berdasarkan panjang sisinya, jenis segitiga tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "Segitiga siku-siku"
      },
      {
        "id": "B",
        "text": "Segitiga lancip"
      },
      {
        "id": "C",
        "text": "Segitiga sama kaki"
      },
      {
        "id": "D",
        "text": "Segitiga tumpul"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "a = 6, b = 8, c = 11 (sisi terpanjang)",
      "ditanya": "Jenis segitiga berdasarkan hubungan kuadrat sisi",
      "rumus": "Bandingkan c² dengan (a² + b²)",
      "langkah": [
        "a² + b² = 6² + 8² = 36 + 64 = 100",
        "c² = 11² = 121",
        "Karena c² > a² + b² (121 > 100), maka segitiga berbentuk tumpul."
      ],
      "kesimpulan": "Segitiga tersebut adalah segitiga tumpul."
    }
  },
  {
    "id": "bd-13",
    "category": "bangun_datar",
    "topicTitle": "Sudut Berpelurus & Berpenyiku",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Besar suatu sudut adalah 35°. Berapakah besar sudut pelurus dari sudut tersebut?",
    "options": [
      {
        "id": "A",
        "text": "145°"
      },
      {
        "id": "B",
        "text": "55°"
      },
      {
        "id": "C",
        "text": "65°"
      },
      {
        "id": "D",
        "text": "155°"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Sudut awal = 35°",
      "ditanya": "Besar sudut pelurus (suplemen)",
      "rumus": "Sudut pelurus = 180° - sudut awal",
      "langkah": [
        "Sudut pelurus = 180° - 35° = 145°"
      ],
      "kesimpulan": "Besar sudut pelurusnya adalah 145°."
    }
  },
  {
    "id": "bd-14",
    "category": "bangun_datar",
    "topicTitle": "Sudut Sehadap & Berseberangan",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Dua garis sejajar dipotong oleh sebuah garis transversal. Jika salah satu sudut luar berseberangan besarnya (3x + 15)° dan pasangannya adalah 75°, berapakah nilai x?",
    "options": [
      {
        "id": "A",
        "text": "15"
      },
      {
        "id": "B",
        "text": "20"
      },
      {
        "id": "C",
        "text": "25"
      },
      {
        "id": "D",
        "text": "30"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Sudut luar berseberangan besarnya sama: (3x + 15)° = 75°",
      "ditanya": "Nilai x",
      "rumus": "3x + 15 = 75",
      "langkah": [
        "3x = 75 - 15",
        "3x = 60",
        "x = 60 / 3 = 20"
      ],
      "kesimpulan": "Nilai x adalah 20."
    }
  },
  {
    "id": "bd-15",
    "category": "bangun_datar",
    "topicTitle": "Luas Bangun Gabungan",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah bangun datar tersusun dari sebuah persegi panjang berukuran 10 cm × 6 cm dan segitiga sama kaki di atasnya dengan alas 10 cm dan tinggi 4 cm. Berapakah luas gabungan bangun tersebut?",
    "options": [
      {
        "id": "A",
        "text": "70 cm²"
      },
      {
        "id": "B",
        "text": "100 cm²"
      },
      {
        "id": "C",
        "text": "80 cm²"
      },
      {
        "id": "D",
        "text": "90 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "L_persegi_panjang = 10 × 6, L_segitiga = ½ × 10 × 4",
      "ditanya": "Luas gabungan bangun",
      "rumus": "L_total = L_persegi_panjang + L_segitiga",
      "langkah": [
        "L_persegi_panjang = 60 cm²",
        "L_segitiga = ½ × 10 × 4 = 20 cm²",
        "L_total = 60 + 20 = 80 cm²"
      ],
      "kesimpulan": "Luas gabungan bangun adalah 80 cm²."
    }
  },
  {
    "id": "bd-16",
    "category": "bangun_datar",
    "topicTitle": "Diagonal Persegi Panjang",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Panjang diagonal suatu persegi panjang yang berukuran 16 cm × 12 cm adalah...",
    "options": [
      {
        "id": "A",
        "text": "18 cm"
      },
      {
        "id": "B",
        "text": "28 cm"
      },
      {
        "id": "C",
        "text": "24 cm"
      },
      {
        "id": "D",
        "text": "20 cm"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "p = 16 cm, l = 12 cm",
      "ditanya": "Panjang diagonal (d)",
      "rumus": "d = √(p² + l²)",
      "langkah": [
        "d = √(16² + 12²) = √(256 + 144) = √400 = 20 cm"
      ],
      "kesimpulan": "Panjang diagonal persegi panjang adalah 20 cm."
    }
  },
  {
    "id": "bd-17",
    "category": "bangun_datar",
    "topicTitle": "Sifat Simetri Bangun Datar",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Bangun datar berikut yang memiliki 2 simetri lipat dan 2 simetri putar adalah...",
    "options": [
      {
        "id": "A",
        "text": "Persegi Panjang"
      },
      {
        "id": "B",
        "text": "Persegi"
      },
      {
        "id": "C",
        "text": "Jajar Genjang"
      },
      {
        "id": "D",
        "text": "Segitiga Sama Kaki"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Sifat simetri bangun datar",
      "ditanya": "Bangun dengan 2 simetri lipat dan 2 simetri putar",
      "rumus": "Analisis geometri simetri",
      "langkah": [
        "Persegi: 4 simetri lipat, 4 simetri putar",
        "Persegi panjang: 2 simetri lipat, 2 simetri putar (Tepat)",
        "Jajar genjang: 0 simetri lipat, 2 simetri putar"
      ],
      "kesimpulan": "Bangun tersebut adalah Persegi Panjang."
    }
  },
  {
    "id": "bd-18",
    "category": "bangun_datar",
    "topicTitle": "Analisis Sifat Segiempat (Benar/Salah)",
    "difficulty": "sedang",
    "type": "true_false",
    "prompt": "Tentukan kebenaran dari setiap pernyataan mengenai bangun datar segiempat berikut!",
    "statements": [
      {
        "id": "s1",
        "statement": "Semua persegi sudah pasti merupakan persegi panjang.",
        "isCorrect": true
      },
      {
        "id": "s2",
        "statement": "Kedua diagonal pada jajar genjang selalu berpotongan saling tegak lurus.",
        "isCorrect": false
      },
      {
        "id": "s3",
        "statement": "Belah ketupat memiliki 4 sisi sama panjang dan diagonalnya berpotongan tegak lurus.",
        "isCorrect": true
      }
    ],
    "correctAnswer": [
      "true",
      "false",
      "true"
    ],
    "explanation": {
      "diketahui": "3 pernyataan sifat segiempat",
      "ditanya": "Verifikasi Benar/Salah",
      "rumus": "Definisi aksioma geometri segiempat",
      "langkah": [
        "Pernyataan 1 BENAR: Persegi memenuhi semua sifat persegi panjang.",
        "Pernyataan 2 SALAH: Diagonal jajar genjang hanya membagi dua sama panjang, tidak harus tegak lurus kecuali pada belah ketupat.",
        "Pernyataan 3 BENAR: Belah ketupat memiliki 4 sisi sama panjang dan diagonal tegak lurus."
      ],
      "kesimpulan": "Urutan jawaban yang tepat adalah Benar, Salah, Benar."
    }
  },
  {
    "id": "bd-19",
    "category": "bangun_datar",
    "topicTitle": "Karakteristik Belah Ketupat (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Pilihlah DUA atau TIGA pernyataan di bawah ini yang merupakan sifat pasti dari bangun BELAH KETUPAT!",
    "options": [
      {
        "id": "A",
        "text": "Keempat sisinya sama panjang"
      },
      {
        "id": "B",
        "text": "Kedua diagonalnya berpotongan saling tegak lurus"
      },
      {
        "id": "C",
        "text": "Keempat sudutnya selalu berupa sudut siku-siku (90°)"
      },
      {
        "id": "D",
        "text": "Sudut-sudut yang berhadapan sama besar"
      }
    ],
    "correctAnswer": [
      "A",
      "B",
      "D"
    ],
    "explanation": {
      "diketahui": "Sifat-sifat belah ketupat",
      "ditanya": "Pernyataan yang benar",
      "rumus": "Aksioma sifat belah ketupat",
      "langkah": [
        "A benar: 4 sisi selalu sama panjang.",
        "B benar: diagonal saling membagi dua dan berpotongan tegak lurus (90°).",
        "C salah: hanya persegi yang keempat sudutnya 90°. Belah ketupat umum sudutnya lancip dan tumpul.",
        "D benar: sudut yang berhadapan berukuran sama besar."
      ],
      "kesimpulan": "Opsi yang benar adalah A, B, dan D."
    }
  },
  {
    "id": "bd-20",
    "category": "bangun_datar",
    "topicTitle": "Triple Pythagoras Identifikasi (Pilihan Kompleks)",
    "difficulty": "sulit",
    "type": "multi_select",
    "prompt": "Pilihlah DUA kelompok bilangan di bawah ini yang membentuk segitiga siku-siku (Triple Pythagoras)!",
    "options": [
      {
        "id": "A",
        "text": "5, 12, 13"
      },
      {
        "id": "B",
        "text": "6, 8, 11"
      },
      {
        "id": "C",
        "text": "8, 15, 17"
      },
      {
        "id": "D",
        "text": "10, 20, 25"
      }
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": {
      "diketahui": "Pilihan kelompok 3 bilangan",
      "ditanya": "Kelompok yang memenuhi c² = a² + b²",
      "rumus": "Teorema Pythagoras c² = a² + b²",
      "langkah": [
        "Uji A: 5² + 12² = 25 + 144 = 169 = 13² (Triple Pythagoras valid)",
        "Uji B: 6² + 8² = 100 ≠ 121 (Bukan siku-siku)",
        "Uji C: 8² + 15² = 64 + 225 = 289 = 17² (Triple Pythagoras valid)",
        "Uji D: 10² + 20² = 100 + 400 = 500 ≠ 625 (Bukan)"
      ],
      "kesimpulan": "Opsi yang benar adalah A dan C."
    }
  },
  {
    "id": "br-01",
    "category": "bangun_ruang",
    "topicTitle": "Volume Kubus",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah wadah berbentuk kubus memiliki panjang rusuk 8 cm. Berapakah volume wadah tersebut?",
    "options": [
      {
        "id": "A",
        "text": "64 cm³"
      },
      {
        "id": "B",
        "text": "512 cm³"
      },
      {
        "id": "C",
        "text": "384 cm³"
      },
      {
        "id": "D",
        "text": "256 cm³"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Rusuk kubus (s) = 8 cm",
      "ditanya": "Volume kubus (V)",
      "rumus": "V = s³ = s × s × s",
      "langkah": [
        "V = 8 × 8 × 8 = 64 × 8 = 512 cm³"
      ],
      "kesimpulan": "Volume wadah kubus tersebut adalah 512 cm³."
    }
  },
  {
    "id": "br-02",
    "category": "bangun_ruang",
    "topicTitle": "Luas Permukaan Kubus",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Luas permukaan sebuah kotak kado berbentuk kubus dengan rusuk 10 cm adalah...",
    "options": [
      {
        "id": "A",
        "text": "400 cm²"
      },
      {
        "id": "B",
        "text": "1.000 cm²"
      },
      {
        "id": "C",
        "text": "600 cm²"
      },
      {
        "id": "D",
        "text": "100 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "s = 10 cm, kubus memiliki 6 sisi persegi kongruen",
      "ditanya": "Luas permukaan (LP)",
      "rumus": "LP = 6 × s²",
      "langkah": [
        "LP = 6 × 10² = 6 × 100 = 600 cm²"
      ],
      "kesimpulan": "Luas permukaan kotak kado tersebut adalah 600 cm²."
    }
  },
  {
    "id": "br-03",
    "category": "bangun_ruang",
    "topicTitle": "Volume Balok",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah akuarium berbentuk balok memiliki ukuran panjang 60 cm, lebar 40 cm, dan tinggi 50 cm. Berapakah volume akuarium tersebut dalam satuan liter?",
    "options": [
      {
        "id": "A",
        "text": "12 liter"
      },
      {
        "id": "B",
        "text": "1.200 liter"
      },
      {
        "id": "C",
        "text": "150 liter"
      },
      {
        "id": "D",
        "text": "120 liter"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "p = 60 cm, l = 40 cm, t = 50 cm (1 liter = 1.000 cm³)",
      "ditanya": "Volume dalam liter",
      "rumus": "V = p × l × t",
      "langkah": [
        "V = 60 × 40 × 50 = 120.000 cm³",
        "Konversi ke liter = 120.000 / 1.000 = 120 liter"
      ],
      "kesimpulan": "Volume akuarium tersebut adalah 120 liter."
    }
  },
  {
    "id": "br-04",
    "category": "bangun_ruang",
    "topicTitle": "Luas Permukaan Balok",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah balok memiliki ukuran panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Hitunglah luas permukaan balok tersebut!",
    "options": [
      {
        "id": "A",
        "text": "392 cm²"
      },
      {
        "id": "B",
        "text": "480 cm²"
      },
      {
        "id": "C",
        "text": "196 cm²"
      },
      {
        "id": "D",
        "text": "240 cm²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "p = 12 cm, l = 8 cm, t = 5 cm",
      "ditanya": "Luas permukaan balok (LP)",
      "rumus": "LP = 2(pl + pt + lt)",
      "langkah": [
        "pl = 12 × 8 = 96",
        "pt = 12 × 5 = 60",
        "lt = 8 × 5 = 40",
        "LP = 2 × (96 + 60 + 40) = 2 × 196 = 392 cm²"
      ],
      "kesimpulan": "Luas permukaan balok adalah 392 cm²."
    }
  },
  {
    "id": "br-05",
    "category": "bangun_ruang",
    "topicTitle": "Diagonal Ruang Balok",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Panjang diagonal ruang balok yang berukuran 12 cm × 4 cm × 3 cm adalah...",
    "options": [
      {
        "id": "A",
        "text": "15 cm"
      },
      {
        "id": "B",
        "text": "13 cm"
      },
      {
        "id": "C",
        "text": "17 cm"
      },
      {
        "id": "D",
        "text": "19 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "p = 12, l = 4, t = 3",
      "ditanya": "Panjang diagonal ruang (d)",
      "rumus": "d = √(p² + l² + t²)",
      "langkah": [
        "d = √(12² + 4² + 3²) = √(144 + 16 + 9) = √169 = 13 cm"
      ],
      "kesimpulan": "Panjang diagonal ruang balok adalah 13 cm."
    }
  },
  {
    "id": "br-06",
    "category": "bangun_ruang",
    "topicTitle": "Volume Limas Segiempat",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah limas memiliki alas berbentuk persegi dengan panjang sisi 10 cm. Jika tinggi limas 12 cm, berapakah volumenya?",
    "options": [
      {
        "id": "A",
        "text": "1.200 cm³"
      },
      {
        "id": "B",
        "text": "600 cm³"
      },
      {
        "id": "C",
        "text": "400 cm³"
      },
      {
        "id": "D",
        "text": "800 cm³"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Alas persegi s = 10 cm, tinggi t = 12 cm",
      "ditanya": "Volume limas (V)",
      "rumus": "V = ⅓ × Luas Alas × tinggi",
      "langkah": [
        "Luas alas = 10 × 10 = 100 cm²",
        "V = ⅓ × 100 × 12 = 100 × 4 = 400 cm³"
      ],
      "kesimpulan": "Volume limas segiempat tersebut adalah 400 cm³."
    }
  },
  {
    "id": "br-07",
    "category": "bangun_ruang",
    "topicTitle": "Luas Permukaan Limas Segiempat",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Sebuah limas dengan alas persegi berukuran 10 cm memiliki tinggi limas 12 cm. Berapakah luas permukaan limas tersebut?",
    "options": [
      {
        "id": "A",
        "text": "260 cm²"
      },
      {
        "id": "B",
        "text": "340 cm²"
      },
      {
        "id": "C",
        "text": "480 cm²"
      },
      {
        "id": "D",
        "text": "360 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Alas s = 10 cm, tinggi limas t = 12 cm",
      "ditanya": "Luas permukaan (LP = L_alas + 4 × L_segitiga)",
      "rumus": "t_segitiga = √(t² + (s/2)²)",
      "langkah": [
        "t_segitiga = √(12² + 5²) = √(144 + 25) = √169 = 13 cm",
        "Luas alas = 10 × 10 = 100 cm²",
        "Luas 4 sisi tegak = 4 × (½ × 10 × 13) = 4 × 65 = 260 cm²",
        "LP = 100 + 260 = 360 cm²"
      ],
      "kesimpulan": "Luas permukaan limas adalah 360 cm²."
    }
  },
  {
    "id": "br-08",
    "category": "bangun_ruang",
    "topicTitle": "Unsur-unsur Limas",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Banyaknya rusuk dan titik sudut pada sebuah limas segi lima berturut-turut adalah...",
    "options": [
      {
        "id": "A",
        "text": "10 rusuk dan 6 titik sudut"
      },
      {
        "id": "B",
        "text": "15 rusuk dan 7 titik sudut"
      },
      {
        "id": "C",
        "text": "10 rusuk dan 5 titik sudut"
      },
      {
        "id": "D",
        "text": "12 rusuk dan 6 titik sudut"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Limas segi-n dengan n = 5",
      "ditanya": "Jumlah rusuk dan titik sudut",
      "rumus": "Rusuk = 2n, Titik sudut = n + 1",
      "langkah": [
        "Rusuk = 2 × 5 = 10 (5 rusuk alas + 5 rusuk tegak)",
        "Titik sudut = 5 + 1 = 6 (5 titik sudut alas + 1 titik puncak)"
      ],
      "kesimpulan": "Limas segi lima memiliki 10 rusuk dan 6 titik sudut."
    }
  },
  {
    "id": "br-09",
    "category": "bangun_ruang",
    "topicTitle": "Volume Kerucut",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah kerucut memiliki jari-jari alas 7 cm dan tinggi 12 cm. Jika π = 22/7, berapakah volume kerucut tersebut?",
    "options": [
      {
        "id": "A",
        "text": "1.848 cm³"
      },
      {
        "id": "B",
        "text": "616 cm³"
      },
      {
        "id": "C",
        "text": "308 cm³"
      },
      {
        "id": "D",
        "text": "924 cm³"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "r = 7 cm, t = 12 cm, π = 22/7",
      "ditanya": "Volume kerucut (V)",
      "rumus": "V = ⅓ × π × r² × t",
      "langkah": [
        "V = ⅓ × (22/7) × 7 × 7 × 12",
        "V = ⅓ × 154 × 12 = 154 × 4 = 616 cm³"
      ],
      "kesimpulan": "Volume kerucut adalah 616 cm³."
    }
  },
  {
    "id": "br-10",
    "category": "bangun_ruang",
    "topicTitle": "Luas Selimut Kerucut",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Jari-jari alas sebuah kerucut adalah 6 cm dan tingginya 8 cm. Luas selimut kerucut tersebut adalah... (gunakan π = 3,14)",
    "options": [
      {
        "id": "A",
        "text": "150,72 cm²"
      },
      {
        "id": "B",
        "text": "301,44 cm²"
      },
      {
        "id": "C",
        "text": "188,4 cm²"
      },
      {
        "id": "D",
        "text": "376,8 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "r = 6 cm, t = 8 cm, π = 3,14",
      "ditanya": "Luas selimut kerucut (L_selimut = π × r × s)",
      "rumus": "s = √(r² + t²)",
      "langkah": [
        "s = √(6² + 8²) = √(36 + 64) = √100 = 10 cm",
        "L_selimut = 3,14 × 6 × 10 = 188,4 cm²"
      ],
      "kesimpulan": "Luas selimut kerucut adalah 188,4 cm²."
    }
  },
  {
    "id": "br-11",
    "category": "bangun_ruang",
    "topicTitle": "Volume Bola",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah bola basket memiliki jari-jari 21 cm. Volume bola tersebut adalah... (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "9.702 cm³"
      },
      {
        "id": "B",
        "text": "19.404 cm³"
      },
      {
        "id": "C",
        "text": "29.106 cm³"
      },
      {
        "id": "D",
        "text": "38.808 cm³"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "r = 21 cm, π = 22/7",
      "ditanya": "Volume bola (V)",
      "rumus": "V = ⁴⁄₃ × π × r³",
      "langkah": [
        "V = ⁴⁄₃ × (22/7) × 21 × 21 × 21",
        "V = ⁴⁄₃ × 22 × 3 × 441 = 4 × 22 × 441 = 88 × 441 = 38.808 cm³"
      ],
      "kesimpulan": "Volume bola basket adalah 38.808 cm³."
    }
  },
  {
    "id": "br-12",
    "category": "bangun_ruang",
    "topicTitle": "Luas Permukaan Bola",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Luas permukaan bola yang berdiameter 14 cm adalah... (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "616 cm²"
      },
      {
        "id": "B",
        "text": "308 cm²"
      },
      {
        "id": "C",
        "text": "1.232 cm²"
      },
      {
        "id": "D",
        "text": "154 cm²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "d = 14 cm → r = 7 cm, π = 22/7",
      "ditanya": "Luas permukaan bola (LP)",
      "rumus": "LP = 4 × π × r²",
      "langkah": [
        "LP = 4 × (22/7) × 7 × 7 = 4 × 154 = 616 cm²"
      ],
      "kesimpulan": "Luas permukaan bola tersebut adalah 616 cm²."
    }
  },
  {
    "id": "br-13",
    "category": "bangun_ruang",
    "topicTitle": "Luas Belahan Bola Padat",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Sebuah semangka berbentuk belahan setengah bola padat memiliki jari-jari 10 cm. Luas permukaan seluruhnya adalah... (π = 3,14)",
    "options": [
      {
        "id": "A",
        "text": "628 cm²"
      },
      {
        "id": "B",
        "text": "942 cm²"
      },
      {
        "id": "C",
        "text": "1.256 cm²"
      },
      {
        "id": "D",
        "text": "314 cm²"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "r = 10 cm, belahan setengah bola padat",
      "ditanya": "Luas permukaan total (LP)",
      "rumus": "LP = Luas lengkung ½ bola + Luas lingkaran alas = 2πr² + πr² = 3πr²",
      "langkah": [
        "LP = 3 × 3,14 × 10² = 3 × 314 = 942 cm²"
      ],
      "kesimpulan": "Luas permukaan setengah bola padat tersebut adalah 942 cm²."
    }
  },
  {
    "id": "br-14",
    "category": "bangun_ruang",
    "topicTitle": "Perbandingan Volume Bangun Ruang",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Sebuah tabung dan sebuah kerucut memiliki jari-jari alas dan tinggi yang sama persis. Jika volume tabung 750 cm³, berapakah volume kerucut?",
    "options": [
      {
        "id": "A",
        "text": "500 cm³"
      },
      {
        "id": "B",
        "text": "375 cm³"
      },
      {
        "id": "C",
        "text": "250 cm³"
      },
      {
        "id": "D",
        "text": "150 cm³"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "V_tabung = 750 cm³, r dan t sama",
      "ditanya": "Volume kerucut",
      "rumus": "V_kerucut = ⅓ × V_tabung",
      "langkah": [
        "V_kerucut = ⅓ × 750 cm³ = 250 cm³"
      ],
      "kesimpulan": "Volume kerucut adalah 250 cm³ (sepertiga dari volume tabung)."
    }
  },
  {
    "id": "br-15",
    "category": "bangun_ruang",
    "topicTitle": "Kawat Kerangka Balok",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Disediakan kawat sepanjang 2 meter. Kawat tersebut akan dibuat sebuah kerangka balok berukuran 18 cm × 12 cm × 10 cm. Sisa kawat yang tidak terpakai adalah...",
    "options": [
      {
        "id": "A",
        "text": "160 cm"
      },
      {
        "id": "B",
        "text": "60 cm"
      },
      {
        "id": "C",
        "text": "80 cm"
      },
      {
        "id": "D",
        "text": "40 cm"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Panjang kawat = 2 m = 200 cm, p = 18, l = 12, t = 10",
      "ditanya": "Sisa kawat",
      "rumus": "Panjang kerangka = 4 × (p + l + t)",
      "langkah": [
        "Kawat terpakai = 4 × (18 + 12 + 10) = 4 × 40 = 160 cm",
        "Sisa kawat = 200 - 160 = 40 cm"
      ],
      "kesimpulan": "Sisa kawat yang tidak terpakai adalah 40 cm."
    }
  },
  {
    "id": "br-16",
    "category": "bangun_ruang",
    "topicTitle": "Jaring-jaring Kubus",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah jaring-jaring kubus terdiri dari 6 bujur sangkar. Jika sisi bernomor 2 adalah alas kubus, maka sisi yang menjadi tutup kubus adalah sisi yang...",
    "options": [
      {
        "id": "A",
        "text": "Berhadapan sejajar dengan sisi 2"
      },
      {
        "id": "B",
        "text": "Bersebelahan langsung dengan sisi 2"
      },
      {
        "id": "C",
        "text": "Berada di sudut terjauh jaring-jaring"
      },
      {
        "id": "D",
        "text": "Memiliki luas lebih besar"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Kubus dengan sisi alas",
      "ditanya": "Sisi yang menjadi tutup",
      "rumus": "Konsep pasangan sisi sejajar",
      "langkah": [
        "Pada kubus yang terbentuk sempurna, sisi tutup selalu berada tepat berhadapan sejajar dengan sisi alas."
      ],
      "kesimpulan": "Sisi tutup harus berhadapan sejajar dengan alas kubus."
    }
  },
  {
    "id": "br-17",
    "category": "bangun_ruang",
    "topicTitle": "Volume Kubus dari Luas Permukaan",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Luas permukaan sebuah kubus adalah 294 cm². Berapakah volume kubus tersebut?",
    "options": [
      {
        "id": "A",
        "text": "216 cm³"
      },
      {
        "id": "B",
        "text": "343 cm³"
      },
      {
        "id": "C",
        "text": "512 cm³"
      },
      {
        "id": "D",
        "text": "729 cm³"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "LP = 294 cm²",
      "ditanya": "Volume kubus",
      "rumus": "LP = 6s² → s = √(LP/6)",
      "langkah": [
        "s² = 294 / 6 = 49 → s = √49 = 7 cm",
        "V = s³ = 7³ = 343 cm³"
      ],
      "kesimpulan": "Volume kubus tersebut adalah 343 cm³."
    }
  },
  {
    "id": "br-18",
    "category": "bangun_ruang",
    "topicTitle": "Sifat-sifat Bangun Ruang (Benar/Salah)",
    "difficulty": "sedang",
    "type": "true_false",
    "prompt": "Tentukan kebenaran dari pernyataan-pernyataan mengenai sifat bangun ruang berikut!",
    "statements": [
      {
        "id": "s1",
        "statement": "Balok memiliki 12 rusuk yang terbagi menjadi 3 kelompok panjang rusuk yang sama.",
        "isCorrect": true
      },
      {
        "id": "s2",
        "statement": "Kerucut memiliki 2 titik sudut dan 2 rusuk lurus.",
        "isCorrect": false
      },
      {
        "id": "s3",
        "statement": "Bola merupakan bangun ruang yang tidak memiliki rusuk dan titik sudut sama sekali.",
        "isCorrect": true
      }
    ],
    "correctAnswer": [
      "true",
      "false",
      "true"
    ],
    "explanation": {
      "diketahui": "3 pernyataan bangun ruang",
      "ditanya": "Verifikasi Benar/Salah",
      "rumus": "Aksioma bangun ruang",
      "langkah": [
        "Pernyataan 1 BENAR: Balok memiliki 4 panjang, 4 lebar, dan 4 tinggi.",
        "Pernyataan 2 SALAH: Kerucut hanya punya 1 titik puncak (bukan sudut) dan 1 rusuk lengkung.",
        "Pernyataan 3 BENAR: Bola hanya memiliki 1 sisi lengkung, 0 rusuk, 0 titik sudut."
      ],
      "kesimpulan": "Jawaban yang benar adalah Benar, Salah, Benar."
    }
  },
  {
    "id": "br-19",
    "category": "bangun_ruang",
    "topicTitle": "Karakteristik Bangun Limas Segiempat (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Pilihlah DUA atau TIGA pernyataan yang TEPAT mengenai bangun ruang LIMAS SEGIEMPAT!",
    "options": [
      {
        "id": "A",
        "text": "Memiliki 5 bidang sisi (1 alas dan 4 sisi tegak)"
      },
      {
        "id": "B",
        "text": "Memiliki 8 rusuk"
      },
      {
        "id": "C",
        "text": "Memiliki 10 titik sudut"
      },
      {
        "id": "D",
        "text": "Semua 4 sisi tegaknya berbentuk segitiga"
      }
    ],
    "correctAnswer": [
      "A",
      "B",
      "D"
    ],
    "explanation": {
      "diketahui": "Limas segiempat",
      "ditanya": "Pernyataan yang tepat",
      "rumus": "Sisi = 5, Rusuk = 8, Titik Sudut = 5",
      "langkah": [
        "A benar: 1 bidang alas segiempat + 4 segitiga sisi tegak = 5 sisi.",
        "B benar: 4 rusuk alas + 4 rusuk tegak = 8 rusuk.",
        "C salah: titik sudutnya ada 5 (4 di alas + 1 puncak), bukan 10.",
        "D benar: sisi-sisi tegak limas selalu segitiga yang bertemu di puncak."
      ],
      "kesimpulan": "Pernyataan yang tepat adalah A, B, dan D."
    }
  },
  {
    "id": "br-20",
    "category": "bangun_ruang",
    "topicTitle": "Kombinasi Rumus Bangun Ruang Sisi Lengkung (Pilihan Kompleks)",
    "difficulty": "sulit",
    "type": "multi_select",
    "prompt": "Pilihlah DUA rumus bangun ruang di bawah ini yang BENAR!",
    "options": [
      {
        "id": "A",
        "text": "Volume kerucut: V = ⅓ × π × r² × t"
      },
      {
        "id": "B",
        "text": "Luas permukaan bola: LP = 2 × π × r²"
      },
      {
        "id": "C",
        "text": "Luas selimut kerucut: L = π × r × s"
      },
      {
        "id": "D",
        "text": "Volume bola: V = ⁴⁄₃ × π × r² × t"
      }
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": {
      "diketahui": "Rumus bangun ruang sisi lengkung",
      "ditanya": "Rumus yang benar",
      "rumus": "Rumus baku matematika kerucut & bola",
      "langkah": [
        "A BENAR: Volume kerucut adalah sepertiga tabung = ⅓πr²t.",
        "B SALAH: Luas permukaan bola adalah 4πr², bukan 2πr².",
        "C BENAR: Luas selimut kerucut adalah πrs (s = garis pelukis).",
        "D SALAH: Volume bola adalah ⁴⁄₃πr³, bola tidak memiliki parameter tinggi t."
      ],
      "kesimpulan": "Opsi yang benar adalah A dan C."
    }
  },
  {
    "id": "pr-01",
    "category": "prisma",
    "topicTitle": "Volume Prisma Segitiga",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah prisma segitiga memiliki luas alas 24 cm² dan tinggi prisma 15 cm. Berapakah volume prisma tersebut?",
    "options": [
      {
        "id": "A",
        "text": "120 cm³"
      },
      {
        "id": "B",
        "text": "180 cm³"
      },
      {
        "id": "C",
        "text": "360 cm³"
      },
      {
        "id": "D",
        "text": "720 cm³"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "L_alas = 24 cm², tinggi t = 15 cm",
      "ditanya": "Volume prisma",
      "rumus": "V = Luas alas × tinggi",
      "langkah": [
        "V = 24 × 15 = 360 cm³"
      ],
      "kesimpulan": "Volume prisma segitiga tersebut adalah 360 cm³."
    }
  },
  {
    "id": "pr-02",
    "category": "prisma",
    "topicTitle": "Luas Permukaan Prisma Segitiga Siku-siku",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah prisma tegak memiliki alas segitiga siku-siku dengan sisi 6 cm, 8 cm, dan 10 cm. Jika tinggi prisma 12 cm, hitunglah luas permukaannya!",
    "options": [
      {
        "id": "A",
        "text": "384 cm²"
      },
      {
        "id": "B",
        "text": "288 cm²"
      },
      {
        "id": "C",
        "text": "312 cm²"
      },
      {
        "id": "D",
        "text": "336 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Alas segitiga siku-siku 6, 8, 10; tinggi t = 12 cm",
      "ditanya": "Luas permukaan prisma (LP)",
      "rumus": "LP = 2 × L_alas + Keliling_alas × tinggi",
      "langkah": [
        "L_alas = ½ × 6 × 8 = 24 cm²",
        "Keliling alas = 6 + 8 + 10 = 24 cm",
        "Luas sisi tegak = 24 × 12 = 288 cm²",
        "LP = 2(24) + 288 = 48 + 288 = 336 cm²"
      ],
      "kesimpulan": "Luas permukaan prisma tegak segitiga siku-siku adalah 336 cm²."
    }
  },
  {
    "id": "pr-03",
    "category": "prisma",
    "topicTitle": "Jumlah Unsur Prisma Segi-n",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Berapakah banyaknya sisi, rusuk, dan titik sudut pada sebuah prisma segi delapan (oktagonal)?",
    "options": [
      {
        "id": "A",
        "text": "10 sisi, 24 rusuk, 16 titik sudut"
      },
      {
        "id": "B",
        "text": "8 sisi, 16 rusuk, 10 titik sudut"
      },
      {
        "id": "C",
        "text": "10 sisi, 16 rusuk, 24 titik sudut"
      },
      {
        "id": "D",
        "text": "16 sisi, 24 rusuk, 10 titik sudut"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Prisma segi-n dengan n = 8",
      "ditanya": "Banyak sisi, rusuk, titik sudut",
      "rumus": "Sisi = n + 2, Rusuk = 3n, Titik sudut = 2n",
      "langkah": [
        "Sisi = 8 + 2 = 10 bidang",
        "Rusuk = 3 × 8 = 24 rusuk",
        "Titik sudut = 2 × 8 = 16 titik sudut"
      ],
      "kesimpulan": "Prisma segi delapan memiliki 10 sisi, 24 rusuk, dan 16 titik sudut."
    }
  },
  {
    "id": "pr-04",
    "category": "prisma",
    "topicTitle": "Volume Tabung",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah kaleng biskuit berbentuk tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Berapakah volume kaleng tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "154 cm³"
      },
      {
        "id": "B",
        "text": "1.540 cm³"
      },
      {
        "id": "C",
        "text": "770 cm³"
      },
      {
        "id": "D",
        "text": "3.080 cm³"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "r = 7 cm, t = 10 cm, π = 22/7",
      "ditanya": "Volume tabung",
      "rumus": "V = π × r² × t",
      "langkah": [
        "L_alas = (22/7) × 7 × 7 = 154 cm²",
        "V = 154 × 10 = 1.540 cm³"
      ],
      "kesimpulan": "Volume kaleng tabung adalah 1.540 cm³."
    }
  },
  {
    "id": "pr-05",
    "category": "prisma",
    "topicTitle": "Luas Permukaan Tabung",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Luas seluruh permukaan tabung tertutup dengan jari-jari 7 cm dan tinggi 13 cm adalah... (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "440 cm²"
      },
      {
        "id": "B",
        "text": "572 cm²"
      },
      {
        "id": "C",
        "text": "880 cm²"
      },
      {
        "id": "D",
        "text": "704 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "r = 7 cm, t = 13 cm, π = 22/7",
      "ditanya": "Luas permukaan tabung (LP)",
      "rumus": "LP = 2 × π × r × (r + t)",
      "langkah": [
        "LP = 2 × (22/7) × 7 × (7 + 13)",
        "LP = 44 × 20 = 880 cm²"
      ],
      "kesimpulan": "Luas permukaan tabung tersebut adalah 880 cm²."
    }
  },
  {
    "id": "pr-06",
    "category": "prisma",
    "topicTitle": "Luas Selimut Tabung",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Luas selimut tabung dengan diameter 20 cm dan tinggi 15 cm adalah... (π = 3,14)",
    "options": [
      {
        "id": "A",
        "text": "628 cm²"
      },
      {
        "id": "B",
        "text": "471 cm²"
      },
      {
        "id": "C",
        "text": "1.884 cm²"
      },
      {
        "id": "D",
        "text": "942 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "d = 20 cm (r = 10 cm), t = 15 cm, π = 3,14",
      "ditanya": "Luas selimut tabung (L_selimut)",
      "rumus": "L_selimut = 2 × π × r × t = π × d × t",
      "langkah": [
        "L_selimut = 3,14 × 20 × 15 = 3,14 × 300 = 942 cm²"
      ],
      "kesimpulan": "Luas selimut tabung adalah 942 cm²."
    }
  },
  {
    "id": "pr-07",
    "category": "prisma",
    "topicTitle": "Volume Prisma Trapesium",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah prisma memiliki alas berbentuk trapesium sama kaki dengan panjang sisi sejajar 8 cm dan 14 cm serta tinggi trapesium 5 cm. Jika panjang/tinggi prisma adalah 20 cm, berapakah volumenya?",
    "options": [
      {
        "id": "A",
        "text": "1.100 cm³"
      },
      {
        "id": "B",
        "text": "550 cm³"
      },
      {
        "id": "C",
        "text": "2.200 cm³"
      },
      {
        "id": "D",
        "text": "880 cm³"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Sisi sejajar trapesium 8 dan 14, tinggi trapesium 5 cm, tinggi prisma = 20 cm",
      "ditanya": "Volume prisma trapesium",
      "rumus": "V = Luas trapesium × tinggi prisma",
      "langkah": [
        "Luas alas = ½ × (8 + 14) × 5 = ½ × 22 × 5 = 55 cm²",
        "V = 55 × 20 = 1.100 cm³"
      ],
      "kesimpulan": "Volume prisma trapesium tersebut adalah 1.100 cm³."
    }
  },
  {
    "id": "pr-08",
    "category": "prisma",
    "topicTitle": "Mencari Tinggi Prisma dari Volume",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Volume sebuah prisma segitiga adalah 450 cm³. Jika luas alasnya 25 cm², berapakah tinggi prisma tersebut?",
    "options": [
      {
        "id": "A",
        "text": "16 cm"
      },
      {
        "id": "B",
        "text": "18 cm"
      },
      {
        "id": "C",
        "text": "20 cm"
      },
      {
        "id": "D",
        "text": "15 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "V = 450 cm³, L_alas = 25 cm²",
      "ditanya": "Tinggi prisma (t)",
      "rumus": "t = V / L_alas",
      "langkah": [
        "t = 450 / 25 = 18 cm"
      ],
      "kesimpulan": "Tinggi prisma tersebut adalah 18 cm."
    }
  },
  {
    "id": "pr-09",
    "category": "prisma",
    "topicTitle": "Perubahan Volume jika Jari-jari Tabung Diubah",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Jari-jari alas sebuah tabung diperbesar menjadi 2 kali lipat dari semula, sedangkan tingginya tetap. Berapa kalikah volume tabung yang baru dibanding volume semula?",
    "options": [
      {
        "id": "A",
        "text": "2 kali lipat"
      },
      {
        "id": "B",
        "text": "8 kali lipat"
      },
      {
        "id": "C",
        "text": "4 kali lipat"
      },
      {
        "id": "D",
        "text": "6 kali lipat"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "r₂ = 2r₁, t₂ = t₁",
      "ditanya": "Perbandingan V₂ : V₁",
      "rumus": "V = π × r² × t",
      "langkah": [
        "V₁ = π × r₁² × t",
        "V₂ = π × (2r₁)² × t = π × 4r₁² × t = 4 × V₁"
      ],
      "kesimpulan": "Volume tabung yang baru menjadi 4 kali lipat dari semula."
    }
  },
  {
    "id": "pr-10",
    "category": "prisma",
    "topicTitle": "Jaring-jaring Prisma Segitiga",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah prisma segitiga jika dibelah menurut rusuk-rusuknya akan membentuk jaring-jaring yang terdiri atas...",
    "options": [
      {
        "id": "A",
        "text": "1 segitiga dan 3 persegi panjang"
      },
      {
        "id": "B",
        "text": "3 segitiga dan 2 persegi panjang"
      },
      {
        "id": "C",
        "text": "2 segitiga dan 4 persegi panjang"
      },
      {
        "id": "D",
        "text": "2 segitiga dan 3 persegi panjang"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Bentuk prisma segitiga",
      "ditanya": "Komponen bidang pada jaring-jaring",
      "rumus": "Unsur prisma tegak",
      "langkah": [
        "Prisma segitiga memiliki 2 bidang alas dan tutup berupa segitiga, serta 3 bidang sisi tegak berupa persegi panjang."
      ],
      "kesimpulan": "Terdiri dari 2 segitiga dan 3 persegi panjang."
    }
  },
  {
    "id": "pr-11",
    "category": "prisma",
    "topicTitle": "Volume Bak Air Tabung Berisi Separuh",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah drum penampungan air berbentuk tabung memiliki diameter 140 cm dan tinggi 100 cm. Jika drum tersebut terisi air setengah bagian, berapakah volume air di dalamnya? (π = 22/7, 1 liter = 1.000 cm³)",
    "options": [
      {
        "id": "A",
        "text": "770 liter"
      },
      {
        "id": "B",
        "text": "1.540 liter"
      },
      {
        "id": "C",
        "text": "385 liter"
      },
      {
        "id": "D",
        "text": "7.700 liter"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "d = 140 cm → r = 70 cm, t = 100 cm, isi = ½ drum",
      "ditanya": "Volume air dalam liter",
      "rumus": "V_air = ½ × π × r² × t",
      "langkah": [
        "V_penuh = (22/7) × 70 × 70 × 100 = 1.540.000 cm³ = 1.540 liter",
        "V_setengah = 1.540 / 2 = 770 liter"
      ],
      "kesimpulan": "Volume air dalam drum tersebut adalah 770 liter."
    }
  },
  {
    "id": "pr-12",
    "category": "prisma",
    "topicTitle": "Prisma Segienam Beraturan",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Jumlah rusuk tegak pada sebuah prisma segienam beraturan adalah...",
    "options": [
      {
        "id": "A",
        "text": "12 buah"
      },
      {
        "id": "B",
        "text": "6 buah"
      },
      {
        "id": "C",
        "text": "18 buah"
      },
      {
        "id": "D",
        "text": "8 buah"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Prisma segi-6",
      "ditanya": "Banyak rusuk tegak (bukan total rusuk)",
      "rumus": "Banyak rusuk tegak = n",
      "langkah": [
        "Rusuk alas = 6",
        "Rusuk tutup = 6",
        "Rusuk tegak penghubung = 6",
        "Total seluruh rusuk = 18"
      ],
      "kesimpulan": "Banyak rusuk tegaknya tepat berjumlah 6 buah."
    }
  },
  {
    "id": "pr-13",
    "category": "prisma",
    "topicTitle": "Kawat Kerangka Prisma Segitiga",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Akan dibuat kerangka prisma segitiga sama sisi dengan panjang sisi alas 15 cm dan tinggi prisma 20 cm. Panjang kawat minimal yang dibutuhkan adalah...",
    "options": [
      {
        "id": "A",
        "text": "105 cm"
      },
      {
        "id": "B",
        "text": "120 cm"
      },
      {
        "id": "C",
        "text": "150 cm"
      },
      {
        "id": "D",
        "text": "90 cm"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Sisi alas s = 15 cm (ada 3 rusuk alas dan 3 rusuk tutup), tinggi t = 20 cm (ada 3 rusuk tegak)",
      "ditanya": "Panjang kawat kerangka",
      "rumus": "Panjang = 2 × (3s) + 3t = 6s + 3t",
      "langkah": [
        "Panjang = 6(15) + 3(20) = 90 + 60 = 150 cm"
      ],
      "kesimpulan": "Panjang kawat yang dibutuhkan adalah 150 cm."
    }
  },
  {
    "id": "pr-14",
    "category": "prisma",
    "topicTitle": "Hubungan Bentuk Tabung dan Prisma",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Tabung dapat dipandang sebagai bentuk istimewa dari prisma tegak yang bidang alas dan tutupnya berupa...",
    "options": [
      {
        "id": "A",
        "text": "Kerucut terpancung"
      },
      {
        "id": "B",
        "text": "Bujur sangkar lengkung"
      },
      {
        "id": "C",
        "text": "Elips beraturan"
      },
      {
        "id": "D",
        "text": "Segi banyak dengan jumlah sisi tak terhingga (lingkaran)"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Konseptual tabung dan prisma",
      "ditanya": "Hubungan geometri",
      "rumus": "Limit prisma segi-n ketika n menuju tak terhingga",
      "langkah": [
        "Ketika segi-n pada alas prisma diperbanyak hingga mendekati tak terhingga, bentuk alas prisma bertransformasi menjadi lingkaran, yaitu tabung."
      ],
      "kesimpulan": "Tabung adalah prisma beraturan dengan jumlah sisi alas tak terhingga (lingkaran)."
    }
  },
  {
    "id": "pr-15",
    "category": "prisma",
    "topicTitle": "Luas Tabung Tanpa Tutup",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah ember berbentuk tabung tanpa tutup memiliki diameter 28 cm dan tinggi 30 cm. Berapakah luas permukaan ember tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "3.256 cm²"
      },
      {
        "id": "B",
        "text": "2.640 cm²"
      },
      {
        "id": "C",
        "text": "3.872 cm²"
      },
      {
        "id": "D",
        "text": "1.936 cm²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "d = 28 cm → r = 14 cm, t = 30 cm, tanpa tutup",
      "ditanya": "Luas permukaan (LP = L_alas + L_selimut)",
      "rumus": "LP = πr² + 2πrt",
      "langkah": [
        "L_alas = (22/7) × 14 × 14 = 616 cm²",
        "L_selimut = 2 × (22/7) × 14 × 30 = 88 × 30 = 2.640 cm²",
        "LP = 616 + 2.640 = 3.256 cm²"
      ],
      "kesimpulan": "Luas permukaan tabung tanpa tutup adalah 3.256 cm²."
    }
  },
  {
    "id": "pr-16",
    "category": "prisma",
    "topicTitle": "Tinggi Tabung dari Luas Selimut",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Luas selimut tabung adalah 440 cm². Jika jari-jari alasnya 7 cm dan π = 22/7, berapakah tinggi tabung tersebut?",
    "options": [
      {
        "id": "A",
        "text": "12 cm"
      },
      {
        "id": "B",
        "text": "10 cm"
      },
      {
        "id": "C",
        "text": "14 cm"
      },
      {
        "id": "D",
        "text": "8 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "L_selimut = 440 cm², r = 7 cm, π = 22/7",
      "ditanya": "Tinggi tabung (t)",
      "rumus": "L_selimut = 2πrt → t = L_selimut / (2πr)",
      "langkah": [
        "Keliling alas = 2 × (22/7) × 7 = 44 cm",
        "t = 440 / 44 = 10 cm"
      ],
      "kesimpulan": "Tinggi tabung tersebut adalah 10 cm."
    }
  },
  {
    "id": "pr-17",
    "category": "prisma",
    "topicTitle": "Prisma Segitiga Sama Kaki",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Sebuah prisma alas segitiga sama kaki memiliki panjang sisi alas segitiga 12 cm dan sisi kaki 10 cm. Jika tinggi prisma 15 cm, volume prisma tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "540 cm³"
      },
      {
        "id": "B",
        "text": "1.440 cm³"
      },
      {
        "id": "C",
        "text": "720 cm³"
      },
      {
        "id": "D",
        "text": "900 cm³"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Alas segitiga = 12 cm, kaki = 10 cm, tinggi prisma = 15 cm",
      "ditanya": "Volume prisma",
      "rumus": "t_segitiga = √(kaki² - (alas/2)²)",
      "langkah": [
        "t_segitiga = √(10² - 6²) = √(100 - 36) = √64 = 8 cm",
        "L_alas = ½ × 12 × 8 = 48 cm²",
        "V = L_alas × t_prisma = 48 × 15 = 720 cm³"
      ],
      "kesimpulan": "Volume prisma tersebut adalah 720 cm³."
    }
  },
  {
    "id": "pr-18",
    "category": "prisma",
    "topicTitle": "Konsep Prisma & Tabung (Benar/Salah)",
    "difficulty": "sedang",
    "type": "true_false",
    "prompt": "Tentukan kebenaran dari setiap pernyataan mengenai prisma dan tabung berikut!",
    "statements": [
      {
        "id": "s1",
        "statement": "Dua bidang alas dan tutup pada prisma tegak selalu memiliki bentuk dan ukuran yang sama persis (kongruen).",
        "isCorrect": true
      },
      {
        "id": "s2",
        "statement": "Selimut tabung jika dibuka dan dibentangkan mendatar akan membentuk bangun segitiga sama kaki.",
        "isCorrect": false
      },
      {
        "id": "s3",
        "statement": "Volume setiap prisma tegak dapat dihitung dengan mengalikan luas alas dengan tinggi prisma.",
        "isCorrect": true
      }
    ],
    "correctAnswer": [
      "true",
      "false",
      "true"
    ],
    "explanation": {
      "diketahui": "3 pernyataan prinsip prisma dan tabung",
      "ditanya": "Verifikasi Benar/Salah",
      "rumus": "Aksioma prisma dan tabung",
      "langkah": [
        "Pernyataan 1 BENAR: Sesuai definisi, alas dan tutup prisma sejajar dan kongruen.",
        "Pernyataan 2 SALAH: Selimut tabung jika dibentangkan selalu membentuk persegi panjang (dengan panjang = keliling lingkaran alas dan lebar = tinggi tabung).",
        "Pernyataan 3 BENAR: Rumus umum volume prisma tegak adalah V = L_a × t."
      ],
      "kesimpulan": "Jawaban yang tepat adalah Benar, Salah, Benar."
    }
  },
  {
    "id": "pr-19",
    "category": "prisma",
    "topicTitle": "Karakteristik Tabung (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Pilihlah DUA atau TIGA pernyataan di bawah ini yang BENAR mengenai bangun TABUNG!",
    "options": [
      {
        "id": "A",
        "text": "Memiliki 3 bidang sisi (alas, tutup, dan selimut lengkung)"
      },
      {
        "id": "B",
        "text": "Memiliki 2 rusuk lengkung"
      },
      {
        "id": "C",
        "text": "Memiliki 2 titik sudut lancip di bagian sisi alasnya"
      },
      {
        "id": "D",
        "text": "Jaring-jaringnya terdiri atas 2 lingkaran kongruen dan 1 persegi panjang"
      }
    ],
    "correctAnswer": [
      "A",
      "B",
      "D"
    ],
    "explanation": {
      "diketahui": "Karakteristik bangun ruang tabung",
      "ditanya": "Pernyataan yang tepat",
      "rumus": "Sifat geometris tabung",
      "langkah": [
        "A benar: ada 2 sisi lingkaran datar dan 1 selimut lengkung.",
        "B benar: batas antara alas/tutup dengan selimut adalah 2 rusuk lengkung.",
        "C salah: tabung adalah bangun ruang sisi lengkung yang tidak memiliki titik sudut sama sekali (0 titik sudut).",
        "D benar: jaring-jaring tabung terdiri dari 2 lingkaran dan 1 persegi panjang."
      ],
      "kesimpulan": "Opsi yang benar adalah A, B, dan D."
    }
  },
  {
    "id": "pr-20",
    "category": "prisma",
    "topicTitle": "Rumus Unsur Prisma Segi-n (Pilihan Kompleks)",
    "difficulty": "sulit",
    "type": "multi_select",
    "prompt": "Pilihlah DUA formula yang TEPAT untuk menentukan unsur-unsur pada PRISMA SEGI-n!",
    "options": [
      {
        "id": "A",
        "text": "Banyak sisi = n + 2"
      },
      {
        "id": "B",
        "text": "Banyak rusuk = 2n"
      },
      {
        "id": "C",
        "text": "Banyak titik sudut = 2n"
      },
      {
        "id": "D",
        "text": "Banyak sisi tegak = n + 1"
      }
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": {
      "diketahui": "Formula umum prisma segi-n",
      "ditanya": "Formula yang benar",
      "rumus": "Sisi = n + 2; Rusuk = 3n; Titik Sudut = 2n",
      "langkah": [
        "A BENAR: Sisi = n bidang tegak + 2 bidang alas/tutup = n + 2.",
        "B SALAH: Rusuk prisma adalah 3n, sedangkan 2n adalah rumus rusuk limas.",
        "C BENAR: Titik sudut = n di alas + n di tutup = 2n.",
        "D SALAH: Sisi tegak tepat berjumlah n buah."
      ],
      "kesimpulan": "Formula yang tepat adalah A dan C."
    }
  },
  {
    "id": "lk-01",
    "category": "lingkaran",
    "topicTitle": "Keliling Lingkaran",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Sebuah roda sepeda memiliki jari-jari 28 cm. Berapakah keliling roda tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "88 cm"
      },
      {
        "id": "B",
        "text": "154 cm"
      },
      {
        "id": "C",
        "text": "616 cm"
      },
      {
        "id": "D",
        "text": "176 cm"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "r = 28 cm, π = 22/7",
      "ditanya": "Keliling lingkaran (K)",
      "rumus": "K = 2 × π × r",
      "langkah": [
        "K = 2 × (22/7) × 28 = 2 × 22 × 4 = 176 cm"
      ],
      "kesimpulan": "Keliling roda sepeda adalah 176 cm."
    }
  },
  {
    "id": "lk-02",
    "category": "lingkaran",
    "topicTitle": "Luas Lingkaran",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Luas lingkaran yang memiliki diameter 20 cm adalah... (π = 3,14)",
    "options": [
      {
        "id": "A",
        "text": "314 cm²"
      },
      {
        "id": "B",
        "text": "628 cm²"
      },
      {
        "id": "C",
        "text": "1.256 cm²"
      },
      {
        "id": "D",
        "text": "157 cm²"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "d = 20 cm → r = 10 cm, π = 3,14",
      "ditanya": "Luas lingkaran (L)",
      "rumus": "L = π × r²",
      "langkah": [
        "L = 3,14 × 10 × 10 = 314 cm²"
      ],
      "kesimpulan": "Luas lingkaran tersebut adalah 314 cm²."
    }
  },
  {
    "id": "lk-03",
    "category": "lingkaran",
    "topicTitle": "Panjang Busur Lingkaran",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Pada sebuah lingkaran dengan jari-jari 14 cm, terdapat sudut pusat sebesar 90°. Berapakah panjang busur lingkaran di hadapan sudut tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "44 cm"
      },
      {
        "id": "B",
        "text": "22 cm"
      },
      {
        "id": "C",
        "text": "11 cm"
      },
      {
        "id": "D",
        "text": "88 cm"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "r = 14 cm, α = 90°, π = 22/7",
      "ditanya": "Panjang busur",
      "rumus": "Panjang busur = (α / 360°) × 2πr",
      "langkah": [
        "Keliling penuh = 2 × (22/7) × 14 = 88 cm",
        "Panjang busur = (90° / 360°) × 88 = ¼ × 88 = 22 cm"
      ],
      "kesimpulan": "Panjang busur lingkaran tersebut adalah 22 cm."
    }
  },
  {
    "id": "lk-04",
    "category": "lingkaran",
    "topicTitle": "Luas Juring Lingkaran",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah juring lingkaran memiliki sudut pusat 60° pada lingkaran berjari-jari 21 cm. Berapakah luas juring tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "154 cm²"
      },
      {
        "id": "B",
        "text": "462 cm²"
      },
      {
        "id": "C",
        "text": "231 cm²"
      },
      {
        "id": "D",
        "text": "308 cm²"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "r = 21 cm, α = 60°, π = 22/7",
      "ditanya": "Luas juring",
      "rumus": "Luas juring = (α / 360°) × πr²",
      "langkah": [
        "Luas lingkaran penuh = (22/7) × 21 × 21 = 22 × 3 × 21 = 1.386 cm²",
        "Luas juring = (60° / 360°) × 1.386 = ⅙ × 1.386 = 231 cm²"
      ],
      "kesimpulan": "Luas juring tersebut adalah 231 cm²."
    }
  },
  {
    "id": "lk-05",
    "category": "lingkaran",
    "topicTitle": "Luas Tembereng Lingkaran",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Pada lingkaran dengan jari-jari 10 cm, terdapat sudut pusat 90°. Berapakah luas tembereng di depan sudut tersebut? (gunakan π = 3,14)",
    "options": [
      {
        "id": "A",
        "text": "36,5 cm²"
      },
      {
        "id": "B",
        "text": "50 cm²"
      },
      {
        "id": "C",
        "text": "78,5 cm²"
      },
      {
        "id": "D",
        "text": "28,5 cm²"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "r = 10 cm, α = 90°, π = 3,14",
      "ditanya": "Luas tembereng = Luas juring - Luas segitiga",
      "rumus": "L_juring = (90/360)πr², L_segitiga = ½ × r × r",
      "langkah": [
        "L_juring = ¼ × 3,14 × 100 = 78,5 cm²",
        "L_segitiga = ½ × 10 × 10 = 50 cm²",
        "L_tembereng = 78,5 - 50 = 28,5 cm²"
      ],
      "kesimpulan": "Luas tembereng lingkaran adalah 28,5 cm²."
    }
  },
  {
    "id": "lk-06",
    "category": "lingkaran",
    "topicTitle": "Unsur Apotema Lingkaran",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Garis terpendek yang ditarik dari titik pusat lingkaran tegak lurus ke tali busur disebut...",
    "options": [
      {
        "id": "A",
        "text": "Apotema"
      },
      {
        "id": "B",
        "text": "Diameter"
      },
      {
        "id": "C",
        "text": "Jari-jari"
      },
      {
        "id": "D",
        "text": "Busur"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Definisi unsur lingkaran",
      "ditanya": "Nama garis tegak lurus pusat ke tali busur",
      "rumus": "Konsep unsur geometri lingkaran",
      "langkah": [
        "Garis tegak lurus dari titik pusat menuju tali busur tepat membagi dua tali busur dan dinamakan Apotema."
      ],
      "kesimpulan": "Unsur tersebut adalah Apotema."
    }
  },
  {
    "id": "lk-07",
    "category": "lingkaran",
    "topicTitle": "Sudut Pusat dan Sudut Keliling",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Jika sebuah sudut pusat lingkaran menghadap busur yang sama dengan sebuah sudut keliling, dan besar sudut pusatnya 70°, maka besar sudut keliling tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "140°"
      },
      {
        "id": "B",
        "text": "35°"
      },
      {
        "id": "C",
        "text": "70°"
      },
      {
        "id": "D",
        "text": "55°"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Sudut pusat = 70°, menghadap busur yang sama",
      "ditanya": "Besar sudut keliling",
      "rumus": "Sudut keliling = ½ × Sudut pusat",
      "langkah": [
        "Sudut keliling = ½ × 70° = 35°"
      ],
      "kesimpulan": "Besar sudut keliling tersebut adalah 35°."
    }
  },
  {
    "id": "lk-08",
    "category": "lingkaran",
    "topicTitle": "Sudut Keliling Menghadap Diameter",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Setiap sudut keliling yang menghadap garis diameter lingkaran besarnya selalu...",
    "options": [
      {
        "id": "A",
        "text": "45°"
      },
      {
        "id": "B",
        "text": "180°"
      },
      {
        "id": "C",
        "text": "90° (siku-siku)"
      },
      {
        "id": "D",
        "text": "60°"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Sudut keliling menghadap diameter (sudut lurus 180°)",
      "ditanya": "Besar sudut",
      "rumus": "Sudut keliling = ½ × Sudut pusat diameter",
      "langkah": [
        "Sudut keliling = ½ × 180° = 90°"
      ],
      "kesimpulan": "Besarnya selalu 90° (siku-siku)."
    }
  },
  {
    "id": "lk-09",
    "category": "lingkaran",
    "topicTitle": "Mencari Jari-jari dari Keliling",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah lingkaran memiliki keliling 66 cm. Dengan π = 22/7, panjang jari-jari lingkaran tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "14 cm"
      },
      {
        "id": "B",
        "text": "21 cm"
      },
      {
        "id": "C",
        "text": "7 cm"
      },
      {
        "id": "D",
        "text": "10,5 cm"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "K = 66 cm, π = 22/7",
      "ditanya": "Jari-jari (r)",
      "rumus": "r = K / (2π)",
      "langkah": [
        "66 = 2 × (22/7) × r",
        "66 = (44/7) × r",
        "r = (66 × 7) / 44 = (3 × 7) / 2 = 21 / 2 = 10,5 cm"
      ],
      "kesimpulan": "Jari-jari lingkaran tersebut adalah 10,5 cm."
    }
  },
  {
    "id": "lk-10",
    "category": "lingkaran",
    "topicTitle": "Panjang Lintasan Roda Berputar",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah roda mobil berjari-jari 35 cm berputar sebanyak 500 kali di jalan. Jarak total yang ditempuh mobil tersebut adalah... (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "1.100 meter"
      },
      {
        "id": "B",
        "text": "2.200 meter"
      },
      {
        "id": "C",
        "text": "550 meter"
      },
      {
        "id": "D",
        "text": "1.540 meter"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "r = 35 cm, putaran n = 500 kali, π = 22/7",
      "ditanya": "Jarak total (Jarak = n × Keliling)",
      "rumus": "Keliling = 2 × (22/7) × 35 = 220 cm",
      "langkah": [
        "Jarak = 500 × 220 cm = 110.000 cm",
        "Konversi ke meter = 110.000 / 100 = 1.100 meter"
      ],
      "kesimpulan": "Jarak yang ditempuh mobil adalah 1.100 meter."
    }
  },
  {
    "id": "lk-11",
    "category": "lingkaran",
    "topicTitle": "Perbandingan Luas Dua Juring",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Pada sebuah lingkaran, juring AOB memiliki sudut pusat 40° dan luas 24 cm². Jika juring BOC memiliki sudut pusat 100°, berapakah luas juring BOC?",
    "options": [
      {
        "id": "A",
        "text": "50 cm²"
      },
      {
        "id": "B",
        "text": "60 cm²"
      },
      {
        "id": "C",
        "text": "72 cm²"
      },
      {
        "id": "D",
        "text": "48 cm²"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "α₁ = 40°, L₁ = 24 cm², α₂ = 100°",
      "ditanya": "Luas juring kedua (L₂)",
      "rumus": "L₁ / L₂ = α₁ / α₂",
      "langkah": [
        "24 / L₂ = 40 / 100 = 2 / 5",
        "2 × L₂ = 24 × 5 = 120",
        "L₂ = 120 / 2 = 60 cm²"
      ],
      "kesimpulan": "Luas juring BOC adalah 60 cm²."
    }
  },
  {
    "id": "lk-12",
    "category": "lingkaran",
    "topicTitle": "Segiempat Tali Busur",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Pada sebuah segiempat tali busur ABCD, sudut A dan sudut C saling berhadapan. Jika besar ∠A = (2x + 10)° dan ∠C = 110°, maka nilai x adalah...",
    "options": [
      {
        "id": "A",
        "text": "25"
      },
      {
        "id": "B",
        "text": "35"
      },
      {
        "id": "C",
        "text": "30"
      },
      {
        "id": "D",
        "text": "40"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Segiempat tali busur: sudut berhadapan berjumlah 180°",
      "ditanya": "Nilai x",
      "rumus": "∠A + ∠C = 180°",
      "langkah": [
        "(2x + 10) + 110 = 180",
        "2x + 120 = 180",
        "2x = 60 → x = 30"
      ],
      "kesimpulan": "Nilai x adalah 30."
    }
  },
  {
    "id": "lk-13",
    "category": "lingkaran",
    "topicTitle": "Garis Singgung Persekutuan Luar",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Dua buah lingkaran memiliki jari-jari masing-masing 14 cm dan 4 cm. Jarak kedua pusat lingkaran adalah 26 cm. Panjang garis singgung persekutuan luar kedua lingkaran adalah...",
    "options": [
      {
        "id": "A",
        "text": "25 cm"
      },
      {
        "id": "B",
        "text": "20 cm"
      },
      {
        "id": "C",
        "text": "22 cm"
      },
      {
        "id": "D",
        "text": "24 cm"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "R = 14 cm, r = 4 cm, d = 26 cm",
      "ditanya": "Panjang garis singgung persekutuan luar (l)",
      "rumus": "l² = d² - (R - r)²",
      "langkah": [
        "R - r = 14 - 4 = 10 cm",
        "l² = 26² - 10² = 676 - 100 = 576",
        "l = √576 = 24 cm"
      ],
      "kesimpulan": "Panjang garis singgung persekutuan luar adalah 24 cm."
    }
  },
  {
    "id": "lk-14",
    "category": "lingkaran",
    "topicTitle": "Garis Singgung Persekutuan Dalam",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Dua lingkaran memiliki jari-jari 7 cm dan 2 cm. Jarak kedua titik pusatnya 15 cm. Panjang garis singgung persekutuan dalamnya adalah...",
    "options": [
      {
        "id": "A",
        "text": "12 cm"
      },
      {
        "id": "B",
        "text": "10 cm"
      },
      {
        "id": "C",
        "text": "13 cm"
      },
      {
        "id": "D",
        "text": "14 cm"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "R = 7 cm, r = 2 cm, d = 15 cm",
      "ditanya": "Panjang garis singgung persekutuan dalam (p)",
      "rumus": "p² = d² - (R + r)²",
      "langkah": [
        "R + r = 7 + 2 = 9 cm",
        "p² = 15² - 9² = 225 - 81 = 144",
        "p = √144 = 12 cm"
      ],
      "kesimpulan": "Panjang garis singgung persekutuan dalam adalah 12 cm."
    }
  },
  {
    "id": "lk-15",
    "category": "lingkaran",
    "topicTitle": "Luas Cincin Lingkaran (Daerah Antara 2 Lingkaran)",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Sebuah kolam air mancur berbentuk lingkaran berjari-jari 7 meter dikelilingi jalan setapak selebar 3,5 meter di luarnya. Berapakah luas jalan setapak tersebut? (π = 22/7)",
    "options": [
      {
        "id": "A",
        "text": "346,5 m²"
      },
      {
        "id": "B",
        "text": "192,5 m²"
      },
      {
        "id": "C",
        "text": "154 m²"
      },
      {
        "id": "D",
        "text": "231 m²"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "r_dalam = 7 m, r_luar = 7 + 3,5 = 10,5 m",
      "ditanya": "Luas jalan = Luas lingkaran besar - Luas lingkaran kecil",
      "rumus": "L = π(R² - r²)",
      "langkah": [
        "L_dalam = (22/7) × 7 × 7 = 154 m²",
        "L_luar = (22/7) × 10,5 × 10,5 = 346,5 m²",
        "Luas jalan = 346,5 - 154 = 192,5 m²"
      ],
      "kesimpulan": "Luas jalan setapak tersebut adalah 192,5 m²."
    }
  },
  {
    "id": "lk-16",
    "category": "lingkaran",
    "topicTitle": "Daerah Tembereng dan Juring",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Daerah di dalam lingkaran yang dibatasi oleh sebuah busur dan tali busurnya disebut...",
    "options": [
      {
        "id": "A",
        "text": "Apotema"
      },
      {
        "id": "B",
        "text": "Juring"
      },
      {
        "id": "C",
        "text": "Tembereng"
      },
      {
        "id": "D",
        "text": "Diameter"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Definisi bagian bidang lingkaran",
      "ditanya": "Daerah antara busur dan tali busur",
      "rumus": "Istilah geometri lingkaran",
      "langkah": [
        "Juring: dibatasi 2 jari-jari dan 1 busur.",
        "Tembereng: dibatasi 1 busur dan 1 tali busur."
      ],
      "kesimpulan": "Daerah tersebut adalah Tembereng."
    }
  },
  {
    "id": "lk-17",
    "category": "lingkaran",
    "topicTitle": "Sudut Pusat Separuh Lingkaran",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Besar sudut pusat yang membagi lingkaran menjadi dua bagian sama besar adalah...",
    "options": [
      {
        "id": "A",
        "text": "270°"
      },
      {
        "id": "B",
        "text": "90°"
      },
      {
        "id": "C",
        "text": "360°"
      },
      {
        "id": "D",
        "text": "180°"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Lingkaran penuh = 360°",
      "ditanya": "Sudut pusat separuh lingkaran",
      "rumus": "α = 360° / 2",
      "langkah": [
        "α = 180° (membentuk garis lurus/diameter)"
      ],
      "kesimpulan": "Besar sudut pusatnya adalah 180°."
    }
  },
  {
    "id": "lk-18",
    "category": "lingkaran",
    "topicTitle": "Sifat-sifat Unsur Lingkaran (Benar/Salah)",
    "difficulty": "sedang",
    "type": "true_false",
    "prompt": "Tentukan kebenaran dari setiap pernyataan mengenai unsur lingkaran di bawah ini!",
    "statements": [
      {
        "id": "s1",
        "statement": "Diameter adalah tali busur terpanjang yang melalui titik pusat lingkaran.",
        "isCorrect": true
      },
      {
        "id": "s2",
        "statement": "Luas tembereng selalu lebih besar daripada luas juring pada sudut pusat yang sama.",
        "isCorrect": false
      },
      {
        "id": "s3",
        "statement": "Dua buah sudut keliling yang menghadap busur yang sama memiliki besar sudut yang sama.",
        "isCorrect": true
      }
    ],
    "correctAnswer": [
      "true",
      "false",
      "true"
    ],
    "explanation": {
      "diketahui": "3 pernyataan geometri lingkaran",
      "ditanya": "Verifikasi Benar/Salah",
      "rumus": "Aksioma lingkaran",
      "langkah": [
        "Pernyataan 1 BENAR: Diameter merupakan tali busur maksimal yang melewati titik pusat.",
        "Pernyataan 2 SALAH: Luas tembereng diperoleh dari luas juring dikurangi luas segitiga, sehingga tembereng selalu lebih kecil dari juringnya.",
        "Pernyataan 3 BENAR: Sudut keliling yang menghadap busur yang sama selalu sama besar (yaitu ½ dari sudut pusat)."
      ],
      "kesimpulan": "Urutan jawaban yang tepat adalah Benar, Salah, Benar."
    }
  },
  {
    "id": "lk-19",
    "category": "lingkaran",
    "topicTitle": "Komponen Pembentuk Juring & Tembereng (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Pilihlah DUA pernyataan di bawah ini yang BENAR mengenai hubungan juring dan tembereng!",
    "options": [
      {
        "id": "A",
        "text": "Juring lingkaran selalu dibatasi oleh 2 jari-jari dan 1 busur lingkaran"
      },
      {
        "id": "B",
        "text": "Tembereng dibatasi oleh tali busur dan busur lingkaran"
      },
      {
        "id": "C",
        "text": "Panjang tali busur selalu lebih panjang daripada panjang busurnya"
      },
      {
        "id": "D",
        "text": "Garis apotema selalu berhimpit dengan busur lingkaran"
      }
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "explanation": {
      "diketahui": "Definisi juring dan tembereng",
      "ditanya": "Pernyataan yang tepat",
      "rumus": "Geometri unsur lingkaran",
      "langkah": [
        "A BENAR: Juring adalah daerah kipas yang dibatasi 2 jari-jari dan 1 busur.",
        "B BENAR: Tembereng dibatasi oleh 1 tali busur dan 1 busur.",
        "C SALAH: Garis lurus tali busur adalah jarak terpendek, sehingga panjang tali busur selalu lebih pendek daripada panjang busur lengkungnya.",
        "D SALAH: Apotema adalah garis lurus dari pusat ke tali busur."
      ],
      "kesimpulan": "Opsi yang benar adalah A dan B."
    }
  },
  {
    "id": "lk-20",
    "category": "lingkaran",
    "topicTitle": "Rumus-rumus Lingkaran (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Pilihlah DUA rumus lingkaran di bawah ini yang BENAR!",
    "options": [
      {
        "id": "A",
        "text": "Keliling lingkaran: K = 2 × π × r"
      },
      {
        "id": "B",
        "text": "Luas juring: L_juring = (α / 360°) × π × r²"
      },
      {
        "id": "C",
        "text": "Panjang busur: P = (α / 180°) × π × r²"
      },
      {
        "id": "D",
        "text": "Luas lingkaran: L = 2 × π × r²"
      }
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "explanation": {
      "diketahui": "Formula baku lingkaran",
      "ditanya": "Formula yang tepat",
      "rumus": "Rumus lingkaran terstandar",
      "langkah": [
        "A BENAR: K = 2πr = πd.",
        "B BENAR: Luas juring sebanding dengan pecahan sudut pusat terhadap 360° dikali luas lingkaran πr².",
        "C SALAH: Panjang busur dikalikan keliling (2πr), bukan πr².",
        "D SALAH: Luas lingkaran adalah πr², bukan 2πr²."
      ],
      "kesimpulan": "Pernyataan rumus yang benar adalah A dan B."
    }
  },
  {
    "id": "ar-01",
    "category": "aritmatika",
    "topicTitle": "Suku ke-n Barisan Aritmatika Sederhana",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Diketahui barisan aritmatika: 3, 7, 11, 15, 19, ... Suku ke-10 dari barisan tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "39"
      },
      {
        "id": "B",
        "text": "43"
      },
      {
        "id": "C",
        "text": "35"
      },
      {
        "id": "D",
        "text": "41"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "Barisan: 3, 7, 11, 15, ... → a = 3, b = 7 - 3 = 4, n = 10",
      "ditanya": "Suku ke-10 (U₁₀)",
      "rumus": "U_n = a + (n - 1)b",
      "langkah": [
        "U₁₀ = 3 + (10 - 1) × 4",
        "U₁₀ = 3 + 9 × 4 = 3 + 36 = 39"
      ],
      "kesimpulan": "Suku ke-10 barisan tersebut adalah 39."
    }
  },
  {
    "id": "ar-02",
    "category": "aritmatika",
    "topicTitle": "Pola Bilangan Persegi",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Pada pola bilangan persegi: 1, 4, 9, 16, 25, ... Berapakah banyaknya noktah/titik pada pola ke-12?",
    "options": [
      {
        "id": "A",
        "text": "121"
      },
      {
        "id": "B",
        "text": "144"
      },
      {
        "id": "C",
        "text": "169"
      },
      {
        "id": "D",
        "text": "100"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Pola persegi: U_n = n²",
      "ditanya": "U₁₂",
      "rumus": "U_n = n²",
      "langkah": [
        "U₁₂ = 12² = 144"
      ],
      "kesimpulan": "Banyaknya noktah pada pola ke-12 adalah 144."
    }
  },
  {
    "id": "ar-03",
    "category": "aritmatika",
    "topicTitle": "Pola Bilangan Segitiga",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Banyaknya titik pada pola bilangan segitiga ke-8 (1, 3, 6, 10, 15, ...) adalah...",
    "options": [
      {
        "id": "A",
        "text": "45"
      },
      {
        "id": "B",
        "text": "28"
      },
      {
        "id": "C",
        "text": "36"
      },
      {
        "id": "D",
        "text": "32"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Pola segitiga n = 8",
      "ditanya": "U₈",
      "rumus": "U_n = ½ × n × (n + 1)",
      "langkah": [
        "U₈ = ½ × 8 × (8 + 1) = 4 × 9 = 36"
      ],
      "kesimpulan": "Banyak titik pada pola segitiga ke-8 adalah 36."
    }
  },
  {
    "id": "ar-04",
    "category": "aritmatika",
    "topicTitle": "Pola Bilangan Persegi Panjang",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Pola bilangan persegi panjang adalah: 2, 6, 12, 20, 30, ... Suku ke-9 dari pola tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "81"
      },
      {
        "id": "B",
        "text": "72"
      },
      {
        "id": "C",
        "text": "110"
      },
      {
        "id": "D",
        "text": "90"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Pola persegi panjang n = 9",
      "ditanya": "U₉",
      "rumus": "U_n = n × (n + 1)",
      "langkah": [
        "U₉ = 9 × (9 + 1) = 9 × 10 = 90"
      ],
      "kesimpulan": "Suku ke-9 pola persegi panjang adalah 90."
    }
  },
  {
    "id": "ar-05",
    "category": "aritmatika",
    "topicTitle": "Beda Negatif pada Barisan Aritmatika",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Diketahui barisan bilangan: 50, 46, 42, 38, ... Suku ke-15 dari barisan tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "-6"
      },
      {
        "id": "B",
        "text": "-2"
      },
      {
        "id": "C",
        "text": "6"
      },
      {
        "id": "D",
        "text": "-10"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "a = 50, b = 46 - 50 = -4, n = 15",
      "ditanya": "U₁₅",
      "rumus": "U_n = a + (n - 1)b",
      "langkah": [
        "U₁₅ = 50 + (15 - 1) × (-4)",
        "U₁₅ = 50 + 14 × (-4) = 50 - 56 = -6"
      ],
      "kesimpulan": "Suku ke-15 dari barisan tersebut adalah -6."
    }
  },
  {
    "id": "ar-06",
    "category": "aritmatika",
    "topicTitle": "Mencari Banyak Suku (n)",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Barisan aritmatika: 5, 8, 11, 14, ..., 68. Banyaknya suku pada barisan tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "21"
      },
      {
        "id": "B",
        "text": "22"
      },
      {
        "id": "C",
        "text": "23"
      },
      {
        "id": "D",
        "text": "24"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "a = 5, b = 3, U_n = 68",
      "ditanya": "Banyak suku n",
      "rumus": "U_n = a + (n - 1)b",
      "langkah": [
        "68 = 5 + (n - 1) × 3",
        "63 = (n - 1) × 3",
        "n - 1 = 63 / 3 = 21",
        "n = 21 + 1 = 22"
      ],
      "kesimpulan": "Banyaknya suku pada barisan tersebut adalah 22."
    }
  },
  {
    "id": "ar-07",
    "category": "aritmatika",
    "topicTitle": "Mencari Beda dari Dua Suku",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Suatu barisan aritmatika memiliki suku ke-3 = 11 dan suku ke-8 = 31. Berapakah beda (b) dari barisan tersebut?",
    "options": [
      {
        "id": "A",
        "text": "3"
      },
      {
        "id": "B",
        "text": "5"
      },
      {
        "id": "C",
        "text": "4"
      },
      {
        "id": "D",
        "text": "6"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "U₃ = a + 2b = 11, U₈ = a + 7b = 31",
      "ditanya": "Nilai beda b",
      "rumus": "b = (U_m - U_n) / (m - n)",
      "langkah": [
        "(a + 7b) - (a + 2b) = 31 - 11",
        "5b = 20 → b = 4"
      ],
      "kesimpulan": "Beda dari barisan aritmatika tersebut adalah 4."
    }
  },
  {
    "id": "ar-08",
    "category": "aritmatika",
    "topicTitle": "Jumlah Deret Aritmatika (Sn)",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Jumlah 20 suku pertama dari deret aritmatika: 2 + 5 + 8 + 11 + ... adalah...",
    "options": [
      {
        "id": "A",
        "text": "640"
      },
      {
        "id": "B",
        "text": "620"
      },
      {
        "id": "C",
        "text": "590"
      },
      {
        "id": "D",
        "text": "610"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "a = 2, b = 3, n = 20",
      "ditanya": "S₂₀",
      "rumus": "S_n = (n/2) × (2a + (n - 1)b)",
      "langkah": [
        "S₂₀ = (20/2) × [2(2) + (20 - 1)(3)]",
        "S₂₀ = 10 × [4 + 19(3)] = 10 × [4 + 57] = 10 × 61 = 610"
      ],
      "kesimpulan": "Jumlah 20 suku pertama deret tersebut adalah 610."
    }
  },
  {
    "id": "ar-09",
    "category": "aritmatika",
    "topicTitle": "Jumlah Bilangan Asli Berurutan",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Berapakah hasil penjumlahan bilangan asli dari 1 sampai dengan 50 (1 + 2 + 3 + ... + 50)?",
    "options": [
      {
        "id": "A",
        "text": "1.275"
      },
      {
        "id": "B",
        "text": "1.250"
      },
      {
        "id": "C",
        "text": "1.300"
      },
      {
        "id": "D",
        "text": "1.225"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "a = 1, U₅₀ = 50, n = 50",
      "ditanya": "S₅₀",
      "rumus": "S_n = (n/2) × (a + U_n)",
      "langkah": [
        "S₅₀ = (50/2) × (1 + 50) = 25 × 51 = 1.275"
      ],
      "kesimpulan": "Jumlah bilangan asli dari 1 hingga 50 adalah 1.275."
    }
  },
  {
    "id": "ar-10",
    "category": "aritmatika",
    "topicTitle": "Aplikasi Soal Cerita Kursi Bioskop",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Dalam suatu gedung pertunjukan, baris paling depan tersedia 15 kursi. Baris di belakangnya selalu memuat 4 kursi lebih banyak dari baris di depannya. Jika dalam gedung ada 10 baris kursi, berapakah kapasitas total penonton dalam gedung tersebut?",
    "options": [
      {
        "id": "A",
        "text": "310 orang"
      },
      {
        "id": "B",
        "text": "330 orang"
      },
      {
        "id": "C",
        "text": "350 orang"
      },
      {
        "id": "D",
        "text": "290 orang"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "a = 15 kursi, b = 4 kursi, n = 10 baris",
      "ditanya": "Total penonton (S₁₀)",
      "rumus": "S_n = (n/2) × (2a + (n - 1)b)",
      "langkah": [
        "S₁₀ = (10/2) × [2(15) + (10 - 1)(4)]",
        "S₁₀ = 5 × [30 + 9(4)] = 5 × [30 + 36] = 5 × 66 = 330"
      ],
      "kesimpulan": "Kapasitas total gedung tersebut adalah 330 orang."
    }
  },
  {
    "id": "ar-11",
    "category": "aritmatika",
    "topicTitle": "Soal Cerita Tabungan Bertambah Tetap",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Setiap minggu Ahmad menabung di sekolah. Pada minggu pertama ia menabung Rp10.000,00 dan pada minggu-minggu berikutnya selalu bertambah Rp2.000,00 dari minggu sebelumnya. Uang yang ditabung Ahmad pada minggu ke-12 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Rp30.000,00"
      },
      {
        "id": "B",
        "text": "Rp34.000,00"
      },
      {
        "id": "C",
        "text": "Rp32.000,00"
      },
      {
        "id": "D",
        "text": "Rp36.000,00"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "a = 10.000, b = 2.000, n = 12",
      "ditanya": "U₁₂",
      "rumus": "U_n = a + (n - 1)b",
      "langkah": [
        "U₁₂ = 10.000 + (12 - 1) × 2.000",
        "U₁₂ = 10.000 + 11 × 2.000 = 10.000 + 22.000 = 32.000"
      ],
      "kesimpulan": "Uang yang ditabung pada minggu ke-12 adalah Rp32.000,00."
    }
  },
  {
    "id": "ar-12",
    "category": "aritmatika",
    "topicTitle": "Suku Tengah Barisan Aritmatika",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Suatu barisan aritmatika memiliki suku pertama a = 4 dan suku terakhir U_n = 36. Suku tengah dari barisan tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "24"
      },
      {
        "id": "B",
        "text": "18"
      },
      {
        "id": "C",
        "text": "22"
      },
      {
        "id": "D",
        "text": "20"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "a = 4, U_n = 36",
      "ditanya": "Suku tengah (U_t)",
      "rumus": "U_t = (a + U_n) / 2",
      "langkah": [
        "U_t = (4 + 36) / 2 = 40 / 2 = 20"
      ],
      "kesimpulan": "Suku tengah barisan tersebut adalah 20."
    }
  },
  {
    "id": "ar-13",
    "category": "aritmatika",
    "topicTitle": "Jumlah Bilangan Genap",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Jumlah 15 bilangan genap pertama (2 + 4 + 6 + ... + 30) adalah...",
    "options": [
      {
        "id": "A",
        "text": "240"
      },
      {
        "id": "B",
        "text": "225"
      },
      {
        "id": "C",
        "text": "256"
      },
      {
        "id": "D",
        "text": "210"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "a = 2, b = 2, n = 15",
      "ditanya": "S₁₅",
      "rumus": "S_n = n × (n + 1)",
      "langkah": [
        "S₁₅ = 15 × (15 + 1) = 15 × 16 = 240"
      ],
      "kesimpulan": "Jumlah 15 bilangan genap pertama adalah 240."
    }
  },
  {
    "id": "ar-14",
    "category": "aritmatika",
    "topicTitle": "Jumlah Bilangan Ganjil",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Berapakah jumlah 25 bilangan ganjil pertama (1 + 3 + 5 + ... + 49)?",
    "options": [
      {
        "id": "A",
        "text": "600"
      },
      {
        "id": "B",
        "text": "625"
      },
      {
        "id": "C",
        "text": "650"
      },
      {
        "id": "D",
        "text": "575"
      }
    ],
    "correctAnswer": "B",
    "explanation": {
      "diketahui": "Jumlah n bilangan ganjil pertama selalu sama dengan n²",
      "ditanya": "S₂₅ untuk bilangan ganjil",
      "rumus": "S_n = n²",
      "langkah": [
        "S₂₅ = 25² = 625"
      ],
      "kesimpulan": "Jumlah 25 bilangan ganjil pertama adalah 625."
    }
  },
  {
    "id": "ar-15",
    "category": "aritmatika",
    "topicTitle": "Pola Barisan Fibonacci",
    "difficulty": "mudah",
    "type": "single_choice",
    "prompt": "Dua suku berikutnya dari barisan bilangan Fibonacci: 1, 1, 2, 3, 5, 8, 13, ..., ... adalah...",
    "options": [
      {
        "id": "A",
        "text": "21 dan 35"
      },
      {
        "id": "B",
        "text": "20 dan 33"
      },
      {
        "id": "C",
        "text": "21 dan 34"
      },
      {
        "id": "D",
        "text": "19 dan 31"
      }
    ],
    "correctAnswer": "C",
    "explanation": {
      "diketahui": "Barisan Fibonacci: suku berikutnya adalah jumlah dua suku sebelumnya",
      "ditanya": "Dua suku setelah 13",
      "rumus": "U_n = U_(n-1) + U_(n-2)",
      "langkah": [
        "Suku ke-8 = 8 + 13 = 21",
        "Suku ke-9 = 13 + 21 = 34"
      ],
      "kesimpulan": "Dua suku berikutnya adalah 21 dan 34."
    }
  },
  {
    "id": "ar-16",
    "category": "aritmatika",
    "topicTitle": "Pola Bertingkat Dua Sederhana",
    "difficulty": "sedang",
    "type": "single_choice",
    "prompt": "Perhatikan pola bilangan: 1, 3, 7, 13, 21, ... Suku ke-6 dari pola tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "35"
      },
      {
        "id": "B",
        "text": "29"
      },
      {
        "id": "C",
        "text": "33"
      },
      {
        "id": "D",
        "text": "31"
      }
    ],
    "correctAnswer": "D",
    "explanation": {
      "diketahui": "Beda antar suku bertambah +2, +4, +6, +8, ...",
      "ditanya": "Suku ke-6",
      "rumus": "Analisis selisih tingkat",
      "langkah": [
        "1 (+2) -> 3 (+4) -> 7 (+6) -> 13 (+8) -> 21",
        "Berikutnya bertambah +10: 21 + 10 = 31"
      ],
      "kesimpulan": "Suku ke-6 pola tersebut adalah 31."
    }
  },
  {
    "id": "ar-17",
    "category": "aritmatika",
    "topicTitle": "Menghitung Suku ke-n dari Rumus Sn",
    "difficulty": "sulit",
    "type": "single_choice",
    "prompt": "Jumlah n suku pertama deret aritmatika dinyatakan dengan rumus S_n = 2n² + 3n. Suku ke-5 (U₅) deret tersebut adalah...",
    "options": [
      {
        "id": "A",
        "text": "21"
      },
      {
        "id": "B",
        "text": "25"
      },
      {
        "id": "C",
        "text": "19"
      },
      {
        "id": "D",
        "text": "23"
      }
    ],
    "correctAnswer": "A",
    "explanation": {
      "diketahui": "S_n = 2n² + 3n",
      "ditanya": "U₅",
      "rumus": "U_n = S_n - S_(n-1)",
      "langkah": [
        "S₅ = 2(5²) + 3(5) = 2(25) + 15 = 50 + 15 = 65",
        "S₄ = 2(4²) + 3(4) = 2(16) + 12 = 32 + 12 = 44",
        "U₅ = S₅ - S₄ = 65 - 44 = 21"
      ],
      "kesimpulan": "Suku ke-5 deret tersebut adalah 21."
    }
  },
  {
    "id": "ar-18",
    "category": "aritmatika",
    "topicTitle": "Kaidah Barisan & Deret Aritmatika (Benar/Salah)",
    "difficulty": "sedang",
    "type": "true_false",
    "prompt": "Tentukan kebenaran dari pernyataan-pernyataan mengenai pola dan barisan aritmatika di bawah ini!",
    "statements": [
      {
        "id": "s1",
        "statement": "Pada barisan aritmatika, selisih (beda) antara dua suku yang berurutan selalu konstan/tetap.",
        "isCorrect": true
      },
      {
        "id": "s2",
        "statement": "Beda (b) pada barisan aritmatika hanya boleh bernilai bilangan bulat positif.",
        "isCorrect": false
      },
      {
        "id": "s3",
        "statement": "Rumus suku ke-n pada pola bilangan persegi panjang berdimensi n × (n + 1) adalah Uₙ = n² + n.",
        "isCorrect": true
      }
    ],
    "correctAnswer": [
      "true",
      "false",
      "true"
    ],
    "explanation": {
      "diketahui": "3 pernyataan sifat barisan bilangan",
      "ditanya": "Verifikasi Benar/Salah",
      "rumus": "Konsep dasar barisan aritmatika",
      "langkah": [
        "Pernyataan 1 BENAR: Ciri utama barisan aritmatika adalah selisih tetap b = Uₙ - Uₙ₋₁.",
        "Pernyataan 2 SALAH: Beda dapat bernilai negatif (barisan menurun/turun) atau nol.",
        "Pernyataan 3 BENAR: Uₙ = n(n + 1) = n² + n."
      ],
      "kesimpulan": "Jawaban yang benar adalah Benar, Salah, Benar."
    }
  },
  {
    "id": "ar-19",
    "category": "aritmatika",
    "topicTitle": "Karakteristik Barisan Aritmatika (Pilihan Kompleks)",
    "difficulty": "sedang",
    "type": "multi_select",
    "prompt": "Di antara barisan bilangan berikut, manakah DUA barisan yang merupakan BARISAN ARITMATIKA?",
    "options": [
      {
        "id": "A",
        "text": "4, 9, 14, 19, 24, ..."
      },
      {
        "id": "B",
        "text": "2, 4, 8, 16, 32, ..."
      },
      {
        "id": "C",
        "text": "18, 15, 12, 9, 6, ..."
      },
      {
        "id": "D",
        "text": "1, 4, 9, 16, 25, ..."
      }
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": {
      "diketahui": "4 pilihan barisan bilangan",
      "ditanya": "Barisan yang memiliki selisih konstan",
      "rumus": "b = U₂ - U₁ = U₃ - U₂",
      "langkah": [
        "A BENAR: Beda tetap +5 (aritmatika naik).",
        "B SALAH: Rasio pengali ×2 (barisan geometri).",
        "C BENAR: Beda tetap -3 (aritmatika turun).",
        "D SALAH: Barisan kuadrat/persegi (selisih bertingkat +3, +5, +7)."
      ],
      "kesimpulan": "Barisan aritmatika adalah opsi A dan C."
    }
  },
  {
    "id": "ar-20",
    "category": "aritmatika",
    "topicTitle": "Formula Barisan & Deret Aritmatika (Pilihan Kompleks)",
    "difficulty": "sulit",
    "type": "multi_select",
    "prompt": "Pilihlah DUA formula di bawah ini yang BENAR untuk barisan dan deret aritmatika dengan suku pertama a dan beda b!",
    "options": [
      {
        "id": "A",
        "text": "Suku ke-n: Uₙ = a + (n - 1)b"
      },
      {
        "id": "B",
        "text": "Jumlah n suku: Sₙ = ½ × n × (a + Uₙ)"
      },
      {
        "id": "C",
        "text": "Suku ke-n: Uₙ = a × rⁿ⁻¹"
      },
      {
        "id": "D",
        "text": "Jumlah n suku: Sₙ = n × (a + b)"
      }
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "explanation": {
      "diketahui": "Formula baku barisan dan deret",
      "ditanya": "Formula yang benar",
      "rumus": "Rumus baku barisan & deret aritmatika",
      "langkah": [
        "A BENAR: Uₙ = a + (n - 1)b.",
        "B BENAR: Sₙ = (n/2) × (a + Uₙ) = (n/2) × (2a + (n - 1)b).",
        "C SALAH: Ini adalah rumus barisan geometri.",
        "D SALAH: Tidak memperhitungkan pertambahan suku n."
      ],
      "kesimpulan": "Formula yang benar adalah A dan B."
    }
  }
]
