import {
  QUESTION_BANK,
  type Question,
  type QuestionCategory,
} from '../data/questionBank.ts'

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

export type ExamMode = 'practice' | 'daily' | 'final'

export interface ExamConfig {
  mode: ExamMode
  category?: QuestionCategory | 'all'
  questionCount: number
  durationMinutes: number // 90 for final, 30-40 for daily, 0 for practice (untimed)
  title: string
}

export function generatePracticeExam(
  category: QuestionCategory | 'all' = 'all',
  count = 10
): Question[] {
  const pool = category === 'all'
    ? QUESTION_BANK
    : QUESTION_BANK.filter(q => q.category === category)
  return shuffleArray(pool).slice(0, Math.min(count, pool.length))
}

export function generateDailyExam(category: QuestionCategory, count = 20): Question[] {
  const pool = QUESTION_BANK.filter(q => q.category === category)
  return shuffleArray(pool).slice(0, Math.min(count, pool.length))
}

export function generateFinalExam(): Question[] {
  const categories: QuestionCategory[] = [
    'bangun_datar',
    'bangun_ruang',
    'prisma',
    'lingkaran',
    'aritmatika',
  ]

  // Part A: Exactly 30 single_choice (6 from each of 5 categories)
  const partA: Question[] = []
  categories.forEach(cat => {
    const catSingles = QUESTION_BANK.filter(
      q => q.category === cat && q.type === 'single_choice'
    )
    const picked = shuffleArray(catSingles).slice(0, 6)
    partA.push(...picked)
  })

  // Part B: Exactly 5 special questions (guaranteed mix of Benar/Salah & PG Bertingkat)
  const tfPool = QUESTION_BANK.filter(q => q.type === 'true_false')
  const multiPool = QUESTION_BANK.filter(q => q.type === 'multi_select')
  const pickedTF = shuffleArray(tfPool).slice(0, 2)
  const pickedMulti = shuffleArray(multiPool).slice(0, 3)
  const partB = shuffleArray([...pickedTF, ...pickedMulti])

  // Shuffle Part A among themselves, then keep Part B at the end (or blended)
  // Standard exam convention: PG Biasa (1-30), lalu Soal Analisis / Kompleks (31-35)
  const finalSet = [...shuffleArray(partA), ...partB]
  return finalSet
}

export function evaluateAnswer(
  question: Question,
  studentAnswer: string | string[] | undefined
): boolean {
  if (studentAnswer === undefined) return false

  if (question.type === 'single_choice') {
    return studentAnswer === question.correctAnswer
  }

  if (question.type === 'multi_select') {
    if (!Array.isArray(studentAnswer) || !Array.isArray(question.correctAnswer)) {
      return false
    }
    const setA = new Set(studentAnswer)
    const setB = new Set(question.correctAnswer)
    if (setA.size !== setB.size) return false
    for (const item of setA) {
      if (!setB.has(item)) return false
    }
    return true
  }

  if (question.type === 'true_false') {
    if (!Array.isArray(studentAnswer) || !Array.isArray(question.correctAnswer)) {
      return false
    }
    if (studentAnswer.length !== question.correctAnswer.length) return false
    return Array.from(studentAnswer).every(
      (val, index) => val !== undefined && String(val) === String(question.correctAnswer[index])
    )
  }

  return false
}

export interface CategoryBreakdown {
  category: QuestionCategory
  label: string
  total: number
  correct: number
  percentage: number
}

export interface ExamEvaluationResult {
  score: number // 0 - 100
  totalQuestions: number
  totalCorrect: number
  categoryBreakdowns: CategoryBreakdown[]
  questionResults: {
    question: Question
    studentAnswer?: string | string[]
    isCorrect: boolean
  }[]
  status: 'Lulus Sempurna' | 'Lulus Sangat Baik' | 'Lulus Baik' | 'Perlu Pemantapan'
}

const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  bangun_datar: 'Bangun Datar',
  bangun_ruang: 'Bangun Ruang',
  prisma: 'Prisma & Tabung',
  lingkaran: 'Lingkaran',
  aritmatika: 'Pola & Barisan Aritmatika',
}

export function gradeExam(
  questions: Question[],
  answers: Record<string, string | string[]>
): ExamEvaluationResult {
  let correctCount = 0
  const catStats: Record<QuestionCategory, { total: number; correct: number }> = {
    bangun_datar: { total: 0, correct: 0 },
    bangun_ruang: { total: 0, correct: 0 },
    prisma: { total: 0, correct: 0 },
    lingkaran: { total: 0, correct: 0 },
    aritmatika: { total: 0, correct: 0 },
  }

  const questionResults = questions.map(question => {
    const studentAns = answers[question.id]
    const isCorrect = evaluateAnswer(question, studentAns)
    if (isCorrect) correctCount++

    catStats[question.category].total += 1
    if (isCorrect) catStats[question.category].correct += 1

    return {
      question,
      studentAnswer: studentAns,
      isCorrect,
    }
  })

  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

  const categoryBreakdowns: CategoryBreakdown[] = (
    Object.keys(catStats) as QuestionCategory[]
  ).map(cat => {
    const { total, correct } = catStats[cat]
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      total,
      correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    }
  })

  let status: ExamEvaluationResult['status'] = 'Perlu Pemantapan'
  if (score >= 90) status = 'Lulus Sempurna'
  else if (score >= 80) status = 'Lulus Sangat Baik'
  else if (score >= 70) status = 'Lulus Baik'

  return {
    score,
    totalQuestions: questions.length,
    totalCorrect: correctCount,
    categoryBreakdowns,
    questionResults,
    status,
  }
}

// Local Storage Session Persistence
export interface StoredExamSession {
  examId: string
  mode: ExamMode
  title: string
  questions: Question[]
  answers: Record<string, string | string[]>
  flagged: Record<string, boolean>
  remainingSeconds: number
  lastUpdated: number
}

const STORAGE_KEY = 'geolab_active_exam_session'

export function saveExamSession(session: StoredExamSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // ignore local storage errors
  }
}

export function loadExamSession(): StoredExamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredExamSession
  } catch {
    return null
  }
}

export function clearExamSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
