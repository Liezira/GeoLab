export interface CircleMetrics {
  radius: number
  diameter: number
  circumference: number
  area: number
  angleDeg: number
  arcLength: number
  chordLength: number
  sectorArea: number
  apothem: number
  triangleArea: number
  segmentArea: number
  inscribedAngle: number
}

export function calculateCircle(radius: number, angleDeg: number): CircleMetrics {
  const r = Math.max(0.5, radius)
  const alpha = Math.min(360, Math.max(1, angleDeg))
  const rad = (alpha * Math.PI) / 180
  const halfRad = rad / 2

  const diameter = 2 * r
  const circumference = 2 * Math.PI * r
  const area = Math.PI * r * r

  const arcLength = (alpha / 360) * circumference
  const chordLength = 2 * r * Math.sin(halfRad)
  const sectorArea = (alpha / 360) * area
  const apothem = Math.abs(r * Math.cos(halfRad))
  const triangleArea = 0.5 * r * r * Math.sin(rad)
  const segmentArea = Math.max(0, sectorArea - triangleArea)
  const inscribedAngle = alpha / 2

  return {
    radius: r,
    diameter,
    circumference,
    area,
    angleDeg: alpha,
    arcLength,
    chordLength,
    sectorArea,
    apothem,
    triangleArea,
    segmentArea,
    inscribedAngle,
  }
}

/**
 * Returns SVG path data for rendering circle elements centered at (cx, cy)
 */
export function getCircleSvgCoordinates(
  cx: number,
  cy: number,
  radiusPx: number,
  angleDeg: number
) {
  const startAngle = -90 // Start from 12 o'clock
  const endAngle = startAngle + angleDeg

  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180
  const midRad = ((startAngle + angleDeg / 2) * Math.PI) / 180

  const p1 = {
    x: cx + radiusPx * Math.cos(startRad),
    y: cy + radiusPx * Math.sin(startRad),
  }
  const p2 = {
    x: cx + radiusPx * Math.cos(endRad),
    y: cy + radiusPx * Math.sin(endRad),
  }

  const largeArcFlag = angleDeg > 180 ? 1 : 0

  // Sector path (center -> p1 -> arc -> p2 -> center)
  const sectorPath =
    angleDeg >= 360
      ? `M ${cx - radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx + radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx - radiusPx} ${cy} Z`
      : `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${radiusPx} ${radiusPx} 0 ${largeArcFlag} 1 ${p2.x} ${p2.y} Z`

  // Arc path (p1 -> arc -> p2)
  const arcPath =
    angleDeg >= 360
      ? `M ${cx - radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx + radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx - radiusPx} ${cy}`
      : `M ${p1.x} ${p1.y} A ${radiusPx} ${radiusPx} 0 ${largeArcFlag} 1 ${p2.x} ${p2.y}`

  // Chord path (p1 -> p2)
  const chordPath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`

  // Segment path (p1 -> arc -> p2 -> chord back to p1)
  const segmentPath =
    angleDeg >= 360
      ? `M ${cx - radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx + radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 1 0 ${cx - radiusPx} ${cy} Z`
      : `M ${p1.x} ${p1.y} A ${radiusPx} ${radiusPx} 0 ${largeArcFlag} 1 ${p2.x} ${p2.y} Z`

  // Apothem midpoint and line
  const midChord = {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
  const apothemPath = `M ${cx} ${cy} L ${midChord.x} ${midChord.y}`

  return {
    center: { x: cx, y: cy },
    p1,
    p2,
    midChord,
    sectorPath,
    arcPath,
    chordPath,
    segmentPath,
    apothemPath,
    midArc: {
      x: cx + radiusPx * Math.cos(midRad),
      y: cy + radiusPx * Math.sin(midRad),
    },
  }
}
