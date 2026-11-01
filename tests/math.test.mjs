import assert from 'node:assert'
import { calculatePlaneShape } from '../src/geometry/planeGeometry.ts'
import { calculateSolid } from '../src/geometry/solids3d.ts'
import { calculatePrism } from '../src/geometry/prism.ts'
import { calculateCircle, getCircleSvgCoordinates } from '../src/geometry/circleMath.ts'
import {
  calculatePattern,
  calculateArithmetic,
  calculatePythagoras,
  POPULAR_PYTHAGOREAN_TRIPLES,
} from '../src/geometry/arithmeticMath.ts'

console.log('=== RUNNING TIER 1: MATHEMATICAL ENGINES SUITE ===')

// 1. Plane Geometry
console.log('Testing Plane Shapes...')
const square = calculatePlaneShape('persegi', { sideA: 10 })
assert.strictEqual(square.area, 100)
assert.strictEqual(square.perimeter, 40)

const rect = calculatePlaneShape('persegi_panjang', { sideA: 12, sideB: 5 })
assert.strictEqual(rect.area, 60)
assert.strictEqual(rect.perimeter, 34)

const triangle = calculatePlaneShape('segitiga', { sideA: 10, sideB: 8, sideC: 8, height: 6 })
assert.strictEqual(triangle.area, 30)
assert.strictEqual(triangle.perimeter, 26)

const rhombus = calculatePlaneShape('belah_ketupat', { sideA: 10, diagonal1: 12, diagonal2: 16 })
assert.strictEqual(rhombus.area, 96)
assert.strictEqual(rhombus.perimeter, 40)

const trap = calculatePlaneShape('trapesium', { sideA: 10, sideB: 18, height: 6, sideC: 5, sideD: 5 })
assert.strictEqual(trap.area, 84)
assert.strictEqual(trap.perimeter, 38)
console.log('✓ Plane Geometry tests passed!')

// 2. Solids 3D
console.log('Testing Solids 3D...')
const cube = calculateSolid('kubus', { dimA: 6 })
assert.strictEqual(cube.volume, 216)
assert.strictEqual(cube.surfaceArea, 216)
assert.strictEqual(cube.faces, 6)
assert.strictEqual(cube.edges, 12)
assert.strictEqual(cube.vertices, 8)

const box = calculateSolid('balok', { dimA: 10, dimB: 6, dimC: 4 })
assert.strictEqual(box.volume, 240)
assert.strictEqual(box.surfaceArea, 248)

const pyramid = calculateSolid('limas_segiempat', { dimA: 10, dimB: 12 })
assert.ok(Math.abs(pyramid.volume - 400) < 1e-4)
assert.strictEqual(pyramid.surfaceArea, 360) // 100 + 4 * (1/2 * 10 * 13) = 360

const cone = calculateSolid('kerucut', { dimA: 7, dimB: 24 }) // r = 7, t = 24 -> s = 25
assert.ok(Math.abs(cone.volume - (1 / 3) * Math.PI * 49 * 24) < 1e-4)
assert.ok(Math.abs(cone.surfaceArea - Math.PI * 7 * (7 + 25)) < 1e-4)

const sphere = calculateSolid('bola', { dimA: 7 })
assert.ok(Math.abs(sphere.surfaceArea - 4 * Math.PI * 49) < 1e-4)
console.log('✓ Solids 3D tests passed!')

// 3. Prism & Tabung
console.log('Testing Prism & Cylinder...')
const triPrism = calculatePrism(3, 4, 8)
assert.strictEqual(triPrism.faces, 5)
assert.strictEqual(triPrism.edges, 9)
assert.strictEqual(triPrism.vertices, 6)

const cyl = calculatePrism('cylinder', 5, 10)
assert.ok(Math.abs(cyl.area - Math.PI * 25) < 1e-4)
assert.ok(Math.abs(cyl.volume - Math.PI * 25 * 10) < 1e-4)
console.log('✓ Prism & Cylinder tests passed!')

// 4. Circle Math
console.log('Testing Circle Math (Juring & Tembereng)...')
const circle = calculateCircle(10, 90)
assert.strictEqual(circle.diameter, 20)
assert.ok(Math.abs(circle.sectorArea - 0.25 * Math.PI * 100) < 1e-4)
assert.strictEqual(circle.triangleArea, 50)
assert.ok(Math.abs(circle.segmentArea - (circle.sectorArea - 50)) < 1e-4)
assert.strictEqual(circle.inscribedAngle, 45)

const coords = getCircleSvgCoordinates(250, 200, 100, 90)
assert.ok(coords.sectorPath.includes('M 250 200'))
assert.ok(coords.arcPath.length > 5)
assert.ok(coords.chordPath.length > 5)
console.log('✓ Circle Math tests passed!')

// 5. Arithmetic & Pythagoras
console.log('Testing Arithmetic & Pythagoras...')
const sqPattern = calculatePattern('persegi', 8)
assert.strictEqual(sqPattern.value, 64)
assert.strictEqual(sqPattern.dots.length, 64)

const triPattern = calculatePattern('segitiga', 8)
assert.strictEqual(triPattern.value, 36)
assert.strictEqual(triPattern.dots.length, 36)

const arithProg = calculateArithmetic(50, -4, 15)
assert.strictEqual(arithProg.un, -6)
assert.strictEqual(arithProg.sn, 330)

const pythRight = calculatePythagoras(6, 8)
assert.strictEqual(pythRight.c, 10)
assert.strictEqual(pythRight.isRightTriangle, true)
assert.strictEqual(pythRight.triangleType, 'siku-siku')

const pythObtuse = calculatePythagoras(6, 8, 11)
assert.strictEqual(pythObtuse.isRightTriangle, false)
assert.strictEqual(pythObtuse.triangleType, 'tumpul')

assert.ok(POPULAR_PYTHAGOREAN_TRIPLES.length >= 8)
console.log('✓ Arithmetic & Pythagoras tests passed!')

console.log('=== ALL TIER 1 TESTS PASSED SUCCESSFULLY! ===')
