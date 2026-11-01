import { useState, useMemo, useEffect, lazy, Suspense } from 'react'
import type { CameraPreset, SelectedElement } from '@/components/geometry/GeometryViewer'
import { calculatePrism, formatDecimal, prismName, type PrismSides } from '@/geometry/prism'
import { WorkedExamplesSection } from '@/components/common/WorkedExamplesSection'

const GeometryViewer = lazy(() =>
  import('@/components/geometry/GeometryViewer').then(module => ({ default: module.GeometryViewer }))
)

export function PrismExplorer({ onStartPractice }: { onStartPractice?: () => void }) {
  const [view, setView] = useState<'solid' | 'net'>('solid')
  const [camera, setCamera] = useState<CameraPreset>('Isometrik')
  const [selected, setSelected] = useState<SelectedElement>('Alas')
  const [labels, setLabels] = useState(true)
  const [auto, setAuto] = useState(false)
  const [sides, setSides] = useState<PrismSides>(3)
  const [base, setBase] = useState(4)
  const [height, setHeight] = useState(8)
  const [baseInput, setBaseInput] = useState('4')
  const [heightInput, setHeightInput] = useState('8')
  const [unfoldProgress, setUnfoldProgress] = useState(0)
  const [resetSignal, setResetSignal] = useState(0)
  const [lightweight, setLightweight] = useState(() => window.matchMedia('(max-width: 640px)').matches)

  const metrics = useMemo(() => calculatePrism(sides, base, height), [sides, base, height])
  const name = prismName(sides)

  const descriptions: Record<SelectedElement, string> = {
    Alas: `Bidang ${
      sides === 3
        ? 'segitiga sama sisi'
        : sides === 4
        ? 'persegi atau persegipanjang'
        : sides === 5
        ? 'segilima beraturan'
        : sides === 6
        ? 'segienam beraturan (heksagon)'
        : sides === 8
        ? 'segidelapan beraturan (oktagon)'
        : sides === 'trapezoid'
        ? 'trapesium sama kaki'
        : 'lingkaran'
    } yang menjadi dasar bangun ruang ini.`,
    Tutup: 'Bidang yang kongruen, sejajar, dan sama persis ukurannya dengan bidang alas.',
    'Sisi Tegak':
      sides === 'cylinder'
        ? 'Selimut lengkung tabung yang mengelilingi dan menghubungkan lingkaran alas serta tutup.'
        : `${metrics.faces - 2} bidang tegak persegi panjang yang menghubungkan alas dan tutup prisma.`,
    Rusuk:
      sides === 'cylinder'
        ? '2 rusuk lengkung yang menjadi batas keliling lingkaran alas dan tutup.'
        : `${metrics.edges} ruas garis tempat bertemunya dua bidang pada bangun ruang.`,
    'Titik Sudut':
      sides === 'cylinder'
        ? '0 titik sudut (tabung adalah bangun ruang sisi lengkung tanpa sudut lancip).'
        : `${metrics.vertices} titik tempat rusuk-rusuk prisma saling bertemu.`,
    Tinggi: 'Jarak tegak lurus antara bidang alas dan bidang tutup.',
  }

  const switchView = (next: 'solid' | 'net') => {
    setView(next)
    setAuto(false)
    if (next === 'net') {
      setUnfoldProgress(0)
      window.setTimeout(() => setUnfoldProgress(100), 50)
    }
  }

  const resetCamera = () => {
    setCamera('Isometrik')
    setAuto(false)
    setLabels(true)
    setResetSignal(value => value + 1)
  }

  const handleBaseChange = (valStr: string) => {
    setBaseInput(valStr)
    const val = parseFloat(valStr)
    if (!isNaN(val) && val >= 2 && val <= 8) {
      setBase(val)
    }
  }

  const handleBaseBlur = () => {
    const val = parseFloat(baseInput)
    const clamped = isNaN(val) ? 4 : Math.min(8, Math.max(2, val))
    setBase(clamped)
    setBaseInput(String(clamped))
  }

  const handleHeightChange = (valStr: string) => {
    setHeightInput(valStr)
    const val = parseFloat(valStr)
    if (!isNaN(val) && val >= 4 && val <= 14) {
      setHeight(val)
    }
  }

  const handleHeightBlur = () => {
    const val = parseFloat(heightInput)
    const clamped = isNaN(val) ? 8 : Math.min(14, Math.max(4, val))
    setHeight(clamped)
    setHeightInput(String(clamped))
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return
      if (event.key.toLowerCase() === 'r') resetCamera()
      if (event.key.toLowerCase() === 'l') setLabels(v => !v)
      if (event.key === '1') setCamera('Isometrik')
      if (event.key === '2') setCamera('Depan')
      if (event.key === '3') setCamera('Atas')
      if (event.key === '4') setCamera('Samping')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="page explorer-page">
      <div className="explorer-heading">
        <div>
          <span className="eyebrow">LAB PRISMA & TABUNG 3D</span>
          <h1>Eksplorasi {name}</h1>
          <p>Putar model 3D, amati jaring-jaring lipat, sorot unsur-unsur bangun, serta amati rumus volume dan luas permukaan secara langsung.</p>
        </div>
        <div className="type-selector">
          <span>Tipe prisma:</span>
          <select
            aria-label="Tipe prisma"
            value={sides}
            onChange={event => {
              const val = event.target.value
              setSides(val === 'trapezoid' || val === 'cylinder' ? val : (Number(val) as PrismSides))
              setSelected('Alas')
              setResetSignal(v => v + 1)
            }}
          >
            <option value={3}>Prisma Segitiga (Triangular)</option>
            <option value={4}>Prisma Segiempat / Balok (Cuboid)</option>
            <option value="trapezoid">Prisma Trapesium (Trapezoidal)</option>
            <option value={5}>Prisma Segilima (Pentagonal)</option>
            <option value={6}>Prisma Segienam (Hexagonal)</option>
            <option value={8}>Prisma Segidelapan (Octagonal)</option>
            <option value="cylinder">Tabung / Silinder (Cylinder)</option>
          </select>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="mode-switch" aria-label="Mode visualisasi">
        <button className={view === 'solid' ? 'active' : ''} onClick={() => switchView('solid')}>
          Bangun 3D Solid
        </button>
        <button className={view === 'net' ? 'active' : ''} onClick={() => switchView('net')}>
          Jaring-jaring 3D Lipat
        </button>
      </div>

      <div className="explorer-grid">
        {/* 3D Viewport Card */}
        <section className="viewport-card">
          <div className="viewport-top">
            <span className="simulation-tag">MODEL 3D: {name.toUpperCase()}</span>
            <span className="interaction-hint">
              Geser untuk memutar • Scroll/cubit untuk zoom
            </span>
          </div>

          <div
            className="viewport"
            tabIndex={0}
            aria-label={`Viewer 3D ${name}. Tekan R untuk reset dan L untuk label.`}
          >
            <Suspense
              fallback={
                <div className="viewer-fallback">
                  <span>Menyiapkan laboratorium 3D...</span>
                  <p>Memuat engine geometri interaktif Three.js.</p>
                </div>
              }
            >
              <GeometryViewer
                sides={sides}
                sideLength={base}
                prismHeight={height}
                selected={selected}
                cameraPreset={camera}
                labels={labels}
                autoRotate={auto}
                mode={view}
                unfoldProgress={unfoldProgress / 100}
                resetSignal={resetSignal}
                lightweight={lightweight}
                onInteracted={() => setAuto(false)}
              />
            </Suspense>
            <div className="keyboard-hint">
              <span>R</span> Reset <span>L</span> Label
            </div>
          </div>

          {view === 'solid' ? (
            <div className="viewer-toolbar">
              <div className="camera-group">
                {(['Isometrik', 'Depan', 'Atas', 'Samping'] as CameraPreset[]).map((preset, index) => (
                  <button
                    key={preset}
                    className={camera === preset ? 'active' : ''}
                    onClick={() => setCamera(preset)}
                  >
                    <small>{index + 1}</small>
                    {preset}
                  </button>
                ))}
              </div>
              <div className="tool-actions">
                <button
                  className={auto ? 'active' : ''}
                  aria-pressed={auto}
                  onClick={() => setAuto(!auto)}
                >
                  Auto Rotate
                </button>
                <button
                  className={labels ? 'active' : ''}
                  aria-pressed={labels}
                  onClick={() => setLabels(!labels)}
                >
                  Label
                </button>
                <button onClick={resetCamera}>Reset View</button>
              </div>
            </div>
          ) : (
            <div className="net-toolbar">
              <button
                type="button"
                className="button button-soft"
                onClick={() => setUnfoldProgress(100)}
              >
                Buka Jaring-jaring
              </button>
              <div className="net-progress">
                <span>Progres lipatan: {unfoldProgress}%</span>
                <input
                  aria-label="Progres membuka jaring-jaring"
                  type="range"
                  min="0"
                  max="100"
                  value={unfoldProgress}
                  onChange={e => setUnfoldProgress(Number(e.target.value))}
                />
              </div>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setUnfoldProgress(0)}
              >
                Lipat Kembali
              </button>
            </div>
          )}
        </section>

        {/* Aside Element Panel */}
        <aside className="element-panel">
          <span className="eyebrow">PILIH BAGIAN BANGUN</span>
          <h2>Unsur {name}</h2>
          <p>Klik salah satu unsur untuk menyorot bagian yang sesuai pada model 3D.</p>

          <div className="element-list">
            {(Object.keys(descriptions) as SelectedElement[]).map((element, index) => (
              <button
                key={element}
                className={selected === element ? 'active' : ''}
                aria-pressed={selected === element}
                onClick={() => {
                  setSelected(element)
                  switchView('solid')
                }}
              >
                <i className={`element-swatch swatch-${index}`} />
                <span>{element}</span>
                {selected === element && <span style={{ color: '#416B60', fontWeight: 'bold' }}>✓</span>}
              </button>
            ))}
          </div>

          <div key={selected} className="selected-info animated-info">
            <div>
              <strong>{selected}</strong>
              <p>{descriptions[selected]}</p>
            </div>
          </div>

          <div className="shape-facts">
            <span>
              <b>{metrics.faces}</b> Sisi
            </span>
            <span>
              <b>{metrics.edges}</b> Rusuk
            </span>
            <span>
              <b>{metrics.vertices}</b> Titik sudut
            </span>
          </div>

          <div className="legend">
            <span>
              <i className="legend-dot base" /> Alas
            </span>
            <span>
              <i className="legend-dot side" /> Sisi tegak
            </span>
            <span>
              <i className="legend-dot vertex-color" /> Titik sudut
            </span>
            <span>
              <i className="legend-line" /> Tinggi
            </span>
          </div>
        </aside>
      </div>

      {/* Simulation & Dimension Controls Panel */}
      <section className="simulation-panel">
        <div className="dimensions">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">KONTROL DIMENSI</span>
              <h2>Ubah Ukuran Model</h2>
              <p>Model 3D, label, dan hasil rumus dihitung ulang secara sinkron.</p>
            </div>
            <button
              onClick={() => {
                setBase(4)
                setBaseInput('4')
                setHeight(8)
                setHeightInput('8')
              }}
            >
              Ukuran Awal
            </button>
          </div>

          <label>
            <span>
              <b>{sides === 'cylinder' ? 'Jari-jari alas' : 'Sisi alas'}</b>
              <em>
                {sides === 'cylinder' ? 'r' : 's'} = {base} cm
              </em>
            </span>
            <div className="range-with-input">
              <input
                type="range"
                min="2"
                max="8"
                step="0.5"
                value={base}
                onChange={e => {
                  const v = Number(e.target.value)
                  setBase(v)
                  setBaseInput(String(v))
                }}
              />
              <input
                aria-label={sides === 'cylinder' ? 'Nilai jari-jari alas' : 'Nilai sisi alas'}
                type="number"
                min="2"
                max="8"
                step="0.5"
                value={baseInput}
                onChange={e => handleBaseChange(e.target.value)}
                onBlur={handleBaseBlur}
              />
            </div>
          </label>

          <label>
            <span>
              <b>{sides === 'cylinder' ? 'Tinggi tabung' : 'Tinggi prisma'}</b>
              <em>t = {height} cm</em>
            </span>
            <div className="range-with-input">
              <input
                type="range"
                min="4"
                max="14"
                step="0.5"
                value={height}
                onChange={e => {
                  const v = Number(e.target.value)
                  setHeight(v)
                  setHeightInput(String(v))
                }}
              />
              <input
                aria-label={sides === 'cylinder' ? 'Nilai tinggi tabung' : 'Nilai tinggi prisma'}
                type="number"
                min="4"
                max="14"
                step="0.5"
                value={heightInput}
                onChange={e => handleHeightChange(e.target.value)}
                onBlur={handleHeightBlur}
              />
            </div>
          </label>

          <label className="performance-toggle">
            <span>
              <b>Mode ringan</b>
              <small>Matikan bayangan rumit untuk perangkat berdaya rendah.</small>
            </span>
            <button
              role="switch"
              aria-checked={lightweight}
              className={lightweight ? 'active' : ''}
              onClick={() => setLightweight(!lightweight)}
            >
              <i />
            </button>
          </label>
        </div>

        <div className="calculations">
          <span className="eyebrow">HASIL PERHITUNGAN MATEMATIS</span>
          <div>
            <span>Luas alas</span>
            <strong key={`a${metrics.area}`} className="animated-value">
              {formatDecimal(metrics.area)} cm²
            </strong>
          </div>
          <div>
            <span>Keliling alas</span>
            <strong>{formatDecimal(metrics.perimeter)} cm</strong>
          </div>
          <div>
            <span>{sides === 'cylinder' ? 'Tinggi tabung' : 'Tinggi prisma'}</span>
            <strong>{formatDecimal(height)} cm</strong>
          </div>
          <hr />
          <div className="result">
            <span>Volume</span>
            <strong key={`v${metrics.volume}`} className="animated-value">
              {formatDecimal(metrics.volume)} cm³
            </strong>
          </div>
          <div className="formula-trace">
            <span>{sides === 'cylinder' ? 'V = π × r² × t' : 'V = Lₐ × t'}</span>
            <b>
              {formatDecimal(metrics.area)} × {formatDecimal(height)} = {formatDecimal(metrics.volume)} cm³
            </b>
          </div>
          <div className="result">
            <span>Luas permukaan</span>
            <strong key={`s${metrics.surfaceArea}`} className="animated-value">
              {formatDecimal(metrics.surfaceArea)} cm²
            </strong>
          </div>
          <small>
            {sides === 'cylinder'
              ? 'LP = 2πr² + 2πrt (dua lingkaran alas & tutup + selimut tabung).'
              : 'LP = 2Lₐ + Kₐ × t, khusus untuk prisma tegak.'}
          </small>
        </div>
      </section>

      {/* Worked Examples Section */}
      <WorkedExamplesSection category="prisma" topicTitle="Prisma & Tabung" />

      {/* Footer Actions */}
      <div className="explorer-footer">
        {onStartPractice && (
          <button type="button" className="button button-primary" onClick={onStartPractice}>
            Latihan Soal Prisma & Tabung →
          </button>
        )}
      </div>
    </div>
  )
}
