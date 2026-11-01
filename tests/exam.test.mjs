import assert from 'node:assert'
import {
  generateFinalExam,
  generateDailyExam,
  generatePracticeExam,
  evaluateAnswer,
  gradeExam,
} from '../src/utils/examEngine.ts'

console.log('=== RUNNING TIER 3: EXAM ENGINE & GRADING SUITE ===')

// 1. Final Exam Generation (35 Soal)
console.log('Testing Final Exam Generator (35 Soal, 90 Menit)...')
const finalExam = generateFinalExam()
assert.strictEqual(finalExam.length, 35, 'Final exam must produce exactly 35 questions')

const singles = finalExam.filter(q => q.type === 'single_choice')
const specials = finalExam.filter(q => q.type !== 'single_choice')
assert.strictEqual(singles.length, 30, 'Final exam must have 30 single_choice questions')
assert.strictEqual(specials.length, 5, 'Final exam must have 5 special questions')

// Category distribution of the 30 singles
const singleCatCounts = {}
singles.forEach(q => {
  singleCatCounts[q.category] = (singleCatCounts[q.category] || 0) + 1
})
console.log('Single choice distribution across categories:', singleCatCounts)
Object.values(singleCatCounts).forEach(cnt => {
  assert.strictEqual(cnt, 6, 'Each category must contribute exactly 6 single_choice questions')
})
console.log('✓ Final exam 35-question distribution passed!')

// 2. Daily Exam Generation (20 Soal)
console.log('Testing Daily Exam Generator (20 Soal)...')
const dailyRuang = generateDailyExam('bangun_ruang', 20)
assert.strictEqual(dailyRuang.length, 20)
assert.ok(dailyRuang.every(q => q.category === 'bangun_ruang'))
console.log('✓ Daily exam generator passed!')

// 3. Practice Exam Generation
console.log('Testing Practice Exam Generator...')
const practice5 = generatePracticeExam('lingkaran', 5)
assert.strictEqual(practice5.length, 5)
console.log('✓ Practice exam generator passed!')

// 4. Answer Evaluation & Partial Logic
console.log('Testing Evaluation Rules...')
// Single choice
const qSingle = {
  id: 'test-1',
  category: 'bangun_datar',
  topicTitle: 'Test',
  difficulty: 'mudah',
  type: 'single_choice',
  prompt: 'Test prompt',
  correctAnswer: 'B',
  explanation: { langkah: [], kesimpulan: '' },
}
assert.strictEqual(evaluateAnswer(qSingle, 'B'), true)
assert.strictEqual(evaluateAnswer(qSingle, 'A'), false)
assert.strictEqual(evaluateAnswer(qSingle, undefined), false)

// Multi select
const qMulti = {
  id: 'test-2',
  category: 'bangun_datar',
  topicTitle: 'Test',
  difficulty: 'sedang',
  type: 'multi_select',
  prompt: 'Test prompt',
  correctAnswer: ['A', 'C'],
  explanation: { langkah: [], kesimpulan: '' },
}
assert.strictEqual(evaluateAnswer(qMulti, ['A', 'C']), true)
assert.strictEqual(evaluateAnswer(qMulti, ['C', 'A']), true) // permutation is valid
assert.strictEqual(evaluateAnswer(qMulti, ['A']), false) // incomplete
assert.strictEqual(evaluateAnswer(qMulti, ['A', 'B', 'C']), false) // extra choice
assert.strictEqual(evaluateAnswer(qMulti, undefined), false)

// True/False
const qTF = {
  id: 'test-3',
  category: 'prisma',
  topicTitle: 'Test',
  difficulty: 'sedang',
  type: 'true_false',
  prompt: 'Test prompt',
  correctAnswer: ['true', 'false', 'true'],
  explanation: { langkah: [], kesimpulan: '' },
}
assert.strictEqual(evaluateAnswer(qTF, ['true', 'false', 'true']), true)
assert.strictEqual(evaluateAnswer(qTF, ['true', 'true', 'true']), false)
assert.strictEqual(evaluateAnswer(qTF, ['true']), false)
console.log('✓ Evaluation rules passed!')

// 5. Full Grading Logic
console.log('Testing Exam Grading Engine...')
const perfectAnswers = {}
finalExam.forEach(q => {
  perfectAnswers[q.id] = q.correctAnswer
})
const perfectResult = gradeExam(finalExam, perfectAnswers)
assert.strictEqual(perfectResult.score, 100)
assert.strictEqual(perfectResult.totalCorrect, 35)
assert.strictEqual(perfectResult.status, 'Lulus Sempurna')

const zeroAnswers = {}
const zeroResult = gradeExam(finalExam, zeroAnswers)
assert.strictEqual(zeroResult.score, 0)
assert.strictEqual(zeroResult.totalCorrect, 0)
assert.strictEqual(zeroResult.status, 'Perlu Pemantapan')

// Half score
const halfAnswers = {}
finalExam.forEach((q, idx) => {
  if (idx < 17) halfAnswers[q.id] = q.correctAnswer
  else halfAnswers[q.id] = 'WRONG'
})
const halfResult = gradeExam(finalExam, halfAnswers)
assert.strictEqual(halfResult.totalCorrect, 17)
assert.strictEqual(halfResult.score, Math.round((17 / 35) * 100))
assert.strictEqual(halfResult.categoryBreakdowns.length, 5)
console.log('✓ Exam grading engine passed!')

console.log('=== ALL TIER 3 TESTS PASSED SUCCESSFULLY! ===')
