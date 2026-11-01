export type NumberPatternType = 'persegi' | 'segitiga' | 'persegi_panjang' | 'ganjil'

export interface NumberPatternResult {
  name: string
  formula: string
  n: number
  value: number
  sequence: number[]
  dots: { x: number; y: number }[]
  explanation: string
}

export function calculatePattern(type: NumberPatternType, n: number): NumberPatternResult {
  const safeN = Math.min(12, Math.max(1, Math.round(n)))
  const sequence: number[] = []

  switch (type) {
    case 'persegi': {
      for (let i = 1; i <= Math.min(safeN + 3, 15); i++) sequence.push(i * i)
      const value = safeN * safeN
      const dots: { x: number; y: number }[] = []
      for (let r = 0; r < safeN; r++) {
        for (let c = 0; c < safeN; c++) {
          dots.push({ x: c, y: r })
        }
      }
      return {
        name: 'Pola Bilangan Persegi',
        formula: 'Uₙ = n²',
        n: safeN,
        value,
        sequence,
        dots,
        explanation: `Suku ke-${safeN} memiliki ${value} titik (${safeN} baris × ${safeN} kolom). Pola ini selalu menghasilkan kuadrat sempurna.`,
      }
    }

    case 'segitiga': {
      for (let i = 1; i <= Math.min(safeN + 3, 15); i++) sequence.push((i * (i + 1)) / 2)
      const value = (safeN * (safeN + 1)) / 2
      const dots: { x: number; y: number }[] = []
      for (let row = 0; row < safeN; row++) {
        const countInRow = row + 1
        const offset = (safeN - countInRow) / 2
        for (let col = 0; col < countInRow; col++) {
          dots.push({ x: offset + col, y: row })
        }
      }
      return {
        name: 'Pola Bilangan Segitiga',
        formula: 'Uₙ = ½ × n × (n + 1)',
        n: safeN,
        value,
        sequence,
        dots,
        explanation: `Suku ke-${safeN} adalah jumlah dari 1 + 2 + 3 + ... + ${safeN} = ${value} titik, membentuk susunan piramida segitiga sama sisi.`,
      }
    }

    case 'persegi_panjang': {
      for (let i = 1; i <= Math.min(safeN + 3, 15); i++) sequence.push(i * (i + 1))
      const value = safeN * (safeN + 1)
      const dots: { x: number; y: number }[] = []
      for (let r = 0; r < safeN; r++) {
        for (let c = 0; c < safeN + 1; c++) {
          dots.push({ x: c, y: r })
        }
      }
      return {
        name: 'Pola Bilangan Persegi Panjang',
        formula: 'Uₙ = n × (n + 1)',
        n: safeN,
        value,
        sequence,
        dots,
        explanation: `Suku ke-${safeN} memiliki ${value} titik berdimensi ${safeN} baris × ${safeN + 1} kolom. Nilai ini selalu tepat 2 kali lipat pola segitiga!`,
      }
    }

    case 'ganjil': {
      for (let i = 1; i <= Math.min(safeN + 3, 15); i++) sequence.push(2 * i - 1)
      const value = 2 * safeN - 1
      const dots: { x: number; y: number }[] = []
      for (let i = 0; i < value; i++) {
        dots.push({ x: i, y: 0 })
      }
      return {
        name: 'Pola Bilangan Ganjil',
        formula: 'Uₙ = 2n - 1',
        n: safeN,
        value,
        sequence,
        dots,
        explanation: `Suku ke-${safeN} bernilai ${value}. Menariknya, jumlah ${safeN} suku pertama bilangan ganjil selalu sama dengan ${safeN}² (Pola Persegi).`,
      }
    }
  }
}

export interface ArithmeticProgressionResult {
  a: number
  b: number
  n: number
  un: number
  sn: number
  sequence: number[]
  steps: {
    unStep: string
    snStep: string
  }
}

export function calculateArithmetic(a: number, b: number, n: number): ArithmeticProgressionResult {
  const safeN = Math.min(50, Math.max(1, Math.round(n)))
  const un = a + (safeN - 1) * b
  const sn = (safeN / 2) * (2 * a + (safeN - 1) * b)

  const sequence: number[] = []
  const countToShow = Math.min(safeN, 8)
  for (let i = 1; i <= countToShow; i++) {
    sequence.push(a + (i - 1) * b)
  }

  const unStep = `U_${safeN} = ${a} + (${safeN} - 1) × (${b}) = ${a} + ${safeN - 1} × ${b} = ${un}`
  const snStep = `S_${safeN} = (${safeN}/2) × (2(${a}) + (${safeN} - 1)(${b})) = ${safeN / 2} × (${2 * a} + ${(safeN - 1) * b}) = ${sn}`

  return {
    a,
    b,
    n: safeN,
    un,
    sn,
    sequence,
    steps: { unStep, snStep },
  }
}

export interface PythagorasResult {
  a: number
  b: number
  c: number
  isRightTriangle: boolean
  triangleType: 'siku-siku' | 'lancip' | 'tumpul'
  aSquared: number
  bSquared: number
  cSquared: number
  area: number
  perimeter: number
}

export function calculatePythagoras(a: number, b: number, cUser?: number): PythagorasResult {
  const safeA = Math.max(1, a)
  const safeB = Math.max(1, b)
  const c = cUser !== undefined ? cUser : Math.sqrt(safeA * safeA + safeB * safeB)

  const aSquared = safeA * safeA
  const bSquared = safeB * safeB
  const cSquared = c * c

  const diff = cSquared - (aSquared + bSquared)
  let triangleType: 'siku-siku' | 'lancip' | 'tumpul' = 'siku-siku'
  if (Math.abs(diff) < 0.01) triangleType = 'siku-siku'
  else if (cSquared < aSquared + bSquared) triangleType = 'lancip'
  else triangleType = 'tumpul'

  return {
    a: safeA,
    b: safeB,
    c: Number(c.toFixed(2)),
    isRightTriangle: triangleType === 'siku-siku',
    triangleType,
    aSquared: Number(aSquared.toFixed(2)),
    bSquared: Number(bSquared.toFixed(2)),
    cSquared: Number(cSquared.toFixed(2)),
    area: Number((0.5 * safeA * safeB).toFixed(2)),
    perimeter: Number((safeA + safeB + c).toFixed(2)),
  }
}

export const POPULAR_PYTHAGOREAN_TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [7, 24, 25],
  [8, 15, 17],
  [9, 40, 41],
  [11, 60, 61],
  [12, 35, 37],
  [20, 21, 29],
]
