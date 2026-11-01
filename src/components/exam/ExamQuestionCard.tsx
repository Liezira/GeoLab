import type { Question } from '@/data/questionBank'
import { getQuestion3DConfig } from '@/utils/question3dResolver'
import { Question3DPreview } from './Question3DPreview'

interface ExamQuestionCardProps {
  question: Question
  questionIndex: number
  totalQuestions: number
  currentAnswer?: string | string[]
  onAnswerChange: (newAnswer: string | string[]) => void
  isFlagged?: boolean
  onToggleFlag?: () => void
  disabled?: boolean
}

export function ExamQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  currentAnswer,
  onAnswerChange,
  isFlagged = false,
  onToggleFlag,
  disabled = false,
}: ExamQuestionCardProps) {
  const padIndex = String(questionIndex + 1).padStart(2, '0')
  const visual3d = getQuestion3DConfig(question)

  // Handler for Single Choice
  const handleSingleSelect = (optionId: string) => {
    if (disabled) return
    onAnswerChange(optionId)
  }

  // Handler for Multi-Select
  const handleMultiToggle = (optionId: string) => {
    if (disabled) return
    const prev = Array.isArray(currentAnswer) ? [...currentAnswer] : []
    const exists = prev.includes(optionId)
    const next = exists ? prev.filter(x => x !== optionId) : [...prev, optionId]
    onAnswerChange(next)
  }

  // Handler for True / False table
  const handleStatementChoice = (stmtIndex: number, choice: boolean) => {
    if (disabled) return
    const stmtCount = question.statements?.length || 3
    const prev: string[] = Array.from({ length: stmtCount }, (_, i) =>
      Array.isArray(currentAnswer) && currentAnswer[i] ? currentAnswer[i] : ''
    )

    // Choice is 'true' or 'false'
    prev[stmtIndex] = choice ? 'true' : 'false'
    onAnswerChange(prev)
  }

  return (
    <div className="exam-question-card">
      {/* Top Header of Card */}
      <div className="card-top-meta">
        <div className="meta-left">
          <span className="q-number-badge">{padIndex}</span>
          <span className="q-topic-tag">{question.topicTitle}</span>
          <span className="q-type-badge">
            {question.type === 'single_choice' && 'Pilihan Ganda Tunggal'}
            {question.type === 'multi_select' && 'Pilihan Ganda Kompleks (Banyak Jawaban)'}
            {question.type === 'true_false' && 'Tabel Benar / Salah'}
          </span>
        </div>

        {onToggleFlag && (
          <button
            type="button"
            className={`flag-button ${isFlagged ? 'active' : ''}`}
            onClick={onToggleFlag}
          >
            <span className="flag-icon">{isFlagged ? '★' : '☆'}</span>
            <span>{isFlagged ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}</span>
          </button>
        )}
      </div>

      {/* Question Prompt */}
      {question.contextNote && (
        <div className="question-context-box">
          <p>{question.contextNote}</p>
        </div>
      )}

      <h2 className="question-prompt-text">{question.prompt}</h2>

      {/* Optional Interactive 3D Model with collapsible toggle */}
      {visual3d && (
        <Question3DPreview key={question.id} config={visual3d} />
      )}

      {/* Answer Options Section */}
      <div className="answer-section">
        {/* 1. Single Choice */}
        {question.type === 'single_choice' && question.options && (
          <div className="options-grid single-choice">
            {question.options.map(opt => {
              const isSelected = currentAnswer === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={disabled}
                  className={`exam-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSingleSelect(opt.id)}
                >
                  <span className="opt-letter">{opt.id}</span>
                  <span className="opt-text">{opt.text}</span>
                  {isSelected && <span className="opt-checked-mark">✓</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* 2. Multi-Select (Pilihan Ganda Bertingkat) */}
        {question.type === 'multi_select' && question.options && (
          <div className="options-grid multi-choice">
            <p className="instruction-tip">
              * Centang semua pilihan yang benar (bisa 2 atau 3 jawaban).
            </p>
            {question.options.map(opt => {
              const isChecked = Array.isArray(currentAnswer) && currentAnswer.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={disabled}
                  className={`exam-option-btn multi ${isChecked ? 'selected' : ''}`}
                  onClick={() => handleMultiToggle(opt.id)}
                >
                  <span className="multi-checkbox">{isChecked ? '☑' : '☐'}</span>
                  <span className="opt-letter">{opt.id}</span>
                  <span className="opt-text">{opt.text}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* 3. True / False Statements List */}
        {question.type === 'true_false' && question.statements && (
          <div className="true-false-wrapper">
            <div className="tf-header-banner">
              <p className="instruction-tip" style={{ margin: 0 }}>
                * Tentukan status BENAR atau SALAH untuk masing-masing pernyataan berikut:
              </p>
              <span
                className="badge-pill"
                style={{
                  background:
                    Array.isArray(currentAnswer) &&
                    currentAnswer.filter(x => x === 'true' || x === 'false').length === question.statements.length
                      ? 'var(--success-bg)'
                      : 'var(--sage)',
                  color:
                    Array.isArray(currentAnswer) &&
                    currentAnswer.filter(x => x === 'true' || x === 'false').length === question.statements.length
                      ? 'var(--success)'
                      : 'var(--muted)',
                }}
              >
                {Array.isArray(currentAnswer)
                  ? currentAnswer.filter(x => x === 'true' || x === 'false').length
                  : 0}{' '}
                dari {question.statements.length} pernyataan dipilih
              </span>
            </div>

            <div className="tf-cards-list">
              {question.statements.map((stmt, sIdx) => {
                const currentChoice = Array.isArray(currentAnswer)
                  ? currentAnswer[sIdx]
                  : undefined
                return (
                  <div key={stmt.id} className="tf-card-item">
                    <div className="tf-card-statement">
                      <span className="tf-stmt-num">{sIdx + 1}</span>
                      <p className="tf-stmt-text">{stmt.statement}</p>
                    </div>
                    <div className="tf-btn-group">
                      <button
                        type="button"
                        disabled={disabled}
                        className={`tf-toggle-btn ${currentChoice === 'true' ? 'selected-true' : ''}`}
                        onClick={() => handleStatementChoice(sIdx, true)}
                      >
                        ✓ Benar
                      </button>
                      <button
                        type="button"
                        disabled={disabled}
                        className={`tf-toggle-btn ${currentChoice === 'false' ? 'selected-false' : ''}`}
                        onClick={() => handleStatementChoice(sIdx, false)}
                      >
                        ✗ Salah
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
