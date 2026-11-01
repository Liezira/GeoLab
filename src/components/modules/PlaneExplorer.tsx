import { useState, useMemo } from 'react'
import {
  calculatePlaneShape,
  type PlaneShapeType,
  type PlaneShapeParams,
} from '@/geometry/planeGeometry'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

const SHAPE_OPTIONS: { id: PlaneShapeType; label: string; icon: string }[] = [
  { id: 'persegi', label: 'Persegi', icon: '■' },
  { id: 'persegi_panjang', label: 'Persegi Panjang', icon: '▬' },
  { id: 'segitiga', label: 'Segitiga', icon: '▲' },
  { id: 'jajar_genjang', label: 'Jajar Genjang', icon: '▰' },
  { id: 'belah_ketupat', label: 'Belah Ketupat', icon: '◆' },
  { id: 'layang_layang', label: 'Layang-layang', icon: '◇' },
  { id: 'trapesium', label: 'Trapesium', icon: '⏢' },
]

export function PlaneExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [selectedShape, setSelectedShape] = useState<PlaneShapeType>('persegi_panjang')

  // Parameter states
  const [sideA, setSideA] = useState(8)
  const [sideB, setSideB] = useState(5)
  const [sideC, setSideC] = useState(6)
  const [sideD, setSideD] = useState(6)
  const [height, setHeight] = useState(5)
  const [diagonal1, setDiagonal1] = useState(12)
  const [diagonal2, setDiagonal2] = useState(8)
  const [showAuxLines, setShowAuxLines] = useState(true)

  const params: PlaneShapeParams = useMemo(() => {
    return {
      sideA,
      sideB,
      sideC,
      sideD,
      height,
      diagonal1,
      diagonal2,
    }
  }, [sideA, sideB, sideC, sideD, height, diagonal1, diagonal2])

  const metrics = useMemo(() => calculatePlaneShape(selectedShape, params), [selectedShape, params])

  // SVG Drawing rendering helper
  const renderSvg = () => {
    const cx = 300
    const cy = 200

    switch (selectedShape) {
      case 'persegi': {
        const sizePx = sideA * 26
        const half = sizePx / 2
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <rect
              x={cx - half}
              y={cy - half}
              width={sizePx}
              height={sizePx}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
              rx="2"
            />
            {showAuxLines && (
              <line
                x1={cx - half}
                y1={cy - half}
                x2={cx + half}
                y2={cy + half}
                stroke="#B66E4F"
                strokeWidth="2"
                strokeDasharray="6 5"
              />
            )}
            <text x={cx} y={cy + half + 28} textAnchor="middle" className="svg-label">
              s = {sideA} cm
            </text>
            <text x={cx - half - 28} y={cy} textAnchor="middle" transform={`rotate(-90 ${cx - half - 28} ${cy})`} className="svg-label">
              s = {sideA} cm
            </text>
            {/* Siku-siku */}
            <path d={`M ${cx - half} ${cy + half - 18} h 18 v 18`} fill="none" stroke="#355C4F" strokeWidth="2" />
          </svg>
        )
      }

      case 'persegi_panjang': {
        const wPx = sideA * 24
        const hPx = sideB * 24
        const halfW = wPx / 2
        const halfH = hPx / 2
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <rect
              x={cx - halfW}
              y={cy - halfH}
              width={wPx}
              height={hPx}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
              rx="2"
            />
            {showAuxLines && (
              <line
                x1={cx - halfW}
                y1={cy - halfH}
                x2={cx + halfW}
                y2={cy + halfH}
                stroke="#B66E4F"
                strokeWidth="2"
                strokeDasharray="6 5"
              />
            )}
            <text x={cx} y={cy + halfH + 28} textAnchor="middle" className="svg-label">
              p = {sideA} cm
            </text>
            <text x={cx - halfW - 28} y={cy} textAnchor="middle" transform={`rotate(-90 ${cx - halfW - 28} ${cy})`} className="svg-label">
              l = {sideB} cm
            </text>
            <path d={`M ${cx - halfW} ${cy + halfH - 18} h 18 v 18`} fill="none" stroke="#355C4F" strokeWidth="2" />
          </svg>
        )
      }

      case 'segitiga': {
        const aPx = sideA * 26
        const tPx = height * 24
        const pA = { x: cx - aPx / 2, y: cy + tPx / 2 }
        const pB = { x: cx + aPx / 2, y: cy + tPx / 2 }
        const pC = { x: cx - aPx / 2 + (sideB > 0 ? aPx * 0.4 : aPx / 2), y: cy - tPx / 2 }
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <polygon
              points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
            />
            {showAuxLines && (
              <>
                <line x1={pC.x} y1={pC.y} x2={pC.x} y2={pA.y} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <path d={`M ${pC.x} ${pA.y - 14} h 14 v 14`} fill="none" stroke="#B66E4F" strokeWidth="2" />
                <text x={pC.x + 18} y={cy} className="svg-label" fill="#B66E4F">
                  t = {height} cm
                </text>
              </>
            )}
            <text x={cx} y={pA.y + 28} textAnchor="middle" className="svg-label">
              alas a = {sideA} cm
            </text>
          </svg>
        )
      }

      case 'jajar_genjang': {
        const aPx = sideA * 22
        const tPx = height * 22
        const slantOffset = 50
        const p1 = { x: cx - aPx / 2 - slantOffset / 2, y: cy + tPx / 2 }
        const p2 = { x: cx + aPx / 2 - slantOffset / 2, y: cy + tPx / 2 }
        const p3 = { x: cx + aPx / 2 + slantOffset / 2, y: cy - tPx / 2 }
        const p4 = { x: cx - aPx / 2 + slantOffset / 2, y: cy - tPx / 2 }
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <polygon
              points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
            />
            {showAuxLines && (
              <>
                <line x1={p4.x} y1={p4.y} x2={p4.x} y2={p1.y} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <text x={p4.x + 12} y={cy} className="svg-label" fill="#B66E4F">
                  t = {height} cm
                </text>
              </>
            )}
            <text x={cx - slantOffset / 2} y={p1.y + 28} textAnchor="middle" className="svg-label">
              alas a = {sideA} cm
            </text>
            <text x={p2.x + 22} y={cy} textAnchor="start" className="svg-label">
              b = {sideB} cm
            </text>
          </svg>
        )
      }

      case 'belah_ketupat': {
        const d1Px = diagonal1 * 16
        const d2Px = diagonal2 * 16
        const pTop = { x: cx, y: cy - d2Px / 2 }
        const pBottom = { x: cx, y: cy + d2Px / 2 }
        const pLeft = { x: cx - d1Px / 2, y: cy }
        const pRight = { x: cx + d1Px / 2, y: cy }
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <polygon
              points={`${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
            />
            {showAuxLines && (
              <>
                <line x1={pLeft.x} y1={cy} x2={pRight.x} y2={cy} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <line x1={cx} y1={pTop.y} x2={cx} y2={pBottom.y} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <text x={cx + 10} y={cy - 10} className="svg-label" fill="#B66E4F">
                  90°
                </text>
              </>
            )}
            <text x={cx} y={pBottom.y + 28} textAnchor="middle" className="svg-label">
              d₁ = {diagonal1} cm, d₂ = {diagonal2} cm
            </text>
            <text x={(pRight.x + pBottom.x) / 2 + 18} y={(pRight.y + pBottom.y) / 2} className="svg-label">
              s = {sideA} cm
            </text>
          </svg>
        )
      }

      case 'layang_layang': {
        const d1Px = diagonal1 * 16
        const d2Top = diagonal2 * 6
        const d2Bottom = diagonal2 * 18
        const pTop = { x: cx, y: cy - d2Top }
        const pBottom = { x: cx, y: cy + d2Bottom }
        const pLeft = { x: cx - d1Px / 2, y: cy }
        const pRight = { x: cx + d1Px / 2, y: cy }
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <polygon
              points={`${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
            />
            {showAuxLines && (
              <>
                <line x1={pLeft.x} y1={cy} x2={pRight.x} y2={cy} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <line x1={cx} y1={pTop.y} x2={cx} y2={pBottom.y} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
              </>
            )}
            <text x={cx} y={pBottom.y + 28} textAnchor="middle" className="svg-label">
              d₁ = {diagonal1} cm, d₂ = {diagonal2} cm
            </text>
            <text x={(pTop.x + pRight.x) / 2 + 15} y={(pTop.y + pRight.y) / 2} className="svg-label">
              a = {sideA} cm
            </text>
            <text x={(pRight.x + pBottom.x) / 2 + 15} y={(pRight.y + pBottom.y) / 2} className="svg-label">
              b = {sideB} cm
            </text>
          </svg>
        )
      }

      case 'trapesium': {
        const aTopPx = sideA * 18
        const bBottomPx = sideB * 18
        const tPx = height * 22
        const pTopLeft = { x: cx - aTopPx / 2, y: cy - tPx / 2 }
        const pTopRight = { x: cx + aTopPx / 2, y: cy - tPx / 2 }
        const pBottomLeft = { x: cx - bBottomPx / 2, y: cy + tPx / 2 }
        const pBottomRight = { x: cx + bBottomPx / 2, y: cy + tPx / 2 }
        return (
          <svg className="plane-svg" viewBox="0 0 600 400">
            <polygon
              points={`${pTopLeft.x},${pTopLeft.y} ${pTopRight.x},${pTopRight.y} ${pBottomRight.x},${pBottomRight.y} ${pBottomLeft.x},${pBottomLeft.y}`}
              fill="rgba(65, 107, 96, 0.15)"
              stroke="#355C4F"
              strokeWidth="3.5"
            />
            {showAuxLines && (
              <>
                <line x1={pTopLeft.x} y1={pTopLeft.y} x2={pTopLeft.x} y2={pBottomLeft.y} stroke="#B66E4F" strokeWidth="2" strokeDasharray="6 5" />
                <text x={pTopLeft.x + 10} y={cy} className="svg-label" fill="#B66E4F">
                  t = {height} cm
                </text>
              </>
            )}
            <text x={cx} y={pTopLeft.y - 12} textAnchor="middle" className="svg-label">
              atas a = {sideA} cm
            </text>
            <text x={cx} y={pBottomLeft.y + 28} textAnchor="middle" className="svg-label">
              bawah b = {sideB} cm
            </text>
          </svg>
        )
      }
    }
  }

  return (
    <div className="page plane-explorer-page">
      <div className="page-heading">
        <span className="eyebrow">LAB BANGUN DATAR 2D</span>
        <h1>Eksplorasi {metrics.name}</h1>
        <p>Pilih bentuk bangun datar, ubah ukuran sisinya, amati diagram proporsional dan penurunan rumusnya secara langsung.</p>
      </div>

      {/* Shape Selector Bar */}
      <div className="shape-selector-tabs">
        {SHAPE_OPTIONS.map(opt => (
          <button
            key={opt.id}
            className={`shape-tab-btn ${selectedShape === opt.id ? 'active' : ''}`}
            onClick={() => setSelectedShape(opt.id)}
          >
            <span className="shape-tab-icon">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="explorer2d-grid">
        {/* Visual Diagram Card */}
        <section className="diagram-card">
          <div className="diagram-actions">
            <span><strong>Diagram Skala Proporsional</strong></span>
            <label>
              <input
                type="checkbox"
                checked={showAuxLines}
                onChange={e => setShowAuxLines(e.target.checked)}
              />{' '}
              Garis Bantu & Tinggi
            </label>
          </div>
          <div className="svg-viewport-wrapper">{renderSvg()}</div>
          <div className="diagram-footer-note">
            <span className="eyebrow">INFO BENTUK</span>
            <p>{metrics.notes}</p>
          </div>
        </section>

        {/* Controls & Dimensions Aside */}
        <aside className="control2d">
          <span className="eyebrow">KONTROL UKURAN</span>
          <h2>Atur Dimensi</h2>

          {selectedShape === 'persegi' && (
            <label>
              <span><b>Panjang Sisi (s)</b><em>{sideA} cm</em></span>
              <input type="range" min="3" max="12" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
            </label>
          )}

          {selectedShape === 'persegi_panjang' && (
            <>
              <label>
                <span><b>Panjang (p)</b><em>{sideA} cm</em></span>
                <input type="range" min="4" max="14" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
              </label>
              <label>
                <span><b>Lebar (l)</b><em>{sideB} cm</em></span>
                <input type="range" min="2" max="10" step="0.5" value={sideB} onChange={e => setSideB(+e.target.value)} />
              </label>
            </>
          )}

          {selectedShape === 'segitiga' && (
            <>
              <label>
                <span><b>Alas (a)</b><em>{sideA} cm</em></span>
                <input type="range" min="4" max="14" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
              </label>
              <label>
                <span><b>Tinggi (t)</b><em>{height} cm</em></span>
                <input type="range" min="3" max="12" step="0.5" value={height} onChange={e => setHeight(+e.target.value)} />
              </label>
            </>
          )}

          {selectedShape === 'jajar_genjang' && (
            <>
              <label>
                <span><b>Alas (a)</b><em>{sideA} cm</em></span>
                <input type="range" min="4" max="14" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
              </label>
              <label>
                <span><b>Sisi Miring (b)</b><em>{sideB} cm</em></span>
                <input type="range" min="3" max="10" step="0.5" value={sideB} onChange={e => setSideB(+e.target.value)} />
              </label>
              <label>
                <span><b>Tinggi (t)</b><em>{height} cm</em></span>
                <input type="range" min="2" max="9" step="0.5" value={height} onChange={e => setHeight(+e.target.value)} />
              </label>
            </>
          )}

          {(selectedShape === 'belah_ketupat' || selectedShape === 'layang_layang') && (
            <>
              <label>
                <span><b>Diagonal 1 (d₁)</b><em>{diagonal1} cm</em></span>
                <input type="range" min="6" max="18" step="1" value={diagonal1} onChange={e => setDiagonal1(+e.target.value)} />
              </label>
              <label>
                <span><b>Diagonal 2 (d₂)</b><em>{diagonal2} cm</em></span>
                <input type="range" min="4" max="16" step="1" value={diagonal2} onChange={e => setDiagonal2(+e.target.value)} />
              </label>
              {selectedShape === 'belah_ketupat' && (
                <label>
                  <span><b>Sisi (s)</b><em>{sideA} cm</em></span>
                  <input type="range" min="4" max="12" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
                </label>
              )}
            </>
          )}

          {selectedShape === 'trapesium' && (
            <>
              <label>
                <span><b>Sisi Atas (a)</b><em>{sideA} cm</em></span>
                <input type="range" min="4" max="10" step="0.5" value={sideA} onChange={e => setSideA(+e.target.value)} />
              </label>
              <label>
                <span><b>Sisi Bawah (b)</b><em>{sideB} cm</em></span>
                <input type="range" min="8" max="16" step="0.5" value={sideB} onChange={e => setSideB(+e.target.value)} />
              </label>
              <label>
                <span><b>Tinggi (t)</b><em>{height} cm</em></span>
                <input type="range" min="3" max="10" step="0.5" value={height} onChange={e => setHeight(+e.target.value)} />
              </label>
            </>
          )}

          {/* Metric Box */}
          <div className="metric-box">
            <div>
              <span>Keliling</span>
              <strong>{metrics.perimeter.toFixed(1)} cm</strong>
              <small>{metrics.formulaPerimeter}</small>
            </div>
            <div>
              <span>Luas</span>
              <strong>{metrics.area.toFixed(1)} cm²</strong>
              <small>{metrics.formulaArea}</small>
            </div>
          </div>

          <button
            type="button"
            className="button button-secondary button-wide"
            onClick={() => {
              setSideA(8)
              setSideB(5)
              setHeight(5)
              setDiagonal1(12)
              setDiagonal2(8)
            }}
          >
            Reset Ukuran
          </button>
        </aside>
      </div>

      {/* Facts & Properties Grid */}
      <section className="section plane-facts-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">RINGKASAN SIFAT MATEMATIS</span>
            <h2>Karakteristik & Rumus {metrics.name}</h2>
          </div>
          {onStartPractice && (
            <button className="button button-primary" onClick={onStartPractice}>
              Latihan Soal Bangun Datar →
            </button>
          )}
        </div>
        <div className="facts-grid">
          {metrics.facts.map(f => (
            <div key={f.label} className="fact-item-card">
              <span>{f.label}</span>
              <strong>{f.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="bangun_datar" topicTitle="Bangun Datar" />
    </div>
  )
}
