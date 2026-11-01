export type SolidShapeType =
  | 'kubus'
  | 'balok'
  | 'limas_segiempat'
  | 'limas_segitiga'
  | 'kerucut'
  | 'bola'

export interface SolidShapeParams {
  dimA: number // sisi (s) / panjang (p) / jari-jari (r)
  dimB?: number // lebar (l) / tinggi (t)
  dimC?: number // tinggi (t) balok
}

export interface SolidShapeMetrics {
  name: string
  volume: number
  surfaceArea: number
  faces: number
  edges: number
  vertices: number
  formulaVolume: string
  formulaSurfaceArea: string
  facts: { label: string; value: string | number }[]
  notes: string
}

export function calculateSolid(
  type: SolidShapeType,
  params: SolidShapeParams
): SolidShapeMetrics {
  const { dimA, dimB = dimA, dimC = dimB } = params

  switch (type) {
    case 'kubus': {
      const s = dimA
      const volume = s * s * s
      const surfaceArea = 6 * s * s
      const diagBidang = s * Math.SQRT2
      const diagRuang = s * Math.sqrt(3)
      return {
        name: 'Kubus',
        volume,
        surfaceArea,
        faces: 6,
        edges: 12,
        vertices: 8,
        formulaVolume: 'V = s³',
        formulaSurfaceArea: 'LP = 6 × s²',
        facts: [
          { label: 'Panjang Rusuk (s)', value: `${s} cm` },
          { label: 'Volume (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
          { label: 'Diagonal Bidang', value: `${diagBidang.toFixed(2)} cm` },
          { label: 'Diagonal Ruang', value: `${diagRuang.toFixed(2)} cm` },
          { label: 'Bidang Diagonal', value: '6 bidang kongruen' },
        ],
        notes: 'Semua 6 bidang sisinya berupa persegi kongruen dan 12 rusuknya sama panjang.',
      }
    }

    case 'balok': {
      const p = dimA
      const l = dimB
      const t = dimC
      const volume = p * l * t
      const surfaceArea = 2 * (p * l + p * t + l * t)
      const diagRuang = Math.sqrt(p * p + l * l + t * t)
      return {
        name: 'Balok',
        volume,
        surfaceArea,
        faces: 6,
        edges: 12,
        vertices: 8,
        formulaVolume: 'V = p × l × t',
        formulaSurfaceArea: 'LP = 2(pl + pt + lt)',
        facts: [
          { label: 'Panjang (p)', value: `${p} cm` },
          { label: 'Lebar (l)', value: `${l} cm` },
          { label: 'Tinggi (t)', value: `${t} cm` },
          { label: 'Volume (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
          { label: 'Panjang Diagonal Ruang', value: `${diagRuang.toFixed(2)} cm` },
        ],
        notes: 'Memiliki 3 pasang bidang persegi panjang yang berhadapan sejajar dan kongruen.',
      }
    }

    case 'limas_segiempat': {
      const s = dimA // sisi alas
      const t = dimB // tinggi limas
      const luasAlas = s * s
      const volume = (luasAlas * t) / 3
      const tinggiSegitiga = Math.sqrt(t * t + Math.pow(s / 2, 2))
      const luasSisiTegak = 4 * (0.5 * s * tinggiSegitiga)
      const surfaceArea = luasAlas + luasSisiTegak
      return {
        name: 'Limas Segiempat',
        volume,
        surfaceArea,
        faces: 5,
        edges: 8,
        vertices: 5,
        formulaVolume: 'V = ⅓ × Lₐ × t',
        formulaSurfaceArea: 'LP = Lₐ + 4 × L_segitiga',
        facts: [
          { label: 'Sisi Alas (s)', value: `${s} cm` },
          { label: 'Tinggi Limas (t)', value: `${t} cm` },
          { label: 'Tinggi Sisi Tegak (tₛ)', value: `${tinggiSegitiga.toFixed(2)} cm` },
          { label: 'Volume (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
          { label: 'Titik Puncak', value: '1 titik puncak atas' },
        ],
        notes: 'Alas berbentuk segiempat dan 4 sisi tegak berbentuk segitiga yang bertemu di satu titik puncak.',
      }
    }

    case 'limas_segitiga': {
      const a = dimA // sisi alas segitiga sama sisi
      const t = dimB // tinggi limas
      const luasAlas = (Math.sqrt(3) / 4) * a * a
      const volume = (luasAlas * t) / 3
      const rIn = a / (2 * Math.sqrt(3))
      const ts = Math.sqrt(t * t + rIn * rIn)
      const luasSisiTegak = 3 * (0.5 * a * ts)
      const surfaceArea = luasAlas + luasSisiTegak
      return {
        name: 'Limas Segitiga (Tetrahedron)',
        volume,
        surfaceArea,
        faces: 4,
        edges: 6,
        vertices: 4,
        formulaVolume: 'V = ⅓ × Lₐ × t',
        formulaSurfaceArea: 'LP = Lₐ + 3 × L_tegak',
        facts: [
          { label: 'Sisi Alas (a)', value: `${a} cm` },
          { label: 'Tinggi Limas (t)', value: `${t} cm` },
          { label: 'Volume (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
          { label: 'Jumlah Bidang Sisi', value: '4 sisi segitiga' },
        ],
        notes: 'Limas dengan alas segitiga. Jika seluruh 4 sisinya segitiga sama sisi kongruen disebut tetrahedron beraturan.',
      }
    }

    case 'kerucut': {
      const r = dimA // jari-jari
      const t = dimB // tinggi
      const s = Math.sqrt(r * r + t * t) // garis pelukis
      const volume = (Math.PI * r * r * t) / 3
      const luasSelimut = Math.PI * r * s
      const surfaceArea = Math.PI * r * (r + s)
      return {
        name: 'Kerucut',
        volume,
        surfaceArea,
        faces: 2,
        edges: 1,
        vertices: 1,
        formulaVolume: 'V = ⅓ × π × r² × t',
        formulaSurfaceArea: 'LP = πr(r + s)',
        facts: [
          { label: 'Jari-jari (r)', value: `${r} cm` },
          { label: 'Tinggi (t)', value: `${t} cm` },
          { label: 'Garis Pelukis (s)', value: `${s.toFixed(2)} cm` },
          { label: 'Volume (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Selimut', value: `${luasSelimut.toFixed(1)} cm²` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
        ],
        notes: 'Limas istimewa dengan alas lingkaran dan selimut berupa bidang lengkung kerucut.',
      }
    }

    case 'bola': {
      const r = dimA
      const volume = (4 * Math.PI * r * r * r) / 3
      const surfaceArea = 4 * Math.PI * r * r
      const volumeSetengah = volume / 2
      const lpSetengahPadat = 3 * Math.PI * r * r
      return {
        name: 'Bola',
        volume,
        surfaceArea,
        faces: 1,
        edges: 0,
        vertices: 0,
        formulaVolume: 'V = ⁴⁄₃ × π × r³',
        formulaSurfaceArea: 'LP = 4 × π × r²',
        facts: [
          { label: 'Jari-jari (r)', value: `${r} cm` },
          { label: 'Diameter (d)', value: `${(2 * r).toFixed(1)} cm` },
          { label: 'Volume Penuh (V)', value: `${volume.toFixed(1)} cm³` },
          { label: 'Luas Permukaan (LP)', value: `${surfaceArea.toFixed(1)} cm²` },
          { label: 'Volume ½ Bola', value: `${volumeSetengah.toFixed(1)} cm³` },
          { label: 'LP ½ Bola Padat', value: `${lpSetengahPadat.toFixed(1)} cm²` },
        ],
        notes: 'Bangun ruang sisi lengkung sempurna yang terbentuk dari perputaran lingkaran sejauh 360° pada garis tengahnya.',
      }
    }
  }
}
