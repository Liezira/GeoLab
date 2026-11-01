import { useState, lazy, Suspense } from 'react'
import type { Question3DConfig } from '@/data/questionBank'

const Solids3DViewer = lazy(() =>
  import('@/components/geometry/Solids3DViewer').then(m => ({ default: m.Solids3DViewer }))
)

const GeometryViewer = lazy(() =>
  import('@/components/geometry/GeometryViewer').then(m => ({ default: m.GeometryViewer }))
)

interface Question3DPreviewProps {
  config: Question3DConfig
  defaultOpen?: boolean
}

export function Question3DPreview({ config, defaultOpen = false }: Question3DPreviewProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [autoRotate, setAutoRotate] = useState(false)
  const [resetSignal, setResetSignal] = useState(0)

  return (
    <div className="question-3d-wrapper">
      <div className="toggle-3d-header">
        <button
          type="button"
          className={`toggle-3d-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="toggle-3d-icon">{isOpen ? '▼' : '▶'}</span>
          <span>{isOpen ? 'Sembunyikan Model 3D' : 'Buka Ilustrasi 3D Interaktif'}</span>
          {config.labelAnnotation && (
            <span className="toggle-3d-tag">{config.labelAnnotation}</span>
          )}
        </button>

        {isOpen && (
          <div className="toggle-3d-tools">
            <button
              type="button"
              className={`tool-pill ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
              title="Putar otomatis"
            >
              Putar 3D
            </button>
            <button
              type="button"
              className="tool-pill"
              onClick={() => setResetSignal(s => s + 1)}
              title="Reset sudut kamera"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="embedded-3d-container animate-fade-in">
          <div className="embedded-3d-canvas-box">
            <Suspense
              fallback={
                <div className="embedded-3d-loading">
                  <span>Memuat model 3D interaktif...</span>
                </div>
              }
            >
              {config.type === 'solid' ? (
                <Solids3DViewer
                  shapeType={config.solidShape || 'kubus'}
                  params={{
                    dimA: config.dimA,
                    dimB: config.dimB || config.dimA,
                    dimC: config.dimC || config.dimB || config.dimA,
                  }}
                  compactMode={true}
                  autoRotate={autoRotate}
                  showWireframe={true}
                  showInterior={config.showInterior}
                  showDiagonal={config.showDiagonal}
                  isHemisphere={config.isHemisphere}
                />
              ) : (
                <GeometryViewer
                  sides={config.prismSides || 3}
                  sideLength={config.dimA}
                  prismHeight={config.dimB || 8}
                  compactMode={true}
                  autoRotate={autoRotate}
                  resetSignal={resetSignal}
                  labels={false}
                />
              )}
            </Suspense>

            {/* Gesture Hint Badge */}
            <span className="embedded-3d-hint">
              Geser untuk memutar 360° • Zoom
            </span>

            {/* Detail Badges if interior or diagonal */}
            {config.showInterior && (
              <span className="embedded-feature-tag interior">
                Segitiga Pythagoras Ditampilkan
              </span>
            )}
            {config.showDiagonal && (
              <span className="embedded-feature-tag diagonal">
                Diagonal Ruang Ditampilkan
              </span>
            )}
            {config.isHemisphere && (
              <span className="embedded-feature-tag hemisphere">
                Belahan ½ Bola Padat
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
