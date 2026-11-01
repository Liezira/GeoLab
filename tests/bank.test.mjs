import assert from 'node:assert'
import { QUESTION_BANK } from '../src/data/questionBank.ts'

console.log('=== RUNNING TIER 2: QUESTION BANK INTEGRITY SUITE ===')

console.log('Total questions in bank:', QUESTION_BANK.length)
assert.strictEqual(QUESTION_BANK.length, 100, 'Bank must have exactly 100 questions')

const categoryCounts = {
  bangun_datar: 0,
  bangun_ruang: 0,
  prisma: 0,
  lingkaran: 0,
  aritmatika: 0,
}

const ids = new Set()

QUESTION_BANK.forEach((q, idx) => {
  // Check unique ID
  assert.ok(!ids.has(q.id), `Duplicate ID found: ${q.id}`)
  ids.add(q.id)

  // Check Category
  assert.ok(q.category in categoryCounts, `Unknown category: ${q.category}`)
  categoryCounts[q.category]++

  // Check Prompt
  assert.ok(q.prompt && q.prompt.length > 10, `Question ${q.id} has empty prompt`)

  // Check Type-specific fields
  if (q.type === 'single_choice') {
    assert.ok(q.options && q.options.length >= 4, `Question ${q.id} must have 4 options`)
    const hasKey = q.options.some(o => o.id === q.correctAnswer)
    assert.ok(hasKey, `Question ${q.id} correctAnswer ${q.correctAnswer} not found in options`)
  } else if (q.type === 'multi_select') {
    assert.ok(q.options && q.options.length >= 4, `Multi-select ${q.id} must have options`)
    assert.ok(Array.isArray(q.correctAnswer), `Multi-select ${q.id} correctAnswer must be array`)
    assert.ok(q.correctAnswer.length >= 2, `Multi-select ${q.id} must have >= 2 correct answers`)
    q.correctAnswer.forEach(ans => {
      const hasKey = q.options?.some(o => o.id === ans)
      assert.ok(hasKey, `Multi-select ${q.id} key ${ans} not in options`)
    })
  } else if (q.type === 'true_false') {
    assert.ok(q.statements && q.statements.length >= 2, `True/false ${q.id} missing statements`)
    assert.ok(Array.isArray(q.correctAnswer), `True/false ${q.id} correctAnswer must be array`)
    assert.strictEqual(
      q.statements.length,
      q.correctAnswer.length,
      `True/false ${q.id} statements and answers length mismatch`
    )
  }

  // Check Explanation
  assert.ok(
    q.explanation && q.explanation.langkah.length > 0 && q.explanation.kesimpulan,
    `Question ${q.id} has incomplete explanation steps`
  )
})

console.log('Category distribution audit:')
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`- ${cat}: ${count} questions`)
  assert.strictEqual(count, 20, `Category ${cat} must have exactly 20 questions`)
})

console.log('✓ All 100 questions verified: zero schema violations, 100% answer-key integrity!')
console.log('=== ALL TIER 2 TESTS PASSED SUCCESSFULLY! ===')
