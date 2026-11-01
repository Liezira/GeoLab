import { Component, useEffect, useMemo, useRef, type ErrorInfo, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Grid, Line, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import type { SolidShapeType, SolidShapeParams } from '@/geometry/solids3d'

export type SolidCameraPreset = 'Isometrik' | 'Depan' | 'Atas' | 'Samping'

export interface Solids3DViewerProps {
  shapeType: SolidShapeType
  params: SolidShapeParams
  cameraPreset?: SolidCameraPreset
  autoRotate?: boolean
  showWireframe?: boolean
  showInterior?: boolean
  showDiagonal?: boolean
  isHemisphere?: boolean
  highlightElement?: 'alas' | 'selimut' | 'tinggi' | 'diagonal' | 'volume' | null
  compactMode?: boolean
}

const SOLID_COLORS = {
  main: '#6F9684',
  base: '#A9C2B4',
  wire: '#273632',
  shadow: '#294C43',
  interiorHeight: '#B66E4F',
  interiorApothem: '#3F8064',
  interiorSlant: '#D6A16F',
  spaceDiagonal: '#C57E48',
  planeDiagonal: '#2E7D5B',
}

const cameraPositions: Record<SolidCameraPreset, [number, number, number]> = {
  Isometrik: [7, 6, 8],
  Depan: [0, 1.5, 9.5],
  Atas: [0.01, 10, 0.01],
  Samping: [9.5, 1.5, 0],
}

function CameraController({
  preset = 'Isometrik',
  autoRotate = false,
  compactMode = false,
}: {
  preset?: SolidCameraPreset
  autoRotate?: boolean
  compactMode?: boolean
}) {
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(...cameraPositions[preset]))

  useEffect(() => {
    targetPos.current.set(...cameraPositions[preset])
    if (compactMode) {
      targetPos.current.multiplyScalar(0.85)
    }
  }, [preset, compactMode])

  useFrame((_, delta) => {
    camera.position.lerp(targetPos.current, 1 - Math.exp(-delta * 6))
    controls.current?.update()
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={compactMode ? 3.5 : 4.5}
      maxDistance={compactMode ? 12 : 16}
      minPolarAngle={0.08}
      maxPolarAngle={Math.PI * 0.84}
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
    />
  )
}

function SolidMesh({
  shapeType,
  params,
  showWireframe = true,
  showInterior = false,
  showDiagonal = false,
  isHemisphere = false,
  highlightElement = null,
}: {
  shapeType: SolidShapeType
  params: SolidShapeParams
  showWireframe?: boolean
  showInterior?: boolean
  showDiagonal?: boolean
  isHemisphere?: boolean
  highlightElement?: 'alas' | 'selimut' | 'tinggi' | 'diagonal' | 'volume' | null
}) {
  const { dimA, dimB = dimA, dimC = dimB } = params

  const isXRay = showInterior || showDiagonal

  const { geometry, capGeometry, scale, centerY } = useMemo(() => {
    let geom: THREE.BufferGeometry
    let capGeom: THREE.BufferGeometry | null = null
    let sc = 1
    let cY = 0

    switch (shapeType) {
      case 'kubus': {
        const s = dimA
        geom = new THREE.BoxGeometry(s, s, s)
        sc = 3.6 / Math.max(s, 2)
        cY = s / 2
        break
      }

      case 'balok': {
        const p = dimA
        const l = dimB
        const t = dimC
        geom = new THREE.BoxGeometry(p, t, l)
        sc = 4.2 / Math.max(p, l, t, 2)
        cY = t / 2
        break
      }

      case 'limas_segiempat': {
        const s = dimA
        const t = dimB
        geom = new THREE.ConeGeometry(s / Math.SQRT2, t, 4, 1)
        geom.rotateY(Math.PI / 4)
        sc = 4.2 / Math.max(s, t, 2)
        cY = t / 2
        break
      }

      case 'limas_segitiga': {
        const a = dimA
        const t = dimB
        const r = a / Math.sqrt(3)
        geom = new THREE.ConeGeometry(r, t, 3, 1)
        sc = 4.2 / Math.max(a, t, 2)
        cY = t / 2
        break
      }

      case 'kerucut': {
        const r = dimA
        const t = dimB
        geom = new THREE.ConeGeometry(r, t, 36, 1)
        sc = 4.2 / Math.max(r * 2, t, 2)
        cY = t / 2
        break
      }

      case 'bola': {
        const r = dimA
        if (isHemisphere) {
          // Half sphere dome (from 0 to PI/2 polar angle)
          geom = new THREE.SphereGeometry(r, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2)
          capGeom = new THREE.CircleGeometry(r, 32)
          capGeom.rotateX(Math.PI / 2)
          sc = 4.0 / Math.max(r * 2, 2)
          cY = 0
        } else {
          geom = new THREE.SphereGeometry(r, 32, 28)
          sc = 4.0 / Math.max(r * 2, 2)
          cY = r
        }
        break
      }
    }

    return { geometry: geom, capGeometry: capGeom, scale: sc, centerY: cY }
  }, [shapeType, dimA, dimB, dimC, isHemisphere])

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry])

  // Internal Right Triangle for Limas Segiempat & Kerucut (Pythagoras visualization)
  const interiorLines = useMemo(() => {
    if (!showInterior) return null

    if (shapeType === 'limas_segiempat') {
      const s = dimA
      const t = dimB
      const halfH = t / 2
      const halfS = s / 2

      // Points: Center base -> Midpoint of side -> Apex
      const pCenter: [number, number, number] = [0, -halfH, 0]
      const pSideMid: [number, number, number] = [0, -halfH, halfS]
      const pApex: [number, number, number] = [0, halfH, 0]

      const triGeom = new THREE.BufferGeometry()
      triGeom.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([
          pCenter[0], pCenter[1], pCenter[2],
          pSideMid[0], pSideMid[1], pSideMid[2],
          pApex[0], pApex[1], pApex[2],
        ], 3)
      )
      triGeom.computeVertexNormals()

      return {
        lineHeight: [pCenter, pApex],
        lineBase: [pCenter, pSideMid],
        lineSlant: [pSideMid, pApex],
        triGeom,
      }
    }

    if (shapeType === 'kerucut') {
      const r = dimA
      const t = dimB
      const halfH = t / 2

      const pCenter: [number, number, number] = [0, -halfH, 0]
      const pRadius: [number, number, number] = [r, -halfH, 0]
      const pApex: [number, number, number] = [0, halfH, 0]

      const triGeom = new THREE.BufferGeometry()
      triGeom.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([
          pCenter[0], pCenter[1], pCenter[2],
          pRadius[0], pRadius[1], pRadius[2],
          pApex[0], pApex[1], pApex[2],
        ], 3)
      )
      triGeom.computeVertexNormals()

      return {
        lineHeight: [pCenter, pApex],
        lineBase: [pCenter, pRadius],
        lineSlant: [pRadius, pApex],
        triGeom,
      }
    }

    return null
  }, [showInterior, shapeType, dimA, dimB])

  // Diagonal lines for Kubus & Balok
  const diagonalLines = useMemo(() => {
    if (!showDiagonal) return null

    if (shapeType === 'kubus' || shapeType === 'balok') {
      const p = dimA
      const l = shapeType === 'kubus' ? dimA : dimB
      const t = shapeType === 'kubus' ? dimA : dimC

      const hP = p / 2
      const hL = l / 2
      const hT = t / 2

      // Front Face Diagonal (Plane Diagonal)
      const p1: [number, number, number] = [-hP, -hT, hL]
      const p2: [number, number, number] = [hP, hT, hL]

      // Space Diagonal (cuts across through the 3D interior)
      const p3: [number, number, number] = [-hP, -hT, hL]
      const p4: [number, number, number] = [hP, hT, -hL]

      return {
        planeDiagonal: [p1, p2],
        spaceDiagonal: [p3, p4],
      }
    }

    return null
  }, [showDiagonal, shapeType, dimA, dimB, dimC])

  // Body color based on highlight mode
  const bodyColor = highlightElement === 'alas'
    ? SOLID_COLORS.base
    : highlightElement === 'selimut'
    ? '#86AA98'
    : highlightElement === 'volume'
    ? '#E7C18C'
    : SOLID_COLORS.main

  return (
    <group scale={scale} position={[0, -0.2, 0]}>
      {/* Solid body */}
      <mesh geometry={geometry} position={[0, shapeType === 'bola' && !isHemisphere ? 0 : centerY, 0]}>
        <meshStandardMaterial
          color={bodyColor}
          roughness={0.65}
          metalness={0.05}
          transparent
          opacity={isXRay ? 0.35 : 0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cap circle if hemisphere */}
      {isHemisphere && capGeometry && (
        <mesh geometry={capGeometry} position={[0, 0, 0]}>
          <meshStandardMaterial color={SOLID_COLORS.base} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Wireframe Outline */}
      {showWireframe && shapeType !== 'bola' && (
        <lineSegments geometry={edges} position={[0, centerY, 0]}>
          <lineBasicMaterial color={SOLID_COLORS.wire} linewidth={2} />
        </lineSegments>
      )}

      {/* Internal Right Triangle for Limas & Kerucut */}
      {interiorLines && (
        <group position={[0, centerY, 0]}>
          <mesh geometry={interiorLines.triGeom}>
            <meshStandardMaterial
              color="#F3E7DD"
              transparent
              opacity={0.75}
              roughness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Line
            points={interiorLines.lineHeight as [number, number, number][]}
            color={SOLID_COLORS.interiorHeight}
            lineWidth={3.5}
            dashed
            dashSize={0.2}
            gapSize={0.12}
          />
          <Line
            points={interiorLines.lineBase as [number, number, number][]}
            color={SOLID_COLORS.interiorApothem}
            lineWidth={3.5}
          />
          <Line
            points={interiorLines.lineSlant as [number, number, number][]}
            color={SOLID_COLORS.interiorSlant}
            lineWidth={4}
          />
        </group>
      )}

      {/* Diagonal lines for Kubus & Balok */}
      {diagonalLines && (
        <group position={[0, centerY, 0]}>
          <Line
            points={diagonalLines.planeDiagonal as [number, number, number][]}
            color={SOLID_COLORS.planeDiagonal}
            lineWidth={3}
            dashed
            dashSize={0.22}
            gapSize={0.12}
          />
          <Line
            points={diagonalLines.spaceDiagonal as [number, number, number][]}
            color={SOLID_COLORS.spaceDiagonal}
            lineWidth={4.5}
          />
        </group>
      )}
    </group>
  )
}

function Scene({
  shapeType,
  params,
  cameraPreset = 'Isometrik',
  autoRotate = false,
  showWireframe = true,
  showInterior = false,
  showDiagonal = false,
  isHemisphere = false,
  highlightElement = null,
  compactMode = false,
}: Solids3DViewerProps) {
  const floorY = -1.65

  return (
    <>
      <color attach="background" args={[compactMode ? '#F0F5F2' : '#F4F7F4']} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[-5, 9, 6]} intensity={2.2} color="#FFF8E8" />
      <directionalLight position={[6, 3, -5]} intensity={0.8} color="#DCEBE5" />

      <CameraController
        preset={cameraPreset}
        autoRotate={autoRotate}
        compactMode={compactMode}
      />

      <SolidMesh
        shapeType={shapeType}
        params={params}
        showWireframe={showWireframe}
        showInterior={showInterior}
        showDiagonal={showDiagonal}
        isHemisphere={isHemisphere}
        highlightElement={highlightElement}
      />

      <ContactShadows
        position={[0, floorY + 0.02, 0]}
        opacity={0.22}
        scale={14}
        blur={2.8}
        far={5}
      />
      <Grid
        position={[0, floorY, 0]}
        args={[14, 14]}
        cellColor="#DDE6E1"
        sectionColor="#C9D7D0"
        cellSize={0.55}
        sectionSize={2.2}
        fadeDistance={11}
        fadeStrength={1.5}
        infiniteGrid
      />
    </>
  )
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Solids3DViewer error:', error, info)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function FallbackView() {
  return (
    <div className="viewer-fallback">
      <span>Model 3D tidak dapat dirender.</span>
      <p>Gunakan diagram perspektif untuk mempelajari sifat dan ukuran bangun.</p>
    </div>
  )
}

export function Solids3DViewer(props: Solids3DViewerProps) {
  return (
    <ViewerErrorBoundary fallback={<FallbackView />}>
      <Canvas
        dpr={props.compactMode ? 1 : [1, 1.5]}
        camera={{ position: cameraPositions.Isometrik, fov: props.compactMode ? 42 : 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        shadows={false}
      >
        <Scene {...props} />
      </Canvas>
    </ViewerErrorBoundary>
  )
}
