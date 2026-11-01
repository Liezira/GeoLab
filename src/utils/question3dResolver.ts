import type { Question, Question3DConfig } from '@/data/questionBank'

const MAPPED_3D_CONFIGS: Record<string, Question3DConfig> = {
  // Bangun Ruang
  'br-01': { type: 'solid', solidShape: 'kubus', dimA: 8, labelAnnotation: 'Kubus rusuk s = 8 cm' },
  'br-02': { type: 'solid', solidShape: 'kubus', dimA: 10, labelAnnotation: 'Kubus rusuk s = 10 cm' },
  'br-03': { type: 'solid', solidShape: 'balok', dimA: 6, dimB: 4, dimC: 5, labelAnnotation: 'Balok 60 × 40 × 50 cm' },
  'br-04': { type: 'solid', solidShape: 'balok', dimA: 12, dimB: 8, dimC: 5, labelAnnotation: 'Balok 12 × 8 × 5 cm' },
  'br-05': { type: 'solid', solidShape: 'balok', dimA: 12, dimB: 4, dimC: 3, showDiagonal: true, labelAnnotation: 'Diagonal Ruang d = 13 cm' },
  'br-06': { type: 'solid', solidShape: 'limas_segiempat', dimA: 10, dimB: 12, showInterior: true, labelAnnotation: 'Alas s = 10 cm, t = 12 cm' },
  'br-07': { type: 'solid', solidShape: 'limas_segiempat', dimA: 10, dimB: 12, showInterior: true, labelAnnotation: 't = 12 cm, tₛ = 13 cm' },
  'br-08': { type: 'solid', solidShape: 'limas_segiempat', dimA: 8, dimB: 10, labelAnnotation: 'Limas segi-5' },
  'br-09': { type: 'solid', solidShape: 'kerucut', dimA: 7, dimB: 12, showInterior: true, labelAnnotation: 'r = 7 cm, t = 12 cm' },
  'br-10': { type: 'solid', solidShape: 'kerucut', dimA: 6, dimB: 8, showInterior: true, labelAnnotation: 'r = 6 cm, t = 8 cm, s = 10 cm' },
  'br-11': { type: 'solid', solidShape: 'bola', dimA: 7, labelAnnotation: 'Bola r = 21 cm' },
  'br-12': { type: 'solid', solidShape: 'bola', dimA: 7, labelAnnotation: 'Bola d = 14 cm (r = 7 cm)' },
  'br-13': { type: 'solid', solidShape: 'bola', dimA: 6, isHemisphere: true, labelAnnotation: '½ Bola Padat r = 10 cm' },
  'br-14': { type: 'solid', solidShape: 'kerucut', dimA: 6, dimB: 10, labelAnnotation: 'Kerucut vs Tabung' },
  'br-15': { type: 'solid', solidShape: 'balok', dimA: 9, dimB: 6, dimC: 5, labelAnnotation: 'Kerangka Balok' },
  'br-16': { type: 'solid', solidShape: 'kubus', dimA: 6, labelAnnotation: 'Jaring-jaring Kubus' },
  'br-17': { type: 'solid', solidShape: 'kubus', dimA: 7, labelAnnotation: 'Kubus s = 7 cm' },
  'br-18': { type: 'solid', solidShape: 'balok', dimA: 8, dimB: 6, dimC: 5, labelAnnotation: 'Sifat Bangun Ruang' },
  'br-19': { type: 'solid', solidShape: 'limas_segiempat', dimA: 8, dimB: 10, labelAnnotation: 'Unsur Limas Segiempat' },
  'br-20': { type: 'solid', solidShape: 'kerucut', dimA: 6, dimB: 9, showInterior: true, labelAnnotation: 'Rumus Kerucut & Bola' },

  // Prisma & Tabung
  'pr-01': { type: 'prism', prismSides: 3, dimA: 4, dimB: 6, labelAnnotation: 'Prisma Segitiga t = 15 cm' },
  'pr-02': { type: 'prism', prismSides: 3, dimA: 4, dimB: 6, labelAnnotation: 'Prisma Siku-siku t = 12 cm' },
  'pr-03': { type: 'prism', prismSides: 8, dimA: 3, dimB: 7, labelAnnotation: 'Prisma Segidelapan' },
  'pr-04': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 6, labelAnnotation: 'Tabung r = 7 cm, t = 10 cm' },
  'pr-05': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 7, labelAnnotation: 'Tabung r = 7 cm, t = 13 cm' },
  'pr-06': { type: 'prism', prismSides: 'cylinder', dimA: 5, dimB: 7, labelAnnotation: 'Tabung d = 20 cm, t = 15 cm' },
  'pr-07': { type: 'prism', prismSides: 'trapezoid', dimA: 4, dimB: 7, labelAnnotation: 'Prisma Trapesium t = 20 cm' },
  'pr-08': { type: 'prism', prismSides: 3, dimA: 4, dimB: 7, labelAnnotation: 'Prisma t = 18 cm' },
  'pr-09': { type: 'prism', prismSides: 'cylinder', dimA: 5, dimB: 6, labelAnnotation: 'Tabung r₂ = 2r₁' },
  'pr-10': { type: 'prism', prismSides: 3, dimA: 4, dimB: 6, labelAnnotation: 'Jaring-jaring Prisma Segitiga' },
  'pr-11': { type: 'prism', prismSides: 'cylinder', dimA: 5, dimB: 7, labelAnnotation: 'Drum Tabung' },
  'pr-12': { type: 'prism', prismSides: 6, dimA: 3, dimB: 7, labelAnnotation: 'Prisma Segienam' },
  'pr-13': { type: 'prism', prismSides: 3, dimA: 4, dimB: 7, labelAnnotation: 'Kerangka Prisma' },
  'pr-14': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 6, labelAnnotation: 'Tabung Limit Prisma' },
  'pr-15': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 7, labelAnnotation: 'Tabung Tanpa Tutup' },
  'pr-16': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 6, labelAnnotation: 'Tabung t = 10 cm' },
  'pr-17': { type: 'prism', prismSides: 3, dimA: 4, dimB: 7, labelAnnotation: 'Prisma Segitiga Sama Kaki' },
  'pr-18': { type: 'prism', prismSides: 3, dimA: 4, dimB: 6, labelAnnotation: 'Konsep Prisma' },
  'pr-19': { type: 'prism', prismSides: 'cylinder', dimA: 4, dimB: 6, labelAnnotation: 'Unsur-unsur Tabung' },
  'pr-20': { type: 'prism', prismSides: 6, dimA: 3, dimB: 7, labelAnnotation: 'Formula Prisma Segi-n' },
}

export function getQuestion3DConfig(question: Question): Question3DConfig | null {
  if (question.visual3d) return question.visual3d
  if (MAPPED_3D_CONFIGS[question.id]) return MAPPED_3D_CONFIGS[question.id]

  if (question.category === 'bangun_ruang') {
    return {
      type: 'solid',
      solidShape: 'kubus',
      dimA: 6,
      labelAnnotation: question.topicTitle,
    }
  }

  if (question.category === 'prisma') {
    return {
      type: 'prism',
      prismSides: 3,
      dimA: 4,
      dimB: 7,
      labelAnnotation: question.topicTitle,
    }
  }

  return null
}
