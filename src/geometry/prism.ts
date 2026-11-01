export type PrismShape = 3 | 4 | 5 | 6 | 8 | 'trapezoid' | 'cylinder'
export type PrismSides = PrismShape

export type PrismMetrics = {
  area: number
  perimeter: number
  volume: number
  surfaceArea: number
  faces: number
  edges: number
  vertices: number
}

export function prismName(sides: PrismSides) {
  if (sides === 3) return 'Prisma Segitiga'
  if (sides === 4) return 'Prisma Segiempat (Balok/Kubus)'
  if (sides === 5) return 'Prisma Segilima'
  if (sides === 6) return 'Prisma Segienam'
  if (sides === 8) return 'Prisma Segidelapan'
  if (sides === 'trapezoid') return 'Prisma Trapesium'
  return 'Tabung (Silinder)'
}

export function polygonPoints(sides: PrismSides, sideLength: number): { x: number; z: number }[] {
  if (sides === 'trapezoid') {
    const b1 = sideLength * 1.3
    const b2 = sideLength * 0.7
    const ha = sideLength * 0.85
    return [
      { x: -b1 / 2, z: ha / 2 },
      { x: b1 / 2, z: ha / 2 },
      { x: b2 / 2, z: -ha / 2 },
      { x: -b2 / 2, z: -ha / 2 },
    ]
  }

  if (sides === 'cylinder') {
    const segments = 32
    const radius = sideLength
    return Array.from({ length: segments }, (_, index) => {
      const angle = (index * Math.PI * 2) / segments
      return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius }
    })
  }

  const radius = sideLength / (2 * Math.sin(Math.PI / sides))
  const offset = sides === 4 ? Math.PI / 4 : -Math.PI / 2
  return Array.from({ length: sides }, (_, index) => {
    const angle = offset + (index * Math.PI * 2) / sides
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius }
  })
}

export function calculatePrism(sides: PrismSides, sideLength: number, height: number): PrismMetrics {
  if (sides === 'trapezoid') {
    const b1 = sideLength * 1.3
    const b2 = sideLength * 0.7
    const ha = sideLength * 0.85
    const area = ((b1 + b2) * ha) / 2
    const leg = Math.sqrt(ha * ha + Math.pow((b1 - b2) / 2, 2))
    const perimeter = b1 + b2 + 2 * leg
    return {
      area,
      perimeter,
      volume: area * height,
      surfaceArea: 2 * area + perimeter * height,
      faces: 6,
      edges: 12,
      vertices: 8,
    }
  }

  if (sides === 'cylinder') {
    const radius = sideLength
    const area = Math.PI * radius * radius
    const perimeter = 2 * Math.PI * radius
    return {
      area,
      perimeter,
      volume: area * height,
      surfaceArea: 2 * area + perimeter * height,
      faces: 3,
      edges: 2,
      vertices: 0,
    }
  }

  const area = (sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides))
  const perimeter = sides * sideLength
  return {
    area,
    perimeter,
    volume: area * height,
    surfaceArea: 2 * area + perimeter * height,
    faces: sides + 2,
    edges: sides * 3,
    vertices: sides * 2,
  }
}

export function formatDecimal(value: number) {
  return value.toLocaleString('id-ID', { maximumFractionDigits: 1 })
}
