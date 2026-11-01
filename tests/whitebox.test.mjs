import assert from 'node:assert'
import { calculatePlaneShape } from '../src/geometry/planeGeometry.ts'
import { calculateSolid } from '../src/geometry/solids3d.ts'
import { calculatePrism, polygonPoints } from '../src/geometry/prism.ts'
import { calculateCircle, getCircleSvgCoordinates } from '../src/geometry/circleMath.ts'
import {
  calculatePattern,
  calculateArithmetic,
  calculatePythagoras,
} from '../src/geometry/arithmeticMath.ts'
import {
  generateFinalExam,
  generateDailyExam,
  generatePracticeExam,
  evaluateAnswer,
  gradeExam,
} from '../src/utils/examEngine.ts'
import { QUESTION_BANK } from '../src/data/questionBank.ts'
import { getQuestion3DConfig } from '../src/utils/question3dResolver.ts'

console.log('=== RUNNING TIER 4: COMPREHENSIVE WHITEBOX TEST SUITE ===')

// 1. Math Engines Boundary & Robustness Tests
console.log('1. Testing Math Engine Boundaries & NaN Guards...')

// 1.1 Plane shapes boundaries
const planeShapes = [
  'persegi',
  'persegi_panjang',
  'segitiga',
  'jajar_genjang',
  'belah_ketupat',
  'layang_layang',
  'trapesium',
]
planeShapes.forEach(shape => {
  const res = calculatePlaneShape(shape, { sideA: 0, sideB: 0, height: 0 })
  assert.ok(!Number.isNaN(res.area), `${shape} area returned NaN`)
  assert.ok(!Number.isNaN(res.perimeter), `${shape} perimeter returned NaN`)
  assert.ok(res.facts.length > 0)
})

// 1.2 Solids boundaries
const solidShapes = ['kubus', 'balok', 'limas_segiempat', 'limas_segitiga', 'kerucut', 'bola']
solidShapes.forEach(shape => {
  const res = calculateSolid(shape, { dimA: 1, dimB: 1, dimC: 1 })
  assert.ok(res.volume > 0, `${shape} volume <= 0`)
  assert.ok(res.surfaceArea > 0, `${shape} surfaceArea <= 0`)
  assert.ok(!Number.isNaN(res.volume), `${shape} volume NaN`)
  assert.ok(!Number.isNaN(res.surfaceArea), `${shape} surfaceArea NaN`)
})

// 1.3 Prism & polygon points
const prismShapes = [3, 4, 5, 6, 8, 'trapezoid', 'cylinder']
prismShapes.forEach(shape => {
  const res = calculatePrism(shape, 5, 10)
  assert.ok(res.volume > 0)
  assert.ok(res.surfaceArea > 0)
  const pts = polygonPoints(shape, 5)
  assert.ok(pts.length >= 3)
  pts.forEach(p => {
    assert.ok(!Number.isNaN(p.x) && !Number.isNaN(p.z), `NaN coordinate in ${shape}`)
  })
})

// 1.4 Circle boundary angles & SVG paths
;[0, 15, 90, 180, 270, 360, 400].forEach(deg => {
  const c = calculateCircle(7, deg)
  assert.ok(!Number.isNaN(c.circumference))
  assert.ok(!Number.isNaN(c.area))
  assert.ok(!Number.isNaN(c.sectorArea))
  assert.ok(c.segmentArea >= 0)
  assert.ok(c.apothem >= 0, 'Apothem must be non-negative distance')

  const svg = getCircleSvgCoordinates(250, 200, 100, deg)
  assert.ok(svg.sectorPath.length > 5)
  assert.ok(svg.arcPath.length > 5)
  assert.ok(svg.segmentPath.length > 5)
  assert.ok(!Number.isNaN(svg.p1.x) && !Number.isNaN(svg.p2.y))
})

// 1.5 Arithmetic & Patterns
;['persegi', 'segitiga', 'persegi_panjang', 'ganjil'].forEach(pat => {
  ;[-5, 0, 1, 6, 12, 100].forEach(n => {
    const res = calculatePattern(pat, n)
    assert.ok(res.n >= 1 && res.n <= 12, 'safeN clamping invariant')
    assert.ok(res.value > 0)
    assert.strictEqual(res.dots.length, res.value)
  })
})

const arithRes = calculateArithmetic(50, -4, 15)
assert.strictEqual(arithRes.un, -6)
assert.strictEqual(arithRes.sn, 330)

const pythRight = calculatePythagoras(3, 4)
assert.strictEqual(pythRight.c, 5)
assert.strictEqual(pythRight.triangleType, 'siku-siku')
const pythObtuse = calculatePythagoras(3, 4, 6)
assert.strictEqual(pythObtuse.triangleType, 'tumpul')
const pythAcute = calculatePythagoras(3, 4, 4.5)
assert.strictEqual(pythAcute.triangleType, 'lancip')
console.log('✓ Math engine boundary tests passed!')

// 2. Question Bank Answer Key Distribution Audit
console.log('2. Auditing Single Choice Key Balance (Target ~25% each)...')
const singleDist = { A: 0, B: 0, C: 0, D: 0 }
QUESTION_BANK.filter(q => q.type === 'single_choice').forEach(q => {
  singleDist[q.correctAnswer] = (singleDist[q.correctAnswer] || 0) + 1
})
console.log('Actual Single Choice Distribution:', singleDist)
assert.strictEqual(singleDist.A, 22)
assert.strictEqual(singleDist.B, 21)
assert.strictEqual(singleDist.C, 21)
assert.strictEqual(singleDist.D, 21)
assert.strictEqual(singleDist.A + singleDist.B + singleDist.C + singleDist.D, 85)
console.log('✓ Question bank key balance audit passed (A:22, B:21, C:21, D:21)!')

// 3. Exam Generator Monte Carlo Invariant Testing (100 runs)
console.log('3. Running Monte Carlo 100x Invariant Tests...')
for (let run = 0; run < 100; run++) {
  const finalExam = generateFinalExam()
  assert.strictEqual(finalExam.length, 35)

  // Invariant 1: Exactly 35 unique questions
  const idSet = new Set(finalExam.map(q => q.id))
  assert.strictEqual(idSet.size, 35, `Duplicate found in final exam run ${run}`)

  // Invariant 2: Exactly 30 singles + 5 specials
  const singles = finalExam.filter(q => q.type === 'single_choice')
  const specials = finalExam.filter(q => q.type !== 'single_choice')
  assert.strictEqual(singles.length, 30)
  assert.strictEqual(specials.length, 5)

  // Invariant 3: Exactly 6 singles from each category
  const catCounts = {}
  singles.forEach(q => {
    catCounts[q.category] = (catCounts[q.category] || 0) + 1
  })
  Object.values(catCounts).forEach(cnt => {
    assert.strictEqual(cnt, 6)
  })
}
console.log('✓ Monte Carlo 100x final exam generation invariant passed!')

// 4. Evaluation Engine & Sparse Array Edge Cases
console.log('4. Testing Evaluation Edge Cases & Sparse Array Resistance...')
// gradeExam with empty questions array must NOT produce score NaN
const emptyGrading = gradeExam([], {})
assert.strictEqual(emptyGrading.score, 0, 'Empty grading score must be 0, not NaN')
assert.ok(!Number.isNaN(emptyGrading.score))

// Sparse array evaluation test
const tfQ = {
  id: 'tf-test',
  category: 'prisma',
  topicTitle: 'Test',
  difficulty: 'sedang',
  type: 'true_false',
  prompt: 'Test',
  statements: [
    { id: '1', statement: 'S1', isCorrect: true },
    { id: '2', statement: 'S2', isCorrect: false },
    { id: '3', statement: 'S3', isCorrect: true },
  ],
  correctAnswer: ['true', 'false', 'true'],
  explanation: { langkah: [], kesimpulan: '' },
}

// Sparse array with holes
const sparseAns = []
sparseAns[2] = 'true' // [empty, empty, 'true']
assert.strictEqual(evaluateAnswer(tfQ, sparseAns), false)

// Incomplete true_false answers
assert.strictEqual(evaluateAnswer(tfQ, ['true', 'false']), false)
assert.strictEqual(evaluateAnswer(tfQ, ['true', 'false', 'false']), false)
assert.strictEqual(evaluateAnswer(tfQ, ['true', 'false', 'true']), true)

// Multi-select permutations and edge cases
const multiQ = {
  id: 'multi-test',
  category: 'bangun_datar',
  topicTitle: 'Test',
  difficulty: 'sedang',
  type: 'multi_select',
  prompt: 'Test',
  correctAnswer: ['A', 'C'],
  explanation: { langkah: [], kesimpulan: '' },
}
assert.strictEqual(evaluateAnswer(multiQ, ['A', 'C']), true)
assert.strictEqual(evaluateAnswer(multiQ, ['C', 'A']), true)
assert.strictEqual(evaluateAnswer(multiQ, ['A']), false)
assert.strictEqual(evaluateAnswer(multiQ, ['A', 'B', 'C']), false)
assert.strictEqual(evaluateAnswer(multiQ, ['A', 'A']), false)
assert.strictEqual(evaluateAnswer(multiQ, undefined), false)
assert.strictEqual(evaluateAnswer(multiQ, null), false)
console.log('✓ Evaluation edge cases & sparse array resistance passed!')

// 5. 3D Resolver Question Mapping Coverage
console.log('5. Auditing 3D Resolver across all 100 questions...')
QUESTION_BANK.forEach(q => {
  const config = getQuestion3DConfig(q)
  if (q.category === 'bangun_ruang' || q.category === 'prisma') {
    assert.ok(config !== null, `Question ${q.id} must resolve a 3D config`)
    assert.ok(config.type === 'solid' || config.type === 'prism')
    assert.ok(typeof config.dimA === 'number' && config.dimA > 0)
  }
})
console.log('✓ 3D Resolver coverage audit passed!')

console.log('=== ALL TIER 4 WHITEBOX TESTS COMPLETED SUCCESSFULLY! ===')
