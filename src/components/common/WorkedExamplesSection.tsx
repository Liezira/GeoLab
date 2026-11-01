import { useState } from 'react'
import {
  WORKED_EXAMPLES,
  type WorkedExampleCategory,
  type WorkedExample,
} from '@/data/workedExamples'

interface WorkedExamplesSectionProps {
  category: WorkedExampleCategory
  topicTitle?: string
}

export function WorkedExamplesSection({ category, topicTitle }: WorkedExamplesSectionProps) {
  const examples: WorkedExample[] = WORKED_EXAMPLES[category] || []
  const [activeTab, setActiveTab] = useState(0)
  const [showSolution, setShowSolution] = useState(true)

  if (examples.length === 0) return null

  const current = examples[activeTab]

  return (
    <section className="section worked-examples-section">
      <div className="section-title">
        <div>
          <span className="eyebrow">CONTOH SOAL TERPANDU & PEMBAHASAN</span>
          <h2>Langkah demi Langkah Menyelesaikan Soal {topicTitle || ''}</h2>
          <p>Pelajari cara membedah soal dari konsep dasar hingga soal cerita sehari-hari dengan trik penyelesaian terstruktur.</p>
        </div>
      </div>

      {/* Tabs for Example Selection */}
      <div className="example-tabs-row">
        {examples.map((ex, idx) => (
          <button
            key={ex.id}
            type="button"
            className={`example-tab-btn ${activeTab === idx ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(idx)
              setShowSolution(true)
            }}
          >
            <span className={`level-pill level-${ex.level.toLowerCase().split(' ')[0]}`}>
              {ex.level}
            </span>
            <span className="example-tab-title">{ex.title}</span>
          </button>
        ))}
      </div>

      {/* Main Example Card */}
      <article className="worked-example-card animate-fade-in" key={current.id}>
        <div className="example-card-header">
          <div className="header-meta">
            <span className={`level-pill level-${current.level.toLowerCase().split(' ')[0]}`}>
              Tingkat: {current.level}
            </span>
            <span className="example-number-badge">Contoh 0{activeTab + 1}</span>
          </div>
          <h3>{current.title}</h3>
        </div>

        {/* Question Statement Box */}
        <div className="example-question-box">
          <p className="question-text">{current.question}</p>
        </div>

        {/* Quick Concept / Trick Box */}
        <div className="concept-key-box">
          <span className="concept-key-icon">💡</span>
          <div>
            <strong>Kunci Konsep & Trik Cepat:</strong>
            <p>{current.conceptKey}</p>
          </div>
        </div>

        {/* Toggle Solution Button */}
        <div className="solution-toggle-bar">
          <button
            type="button"
            className={`button ${showSolution ? 'button-secondary' : 'button-primary'}`}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? '▲ Sembunyikan Pembahasan' : '▼ Buka Pembahasan Langkah demi Langkah'}
          </button>
        </div>

        {/* Step-by-Step Solution Breakdown */}
        {showSolution && (
          <div className="example-solution-accordion animate-fade-in">
            <div className="solution-meta-grid">
              <div className="sol-meta-item">
                <span className="meta-label">DIKETAHUI:</span>
                <p className="meta-val">{current.diketahui}</p>
              </div>
              <div className="sol-meta-item">
                <span className="meta-label">DITANYA:</span>
                <p className="meta-val">{current.ditanya}</p>
              </div>
              <div className="sol-meta-item full-width">
                <span className="meta-label">RUMUS KUNCI:</span>
                <code className="sol-formula-badge">{current.rumus}</code>
              </div>
            </div>

            <div className="solution-steps-wrapper">
              <span className="eyebrow">LANGKAH PENGERJAAN:</span>
              <ol className="steps-ordered-list">
                {current.steps.map((st, sIdx) => (
                  <li key={sIdx}>
                    <span className="step-num-badge">{sIdx + 1}</span>
                    <span className="step-text">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="example-conclusion-box">
              <span className="conclusion-icon">🎯</span>
              <div>
                <strong>Kesimpulan Akhir:</strong>
                <p>{current.conclusion}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  )
}
