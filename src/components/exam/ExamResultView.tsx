import { useState, useMemo } from 'react'
import type { ExamEvaluationResult } from '@/utils/examEngine'
import { getQuestion3DConfig } from '@/utils/question3dResolver'
import { Question3DPreview } from './Question3DPreview'

interface ExamResultViewProps {
  result: ExamEvaluationResult
  examTitle: string
  onRetry: () => void
  onGoHome: () => void
}

export function ExamResultView({
  result,
  examTitle,
  onRetry,
  onGoHome,
}: ExamResultViewProps) {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all')

  const enrichedResults = useMemo(() => {
    return result.questionResults.map((r, originalIndex) => ({
      ...r,
      originalIndex,
    }))
  }, [result])

  const filteredResults = enrichedResults.filter(r => {
    if (filter === 'correct') return r.isCorrect
    if (filter === 'incorrect') return !r.isCorrect
    return true
  })

  return (
    <div className="page exam-result-page">
      {/* Hero Score Section */}
      <div className="result-hero">
        <div className="result-illustration">
          <div className="score-ring">
            <span>{result.score}</span>
            <small>/ 100</small>
          </div>
          <span className="result-spark one">✦</span>
          <span className="result-spark two">✦</span>
        </div>

        <span className="eyebrow">HASIL EVALUASI PEMBELAJARAN</span>
        <h1>{result.status}!</h1>
        <p>
          Kamu telah menyelesaikan <strong>{examTitle}</strong> dengan menjawab{' '}
          <strong>{result.totalCorrect}</strong> benar dari <strong>{result.totalQuestions}</strong> soal.
        </p>

        <div className="result-actions">
          <button type="button" className="button button-primary" onClick={onRetry}>
            Ulangi Ujian
          </button>
          <button type="button" className="button button-secondary" onClick={onGoHome}>
            Kembali ke Beranda
          </button>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div className="result-grid">
        <article>
          <span>Jawaban Benar</span>
          <strong>
            {result.totalCorrect} <small>dari {result.totalQuestions} butir</small>
          </strong>
        </article>
        <article>
          <span>Ketepatan / Akurasi</span>
          <strong>{result.score}%</strong>
        </article>
        <article>
          <span>Status Capaian</span>
          <strong>{result.status}</strong>
        </article>
      </div>

      {/* Category Mastery Breakdown */}
      <section className="section category-breakdown-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">ANALISIS CAPAIAN MATERI</span>
            <h2>Penguasaan per Kategori Topik</h2>
          </div>
        </div>

        <div className="breakdown-cards-grid">
          {result.categoryBreakdowns.map(cat => (
            <div key={cat.category} className="category-mastery-card">
              <div className="mastery-header">
                <strong>{cat.label}</strong>
                <span className={`mastery-percent ${cat.percentage >= 70 ? 'high' : 'low'}`}>
                  {cat.percentage}%
                </span>
              </div>
              <div className="progress">
                <span style={{ width: `${cat.percentage}%` }} />
              </div>
              <div className="mastery-footer">
                <small>
                  {cat.correct} benar dari {cat.total} butir
                </small>
                <small className="status-note">
                  {cat.percentage >= 80 ? 'Sangat Baik' : cat.percentage >= 60 ? 'Cukup' : 'Perlu Diulang'}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Question Review */}
      <section className="section question-review-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">TINJAUAN & PEMBAHASAN DETAIL</span>
            <h2>Pembahasan Seluruh Soal ({result.questionResults.length} Nomor)</h2>
          </div>

          {/* Filter Tabs */}
          <div className="tabs review-filter-tabs">
            <button
              type="button"
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Semua ({result.questionResults.length})
            </button>
            <button
              type="button"
              className={filter === 'correct' ? 'active' : ''}
              onClick={() => setFilter('correct')}
            >
              Benar ({result.totalCorrect})
            </button>
            <button
              type="button"
              className={filter === 'incorrect' ? 'active' : ''}
              onClick={() => setFilter('incorrect')}
            >
              Salah ({result.totalQuestions - result.totalCorrect})
            </button>
          </div>
        </div>

        <div className="review-questions-list">
          {filteredResults.map(item => {
            const q = item.question
            const padNum = String(item.originalIndex + 1).padStart(2, '0')
            const visual3d = getQuestion3DConfig(q)

            return (
              <article
                key={q.id}
                className={`review-question-card ${item.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="review-card-header">
                  <div className="meta-left">
                    <span className="q-number-badge">{padNum}</span>
                    <span className="q-topic-tag">{q.topicTitle}</span>
                  </div>
                  <span
                    className={`verdict-chip ${item.isCorrect ? 'verdict-correct' : 'verdict-incorrect'}`}
                  >
                    {item.isCorrect ? '✓ Jawaban Tepat' : '✗ Jawaban Belum Tepat'}
                  </span>
                </div>

                <p className="review-prompt">{q.prompt}</p>

                {/* Optional Interactive 3D Model in Review */}
                {visual3d && (
                  <Question3DPreview key={q.id} config={visual3d} />
                )}

                {/* Answer Comparison */}
                <div className="answer-comparison-box">
                  <div className="user-answer-col">
                    <span>Jawaban Kamu:</span>
                    <strong>
                      {Array.isArray(item.studentAnswer)
                        ? item.studentAnswer.join(', ') || 'Belum diisi'
                        : item.studentAnswer || 'Belum diisi'}
                    </strong>
                  </div>
                  <div className="correct-answer-col">
                    <span>Kunci Jawaban:</span>
                    <strong style={{ color: '#3F8064' }}>
                      {Array.isArray(q.correctAnswer)
                        ? q.correctAnswer.join(', ')
                        : q.correctAnswer}
                    </strong>
                  </div>
                </div>

                {/* Explanation Details */}
                <div className="explanation-accordion">
                  <span className="eyebrow">LANGKAH PEMBAHASAN MATEMATIS:</span>
                  <div className="explanation-steps-list">
                    {q.explanation.diketahui && (
                      <div className="exp-step-item">
                        <b>Diketahui:</b> {q.explanation.diketahui}
                      </div>
                    )}
                    {q.explanation.ditanya && (
                      <div className="exp-step-item">
                        <b>Ditanya:</b> {q.explanation.ditanya}
                      </div>
                    )}
                    {q.explanation.rumus && (
                      <div className="exp-step-item">
                        <b>Rumus:</b> <code>{q.explanation.rumus}</code>
                      </div>
                    )}
                    {q.explanation.langkah.map((l, lIdx) => (
                      <div key={lIdx} className="exp-step-item">
                        <b>Langkah {lIdx + 1}:</b> {l}
                      </div>
                    ))}
                    <div className="exp-step-item conclusion">
                      <b>Kesimpulan:</b> {q.explanation.kesimpulan}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
