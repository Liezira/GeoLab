import { useState, useMemo } from 'react'
import {
  calculatePythagoras,
  POPULAR_PYTHAGOREAN_TRIPLES,
} from '@/geometry/arithmeticMath'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

export function PythagorasExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [sideA, setSideA] = useState(6)
  const [sideB, setSideB] = useState(8)

  const pythData = useMemo(() => calculatePythagoras(sideA, sideB), [sideA, sideB])

  const scale = 16
  const originX = 220
  const originY = 240

  const pCorner = { x: originX, y: originY }
  const pRight = { x: originX + sideA * scale, y: originY }
  const pTop = { x: originX, y: originY - sideB * scale }

  return (
    <div className="page pythagoras-explorer-page">
      <div className="page-heading">
        <span className="eyebrow">LAB GEOMETRI & PYTHAGORAS</span>
        <h1>Teorema Pythagoras & Triple Siku-siku</h1>
        <p>Buktikan secara visual bahwa pada segitiga siku-siku, jumlah luas persegi pada kedua sisi penyiku sama dengan luas persegi pada sisi miring (a² + b² = c²).</p>
      </div>

      <div className="explorer2d-grid">
        {/* SVG Diagram Card */}
        <section className="diagram-card">
          <div className="diagram-actions">
            <span><strong>Pembuktian Geometri Kuadrat Sisi</strong></span>
            <span
              className="badge-pill"
              style={{
                background: pythData.isRightTriangle ? '#3F8064' : '#B6534C',
                color: '#fff',
              }}
            >
              Segitiga {pythData.triangleType.toUpperCase()}
            </span>
          </div>

          <div className="svg-viewport-wrapper">
            <svg className="pythagoras-svg" viewBox="0 0 540 380">
              {/* Square on side A (below triangle) */}
              <rect
                x={originX}
                y={originY}
                width={sideA * scale}
                height={sideA * scale}
                fill="rgba(65, 107, 96, 0.18)"
                stroke="#355C4F"
                strokeWidth="2"
              />
              <text
                x={originX + (sideA * scale) / 2}
                y={originY + (sideA * scale) / 2 + 5}
                textAnchor="middle"
                className="svg-label"
                fontWeight="bold"
              >
                a² = {pythData.aSquared}
              </text>

              {/* Square on side B (left of triangle) */}
              <rect
                x={originX - sideB * scale}
                y={originY - sideB * scale}
                width={sideB * scale}
                height={sideB * scale}
                fill="rgba(214, 161, 111, 0.22)"
                stroke="#B66E4F"
                strokeWidth="2"
              />
              <text
                x={originX - (sideB * scale) / 2}
                y={originY - (sideB * scale) / 2 + 5}
                textAnchor="middle"
                className="svg-label"
                fontWeight="bold"
              >
                b² = {pythData.bSquared}
              </text>

              {/* Central Right Triangle */}
              <polygon
                points={`${pCorner.x},${pCorner.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}`}
                fill="rgba(65, 107, 96, 0.45)"
                stroke="#294C43"
                strokeWidth="3.5"
              />

              {/* Right-angle square mark */}
              <path
                d={`M ${originX} ${originY - 16} h 16 v 16`}
                fill="none"
                stroke="#294C43"
                strokeWidth="2"
              />

              {/* Side labels */}
              <text x={originX + (sideA * scale) / 2} y={originY - 8} textAnchor="middle" className="svg-label">
                a = {sideA} cm
              </text>
              <text x={originX + 12} y={originY - (sideB * scale) / 2} textAnchor="start" className="svg-label">
                b = {sideB} cm
              </text>
              <text
                x={(pRight.x + pTop.x) / 2 + 14}
                y={(pRight.y + pTop.y) / 2 - 10}
                textAnchor="middle"
                className="svg-label"
                fill="#8C4927"
                fontWeight="bold"
              >
                c = {pythData.c} cm
              </text>
            </svg>
          </div>

          <div className="diagram-footer-note">
            <span className="eyebrow">PEMBUKTIAN MATEMATIS:</span>
            <p>
              a² + b² = {pythData.aSquared} + {pythData.bSquared} ={' '}
              <strong>{pythData.aSquared + pythData.bSquared}</strong> | c² = ({pythData.c})² ={' '}
              <strong>{pythData.cSquared}</strong>. Keduanya identik sempurna!
            </p>
          </div>
        </section>

        {/* Controls & Dimensions Aside */}
        <aside className="control2d">
          <span className="eyebrow">KONTROL SISI SIKU-SIKU</span>
          <h2>Atur Panjang Sisi</h2>

          <label>
            <span><b>Sisi Siku-siku A (a)</b><em>{sideA} cm</em></span>
            <input type="range" min="3" max="15" step="1" value={sideA} onChange={e => setSideA(+e.target.value)} />
          </label>

          <label>
            <span><b>Sisi Siku-siku B (b)</b><em>{sideB} cm</em></span>
            <input type="range" min="3" max="15" step="1" value={sideB} onChange={e => setSideB(+e.target.value)} />
          </label>

          {/* Metric Box */}
          <div className="metric-box">
            <div>
              <span>Sisi Miring (c)</span>
              <strong style={{ color: '#416B60' }}>{pythData.c} cm</strong>
              <small>c = √(a² + b²)</small>
            </div>
            <div>
              <span>Keliling Segitiga</span>
              <strong>{pythData.perimeter} cm</strong>
              <small>a + b + c</small>
            </div>
          </div>

          <div className="metric-box">
            <div>
              <span>Luas Segitiga</span>
              <strong>{pythData.area} cm²</strong>
              <small>½ × a × b</small>
            </div>
            <div>
              <span>Jenis Segitiga</span>
              <strong style={{ fontSize: '15px', color: '#3F8064' }}>Siku-siku (90°)</strong>
              <small>a² + b² = c²</small>
            </div>
          </div>

          {/* Popular Triples Presets */}
          <div className="quick-presets" style={{ marginTop: '16px' }}>
            <span className="eyebrow">TRIPLE PYTHAGORAS UMUM:</span>
            <div className="chips-grid">
              {POPULAR_PYTHAGOREAN_TRIPLES.slice(0, 4).map(([tA, tB, tC]) => (
                <button
                  key={`${tA}-${tB}-${tC}`}
                  type="button"
                  className={`chip-btn ${sideA === tA && sideB === tB ? 'active' : ''}`}
                  onClick={() => {
                    setSideA(tA)
                    setSideB(tB)
                  }}
                >
                  {tA}, {tB}, {tC}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Educational Summary Section */}
      <section className="section pythagoras-summary-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">KONSEP DASAR PYTHAGORAS</span>
            <h2>Pedoman Teorema & Identifikasi Segitiga</h2>
          </div>
          {onStartPractice && (
            <button className="button button-primary" onClick={onStartPractice}>
              Latihan Soal Pythagoras →
            </button>
          )}
        </div>

        <div className="formula-cards-grid">
          <article className="formula-info-card">
            <span className="eyebrow">MENCARI SISI MIRING (HIPOTENUSA)</span>
            <h3>c = √(a² + b²)</h3>
            <p>Panjang sisi miring selalu merupakan sisi terpanjang dan berada di hadapan sudut siku-siku 90°.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">MENCARI SISI TEGAK / SIKU-SIKU</span>
            <h3>a = √(c² - b²) atau b = √(c² - a²)</h3>
            <p>Kuadrat sisi miring selalu dikurangi dengan kuadrat sisi siku-siku lainnya.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">KEBALIKAN PYTHAGORAS (JENIS SEGITIGA)</span>
            <h3>c² &gt; a² + b² (Tumpul) | c² &lt; a² + b² (Lancip)</h3>
            <p>Digunakan untuk menentukan apakah sembarang segitiga berbentuk lancip, tumpul, atau tepat siku-siku.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">TRIPLE PYTHAGORAS</span>
            <h3>Kelipatan Triple Dasar</h3>
            <p>Setiap kelipatan bulat dari Triple Pythagoras (misal 3, 4, 5 dikali 2 menjadi 6, 8, 10) juga otomatis merupakan Triple Pythagoras.</p>
          </article>
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="pythagoras" topicTitle="Teorema Pythagoras" />
    </div>
  )
}
