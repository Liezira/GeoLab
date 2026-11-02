import { lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CameraPreset, SelectedElement } from '@/components/geometry/GeometryViewer'
import { calculatePrism, formatDecimal, prismName, type PrismSides } from '@/geometry/prism'
import { PlaneExplorer } from '@/components/modules/PlaneExplorer'
import { CircleExplorer } from '@/components/modules/CircleExplorer'
import { ArithmeticExplorer } from '@/components/modules/ArithmeticExplorer'
import { PythagorasExplorer } from '@/components/modules/PythagorasExplorer'
import { SolidsExplorer } from '@/components/modules/SolidsExplorer'
import { PrismExplorer } from '@/components/modules/PrismExplorer'
import { ExamSession } from '@/components/exam/ExamSession'
import { ExamResultView } from '@/components/exam/ExamResultView'
import {
  generateFinalExam,
  generateDailyExam,
  generatePracticeExam,
  gradeExam,
  loadExamSession,
  clearExamSession,
  type ExamMode,
  type ExamEvaluationResult,
  type StoredExamSession,
} from '@/utils/examEngine'
import type { Question, QuestionCategory } from '@/data/questionBank'

const GeometryViewer = lazy(() =>
  import('@/components/geometry/GeometryViewer').then(module => ({ default: module.GeometryViewer }))
)

export type Page =
  | 'home'
  | 'catalog'
  | 'plane'
  | 'solids'
  | 'lesson'
  | 'explorer'
  | 'circle'
  | 'arithmetic'
  | 'pythagoras'
  | 'exam_hub'
  | 'exam_session'
  | 'exam_result'
  | 'help'

type IconName =
  | 'home'
  | 'square'
  | 'cube'
  | 'prism'
  | 'quiz'
  | 'help'
  | 'search'
  | 'arrow'
  | 'play'
  | 'book'
  | 'check'
  | 'info'
  | 'reset'
  | 'eye'
  | 'rotate'
  | 'menu'
  | 'close'
  | 'chevron'
  | 'spark'
  | 'target'
  | 'formula'
  | 'layers'
  | 'circle'
  | 'arithmetic'
  | 'pythagoras'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-7h6v7"/></>,
    square: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m4 14 6-6 10 10"/></>,
    cube: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 7 9 5v10l-9-5V7Z"/><path d="m21 7-9 5v10l9-5V7Z"/></>,
    prism: <><path d="M6 19V8l5-5 5 5v11"/><path d="m6 8 5 4 5-4"/><path d="M6 19h10l5-4V5l-5 3"/><path d="M11 3h10v12"/></>,
    circle: <><circle cx="12" cy="12" r="9"/><path d="M12 12l6 -3"/><circle cx="12" cy="12" r="1.5"/></>,
    arithmetic: <><path d="M4 7h6M7 4v6M14 7h6M14 17h6M14 14h6M5 15l4 4M9 15l-4 4"/></>,
    pythagoras: <><polygon points="4 20 20 20 4 6"/><path d="M4 16h4v4"/></>,
    quiz: <><path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h3"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.1 2.2c-.9.4-.9 1.1-.9 1.8"/><path d="M12 17h.01"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    play: <path d="m9 7 8 5-8 5V7Z"/>,
    book: <><path d="M4 4h6a2 2 0 0 1 2 2v14a3 3 0 0 0-3-3H4V4Z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a3 3 0 0 1 3-3h5V4Z"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    reset: <><path d="M4 8V3m0 0h5M4 3l3.5 3.5"/><path d="M5.2 9a8 8 0 1 0 2-3"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    rotate: <><path d="M20 11a8 8 0 0 0-14.8-4M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.8 4M20 20v-5h-5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="M18 6 6 18M6 6l12 12"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    spark: <><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3Z"/><path d="m19 15 .6 2 1.9.8-1.9.8-.6 2-.6-2-1.9-.8 1.9-.8.6-2Z"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></>,
    formula: <><path d="M5 5h12M5 19h12M8 5l5 14"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></>,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  disabled,
  wide,
  type = 'button',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft'
  icon?: IconName
  onClick?: () => void
  disabled?: boolean
  wide?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      className={`button button-${variant}${wide ? ' button-wide' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}

function ShapeArt({ shape = 'prism', large = false }: { shape?: string; large?: boolean }) {
  if (shape === 'triangle')
    return (
      <div className="shape-art">
        <svg viewBox="0 0 120 90">
          <path className="fill-peach" d="M60 12 108 78H12Z" />
          <path d="M60 12 108 78H12Z" />
        </svg>
      </div>
    )
  if (shape === 'circle')
    return (
      <div className="shape-art">
        <svg viewBox="0 0 120 90">
          <circle className="fill-blue" cx="60" cy="45" r="31" />
          <circle cx="60" cy="45" r="31" />
          <path d="M60 45h31" />
          <circle cx="60" cy="45" r="2" />
        </svg>
      </div>
    )
  if (shape === 'square')
    return (
      <div className="shape-art">
        <svg viewBox="0 0 120 90">
          <rect className="fill-cream" x="25" y="12" width="70" height="66" rx="2" />
          <rect x="25" y="12" width="70" height="66" rx="2" />
          <path d="M25 68h10V78" />
        </svg>
      </div>
    )
  if (shape === 'cube')
    return (
      <div className="shape-art">
        <svg viewBox="0 0 120 90">
          <path className="fill-blue" d="m60 9 37 19-37 20-37-20Z" />
          <path className="fill-sage" d="m23 28 37 20v35L23 62Z" />
          <path className="fill-green" d="m97 28-37 20v35l37-21Z" />
          <path d="m60 9 37 19-37 20-37-20Zm0 39v35m-37-55v34l37 21 37-21V28" />
        </svg>
      </div>
    )
  if (shape === 'cylinder')
    return (
      <div className="shape-art">
        <svg viewBox="0 0 120 90">
          <path className="fill-cream" d="M28 24c0-9 64-9 64 0v42c0 10-64 10-64 0Z" />
          <ellipse className="fill-blue" cx="60" cy="24" rx="32" ry="12" />
          <path d="M28 24c0-9 64-9 64 0v42c0 10-64 10-64 0Zm0 0c0 9 64 9 64 0" />
        </svg>
      </div>
    )
  return (
    <div className={`shape-art${large ? ' shape-large' : ''}`}>
      <svg viewBox="0 0 160 120">
        <path className="fill-top" d="m45 22 40-10 30 30-42 11Z" />
        <path className="fill-base" d="m45 75 40-10 30 30-42 11Z" />
        <path className="fill-sage" d="M45 22v53l28 31V53Z" />
        <path className="fill-green" d="m73 53 42-11v53l-42 11Z" />
        <path d="m45 22 40-10 30 30-42 11Zm0 0v53l28 31 42-11V42M45 75l40-10 30 30M73 53v53" />
        <circle className="vertex" cx="45" cy="22" r="3" />
        <circle className="vertex" cx="85" cy="12" r="3" />
        <circle className="vertex" cx="115" cy="42" r="3" />
        <circle className="vertex" cx="73" cy="53" r="3" />
      </svg>
    </div>
  )
}

function Sidebar({
  page,
  navigate,
  isOpen,
  onClose,
}: {
  page: Page
  navigate: (page: Page) => void
  isOpen: boolean
  onClose: () => void
}) {
  const items: { label: string; icon: IconName; page: Page }[] = [
    { label: 'Beranda', icon: 'home', page: 'home' },
    { label: 'Bangun Datar', icon: 'square', page: 'plane' },
    { label: 'Bangun Ruang 3D', icon: 'cube', page: 'solids' },
    { label: 'Prisma & Tabung', icon: 'prism', page: 'explorer' },
    { label: 'Lingkaran', icon: 'circle', page: 'circle' },
    { label: 'Aritmatika', icon: 'arithmetic', page: 'arithmetic' },
    { label: 'Pythagoras', icon: 'pythagoras', page: 'pythagoras' },
    { label: 'Ujian & Latihan', icon: 'quiz', page: 'exam_hub' },
    { label: 'Panduan', icon: 'help', page: 'help' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button
          className="brand"
          onClick={() => {
            navigate('home')
            onClose()
          }}
          aria-label="GeoLab - Beranda"
        >
          <span className="brand-mark">
            <Icon name="prism" size={24} />
          </span>
          <span>
            <strong>GeoLab</strong>
          </span>
        </button>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Tutup navigasi menu"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <nav className="side-nav" aria-label="Navigasi utama">
        <div className="nav-label">RUANG BELAJAR & LAB</div>
        {items.map(item => {
          const isActive = page === item.page
          return (
            <button
              key={item.label}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                navigate(item.page)
                onClose()
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="side-tip">
        <span className="tip-icon">
          <Icon name="spark" size={18} />
        </span>
        <strong>Ujian 35 Soal (90 Mnt)</strong>
        <p>Uji pemahaman komprehensifmu sekarang di menu Ujian & Latihan!</p>
        <button
          onClick={() => {
            navigate('exam_hub')
            onClose()
          }}
        >
          Buka Ujian <Icon name="arrow" size={14} />
        </button>
      </div>
    </aside>
  )
}

function Topbar({
  page,
  navigate,
  onOpenMobileMenu,
}: {
  page: Page
  navigate: (p: Page) => void
  onOpenMobileMenu: () => void
}) {
  const names: Record<Page, string> = {
    home: 'Beranda',
    catalog: 'Katalog Materi',
    plane: 'Lab Bangun Datar',
    solids: 'Lab Bangun Ruang 3D',
    lesson: 'Prisma Segitiga',
    explorer: 'Eksplorasi Prisma & Tabung',
    circle: 'Lab Lingkaran Interaktif',
    arithmetic: 'Lab Aritmatika & Pola Bilangan',
    pythagoras: 'Lab Teorema Pythagoras',
    exam_hub: 'Pusat Ujian & Latihan',
    exam_session: 'Sesi Ujian Aktif',
    exam_result: 'Hasil Evaluasi Ujian',
    help: 'Panduan Belajar',
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="hamburger-btn"
          onClick={onOpenMobileMenu}
          aria-label="Buka navigasi menu"
        >
          <Icon name="menu" size={20} />
        </button>
        <div
          className="mobile-brand"
          onClick={() => navigate('home')}
          role="button"
          tabIndex={0}
        >
          <span className="brand-mark">
            <Icon name="prism" size={20} />
          </span>
          <strong>GeoLab</strong>
        </div>
      </div>
      <div className="crumbs">
        <span>GeoLab</span>
        <Icon name="chevron" size={14} />
        <strong>{names[page] || 'Materi'}</strong>
      </div>
      <div className="top-actions">
        <button className="help-action" onClick={() => navigate('exam_hub')}>
          <Icon name="quiz" size={18} />
          <span>Mulai Ujian</span>
        </button>
        <button className="help-action" onClick={() => navigate('help')}>
          <Icon name="help" size={18} />
          <span>Panduan</span>
        </button>
      </div>
    </header>
  )
}

function Home({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">LABORATORIUM GEOMETRI & ARITMATIKA</span>
          <h1>
            Lihat bentuknya.<br />
            <em>Pahami konsepnya.</em>
          </h1>
          <p>
            Platform belajar matematika interaktif : Bangun Datar, Bangun Ruang 3D, Lingkaran, Aritmatika, Teorema Pythagoras, dan Ujian Terstandar 90 Menit.
          </p>
          <div className="hero-actions">
            <Button icon="play" onClick={() => navigate('exam_hub')}>
              Ujian & Latihan
            </Button>
            <Button variant="secondary" onClick={() => navigate('plane')}>
              Jelajahi Bangun Datar
            </Button>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ilustrasi geometri">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <ShapeArt shape="prism" large />
          <span className="floating-label label-volume">V = Lₐ × t</span>
          <span className="floating-label label-angle">a² + b² = c²</span>
          <span className="shape-dot dot-one" />
          <span className="shape-dot dot-two" />
        </div>
      </section>

      {/* 5 Main Learning Pillars */}
      <section className="section">
        <div className="section-title">
          <div>
            <span className="eyebrow">MODUL BELAJAR INTERAKTIF</span>
            <h2>Pilih Lab Materi yang Ingin Kamu Jelajahi</h2>
          </div>
        </div>

        <div className="category-grid">
          <article className="category-card flat">
            <div className="category-art">
              <ShapeArt shape="square" />
            </div>
            <span className="card-kicker">2 DIMENSI</span>
            <h3>Bangun Datar</h3>
            <p>Persegi, persegipanjang, aneka segitiga, jajar genjang, belah ketupat, layang-layang, dan trapesium.</p>
            <button className="text-link" onClick={() => navigate('plane')}>
              Buka Lab 2D <Icon name="arrow" size={16} />
            </button>
          </article>

          <article className="category-card space">
            <div className="category-art">
              <ShapeArt shape="cube" />
            </div>
            <span className="card-kicker">3 DIMENSI</span>
            <h3>Bangun Ruang 3D</h3>
            <p>Kubus, balok, limas segitiga/segiempat, kerucut, dan bola dengan tampilan model 3D nyata.</p>
            <button className="text-link" onClick={() => navigate('solids')}>
              Buka Lab 3D <Icon name="arrow" size={16} />
            </button>
          </article>

          <article className="category-card prism-card">
            <span className="featured-badge">Lab Khusus</span>
            <div className="category-art">
              <ShapeArt shape="prism" />
            </div>
            <span className="card-kicker">3D & JARING-JARING</span>
            <h3>Prisma & Tabung</h3>
            <p>Eksplorasi prisma segitiga s.d. segi-8, tabung, dan animasi pembukaan jaring-jaring 3D.</p>
            <button className="text-link" onClick={() => navigate('explorer')}>
              Eksplorasi Prisma <Icon name="arrow" size={16} />
            </button>
          </article>

          <article className="category-card flat">
            <div className="category-art">
              <ShapeArt shape="circle" />
            </div>
            <span className="card-kicker">UNSUR & DAERAH</span>
            <h3>Lingkaran</h3>
            <p>Jari-jari, diameter, busur, tali busur, juring, tembereng, apotema, dan sudut pusat vs keliling.</p>
            <button className="text-link" onClick={() => navigate('circle')}>
              Buka Lab Lingkaran <Icon name="arrow" size={16} />
            </button>
          </article>

          <article className="category-card space">
            <div className="category-art">
              <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#416B60' }}>Uₙ</span>
            </div>
            <span className="card-kicker">POLA & BARISAN</span>
            <h3>Aritmatika</h3>
            <p>Pola noktah persegi/segitiga/persegi panjang, rumus suku ke-n (Uₙ), dan jumlah deret aritmatika (Sₙ).</p>
            <button className="text-link" onClick={() => navigate('arithmetic')}>
              Buka Lab Aritmatika <Icon name="arrow" size={16} />
            </button>
          </article>

          <article className="category-card prism-card">
            <div className="category-art">
              <span style={{ fontSize: '38px', fontWeight: 'bold', color: '#B66E4F' }}>a²+b²</span>
            </div>
            <span className="card-kicker">TEOREMA PYTHAGORAS</span>
            <h3>Pythagoras & Sudut</h3>
            <p>Pembuktian luas bujur sangkar $a^2 + b^2 = c^2$, generator triple Pythagoras, dan jenis segitiga.</p>
            <button className="text-link" onClick={() => navigate('pythagoras')}>
              Buka Lab Pythagoras <Icon name="arrow" size={16} />
            </button>
          </article>
        </div>
      </section>

      {/* Exam Banner */}
      <section className="section">
        <div className="continue-grid">
          <article className="continue-card" style={{ background: 'linear-gradient(135deg, #EEF3EF 0%, #E3EDE8 100%)' }}>
            <div className="mini-art sage">
              <ShapeArt shape="prism" />
            </div>
            <div className="continue-content">
              <span className="meta">TES ULANGAN KESELURUHAN</span>
              <h3>Uji Pemahaman Komprehensif (35 Soal)</h3>
              <p>Terdiri dari 30 Soal PG Biasa dan 5 Soal Benar/Salah & PG Bertingkat (Durasi 90 Menit).</p>
            </div>
            <Button onClick={() => navigate('exam_hub')}>Mulai Ujian</Button>
          </article>

          <article className="quick-card">
            <span className="quick-icon">
              <Icon name="target" size={24} />
            </span>
            <div>
              <span className="meta">LATIHAN MANDIRI CEPAT</span>
              <h3>Latihan Acak Bebas</h3>
              <p>Pilih topik favorit dan latih kemampuanmu kapan saja dengan pembahasan lengkap.</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('exam_hub')}>
              Pilih Latihan
            </Button>
          </article>
        </div>
      </section>
    </div>
  )
}

function ExamHub({
  onStartExam,
  onResumeExam,
}: {
  onStartExam: (config: {
    mode: ExamMode
    category?: QuestionCategory | 'all'
    questionCount: number
    durationMinutes: number
    title: string
  }) => void
  onResumeExam: (saved: StoredExamSession) => void
}) {
  const [dailyCategory, setDailyCategory] = useState<QuestionCategory>('bangun_datar')
  const [practiceCategory, setPracticeCategory] = useState<QuestionCategory | 'all'>('all')
  const [practiceCount, setPracticeCount] = useState(10)

  // Check if an existing exam session can be resumed
  const savedSession = useMemo(() => loadExamSession(), [])

  return (
    <div className="page exam-hub-page">
      <div className="page-heading">
        <span className="eyebrow">PUSAT EVALUASI & BANK SOAL</span>
        <h1>Ujian & Latihan Mandiri</h1>
        <p>Pilih mode evaluasi yang kamu butuhkan: Tes Ulangan Keseluruhan 35 Soal, Ulangan Harian per Bab, atau Latihan Mandiri Bebas.</p>
      </div>

      {savedSession && (
        <div className="resume-session-banner">
          <div>
            <span className="simulation-tag">SESI TERSIMPAN</span>
            <h3>Kamu memiliki ujian yang belum selesai: {savedSession.title}</h3>
            <p>Terakhir dikerjakan dengan {Object.keys(savedSession.answers).length} soal terjawab.</p>
          </div>
          <div className="banner-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onResumeExam(savedSession)}
            >
              Lanjutkan Ujian
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                clearExamSession()
                window.location.reload()
              }}
            >
              Hapus Sesi
            </button>
          </div>
        </div>
      )}

      <div className="exam-modes-grid">
        {/* Mode 1: Tes Ulangan Keseluruhan */}
        <article className="exam-mode-card featured">
          <span className="featured-badge">Ujian Utama Terstandar</span>
          <span className="eyebrow">SEMESTER & KOMPREHENSIF</span>
          <h2>Tes Ulangan Keseluruhan (35 Soal)</h2>
          <p className="exam-desc">
            Menguji seluruh 5 pilar materi secara merata untuk mengukur ketuntasan belajar siswa secara menyeluruh.
          </p>

          <ul className="exam-specs-list">
            <li>
              <Icon name="check" size={16} />
              <span><strong>30 Soal Pilihan Ganda</strong> (6 soal dari tiap kategori materi)</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span><strong>5 Soal Khusus</strong> (Tabel Benar/Salah & PG Bertingkat Kompleks)</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span><strong>Durasi 90 Menit</strong> dengan timer mundur & auto-submit</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span><strong>Auto-Save</strong> aman jika halaman ter-refresh</span>
            </li>
          </ul>

          <Button
            wide
            onClick={() => {
              onStartExam({
                mode: 'final',
                title: 'Tes Ulangan Keseluruhan Matematika',
                questionCount: 35,
                durationMinutes: 90,
              })
            }}
          >
            Mulai Tes Keseluruhan (90 Mnt) →
          </Button>
        </article>

        {/* Mode 2: Ulangan Harian per Bab */}
        <article className="exam-mode-card">
          <span className="eyebrow">EVALUASI PER BAB</span>
          <h2>Ulangan Harian (20 Soal)</h2>
          <p className="exam-desc">
            Uji pemahaman mendalammu pada satu kategori materi khusus dengan 20 butir soal acak terstandar.
          </p>

          <label className="select-label">
            <span>Pilih Bab / Kategori Materi:</span>
            <select
              value={dailyCategory}
              onChange={e => setDailyCategory(e.target.value as QuestionCategory)}
            >
              <option value="bangun_datar">Bangun Datar (20 Soal)</option>
              <option value="bangun_ruang">Bangun Ruang 3D (20 Soal)</option>
              <option value="prisma">Prisma & Tabung (20 Soal)</option>
              <option value="lingkaran">Lingkaran (20 Soal)</option>
              <option value="aritmatika">Pola & Barisan Aritmatika (20 Soal)</option>
            </select>
          </label>

          <ul className="exam-specs-list">
            <li>
              <Icon name="check" size={16} />
              <span>20 butir soal acak per bab</span>
            </li>
            <li>
              <Icon name="check" size={16} />
              <span>Waktu pengerjaan terarah: 40 Menit</span>
            </li>
          </ul>

          <Button
            variant="secondary"
            wide
            onClick={() => {
              const titles: Record<QuestionCategory, string> = {
                bangun_datar: 'Ulangan Harian: Bangun Datar',
                bangun_ruang: 'Ulangan Harian: Bangun Ruang 3D',
                prisma: 'Ulangan Harian: Prisma & Tabung',
                lingkaran: 'Ulangan Harian: Lingkaran',
                aritmatika: 'Ulangan Harian: Pola & Barisan Aritmatika',
              }
              onStartExam({
                mode: 'daily',
                category: dailyCategory,
                title: titles[dailyCategory],
                questionCount: 20,
                durationMinutes: 40,
              })
            }}
          >
            Mulai Ulangan Harian (40 Mnt) →
          </Button>
        </article>

        {/* Mode 3: Latihan Bebas */}
        <article className="exam-mode-card">
          <span className="eyebrow">BELAJAR SANTAI</span>
          <h2>Latihan Mandiri Bebas</h2>
          <p className="exam-desc">
            Latihan tanpa tekanan waktu. Cocok untuk mengasah rumus dan langsung melihat kunci serta pembahasannya.
          </p>

          <div className="practice-selectors">
            <label className="select-label">
              <span>Pilih Topik:</span>
              <select
                value={practiceCategory}
                onChange={e => setPracticeCategory(e.target.value as QuestionCategory | 'all')}
              >
                <option value="all">Semua Kategori Campur</option>
                <option value="bangun_datar">Bangun Datar</option>
                <option value="bangun_ruang">Bangun Ruang</option>
                <option value="prisma">Prisma & Tabung</option>
                <option value="lingkaran">Lingkaran</option>
                <option value="aritmatika">Pola & Barisan</option>
              </select>
            </label>

            <label className="select-label">
              <span>Jumlah Soal:</span>
              <select value={practiceCount} onChange={e => setPracticeCount(+e.target.value)}>
                <option value={5}>5 Soal Kilat</option>
                <option value={10}>10 Soal Standar</option>
                <option value={20}>20 Soal Penuh</option>
              </select>
            </label>
          </div>

          <Button
            variant="soft"
            wide
            onClick={() => {
              onStartExam({
                mode: 'practice',
                category: practiceCategory,
                title: `Latihan Mandiri: ${practiceCategory === 'all' ? 'Campuran' : practiceCategory}`,
                questionCount: practiceCount,
                durationMinutes: 0,
              })
            }}
          >
            Mulai Latihan Bebas →
          </Button>
        </article>
      </div>
    </div>
  )
}

function Help({ navigate }: { navigate: (p: Page) => void }) {
  const [showFallbackDemo, setShowFallbackDemo] = useState(false)
  const guides: { icon: IconName; title: string; copy: string }[] = [
    { icon: 'rotate', title: 'Putar objek 3D', copy: 'Geser area model ke kiri atau kanan untuk melihat sisi belakang dan dalam bangun ruang.' },
    { icon: 'search', title: 'Perbesar & perkecil', copy: 'Gunakan scroll mouse atau gerakan cubit pada layar sentuh ponsel.' },
    { icon: 'reset', title: 'Kembali ke awal', copy: 'Tekan tombol Reset Kamera untuk mengembalikan posisi sudut isometrik semula.' },
    { icon: 'eye', title: 'Tampilkan label', copy: 'Aktifkan sakelar Label agar nama bagian langsung tertera pada objek 3D.' },
    { icon: 'target', title: 'Pilih unsur bangun', copy: 'Sorot alas, tutup, selimut, busur, juring, atau apotema untuk membaca konsepnya.' },
    { icon: 'formula', title: 'Ikuti pembahasan', copy: 'Pada setiap pembahasan ujian, perhatikan runtutan Diketahui, Ditanya, Rumus, dan Langkah.' },
  ]

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">PANDUAN BELAJAR</span>
        <h1>Gunakan GeoLab dengan Percaya Diri</h1>
        <p>Kenali fitur navigasi, kontrol 3D interaktif, serta panduan pengerjaan ujian terstandar 90 menit.</p>
      </div>

      <div className="guide-grid">
        {guides.map(g => (
          <article key={g.title}>
            <span>
              <Icon name={g.icon} size={24} />
            </span>
            <h3>{g.title}</h3>
            <p>{g.copy}</p>
          </article>
        ))}
      </div>

      <section className="fallback-card">
        <span>
          <Icon name="info" />
        </span>
        <div>
          <h3>Dukungan Mode Ringan & Diagram 2D</h3>
          <p>Jika perangkatmu terasa lambat atau tidak mendukung WebGL 3D, seluruh materi tetap dapat dipelajari melalui diagram 2D interaktif.</p>
        </div>
        <Button variant="secondary" onClick={() => setShowFallbackDemo(!showFallbackDemo)}>
          {showFallbackDemo ? 'Sembunyikan contoh' : 'Lihat contoh fallback'}
        </Button>
      </section>

      {showFallbackDemo && (
        <div className="fallback-demo-box">
          <div className="fallback-demo-header">
            <span className="simulation-tag">DIAGRAM FALLBACK 2D</span>
            <button className="text-link" onClick={() => navigate('plane')}>
              Buka Lab Bangun Datar <Icon name="arrow" size={14} />
            </button>
          </div>
          <div className="fallback-demo-content">
            <ShapeArt shape="prism" large />
            <div className="fallback-demo-stats">
              <h4>Prisma Segitiga (Diagram Isometrik)</h4>
              <p>Dua bidang alas segitiga kongruen, 3 bidang sisi tegak persegi panjang, 9 rusuk, dan 6 titik sudut.</p>
              <div className="shape-facts">
                <span><b>5</b> Sisi</span>
                <span><b>9</b> Rusuk</span>
                <span><b>6</b> Titik sudut</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Active Exam state
  const [activeExamConfig, setActiveExamConfig] = useState<{
    examId: string
    title: string
    mode: ExamMode
    questions: Question[]
    durationMinutes: number
  } | null>(null)

  // Exam Result state
  const [lastExamResult, setLastExamResult] = useState<{
    result: ExamEvaluationResult
    title: string
  } | null>(null)

  const navigate = (next: Page) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Handle starting an exam from ExamHub or from explorer practice buttons
  const handleStartExam = (config: {
    mode: ExamMode
    category?: QuestionCategory | 'all'
    questionCount: number
    durationMinutes: number
    title: string
  }) => {
    let questions: Question[] = []
    if (config.mode === 'final') {
      questions = generateFinalExam()
    } else if (config.mode === 'daily') {
      questions = generateDailyExam(config.category as QuestionCategory, config.questionCount)
    } else {
      questions = generatePracticeExam(config.category, config.questionCount)
    }

    const examId = `exam-${config.mode}-${Date.now()}`
    setActiveExamConfig({
      examId,
      title: config.title,
      mode: config.mode,
      questions,
      durationMinutes: config.durationMinutes,
    })
    setPage('exam_session')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Handle resuming an existing saved session
  const handleResumeExam = (saved: StoredExamSession) => {
    setActiveExamConfig({
      examId: saved.examId,
      title: saved.title,
      mode: saved.mode,
      questions: saved.questions,
      durationMinutes: Math.ceil(saved.remainingSeconds / 60),
    })
    setPage('exam_session')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Handle finishing an exam
  const handleFinishExam = (questions: Question[], answers: Record<string, string | string[]>) => {
    const evaluation = gradeExam(questions, answers)
    setLastExamResult({
      result: evaluation,
      title: activeExamConfig?.title || 'Ujian Matematika',
    })
    setActiveExamConfig(null)
    setPage('exam_result')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Render Page Content
  const content = useMemo(() => {
    if (page === 'home') return <Home navigate={navigate} />
    if (page === 'plane') return <PlaneExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'bangun_datar', questionCount: 20, durationMinutes: 40, title: 'Ulangan Harian: Bangun Datar' })} />
    if (page === 'solids') return <SolidsExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'bangun_ruang', questionCount: 20, durationMinutes: 40, title: 'Ulangan Harian: Bangun Ruang 3D' })} />
    if (page === 'explorer' || page === 'lesson') return <PrismExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'prisma', questionCount: 20, durationMinutes: 40, title: 'Ulangan Harian: Prisma & Tabung' })} />
    if (page === 'circle') return <CircleExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'lingkaran', questionCount: 20, durationMinutes: 40, title: 'Ulangan Harian: Lingkaran' })} />
    if (page === 'arithmetic') return <ArithmeticExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'aritmatika', questionCount: 20, durationMinutes: 40, title: 'Ulangan Harian: Pola & Barisan Aritmatika' })} />
    if (page === 'pythagoras') return <PythagorasExplorer onStartPractice={() => handleStartExam({ mode: 'daily', category: 'bangun_datar', questionCount: 20, durationMinutes: 40, title: 'Latihan Soal: Teorema Pythagoras' })} />
    if (page === 'exam_hub') return <ExamHub onStartExam={handleStartExam} onResumeExam={handleResumeExam} />
    if (page === 'exam_session' && activeExamConfig) {
      return (
        <ExamSession
          examId={activeExamConfig.examId}
          title={activeExamConfig.title}
          mode={activeExamConfig.mode}
          initialQuestions={activeExamConfig.questions}
          durationMinutes={activeExamConfig.durationMinutes}
          onFinish={handleFinishExam}
          onExit={() => navigate('exam_hub')}
        />
      )
    }
    if (page === 'exam_result' && lastExamResult) {
      return (
        <ExamResultView
          result={lastExamResult.result}
          examTitle={lastExamResult.title}
          onRetry={() => navigate('exam_hub')}
          onGoHome={() => navigate('home')}
        />
      )
    }
    if (page === 'help') return <Help navigate={navigate} />

    return <Home navigate={navigate} />
  }, [page, activeExamConfig, lastExamResult])

  return (
    <div className="app-shell">
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <Sidebar
        page={page}
        navigate={navigate}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="app-main">
        {page !== 'exam_session' && (
          <Topbar
            page={page}
            navigate={navigate}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        )}
        <div key={page} className="page-transition">
          {content}
        </div>
      </div>
    </div>
  )
}
