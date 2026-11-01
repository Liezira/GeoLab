import { useState, useMemo } from 'react'
import { calculateCircle, getCircleSvgCoordinates } from '@/geometry/circleMath'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

export type CircleElementKey =
  | 'jari_jari'
  | 'diameter'
  | 'busur'
  | 'tali_busur'
  | 'juring'
  | 'tembereng'
  | 'apotema'
  | 'sudut_keliling'

const ELEMENT_INFO: Record<
  CircleElementKey,
  { name: string; formula: string; explanation: string; color: string }
> = {
  jari_jari: {
    name: 'Jari-jari (r)',
    formula: 'r = ½ × d',
    explanation: 'Ruas garis lurus yang menghubungkan titik pusat lingkaran dengan satu titik pada tepi kurva lingkaran.',
    color: '#3F8064',
  },
  diameter: {
    name: 'Diameter (d)',
    formula: 'd = 2 × r',
    explanation: 'Tali busur terpanjang yang melintasi tepat di titik pusat lingkaran, membagi lingkaran menjadi 2 bagian simetris.',
    color: '#416B60',
  },
  busur: {
    name: 'Busur Lingkaran',
    formula: 'P_busur = (α / 360°) × 2πr',
    explanation: 'Garis lengkung pada tepi lingkaran yang dibatasi oleh dua ujung kaki sudut pusat.',
    color: '#B66E4F',
  },
  tali_busur: {
    name: 'Tali Busur',
    formula: 'T = 2r × sin(α / 2)',
    explanation: 'Ruas garis lurus yang menghubungkan dua titik sembarang pada lingkaran tanpa harus melalui titik pusat.',
    color: '#A87936',
  },
  juring: {
    name: 'Juring (Sektor)',
    formula: 'L_juring = (α / 360°) × πr²',
    explanation: 'Daerah di dalam lingkaran yang dibatasi oleh dua buah jari-jari dan sebuah busur lingkaran di hadapan sudut pusat.',
    color: '#6F9684',
  },
  tembereng: {
    name: 'Tembereng',
    formula: 'L_tembereng = L_juring - L_segitiga',
    explanation: 'Daerah di dalam lingkaran yang dibatasi oleh sebuah busur lingkaran dan tali busurnya.',
    color: '#D6A16F',
  },
  apotema: {
    name: 'Apotema',
    formula: 'a = r × cos(α / 2)',
    explanation: 'Garis tegak lurus (90°) yang ditarik dari titik pusat lingkaran menuju tali busur, sekaligus membagi tali busur sama panjang.',
    color: '#8C4927',
  },
  sudut_keliling: {
    name: 'Sudut Pusat & Sudut Keliling',
    formula: '∠Pusat = 2 × ∠Keliling',
    explanation: 'Besar sudut pusat selalu 2 kali lipat besar sudut keliling jika keduanya menghadap busur lingkaran yang sama.',
    color: '#294C43',
  },
}

export function CircleExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [radius, setRadius] = useState(7)
  const [angleDeg, setAngleDeg] = useState(90)
  const [selectedElement, setSelectedElement] = useState<CircleElementKey>('juring')

  const metrics = useMemo(() => calculateCircle(radius, angleDeg), [radius, angleDeg])

  // Canvas dimensions
  const cx = 250
  const cy = 200
  const radiusPx = 135 // scaled visual radius
  const svgCoords = useMemo(
    () => getCircleSvgCoordinates(cx, cy, radiusPx, angleDeg),
    [cx, cy, radiusPx, angleDeg]
  )

  const activeInfo = ELEMENT_INFO[selectedElement]

  return (
    <div className="page circle-explorer-page">
      <div className="page-heading">
        <span className="eyebrow">LAB LINGKARAN INTERAKTIF</span>
        <h1>Eksplorasi Unsur & Daerah Lingkaran</h1>
        <p>Pahami unsur-unsur lingkaran: busur, tali busur, juring, tembereng, dan apotema melalui diagram interaktif dan simulasi rumus.</p>
      </div>

      <div className="circle-layout-grid">
        {/* SVG Diagram Card */}
        <section className="diagram-card circle-diagram-card">
          <div className="diagram-actions">
            <span><strong>Diagram Interaktif Lingkaran</strong></span>
            <span className="badge-pill" style={{ background: activeInfo.color, color: '#fff' }}>
              Sorotan: {activeInfo.name}
            </span>
          </div>

          <div className="svg-viewport-wrapper">
            <svg className="circle-svg" viewBox="0 0 500 400">
              {/* Lingkaran Penuh Background */}
              <circle
                cx={cx}
                cy={cy}
                r={radiusPx}
                fill="#F7FBF9"
                stroke="#CAD6D0"
                strokeWidth="2.5"
              />

              {/* Juring Highlight (Sector Fill) */}
              <path
                d={svgCoords.sectorPath}
                fill={selectedElement === 'juring' ? 'rgba(111, 150, 132, 0.45)' : 'rgba(111, 150, 132, 0.15)'}
                stroke={selectedElement === 'juring' ? '#416B60' : 'none'}
                strokeWidth="2"
              />

              {/* Tembereng Highlight (Segment Fill) */}
              {(selectedElement === 'tembereng' || selectedElement === 'tali_busur') && (
                <path
                  d={svgCoords.segmentPath}
                  fill="rgba(214, 161, 111, 0.55)"
                  stroke="#D6A16F"
                  strokeWidth="2.5"
                />
              )}

              {/* Triangle inside sector for Tembereng explanation */}
              {selectedElement === 'tembereng' && (
                <polygon
                  points={`${cx},${cy} ${svgCoords.p1.x},${svgCoords.p1.y} ${svgCoords.p2.x},${svgCoords.p2.y}`}
                  fill="rgba(65, 107, 96, 0.2)"
                  stroke="#416B60"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Diameter Line */}
              {selectedElement === 'diameter' && (
                <line
                  x1={cx - radiusPx}
                  y1={cy}
                  x2={cx + radiusPx}
                  y2={cy}
                  stroke="#294C43"
                  strokeWidth="4"
                />
              )}

              {/* Jari-jari lines (legs of the sector) */}
              <line
                x1={cx}
                y1={cy}
                x2={svgCoords.p1.x}
                y2={svgCoords.p1.y}
                stroke={selectedElement === 'jari_jari' ? '#3F8064' : '#355C4F'}
                strokeWidth={selectedElement === 'jari_jari' ? 4.5 : 2.5}
              />
              <line
                x1={cx}
                y1={cy}
                x2={svgCoords.p2.x}
                y2={svgCoords.p2.y}
                stroke={selectedElement === 'jari_jari' ? '#3F8064' : '#355C4F'}
                strokeWidth={selectedElement === 'jari_jari' ? 4.5 : 2.5}
              />

              {/* Busur Lingkaran (Arc Line) */}
              <path
                d={svgCoords.arcPath}
                fill="none"
                stroke={selectedElement === 'busur' ? '#B66E4F' : '#355C4F'}
                strokeWidth={selectedElement === 'busur' ? 5.5 : 3.5}
              />

              {/* Tali Busur (Chord Line) */}
              <line
                x1={svgCoords.p1.x}
                y1={svgCoords.p1.y}
                x2={svgCoords.p2.x}
                y2={svgCoords.p2.y}
                stroke={selectedElement === 'tali_busur' ? '#A87936' : '#929D96'}
                strokeWidth={selectedElement === 'tali_busur' ? 4.5 : 2}
                strokeDasharray={selectedElement === 'tali_busur' ? 'none' : '5 4'}
              />

              {/* Apotema Line */}
              {selectedElement === 'apotema' && (
                <>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={svgCoords.midChord.x}
                    y2={svgCoords.midChord.y}
                    stroke="#8C4927"
                    strokeWidth="4"
                  />
                  <circle cx={svgCoords.midChord.x} cy={svgCoords.midChord.y} r="4" fill="#8C4927" />
                </>
              )}

              {/* Titik Pusat */}
              <circle cx={cx} cy={cy} r="5" fill="#273632" />
              <text x={cx - 14} y={cy - 10} className="svg-label" fontWeight="bold">
                O (Pusat)
              </text>

              {/* Sudut Pusat Arc / Label */}
              <text x={cx + 10} y={cy - 14} className="svg-label" fill="#B66E4F" fontWeight="bold">
                α = {angleDeg}°
              </text>

              {/* Label r */}
              <text
                x={(cx + svgCoords.p1.x) / 2 - 20}
                y={(cy + svgCoords.p1.y) / 2}
                className="svg-label"
                fill="#3F8064"
                fontWeight="bold"
              >
                r = {radius} cm
              </text>

              {/* Label Busur */}
              <text
                x={svgCoords.midArc.x + (svgCoords.midArc.x > cx ? 15 : -15)}
                y={svgCoords.midArc.y + (svgCoords.midArc.y > cy ? 15 : -15)}
                textAnchor="middle"
                className="svg-label"
                fill="#B66E4F"
                fontWeight="bold"
              >
                Busur ({metrics.arcLength.toFixed(1)} cm)
              </text>
            </svg>
          </div>

          {/* Active Element Explanation Note */}
          <div className="active-element-card" style={{ borderLeftColor: activeInfo.color }}>
            <div className="element-title-row">
              <span className="element-dot" style={{ background: activeInfo.color }} />
              <h3>{activeInfo.name}</h3>
              <code className="formula-code">{activeInfo.formula}</code>
            </div>
            <p>{activeInfo.explanation}</p>
          </div>
        </section>

        {/* Controls & Calculations Sidebar */}
        <aside className="circle-controls-aside">
          {/* Unsur Selector Chips */}
          <div className="element-chips-section">
            <span className="eyebrow">PILIH UNSUR LINGKARAN</span>
            <div className="chips-grid">
              {(Object.keys(ELEMENT_INFO) as CircleElementKey[]).map(key => (
                <button
                  key={key}
                  className={`chip-btn ${selectedElement === key ? 'active' : ''}`}
                  onClick={() => setSelectedElement(key)}
                >
                  <span className="chip-dot" style={{ background: ELEMENT_INFO[key].color }} />
                  <span>{ELEMENT_INFO[key].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="sliders-section">
            <span className="eyebrow">PENGATUR DIMENSI</span>

            <label>
              <span><b>Jari-jari (r)</b><em>{radius} cm (d = {2 * radius} cm)</em></span>
              <input
                type="range"
                min="3"
                max="14"
                step="0.5"
                value={radius}
                onChange={e => setRadius(+e.target.value)}
              />
            </label>

            <label>
              <span><b>Sudut Pusat (α)</b><em>{angleDeg}°</em></span>
              <input
                type="range"
                min="15"
                max="330"
                step="5"
                value={angleDeg}
                onChange={e => setAngleDeg(+e.target.value)}
              />
            </label>

            {/* Quick Angle Presets */}
            <div className="angle-presets">
              <span>Sudut umum:</span>
              {[30, 45, 60, 90, 120, 180].map(deg => (
                <button
                  key={deg}
                  type="button"
                  className={`preset-btn ${angleDeg === deg ? 'active' : ''}`}
                  onClick={() => setAngleDeg(deg)}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>

          {/* Metric Live Results */}
          <div className="calculations">
            <span className="eyebrow">HASIL PERHITUNGAN LINGKARAN</span>
            <div>
              <span>Keliling Penuh (2πr)</span>
              <strong>{metrics.circumference.toFixed(1)} cm</strong>
            </div>
            <div>
              <span>Luas Penuh (πr²)</span>
              <strong>{metrics.area.toFixed(1)} cm²</strong>
            </div>
            <div>
              <span>Panjang Busur</span>
              <strong style={{ color: '#B66E4F' }}>{metrics.arcLength.toFixed(2)} cm</strong>
            </div>
            <div>
              <span>Panjang Tali Busur</span>
              <strong style={{ color: '#A87936' }}>{metrics.chordLength.toFixed(2)} cm</strong>
            </div>
            <hr />
            <div className="result">
              <span>Luas Juring</span>
              <strong style={{ color: '#416B60' }}>{metrics.sectorArea.toFixed(1)} cm²</strong>
            </div>
            <div className="result">
              <span>Luas Tembereng</span>
              <strong style={{ color: '#D6A16F' }}>{metrics.segmentArea.toFixed(1)} cm²</strong>
            </div>
            <div className="formula-trace">
              <span>Penurunan Luas Tembereng:</span>
              <b>
                {metrics.sectorArea.toFixed(1)} (Juring) - {metrics.triangleArea.toFixed(1)} (Δ) ={' '}
                {metrics.segmentArea.toFixed(1)} cm²
              </b>
            </div>
          </div>
        </aside>
      </div>

      {/* Educational Formula & Theorems Cards */}
      <section className="section circle-theorems-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">KONSEP & TEOREMA PENTING</span>
            <h2>Rumus-rumus Esensial Lingkaran SMP</h2>
          </div>
          {onStartPractice && (
            <button className="button button-primary" onClick={onStartPractice}>
              Latihan Soal Lingkaran →
            </button>
          )}
        </div>

        <div className="formula-cards-grid">
          <article className="formula-info-card">
            <span className="eyebrow">PANJANG BUSUR</span>
            <h3>P_busur = (α / 360°) × 2πr</h3>
            <p>Panjang busur berbanding lurus dengan besar sudut pusat terhadap 360° keliling penuh.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">LUAS JURING</span>
            <h3>L_juring = (α / 360°) × πr²</h3>
            <p>Luas bidang sektor kipas berbanding lurus dengan sudut pusat terhadap luas penuh lingkaran.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">LUAS TEMBERENG</span>
            <h3>L_tembereng = L_juring - L_segitiga</h3>
            <p>Luas bidang tembereng dicari dengan mengurangi luas juring dengan luas segitiga di dalamnya.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">SUDUT PUSAT & KELILING</span>
            <h3>∠Pusat = 2 × ∠Keliling</h3>
            <p>Jika menghadap busur yang sama, sudut pusat lingkaran besarnya selalu dua kali sudut keliling.</p>
          </article>
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="lingkaran" topicTitle="Lingkaran" />
    </div>
  )
}
