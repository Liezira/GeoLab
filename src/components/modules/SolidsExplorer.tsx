import { useState, useMemo, lazy, Suspense } from 'react'
import {
  calculateSolid,
  type SolidShapeType,
  type SolidShapeParams,
} from '@/geometry/solids3d'
import type { SolidCameraPreset } from '@/components/geometry/Solids3DViewer'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

const Solids3DViewer = lazy(() =>
  import('@/components/geometry/Solids3DViewer').then(m => ({ default: m.Solids3DViewer }))
)

const SOLID_OPTIONS: { id: SolidShapeType; label: string }[] = [
  { id: 'kubus', label: 'Kubus' },
  { id: 'balok', label: 'Balok' },
  { id: 'limas_segiempat', label: 'Limas Segiempat' },
  { id: 'limas_segitiga', label: 'Limas Segitiga' },
  { id: 'kerucut', label: 'Kerucut' },
  { id: 'bola', label: 'Bola' },
]

export function SolidsExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [selectedSolid, setSelectedSolid] = useState<SolidShapeType>('kubus')
  const [cameraPreset, setCameraPreset] = useState<SolidCameraPreset>('Isometrik')
  const [autoRotate, setAutoRotate] = useState(false)
  const [wireframe, setWireframe] = useState(true)

  // Advanced Interactive 3D states
  const [showInterior, setShowInterior] = useState(false)
  const [showDiagonal, setShowDiagonal] = useState(false)
  const [isHemisphere, setIsHemisphere] = useState(false)
  const [highlightElement, setHighlightElement] = useState<'alas' | 'selimut' | 'tinggi' | 'diagonal' | 'volume' | null>(null)

  // Parameters
  const [dimA, setDimA] = useState(6) // s, p, or r
  const [dimB, setDimB] = useState(8) // l, or t
  const [dimC, setDimC] = useState(5) // t (for balok)

  const params: SolidShapeParams = useMemo(() => ({
    dimA,
    dimB,
    dimC,
  }), [dimA, dimB, dimC])

  const metrics = useMemo(() => calculateSolid(selectedSolid, params), [selectedSolid, params])

  // Calculated detailed 3D dimensions
  const internalDetails = useMemo(() => {
    if (selectedSolid === 'limas_segiempat') {
      const s = dimA
      const t = dimB
      const halfS = s / 2
      const ts = Math.sqrt(t * t + halfS * halfS)
      return {
        title: 'Segitiga Siku-siku Internal Limas (Pythagoras)',
        items: [
          { label: 'Tinggi Limas (t)', val: `${t} cm` },
          { label: 'Setengah Sisi Alas (s/2)', val: `${halfS.toFixed(1)} cm` },
          { label: 'Tinggi Sisi Tegak (tₛ)', val: `${ts.toFixed(2)} cm` },
        ],
        formula: `tₛ = √(t² + (s/2)²) = √(${t}² + ${halfS.toFixed(1)}²) = ${ts.toFixed(2)} cm`,
      }
    }

    if (selectedSolid === 'kerucut') {
      const r = dimA
      const t = dimB
      const s = Math.sqrt(r * r + t * t)
      return {
        title: 'Segitiga Siku-siku Internal Kerucut (Garis Pelukis)',
        items: [
          { label: 'Jari-jari Alas (r)', val: `${r} cm` },
          { label: 'Tinggi Kerucut (t)', val: `${t} cm` },
          { label: 'Garis Pelukis (s)', val: `${s.toFixed(2)} cm` },
        ],
        formula: `s = √(r² + t²) = √(${r}² + ${t}²) = ${s.toFixed(2)} cm`,
      }
    }

    if (selectedSolid === 'kubus') {
      const s = dimA
      const dPlane = s * Math.SQRT2
      const dSpace = s * Math.sqrt(3)
      return {
        title: 'Diagonal Bidang & Diagonal Ruang Kubus',
        items: [
          { label: 'Panjang Rusuk (s)', val: `${s} cm` },
          { label: 'Diagonal Bidang (s√2)', val: `${dPlane.toFixed(2)} cm` },
          { label: 'Diagonal Ruang (s√3)', val: `${dSpace.toFixed(2)} cm` },
        ],
        formula: `Diagonal Ruang = s√3 = ${s} × 1,732 ≈ ${dSpace.toFixed(2)} cm`,
      }
    }

    if (selectedSolid === 'balok') {
      const p = dimA
      const l = dimB
      const t = dimC
      const dSpace = Math.sqrt(p * p + l * l + t * t)
      return {
        title: 'Diagonal Ruang Tembus Pandang Balok',
        items: [
          { label: 'Dimensi (p × l × t)', val: `${p} × ${l} × ${t} cm` },
          { label: 'Diagonal Ruang', val: `${dSpace.toFixed(2)} cm` },
        ],
        formula: `d = √(p² + l² + t²) = √(${p}² + ${l}² + ${t}²) = ${dSpace.toFixed(2)} cm`,
      }
    }

    if (selectedSolid === 'bola') {
      const r = dimA
      const areaCircle = Math.PI * r * r
      const areaDome = 2 * Math.PI * r * r
      return {
        title: 'Analisis Belahan Setengah Bola Padat',
        items: [
          { label: 'Luas Lingkaran Dasar (πr²)', val: `${areaCircle.toFixed(1)} cm²` },
          { label: 'Luas Kubah Lengkung (2πr²)', val: `${areaDome.toFixed(1)} cm²` },
          { label: 'Total LP ½ Bola Padat (3πr²)', val: `${(3 * areaCircle).toFixed(1)} cm²` },
        ],
        formula: `LP = πr² + 2πr² = 3πr² = 3 × π × ${r}² ≈ ${(3 * areaCircle).toFixed(1)} cm²`,
      }
    }

    return null
  }, [selectedSolid, dimA, dimB, dimC])

  const canShowInterior = selectedSolid === 'limas_segiempat' || selectedSolid === 'kerucut'
  const canShowDiagonal = selectedSolid === 'kubus' || selectedSolid === 'balok'
  const canShowHemisphere = selectedSolid === 'bola'

  return (
    <div className="page solids-explorer-page">
      <div className="page-heading">
        <span className="eyebrow">LAB BANGUN RUANG 3D</span>
        <h1>Eksplorasi {metrics.name}</h1>
        <p>Amati bangun ruang secara 3 dimensi, bedah bagian interior, telusuri hubungan Pythagoras spasial, serta pelajari rumus volume dan luas permukaannya.</p>
      </div>

      {/* Solid Selector Buttons */}
      <div className="shape-selector-tabs">
        {SOLID_OPTIONS.map(opt => (
          <button
            key={opt.id}
            className={`shape-tab-btn ${selectedSolid === opt.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedSolid(opt.id)
              setAutoRotate(false)
              setShowInterior(false)
              setShowDiagonal(false)
              setIsHemisphere(false)
              setHighlightElement(null)
            }}
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="explorer-grid">
        {/* 3D Viewport Card */}
        <section className="viewport-card">
          <div className="viewport-top">
            <span className="simulation-tag">
              MODEL 3D: {metrics.name.toUpperCase()} {isHemisphere ? '(½ BOLA PADAT)' : ''}
            </span>
            <span className="interaction-hint">
              Geser untuk memutar • Scroll/cubit untuk zoom
            </span>
          </div>

          <div className="viewport" tabIndex={0}>
            <Suspense
              fallback={
                <div className="viewer-fallback">
                  <span>Memuat model 3D {metrics.name}...</span>
                </div>
              }
            >
              <Solids3DViewer
                shapeType={selectedSolid}
                params={params}
                cameraPreset={cameraPreset}
                autoRotate={autoRotate}
                showWireframe={wireframe}
                showInterior={showInterior}
                showDiagonal={showDiagonal}
                isHemisphere={isHemisphere}
                highlightElement={highlightElement}
              />
            </Suspense>

            {/* Quick 3D status badge */}
            {(showInterior || showDiagonal || isHemisphere) && (
              <div className="interior-mode-badge">
                {showInterior && '⚡ Mode X-Ray Interior Aktif'}
                {showDiagonal && '⚡ Diagonal Ruang Aktif'}
                {isHemisphere && '⚡ Belahan Setengah Bola'}
              </div>
            )}
          </div>

          {/* Viewer Toolbar */}
          <div className="viewer-toolbar">
            <div className="camera-group">
              {(['Isometrik', 'Depan', 'Atas', 'Samping'] as SolidCameraPreset[]).map(preset => (
                <button
                  key={preset}
                  className={cameraPreset === preset ? 'active' : ''}
                  onClick={() => setCameraPreset(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="tool-actions">
              <button
                className={autoRotate ? 'active' : ''}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                Auto Rotate
              </button>
              <button
                className={wireframe ? 'active' : ''}
                onClick={() => setWireframe(!wireframe)}
              >
                Kerangka
              </button>

              {/* Dynamic Feature Toggles */}
              {canShowInterior && (
                <button
                  className={showInterior ? 'active' : ''}
                  style={showInterior ? { background: '#FFF3D6', borderColor: '#D6A16F', color: '#8C4927', fontWeight: 'bold' } : {}}
                  onClick={() => setShowInterior(!showInterior)}
                >
                  👁️ {showInterior ? 'Tutup X-Ray' : 'Bedah Interior (X-Ray)'}
                </button>
              )}

              {canShowDiagonal && (
                <button
                  className={showDiagonal ? 'active' : ''}
                  style={showDiagonal ? { background: '#E3EDE8', borderColor: '#416B60', color: '#294C43', fontWeight: 'bold' } : {}}
                  onClick={() => setShowDiagonal(!showDiagonal)}
                >
                  📐 {showDiagonal ? 'Tutup Diagonal' : 'Diagonal Ruang'}
                </button>
              )}

              {canShowHemisphere && (
                <button
                  className={isHemisphere ? 'active' : ''}
                  style={isHemisphere ? { background: '#E3EDE8', borderColor: '#416B60', color: '#294C43', fontWeight: 'bold' } : {}}
                  onClick={() => setIsHemisphere(!isHemisphere)}
                >
                  ✂️ {isHemisphere ? 'Bola Utuh' : 'Belah ½ Bola'}
                </button>
              )}

              <button
                onClick={() => {
                  setCameraPreset('Isometrik')
                  setAutoRotate(false)
                  setShowInterior(false)
                  setShowDiagonal(false)
                  setIsHemisphere(false)
                  setHighlightElement(null)
                }}
              >
                Reset Kamera
              </button>
            </div>
          </div>
        </section>

        {/* Aside Facts & Elements */}
        <aside className="element-panel">
          <span className="eyebrow">UNSUR BANGUN RUANG</span>
          <h2>Karakteristik {metrics.name}</h2>
          <p>{metrics.notes}</p>

          <div className="shape-facts">
            <span>
              <b>{metrics.faces}</b> Bidang Sisi
            </span>
            <span>
              <b>{metrics.edges}</b> Rusuk
            </span>
            <span>
              <b>{metrics.vertices}</b> Titik Sudut
            </span>
          </div>

          {/* Dimension Controls */}
          <div className="dimensions" style={{ marginTop: '20px' }}>
            <span className="eyebrow">KONTROL DIMENSI</span>

            {selectedSolid === 'kubus' && (
              <label>
                <span><b>Panjang Rusuk (s)</b><em>{dimA} cm</em></span>
                <input type="range" min="3" max="10" step="0.5" value={dimA} onChange={e => setDimA(+e.target.value)} />
              </label>
            )}

            {selectedSolid === 'balok' && (
              <>
                <label>
                  <span><b>Panjang (p)</b><em>{dimA} cm</em></span>
                  <input type="range" min="4" max="12" step="0.5" value={dimA} onChange={e => setDimA(+e.target.value)} />
                </label>
                <label>
                  <span><b>Lebar (l)</b><em>{dimB} cm</em></span>
                  <input type="range" min="3" max="10" step="0.5" value={dimB} onChange={e => setDimB(+e.target.value)} />
                </label>
                <label>
                  <span><b>Tinggi (t)</b><em>{dimC} cm</em></span>
                  <input type="range" min="3" max="10" step="0.5" value={dimC} onChange={e => setDimC(+e.target.value)} />
                </label>
              </>
            )}

            {(selectedSolid === 'limas_segiempat' || selectedSolid === 'limas_segitiga') && (
              <>
                <label>
                  <span><b>Sisi Alas ({selectedSolid === 'limas_segiempat' ? 's' : 'a'})</b><em>{dimA} cm</em></span>
                  <input type="range" min="4" max="12" step="0.5" value={dimA} onChange={e => setDimA(+e.target.value)} />
                </label>
                <label>
                  <span><b>Tinggi Limas (t)</b><em>{dimB} cm</em></span>
                  <input type="range" min="4" max="14" step="0.5" value={dimB} onChange={e => setDimB(+e.target.value)} />
                </label>
              </>
            )}

            {selectedSolid === 'kerucut' && (
              <>
                <label>
                  <span><b>Jari-jari Alas (r)</b><em>{dimA} cm</em></span>
                  <input type="range" min="3" max="10" step="0.5" value={dimA} onChange={e => setDimA(+e.target.value)} />
                </label>
                <label>
                  <span><b>Tinggi Kerucut (t)</b><em>{dimB} cm</em></span>
                  <input type="range" min="4" max="14" step="0.5" value={dimB} onChange={e => setDimB(+e.target.value)} />
                </label>
              </>
            )}

            {selectedSolid === 'bola' && (
              <label>
                <span><b>Jari-jari Bola (r)</b><em>{dimA} cm</em></span>
                <input type="range" min="3" max="10" step="0.5" value={dimA} onChange={e => setDimA(+e.target.value)} />
              </label>
            )}
          </div>
        </aside>
      </div>

      {/* Advanced Interior Detail Box */}
      {internalDetails && (
        <section className="advanced-interior-card">
          <div className="interior-card-header">
            <div>
              <span className="eyebrow">BEDAH MATEMATIS SPASIAL</span>
              <h3>{internalDetails.title}</h3>
            </div>
            <code className="formula-code big">{internalDetails.formula}</code>
          </div>
          <div className="interior-items-grid">
            {internalDetails.items.map(it => (
              <div key={it.label} className="interior-item">
                <span>{it.label}</span>
                <strong>{it.val}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Calculations & Facts Section */}
      <section className="simulation-panel">
        <div className="calculations" style={{ borderLeft: 0, paddingLeft: 0 }}>
          <span className="eyebrow">KLIK RUMUS UNTUK MENYOROT 3D</span>
          <div
            className={`result clickable ${highlightElement === 'volume' ? 'highlighted' : ''}`}
            onClick={() => setHighlightElement(highlightElement === 'volume' ? null : 'volume')}
            title="Klik untuk menyorot volume di model 3D"
          >
            <span>Volume ({metrics.formulaVolume})</span>
            <strong style={{ color: '#416B60', fontSize: '24px' }}>
              {metrics.volume.toFixed(1)} cm³
            </strong>
          </div>
          <div
            className={`result clickable ${highlightElement === 'selimut' ? 'highlighted' : ''}`}
            onClick={() => setHighlightElement(highlightElement === 'selimut' ? null : 'selimut')}
            title="Klik untuk menyorot luas permukaan"
          >
            <span>Luas Permukaan ({metrics.formulaSurfaceArea})</span>
            <strong style={{ color: '#B66E4F', fontSize: '22px' }}>
              {metrics.surfaceArea.toFixed(1)} cm²
            </strong>
          </div>
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

      {/* Educational Summary Section */}
      <section className="section solids-summary-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">RANGKUMAN RUMUS</span>
            <h2>Rumus Inti Bangun Ruang SMP</h2>
          </div>
          {onStartPractice && (
            <button className="button button-primary" onClick={onStartPractice}>
              Latihan Soal Bangun Ruang →
            </button>
          )}
        </div>

        <div className="formula-cards-grid">
          <article className="formula-info-card">
            <span className="eyebrow">KUBUS & BALOK</span>
            <h3>V_kubus = s³ | V_balok = p × l × t</h3>
            <p>Diagonal bidang kubus adalah s√2 dan diagonal ruangnya s√3 yang membelah tepat di tengah ruang 3D.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">LIMAS & KERUCUT</span>
            <h3>V = ⅓ × Luas Alas × tinggi</h3>
            <p>Tinggi sisi tegak limas (tₛ) dan garis pelukis kerucut (s) dicari dengan Teorema Pythagoras segitiga interior.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">GARIS PELUKIS KERUCUT</span>
            <h3>s = √(r² + t²)</h3>
            <p>Garis pelukis menghubungkan titik puncak kerucut dengan tepi keliling lingkaran alasnya.</p>
          </article>

          <article className="formula-info-card">
            <span className="eyebrow">BOLA & ½ BOLA PADAT</span>
            <h3>V = ⁴⁄₃πr³ | LP ½ Bola Padat = 3πr²</h3>
            <p>Pada setengah bola padat, luas permukaan merupakan gabungan lingkaran dasar (πr²) dan kubah lengkung (2πr²).</p>
          </article>
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="bangun_ruang" topicTitle="Bangun Ruang 3D" />
    </div>
  )
}
