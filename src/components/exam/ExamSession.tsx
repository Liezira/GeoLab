import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Question } from '@/data/questionBank'
import {
  saveExamSession,
  loadExamSession,
  clearExamSession,
  type ExamMode,
} from '@/utils/examEngine'
import { ExamQuestionCard } from './ExamQuestionCard'

interface ExamSessionProps {
  examId: string
  title: string
  mode: ExamMode
  initialQuestions: Question[]
  durationMinutes: number // e.g. 90
  onFinish: (questions: Question[], answers: Record<string, string | string[]>) => void
  onExit: () => void
}

export function ExamSession({
  examId,
  title,
  mode,
  initialQuestions,
  durationMinutes,
  onFinish,
  onExit,
}: ExamSessionProps) {
  // Check if there is an existing saved session for this examId
  const savedState = useMemo(() => {
    const loaded = loadExamSession()
    if (loaded && loaded.examId === examId) {
      return loaded
    }
    return null
  }, [examId])

  const questions = useMemo(() => {
    return savedState?.questions || initialQuestions
  }, [savedState, initialQuestions])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(() => {
    return savedState?.answers || {}
  })
  const [flagged, setFlagged] = useState<Record<string, boolean>>(() => {
    return savedState?.flagged || {}
  })
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    if (savedState) return savedState.remainingSeconds
    return durationMinutes > 0 ? durationMinutes * 60 : 0
  })

  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showMobileSheet, setShowMobileSheet] = useState(false)

  // Handle question submission
  const handleFinalSubmit = useCallback(() => {
    clearExamSession()
    onFinish(questions, answers)
  }, [questions, answers, onFinish])

  // Timer Countdown Effect
  useEffect(() => {
    if (durationMinutes <= 0) return // Untimed mode

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinalSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [durationMinutes, handleFinalSubmit])

  // Auto-Save Effect to localStorage
  useEffect(() => {
    saveExamSession({
      examId,
      mode,
      title,
      questions,
      answers,
      flagged,
      remainingSeconds,
      lastUpdated: Date.now(),
    })
  }, [examId, mode, title, questions, answers, flagged, remainingSeconds])

  // Current Question
  const currentQuestion = questions[currentIndex]

  // Answer change handler
  const handleAnswerChange = (newAns: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: newAns,
    }))
  }

  // Toggle flag handler
  const handleToggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }))
  }

  // Check if a question has been answered
  const isQuestionAnswered = (q: Question) => {
    const ans = answers[q.id]
    if (ans === undefined) return false
    if (Array.isArray(ans)) {
      if (q.type === 'true_false') {
        const expected = q.statements?.length || 3
        return ans.length === expected && Array.from(ans).every(x => x === 'true' || x === 'false')
      }
      return ans.length > 0
    }
    return ans !== ''
  }

  // Calculate summary counts
  const answeredCount = questions.filter(isQuestionAnswered).length
  const flaggedCount = Object.values(flagged).filter(Boolean).length
  const unansweredCount = questions.length - answeredCount

  // Format Timer HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const isTimerCritical = remainingSeconds > 0 && remainingSeconds <= 300 // < 5 mins
  const isTimerWarning = remainingSeconds > 300 && remainingSeconds <= 900 // < 15 mins

  return (
    <div className="exam-session-shell">
      {/* Sticky Exam Header Bar */}
      <header className="exam-topbar">
        <div className="topbar-left">
          <button type="button" className="icon-action" onClick={onExit} title="Keluar dari sesi ujian">
            ←
          </button>
          <div>
            <span className="exam-mode-tag">
              {mode === 'final'
                ? 'TES ULANGAN KESELURUHAN (35 SOAL)'
                : mode === 'daily'
                ? 'ULANGAN HARIAN BAB'
                : 'LATIHAN MANDIRI'}
            </span>
            <h1 className="exam-title-text">{title}</h1>
          </div>
        </div>

        <div className="topbar-right">
          {durationMinutes > 0 && (
            <div
              className={`exam-timer-badge ${
                isTimerCritical ? 'critical' : isTimerWarning ? 'warning' : ''
              }`}
            >
              <span className="timer-icon">⏱</span>
              <span className="timer-text">{formatTime(remainingSeconds)}</span>
            </div>
          )}

          <button
            type="button"
            className="button button-primary finish-exam-btn"
            onClick={() => setShowSubmitModal(true)}
          >
            Selesaikan Ujian
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Quick Jump Strip */}
      <div className="mobile-quick-jump-strip">
        <div className="quick-jump-scroll">
          {questions.map((q, idx) => {
            const isAnswered = isQuestionAnswered(q)
            const isFlag = Boolean(flagged[q.id])
            const isCurrent = idx === currentIndex
            let statusClass = 'unanswered'
            if (isFlag) statusClass = 'flagged'
            else if (isAnswered) statusClass = 'answered'
            return (
              <button
                key={q.id}
                type="button"
                className={`quick-pill-btn ${statusClass} ${isCurrent ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <span>{idx + 1}</span>
                {isFlag && <small>★</small>}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          className="quick-sheet-drawer-toggle"
          onClick={() => setShowMobileSheet(true)}
          title="Buka Lembar Navigasi Lengkap"
        >
          📋 {answeredCount}/{questions.length}
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="exam-session-layout">
        {/* Left Column: Question Area */}
        <main className="exam-content-area">
          <ExamQuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            currentAnswer={answers[currentQuestion.id]}
            onAnswerChange={handleAnswerChange}
            isFlagged={Boolean(flagged[currentQuestion.id])}
            onToggleFlag={handleToggleFlag}
          />

          {/* Navigation Controls Bar */}
          <div className="exam-nav-footer">
            <button
              type="button"
              className="button button-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            >
              ← Soal Sebelumnya
            </button>

            <button
              type="button"
              className={`button ${flagged[currentQuestion.id] ? 'button-soft' : 'button-ghost'}`}
              onClick={handleToggleFlag}
            >
              {flagged[currentQuestion.id] ? '★ Ditandai Ragu-ragu' : '☆ Tandai Ragu-ragu'}
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                type="button"
                className="button button-primary"
                onClick={() => setShowSubmitModal(true)}
              >
                Kumpulkan Ujian ✓
              </button>
            )}
          </div>
        </main>

        {/* Right Column: Number Sheet Sidebar */}
        <aside className="exam-sheet-aside">
          <div className="sheet-header">
            <h3>Lembar Navigasi Soal</h3>
            <span className="sheet-progress-text">
              Terjawab: <strong>{answeredCount}</strong> / {questions.length}
            </span>
          </div>

          {/* 35 Grid Numbers */}
          <div className="sheet-numbers-grid">
            {questions.map((q, idx) => {
              const isAnswered = isQuestionAnswered(q)
              const isFlag = Boolean(flagged[q.id])
              const isCurrent = idx === currentIndex

              let statusClass = 'unanswered'
              if (isFlag) statusClass = 'flagged'
              else if (isAnswered) statusClass = 'answered'

              return (
                <button
                  key={q.id}
                  type="button"
                  className={`sheet-num-btn ${statusClass} ${isCurrent ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  title={`Soal nomor ${idx + 1}`}
                >
                  <span>{idx + 1}</span>
                  {isFlag && <small className="flag-dot">★</small>}
                </button>
              )
            })}
          </div>

          {/* Sheet Legend */}
          <div className="sheet-legend-box">
            <span className="legend-item">
              <i className="legend-sample answered" /> Sudah Dijawab ({answeredCount})
            </span>
            <span className="legend-item">
              <i className="legend-sample flagged" /> Ragu-ragu ({flaggedCount})
            </span>
            <span className="legend-item">
              <i className="legend-sample unanswered" /> Belum Dijawab ({unansweredCount})
            </span>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <span className="modal-icon">📋</span>
            <h2>Konfirmasi Pengumpulan</h2>
            <p>
              Kamu telah menjawab <strong>{answeredCount}</strong> dari{' '}
              <strong>{questions.length}</strong> butir soal.
              {flaggedCount > 0 && (
                <span className="modal-warning-text">
                  <br />(Masih ada <strong>{flaggedCount}</strong> soal yang kamu tandai ragu-ragu).
                </span>
              )}
            </p>
            <p className="modal-sub">
              Setelah dikumpulkan, kamu akan langsung melihat nilai skor akhir dan pembahasan lengkap nomor 1–{questions.length}.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowSubmitModal(false)}
              >
                Kembali Mengerjakan
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={handleFinalSubmit}
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Number Sheet Drawer Modal */}
      {showMobileSheet && (
        <div className="modal-backdrop" onClick={() => setShowMobileSheet(false)}>
          <div className="modal-dialog mobile-sheet-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Lembar Navigasi Soal (1–{questions.length})</h3>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setShowMobileSheet(false)}
              >
                ✕
              </button>
            </div>
            <p className="sheet-progress-text">
              Terjawab: <strong>{answeredCount}</strong> / {questions.length} • Ragu-ragu: <strong>{flaggedCount}</strong>
            </p>
            <div className="sheet-numbers-grid drawer-grid">
              {questions.map((q, idx) => {
                const isAnswered = isQuestionAnswered(q)
                const isFlag = Boolean(flagged[q.id])
                const isCurrent = idx === currentIndex
                let statusClass = 'unanswered'
                if (isFlag) statusClass = 'flagged'
                else if (isAnswered) statusClass = 'answered'
                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`sheet-num-btn ${statusClass} ${isCurrent ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentIndex(idx)
                      setShowMobileSheet(false)
                    }}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && <small className="flag-dot">★</small>}
                  </button>
                )
              })}
            </div>
            <div className="sheet-legend-box" style={{ marginTop: '14px' }}>
              <span className="legend-item"><i className="legend-sample answered" /> Sudah Dijawab</span>
              <span className="legend-item"><i className="legend-sample flagged" /> Ragu-ragu</span>
              <span className="legend-item"><i className="legend-sample unanswered" /> Belum Dijawab</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
