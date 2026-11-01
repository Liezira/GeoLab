import { Component, useEffect, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Grid, Line, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { polygonPoints, type PrismSides } from '@/geometry/prism'

export type CameraPreset = 'Isometrik' | 'Depan' | 'Atas' | 'Samping'
export type SelectedElement = 'Alas' | 'Tutup' | 'Sisi Tegak' | 'Rusuk' | 'Titik Sudut' | 'Tinggi'

type ViewerProps = {
  sides: PrismSides
  sideLength: number
  prismHeight: number
  selected?: SelectedElement
  cameraPreset?: CameraPreset
  labels?: boolean
  autoRotate?: boolean
  mode?: 'solid' | 'net'
  unfoldProgress?: number
  resetSignal?: number
  lightweight?: boolean
  compactMode?: boolean
  onInteracted?: () => void
}

const COLORS = {
  base: '#A9C2B4',
  top: '#D2E1D8',
  lateral: '#6F9684',
  edge: '#355C4F',
  vertex: '#D6A16F',
  height: '#B66E4F',
  selected: '#E7C18C',
  dimmed: '#B8C5BE',
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function useWebGLSupport() {
  return useMemo(() => {
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  }, [])
}

function shapeGeometry(points: { x: number; z: number }[]) {
  const shape = new (THREE as any).Shape()
  points.forEach((point, index) => {
    if (index === 0) shape.moveTo(point.x, -point.z)
    else shape.lineTo(point.x, -point.z)
  })
  shape.closePath()
  return new THREE.ShapeGeometry(shape)
}

function faceGeometry(a: { x: number; z: number }, b: { x: number; z: number }, height: number) {
  const geometry = new THREE.BufferGeometry()
  // Outward facing normal winding order: Bottom-left -> Top-right -> Bottom-right
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    a.x, 0, a.z, b.x, height, b.z, b.x, 0, b.z,
    a.x, 0, a.z, a.x, height, a.z, b.x, height, b.z,
  ], 3))
  geometry.computeVertexNormals()
  return geometry
}

function AnimatedMaterial({ color, opacity = 1 }: { color: string; opacity?: number }) {
  const ref = useRef<THREE.MeshStandardMaterial>(null)
  const target = useMemo(() => new THREE.Color(color), [color])
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.color.lerp(target, 1 - Math.exp(-delta * 10))
    ref.current.opacity = THREE.MathUtils.damp(ref.current.opacity, opacity, 10, delta)
  })
  return <meshStandardMaterial ref={ref} color={color} transparent opacity={opacity} roughness={0.72} metalness={0.02} side={THREE.DoubleSide}/>
}

const textureCache = new Map<string, THREE.CanvasTexture>()

function getOrCreateTextTexture(text: string, bgColor = '#FFFFFF', textColor = '#273632', borderColor = '#CFDDD4') {
  const key = `${text}-${bgColor}-${textColor}-${borderColor}`
  const existing = textureCache.get(key)
  if (existing) return existing

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  canvas.width = 460
  canvas.height = 144
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const r = 28
  const x = 12, y = 12, w = canvas.width - 24, h = canvas.height - 24

  ctx.shadowColor = 'rgba(39, 54, 50, 0.2)'
  ctx.shadowBlur = 12
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 4

  ctx.fillStyle = bgColor
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  ctx.fill()

  ctx.shadowColor = 'transparent'
  ctx.stroke()

  ctx.fillStyle = textColor
  ctx.font = 'bold 66px "DM Sans", -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.needsUpdate = true

  if (textureCache.size > 80) {
    const oldestKey = textureCache.keys().next().value
    if (oldestKey) {
      textureCache.get(oldestKey)?.dispose()
      textureCache.delete(oldestKey)
    }
  }
  textureCache.set(key, texture)
  return texture
}

function LabelSprite({
  text,
  position,
  visible = true,
  scale = [2.2, 0.7, 1],
  bgColor = '#FFFFFF',
  textColor = '#273632',
  borderColor = '#CFDDD4',
}: {
  text: string
  position: [number, number, number]
  visible?: boolean
  scale?: [number, number, number]
  bgColor?: string
  textColor?: string
  borderColor?: string
}) {
  const texture = useMemo(() => getOrCreateTextTexture(text, bgColor, textColor, borderColor), [text, bgColor, textColor, borderColor])

  if (!visible) return null

  return (
    <sprite position={position} scale={scale} renderOrder={999}>
      <spriteMaterial map={texture} depthTest={false} transparent opacity={0.97} />
    </sprite>
  )
}

function PrismSolid({ sides, sideLength, prismHeight, selected = 'Alas', labels = true }: Pick<ViewerProps, 'sides' | 'sideLength' | 'prismHeight' | 'selected' | 'labels'>) {
  const points = useMemo(() => polygonPoints(sides, sideLength), [sides, sideLength])
  const baseGeometry = useMemo(() => shapeGeometry(points), [points])
  const lateralGeometries = useMemo(() => points.map((point, index) => faceGeometry(point, points[(index + 1) % points.length], prismHeight)), [points, prismHeight])

  useEffect(() => () => {
    baseGeometry.dispose()
    lateralGeometries.forEach(geometry => geometry.dispose())
  }, [baseGeometry, lateralGeometries])

  const scale = 4.8 / Math.max(prismHeight, sideLength * (typeof sides === 'number' && sides >= 6 ? 2.3 : (sides === 'cylinder' ? 2.2 : 1.8)))
  const centerY = -prismHeight / 2

  const edgePoints = useMemo(() => {
    const lines: [number, number, number][][] = []
    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length]
      lines.push([[point.x, 0, point.z], [next.x, 0, next.z]])
      lines.push([[point.x, prismHeight, point.z], [next.x, prismHeight, next.z]])
      if (sides !== 'cylinder' || index % 4 === 0) {
        lines.push([[point.x, 0, point.z], [point.x, prismHeight, point.z]])
      }
    })
    return lines
  }, [points, prismHeight, sides])

  const muted = (name: SelectedElement) => selected !== name && ['Alas', 'Tutup', 'Sisi Tegak'].includes(selected)
  const normScale = (w: number, h: number): [number, number, number] => [w / scale, h / scale, 1]

  // Anti-collision label coordinates:
  // Alas: bottom outer edge
  const alasPos: [number, number, number] = [points[0].x * 1.15, -0.45, points[0].z * 1.15]
  // Tutup: top center above the cap
  const tutupPos: [number, number, number] = [0, prismHeight + 0.7, 0]
  // Sisi tegak: front lateral facet midpoint
  const midFaceX = (points[0].x + points[1].x) * 0.75
  const midFaceZ = (points[0].z + points[1].z) * 0.75
  const sisiTegakPos: [number, number, number] = [midFaceX, prismHeight * 0.65, midFaceZ]
  // Tinggi: opposite quadrant to sisi tegak, safely separated
  const heightOffset = Math.max(1.1, sideLength * 0.42)
  const tinggiPos: [number, number, number] = [-heightOffset, prismHeight * 0.45, 0]

  return <group scale={scale} position={[0, centerY * scale, 0]}>
    <mesh geometry={baseGeometry} rotation={[-Math.PI / 2, 0, 0]}>
      <AnimatedMaterial color={selected === 'Alas' ? COLORS.selected : COLORS.base} opacity={muted('Alas') ? .48 : .96}/>
    </mesh>
    <mesh geometry={baseGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, prismHeight, 0]}>
      <AnimatedMaterial color={selected === 'Tutup' ? COLORS.selected : COLORS.top} opacity={muted('Tutup') ? .48 : .96}/>
    </mesh>
    {lateralGeometries.map((geometry, index) => <mesh key={index} geometry={geometry}>
      <AnimatedMaterial color={selected === 'Sisi Tegak' ? COLORS.selected : COLORS.lateral} opacity={muted('Sisi Tegak') ? .48 : (sides === 'cylinder' ? 0.94 : .92)}/>
    </mesh>)}

    {edgePoints.map((line, index) => <Line key={index} points={line} color={selected === 'Rusuk' ? '#C57E48' : COLORS.edge} lineWidth={selected === 'Rusuk' ? 4 : (sides === 'cylinder' ? 1.5 : 2)}/>)}
    {sides !== 'cylinder' && points.flatMap(point => [0, prismHeight].map((y, index) => <mesh key={`${point.x}-${point.z}-${index}`} position={[point.x, y, point.z]} scale={selected === 'Titik Sudut' ? 1.3 : 1}>
      <sphereGeometry args={[sideLength * .045, 16, 16]}/><meshStandardMaterial color={selected === 'Titik Sudut' ? '#BC7040' : COLORS.vertex} roughness={.65}/>
    </mesh>))}

    <Line points={[[0, 0, 0], [0, prismHeight, 0]]} color={COLORS.height} lineWidth={selected === 'Tinggi' ? 5 : 2.5} dashed dashSize={.18} gapSize={.11}/>
    <Line points={[[0, 0, 0], [sideLength * .16, 0, 0], [sideLength * .16, sideLength * .16, 0]]} color={COLORS.height} lineWidth={2}/>

    <LabelSprite visible={labels} position={alasPos} text="Alas" scale={normScale(1.8, 0.58)} />
    <LabelSprite visible={labels} position={tutupPos} text="Tutup" scale={normScale(1.8, 0.58)} />
    <LabelSprite visible={labels} position={sisiTegakPos} text="Sisi tegak" scale={normScale(2.0, 0.62)} />
    <LabelSprite visible={labels} position={tinggiPos} text={`t = ${prismHeight} cm`} scale={normScale(2.35, 0.72)} bgColor="#FFFDF9" borderColor="#B66E4F" textColor="#8C4927" />
  </group>
}

function PrismNet({ sides, sideLength, prismHeight, progress = 0, labels = true, reducedMotion = false }: { sides: PrismSides; sideLength: number; prismHeight: number; progress?: number; labels?: boolean; reducedMotion?: boolean }) {
  const points = useMemo(() => polygonPoints(sides, sideLength), [sides, sideLength])
  const polygon = useMemo(() => shapeGeometry(points), [points])
  const group = useRef<THREE.Group>(null)
  const panelRefs = useRef<(THREE.Mesh | null)[]>([])
  const baseRef = useRef<THREE.Mesh>(null)
  const topRef = useRef<THREE.Mesh>(null)
  const springPos = useRef(progress)
  const springVel = useRef(0)

  const activePoints = useMemo(() => sides === 'cylinder' ? points.filter((_, i) => i % 2 === 0) : points, [sides, points])

  useEffect(() => {
    panelRefs.current = []
  }, [sides])

  useEffect(() => () => polygon.dispose(), [polygon])

  // Compute exact segment widths and prefix layout for realistic unrolling
  const { segmentWidths, flatCenterXs, totalWidth, baseRadius } = useMemo(() => {
    const n = activePoints.length
    const widths: number[] = []
    for (let i = 0; i < n; i++) {
      const p1 = activePoints[i]
      const p2 = activePoints[(i + 1) % n]
      widths.push(Math.hypot(p2.x - p1.x, p2.z - p1.z))
    }
    const tot = widths.reduce((sum, w) => sum + w, 0)
    let accum = 0
    const centers: number[] = []
    for (let i = 0; i < n; i++) {
      centers.push(-tot / 2 + accum + widths[i] / 2)
      accum += widths[i]
    }
    const maxR = activePoints.reduce((max, p) => Math.max(max, Math.hypot(p.x, p.z)), 0)
    return { segmentWidths: widths, flatCenterXs: centers, totalWidth: tot, baseRadius: maxR }
  }, [activePoints])

  const midIndex = Math.floor(activePoints.length / 2)
  const scale = 5.2 / Math.max(totalWidth * 0.62, (prismHeight + baseRadius * 2.2) * 1.1)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.033)
    let p = progress

    if (reducedMotion) {
      springPos.current = THREE.MathUtils.damp(springPos.current, progress, 14.0, dt)
      springVel.current = 0
      p = springPos.current
    } else {
      const omega = 15.5
      const zeta = 0.74
      const diff = progress - springPos.current
      const accel = omega * omega * diff - 2 * zeta * omega * springVel.current
      springVel.current += accel * dt
      springPos.current += springVel.current * dt
      p = THREE.MathUtils.clamp(springPos.current, 0, 1.05)
    }

    panelRefs.current.forEach((panel, index) => {
      if (!panel || index >= activePoints.length) return
      const a = activePoints[index]
      const b = activePoints[(index + 1) % activePoints.length]
      const foldedPosition = new THREE.Vector3((a.x + b.x) / 2, prismHeight / 2, (a.z + b.z) / 2)
      const flatPosition = new THREE.Vector3(flatCenterXs[index], 0.03, 0)
      panel.position.lerpVectors(foldedPosition, flatPosition, p)

      const foldedAngle = Math.atan2(b.z - a.z, b.x - a.x)
      panel.rotation.set(
        THREE.MathUtils.lerp(0, -Math.PI / 2, p),
        THREE.MathUtils.lerp(-foldedAngle, 0, p),
        0,
      )
    })

    // Alas (base) folds at the bottom edge of the middle panel
    if (baseRef.current) {
      const flatBaseZ = -(prismHeight / 2 + baseRadius * 0.88)
      baseRef.current.position.set(
        THREE.MathUtils.lerp(0, flatCenterXs[midIndex], p),
        THREE.MathUtils.lerp(0, 0.02, p),
        THREE.MathUtils.lerp(0, flatBaseZ, p),
      )
    }

    // Tutup (top) folds at the top edge of the middle panel
    if (topRef.current) {
      const flatTopZ = prismHeight / 2 + baseRadius * 0.88
      topRef.current.position.set(
        THREE.MathUtils.lerp(0, flatCenterXs[midIndex], p),
        THREE.MathUtils.lerp(prismHeight, 0.02, p),
        THREE.MathUtils.lerp(0, flatTopZ, p),
      )
    }

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(-0.35, 0, p)
    }
  })

  const normNetScale = (w: number, h: number): [number, number, number] => [w / scale, h / scale, 1]

  return <group ref={group} scale={scale} position={[0, -0.15, 0]}>
    <mesh ref={baseRef} geometry={polygon} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={COLORS.base} roughness={.72} side={THREE.DoubleSide}/>
      <LabelSprite visible={labels && progress > 0.6} position={[0, 0, -baseRadius * 0.2]} text="Alas" scale={normNetScale(1.4, 0.46)} />
    </mesh>
    <mesh ref={topRef} geometry={polygon} rotation={[-Math.PI / 2, 0, 0]} position={[0, prismHeight, 0]}>
      <meshStandardMaterial color={COLORS.top} roughness={.72} side={THREE.DoubleSide}/>
      <LabelSprite visible={labels && progress > 0.6} position={[0, 0, baseRadius * 0.2]} text="Tutup" scale={normNetScale(1.4, 0.46)} />
    </mesh>
    {activePoints.map((_, index) => {
      const width = segmentWidths[index] || sideLength
      return <mesh key={index} ref={(node: THREE.Mesh | null) => { panelRefs.current[index] = node }} position={[0, prismHeight / 2, 0]}>
        <planeGeometry args={[width, prismHeight]}/>
        <meshStandardMaterial color={index % 2 ? '#7FA18F' : COLORS.lateral} roughness={.72} side={THREE.DoubleSide}/>
        <LabelSprite visible={labels && progress > 0.6} position={[0, 0, .14]} text={`Sisi ${index + 1}`} scale={normNetScale(1.3, 0.44)} />
      </mesh>
    })}
  </group>
}

const cameraPositions: Record<CameraPreset, [number, number, number]> = {
  Isometrik: [7.4, 6.2, 8],
  Depan: [0, 2.4, 10],
  Atas: [.01, 15.5, .01],
  Samping: [10, 2.4, 0],
}

function CameraController({ preset = 'Isometrik', resetSignal = 0, autoRotate = false, reducedMotion, compactMode = false, onInteracted }: { preset?: CameraPreset; resetSignal?: number; autoRotate?: boolean; reducedMotion: boolean; compactMode?: boolean; onInteracted?: () => void }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(...cameraPositions[preset]))
  const targetOrigin = useRef(new THREE.Vector3(0, 0, 0))
  const transitioning = useRef(true)

  useEffect(() => {
    targetPosition.current.set(...cameraPositions[preset])
    if (compactMode) {
      targetPosition.current.multiplyScalar(0.85)
    }
    transitioning.current = true
  }, [preset, resetSignal, compactMode])

  useFrame((_, delta) => {
    if (!transitioning.current) return
    const speed = reducedMotion ? 30 : 5.5
    camera.position.lerp(targetPosition.current, 1 - Math.exp(-delta * speed))
    controls.current?.target.lerp(targetOrigin.current, 1 - Math.exp(-delta * speed))
    controls.current?.update()
    if (camera.position.distanceTo(targetPosition.current) < .025) transitioning.current = false
  })

  return <OrbitControls
    ref={controls}
    makeDefault
    enableDamping
    dampingFactor={.075}
    enablePan={false}
    minDistance={compactMode ? 3.5 : 5.2}
    maxDistance={compactMode ? 12 : 18}
    minPolarAngle={.08}
    maxPolarAngle={Math.PI * .82}
    autoRotate={(autoRotate || compactMode) && !reducedMotion}
    autoRotateSpeed={compactMode ? 1.2 : .75}
    onStart={() => { transitioning.current = false; onInteracted?.() }}
  />
}

function Scene({ props, reducedMotion }: { props: ViewerProps; reducedMotion: boolean }) {
  const solidScale = 4.8 / Math.max(props.prismHeight, props.sideLength * (typeof props.sides === 'number' && props.sides >= 6 ? 2.3 : (props.sides === 'cylinder' ? 2.2 : 1.8)))
  const floorY = props.mode === 'net' ? -1.15 : (-props.prismHeight / 2) * solidScale - 0.04

  return <>
    <color attach="background" args={[props.compactMode ? '#F0F5F2' : '#F4F7F4']}/>
    <ambientLight intensity={1.35}/>
    <directionalLight position={[-5, 9, 6]} intensity={2.2} color="#FFF8E8"/>
    <directionalLight position={[6, 3, -5]} intensity={.75} color="#DCEBE5"/>
    <CameraController preset={props.mode === 'net' ? 'Atas' : (props.cameraPreset || 'Isometrik')} resetSignal={props.resetSignal || 0} autoRotate={props.autoRotate ?? props.compactMode} reducedMotion={reducedMotion} compactMode={props.compactMode} onInteracted={props.onInteracted}/>
    {props.mode === 'net'
      ? <PrismNet sides={props.sides} sideLength={props.sideLength} prismHeight={props.prismHeight} progress={props.unfoldProgress || 0} labels={props.labels ?? !props.compactMode} reducedMotion={reducedMotion}/>
      : <PrismSolid sides={props.sides} sideLength={props.sideLength} prismHeight={props.prismHeight} selected={props.selected || 'Alas'} labels={props.labels ?? !props.compactMode}/>}
    {!props.lightweight && !props.compactMode && <ContactShadows position={[0, floorY + 0.02, 0]} opacity={.22} scale={14} blur={2.8} far={5}/>}
    {!props.compactMode && <Grid position={[0, floorY, 0]} args={[14, 14]} cellColor="#DDE6E1" sectionColor="#C9D7D0" cellSize={.55} sectionSize={2.2} fadeDistance={11} fadeStrength={1.5} infiniteGrid/>}
  </>
}

class ViewerErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Geometry viewer failed', error, info)
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function ViewerFallback() {
  return <div className="viewer-fallback"><span>Model 3D tidak dapat dibuka di perangkat ini.</span><p>Kamu tetap bisa mempelajari bentuknya melalui diagram dan ringkasan unsur.</p></div>
}

export function GeometryViewer(props: ViewerProps) {
  const reducedMotion = useReducedMotion()
  const supported = useWebGLSupport()
  if (!supported) return <ViewerFallback/>

  return <ViewerErrorBoundary fallback={<ViewerFallback/>}>
    <Canvas
      dpr={props.lightweight || props.compactMode ? 1 : [1, 1.5]}
      camera={{ position: cameraPositions.Isometrik, fov: props.compactMode ? 42 : 38, near: .1, far: 100 }}
      gl={{ antialias: !props.lightweight && !props.compactMode, alpha: false, powerPreference: 'high-performance' }}
      performance={{ min: .5 }}
      shadows={false}
      aria-label={`Model 3D prisma dengan ${props.sides} sisi alas`}
    >
      <Scene props={props} reducedMotion={reducedMotion}/>
    </Canvas>
  </ViewerErrorBoundary>
}
