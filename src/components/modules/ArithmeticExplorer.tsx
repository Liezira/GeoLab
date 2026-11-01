import { useState, useMemo } from 'react'
import {
  calculatePattern,
  calculateArithmetic,
  type NumberPatternType,
} from '@/geometry/arithmeticMath'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

export function ArithmeticExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [tab, setTab] = useState<'pola' | 'barisan'>('pola')

  // Pola Bilangan state
  const [patternType, setPatternType] = useState<NumberPatternType>('segitiga')
  const [patternN, setPatternN] = useState(5)

  // Barisan Aritmatika state
  const [a, setA] = useState(3)
  const [b, setB] = useState(4)
  const [n, setN] = useState(10)

  const patternData = useMemo(() => calculatePattern(patternType, patternN), [patternType, patternN])
  const arithData = useMemo(() => calculateArithmetic(a, b, n), [a, b, n])

  return (
    <div className="page arithmetic-explorer-page">
      <div className="page-heading">
        <span className="eyebrow">LAB ARITMATIKA & POLA BILANGAN</span>
        <h1>Pola Bilangan & Barisan Aritmatika</h1>
        <p>Jelajahi susunan noktah visual pola bilangan dan pahami pertambahan linier barisan aritmatika Uₙ dan jumlah deret Sₙ.</p>
      </div>

      {/* Main Tab Toggle */}
      <div className="mode-switch" aria-label="Mode Aritmatika">
        <button className={tab === 'pola' ? 'active' : ''} onClick={() => setTab('pola')}>
          Pola Bilangan Noktah
        </button>
        <button className={tab === 'barisan' ? 'active' : ''} onClick={() => setTab('barisan')}>
          Barisan & Deret Aritmatika (Uₙ & Sₙ)
        </button>
      </div>

      {tab === 'pola' ? (
        <div className="arithmetic-grid">
          {/* Visual Dot Canvas */}
          <section className="diagram-card">
            <div className="diagram-actions">
              <span><strong>Susunan Titik / Noktah (n = {patternN})</strong></span>
              <span className="badge-pill" style={{ background: '#416B60', color: '#fff' }}>
                Total: {patternData.value} Noktah
              </span>
            </div>

            <div className="dots-canvas-wrapper">
              <svg className="dots-svg" viewBox="0 0 450 320">
                {patternData.dots.map((dot, index) => {
                  const spacing = Math.min(32, 280 / (patternN + 1))
                  const startX = 225 - (patternN * spacing) / 2 + 16
                  const startY = 160 - (patternN * spacing) / 2 + 16
                  return (
                    <circle
                      key={index}
                      cx={startX + dot.x * spacing}
                      cy={startY + dot.y * spacing}
                      r={Math.max(4, Math.min(8, 22 / patternN))}
                      fill="#416B60"
                      stroke="#294C43"
                      strokeWidth="1.5"
                    />
                  )
                })}
              </svg>
            </div>

            <div className="pattern-sequence-row">
              <span className="eyebrow">DERETAN POLA AWAL:</span>
              <div className="sequence-badges">
                {patternData.sequence.map((num, idx) => (
                  <span
                    key={idx}
                    className={`seq-badge ${idx + 1 === patternN ? 'highlight' : ''}`}
                  >
                    <small>U_{idx + 1}</small>
                    <strong>{num}</strong>
                  </span>
                ))}
              </div>
            </div>

            <div className="diagram-footer-note">
              <span className="eyebrow">PENJELASAN KONSEP</span>
              <p>{patternData.explanation}</p>
            </div>
          </section>

          {/* Controls Aside */}
          <aside className="control2d">
            <span className="eyebrow">PILIH POLA BILANGAN</span>
            <h2>Jenis Pola</h2>

            <div className="chips-grid vertical">
              {[
                { id: 'persegi', label: 'Pola Persegi (n²)' },
                { id: 'segitiga', label: 'Pola Segitiga (½n(n+1))' },
                { id: 'persegi_panjang', label: 'Pola Persegi Panjang (n(n+1))' },
                { id: 'ganjil', label: 'Pola Bilangan Ganjil (2n-1)' },
              ].map(item => (
                <button
                  key={item.id}
                  className={`chip-btn ${patternType === item.id ? 'active' : ''}`}
                  onClick={() => setPatternType(item.id as NumberPatternType)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="sliders-section" style={{ marginTop: '16px' }}>
              <label>
                <span><b>Suku ke-n (Langkah)</b><em>n = {patternN}</em></span>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={patternN}
                  onChange={e => setPatternN(+e.target.value)}
                />
              </label>
            </div>

            <div className="metric-box">
              <div>
                <span>Rumus Pola</span>
                <strong style={{ fontSize: '18px' }}>{patternData.formula}</strong>
                <small>{patternData.name}</small>
              </div>
              <div>
                <span>Nilai U_{patternN}</span>
                <strong style={{ fontSize: '24px', color: '#416B60' }}>{patternData.value}</strong>
                <small>Titik / Noktah</small>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="arithmetic-grid">
          {/* Barisan Linear Staircase Chart */}
          <section className="diagram-card">
            <div className="diagram-actions">
              <span><strong>Visualisasi Grafik Barisan Tangga (+{b})</strong></span>
              <span className="badge-pill" style={{ background: '#3F8064', color: '#fff' }}>
                a = {a}, b = {b}
              </span>
            </div>

            <div className="staircase-chart-wrapper">
              <svg className="chart-svg" viewBox="0 0 500 240">
                {arithData.sequence.map((val, idx) => {
                  const maxVal = Math.max(...arithData.sequence, 1)
                  const minVal = Math.min(...arithData.sequence, 0)
                  const range = Math.max(1, maxVal - minVal)
                  const barHeight = Math.max(15, Math.abs(val) * (160 / range))
                  const barWidth = 42
                  const x = 30 + idx * 56
                  const y = 200 - barHeight
                  return (
                    <g key={idx}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="rgba(65, 107, 96, 0.25)"
                        stroke="#355C4F"
                        strokeWidth="2"
                        rx="4"
                      />
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="svg-label" fontWeight="bold">
                        {val}
                      </text>
                      <text x={x + barWidth / 2} y={222} textAnchor="middle" className="svg-label" fill="#718078">
                        U_{idx + 1}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            <div className="calculations" style={{ borderLeft: 0, paddingLeft: 0 }}>
              <span className="eyebrow">LANGKAH PENURUNAN RUMUS</span>
              <div className="formula-trace">
                <span>Perhitungan Suku ke-{n} (Uₙ):</span>
                <b>{arithData.steps.unStep}</b>
              </div>
              <div className="formula-trace">
                <span>Jumlah {n} Suku Pertama (Sₙ):</span>
                <b>{arithData.steps.snStep}</b>
              </div>
            </div>
          </section>

          {/* Controls Aside */}
          <aside className="control2d">
            <span className="eyebrow">PARAMETER BARISAN</span>
            <h2>Atur Nilai</h2>

            <label>
              <span><b>Suku Pertama (a)</b><em>a = {a}</em></span>
              <input type="range" min="-10" max="30" value={a} onChange={e => setA(+e.target.value)} />
            </label>

            <label>
              <span><b>Beda / Selisih (b)</b><em>b = {b}</em></span>
              <input type="range" min="-8" max="15" value={b} onChange={e => setB(+e.target.value)} />
            </label>

            <label>
              <span><b>Banyaknya Suku (n)</b><em>n = {n}</em></span>
              <input type="range" min="1" max="30" value={n} onChange={e => setN(+e.target.value)} />
            </label>

            <div className="metric-box">
              <div>
                <span>Suku ke-{n} (Uₙ)</span>
                <strong>{arithData.un}</strong>
                <small>Uₙ = a + (n-1)b</small>
              </div>
              <div>
                <span>Jumlah Deret (Sₙ)</span>
                <strong style={{ color: '#416B60' }}>{arithData.sn}</strong>
                <small>Sₙ = ½n(a + Uₙ)</small>
              </div>
            </div>

            <div className="quick-presets">
              <span className="eyebrow">CONTOH CEPAT:</span>
              <div className="chips-grid">
                <button
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    setA(2)
                    setB(3)
                    setN(10)
                  }}
                >
                  2, 5, 8, ...
                </button>
                <button
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    setA(50)
                    setB(-4)
                    setN(12)
                  }}
                >
                  50, 46, 42, ...
                </button>
                <button
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    setA(5)
                    setB(5)
                    setN(20)
                  }}
                >
                  Kelipatan 5
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Educational Footer */}
      <section className="section arithmetic-theorems-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">RANGKUMAN MATERI</span>
            <h2>Rumus Penting Pola & Barisan Bilangan</h2>
          </div>
          {onStartPractice && (
            <button className="button button-primary" onClick={onStartPractice}>
              Latihan Soal Aritmatika →
            </button>
          )}
        </div>

        <div className="formula-cards-grid">
          <article className="formula-info-card">
            <span className="eyebrow">SUKU KE-N BARISAN ARITMATIKA</span>
            <h3>Uₙ = a + (n - 1)b</h3>
            <p>a adalah suku pertama dan b adalah beda tetap antara suku yang berurutan (b = Uₙ - Uₙ₋₁).</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">JUMLAH DERET ARITMATIKA</span>
            <h3>Sₙ = ½n × (2a + (n - 1)b)</h3>
            <p>Atau dapat disederhanakan menjadi Sₙ = ½n(a + Uₙ) saat suku terakhir sudah diketahui.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">POLA SEGITIGA</span>
            <h3>Uₙ = ½n × (n + 1)</h3>
            <p>Jumlah noktah yang membentuk formasi segitiga sama sisi: 1, 3, 6, 10, 15, 21, dst.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">POLA PERSEGI (KUADRAT)</span>
            <h3>Uₙ = n²</h3>
            <p>Jumlah noktah dalam susunan baris × kolom bujur sangkar sama sisi: 1, 4, 9, 16, 25, dst.</p>
          </article>
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="aritmatika" topicTitle="Pola & Barisan Aritmatika" />
    </div>
  )
}
