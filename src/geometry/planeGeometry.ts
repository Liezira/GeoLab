export type PlaneShapeType =
  | 'persegi'
  | 'persegi_panjang'
  | 'segitiga'
  | 'jajar_genjang'
  | 'belah_ketupat'
  | 'layang_layang'
  | 'trapesium'

export interface PlaneShapeParams {
  sideA: number
  sideB?: number
  sideC?: number
  sideD?: number
  height?: number
  diagonal1?: number
  diagonal2?: number
}

export interface PlaneShapeMetrics {
  name: string
  area: number
  perimeter: number
  formulaArea: string
  formulaPerimeter: string
  facts: { label: string; value: string | number }[]
  notes: string
}

export function calculatePlaneShape(
  type: PlaneShapeType,
  params: PlaneShapeParams
): PlaneShapeMetrics {
  const { sideA, sideB = sideA, sideC = sideA, sideD = sideB, height = sideA, diagonal1 = sideA, diagonal2 = sideB } = params

  switch (type) {
    case 'persegi': {
      const s = sideA
      const area = s * s
      const perimeter = 4 * s
      const diagonal = Math.sqrt(2 * s * s)
      return {
        name: 'Persegi',
        area,
        perimeter,
        formulaArea: 'L = s²',
        formulaPerimeter: 'K = 4 × s',
        facts: [
          { label: 'Sisi (s)', value: `${s} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Panjang Diagonal', value: `${diagonal.toFixed(2)} cm` },
          { label: 'Simetri Lipat', value: '4' },
          { label: 'Simetri Putar', value: 'Tingkat 4' },
        ],
        notes: 'Semua 4 sisi sama panjang dan keempat sudutnya siku-siku (90°). Kedua diagonal saling berpotongan tegak lurus.',
      }
    }

    case 'persegi_panjang': {
      const p = sideA
      const l = sideB
      const area = p * l
      const perimeter = 2 * (p + l)
      const diagonal = Math.sqrt(p * p + l * l)
      return {
        name: 'Persegi Panjang',
        area,
        perimeter,
        formulaArea: 'L = p × l',
        formulaPerimeter: 'K = 2 × (p + l)',
        facts: [
          { label: 'Panjang (p)', value: `${p} cm` },
          { label: 'Lebar (l)', value: `${l} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Diagonal', value: `${diagonal.toFixed(2)} cm` },
          { label: 'Simetri Lipat', value: '2' },
        ],
        notes: 'Sisi-sisi yang berhadapan sejajar dan sama panjang. Keempat sudutnya adalah 90°.',
      }
    }

    case 'segitiga': {
      const a = sideA // alas
      const t = height // tinggi
      const b = sideB // sisi kedua
      const c = sideC // sisi ketiga
      const area = 0.5 * a * t
      const perimeter = a + b + c
      return {
        name: 'Segitiga',
        area,
        perimeter,
        formulaArea: 'L = ½ × a × t',
        formulaPerimeter: 'K = a + b + c',
        facts: [
          { label: 'Alas (a)', value: `${a} cm` },
          { label: 'Tinggi (t)', value: `${t} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Total Sudut Dalam', value: '180°' },
          { label: 'Jumlah Sisi & Sudut', value: '3' },
        ],
        notes: 'Tinggi segitiga harus selalu ditarik tegak lurus (90°) terhadap garis perpanjangan alas.',
      }
    }

    case 'jajar_genjang': {
      const a = sideA // alas
      const b = sideB // sisi miring
      const t = height
      const area = a * t
      const perimeter = 2 * (a + b)
      return {
        name: 'Jajar Genjang',
        area,
        perimeter,
        formulaArea: 'L = a × t',
        formulaPerimeter: 'K = 2 × (a + b)',
        facts: [
          { label: 'Alas (a)', value: `${a} cm` },
          { label: 'Sisi Miring (b)', value: `${b} cm` },
          { label: 'Tinggi (t)', value: `${t} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Simetri Putar', value: 'Tingkat 2' },
        ],
        notes: 'Sisi yang berhadapan sejajar dan sama panjang. Sudut yang berdekatan berjumlah 180°.',
      }
    }

    case 'belah_ketupat': {
      const s = sideA // sisi
      const d1 = diagonal1
      const d2 = diagonal2
      const area = 0.5 * d1 * d2
      const perimeter = 4 * s
      return {
        name: 'Belah Ketupat',
        area,
        perimeter,
        formulaArea: 'L = ½ × d₁ × d₂',
        formulaPerimeter: 'K = 4 × s',
        facts: [
          { label: 'Panjang Sisi (s)', value: `${s} cm` },
          { label: 'Diagonal 1 (d₁)', value: `${d1} cm` },
          { label: 'Diagonal 2 (d₂)', value: `${d2} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Sudut Potong Diagonal', value: '90° (Tegak Lurus)' },
        ],
        notes: 'Semua 4 sisinya sama panjang. Diagonal-diagonalnya membagi dua sudut dan saling tegak lurus.',
      }
    }

    case 'layang_layang': {
      const a = sideA // sisi pendek
      const b = sideB // sisi panjang
      const d1 = diagonal1
      const d2 = diagonal2
      const area = 0.5 * d1 * d2
      const perimeter = 2 * (a + b)
      return {
        name: 'Layang-layang',
        area,
        perimeter,
        formulaArea: 'L = ½ × d₁ × d₂',
        formulaPerimeter: 'K = 2 × (a + b)',
        facts: [
          { label: 'Sisi Pendek (a)', value: `${a} cm` },
          { label: 'Sisi Panjang (b)', value: `${b} cm` },
          { label: 'Diagonal 1 (d₁)', value: `${d1} cm` },
          { label: 'Diagonal 2 (d₂)', value: `${d2} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
        ],
        notes: 'Memiliki dua pasang sisi yang sama panjang dan sepasang sudut yang sama besar di antara sisi yang tidak sama.',
      }
    }

    case 'trapesium': {
      const a = sideA // sisi atas
      const b = sideB // sisi alas bawah
      const t = height
      const c = sideC // kaki 1
      const d = sideD // kaki 2
      const area = 0.5 * (a + b) * t
      const perimeter = a + b + c + d
      return {
        name: 'Trapesium',
        area,
        perimeter,
        formulaArea: 'L = ½ × (a + b) × t',
        formulaPerimeter: 'K = a + b + c + d',
        facts: [
          { label: 'Sisi Atas (a)', value: `${a} cm` },
          { label: 'Sisi Bawah (b)', value: `${b} cm` },
          { label: 'Tinggi (t)', value: `${t} cm` },
          { label: 'Keliling (K)', value: `${perimeter.toFixed(1)} cm` },
          { label: 'Luas (L)', value: `${area.toFixed(1)} cm²` },
          { label: 'Sifat Khas', value: 'Tepat sepasang sisi sejajar' },
        ],
        notes: 'Bangun segiempat yang tepat mempunyai sepasang sisi yang sejajar (a dan b).',
      }
    }
  }
}
