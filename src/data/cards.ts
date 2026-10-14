export interface Card {
  readonly letter: string
  readonly name: string
  readonly sound: string
  readonly soundNote?: string
  readonly russian: string
  readonly final?: boolean
}

export const CARDS: readonly Card[] = [
  {
    letter: 'א',
    name: 'ALEPH',
    sound: 'usually silent / glottal stop',
    russian: 'обычно без звука / гортанная смычка',
  },
  { letter: 'ב', name: 'BET', sound: 'B / V', russian: 'Б / В' },
  { letter: 'ג', name: 'GIMEL', sound: 'G', russian: 'Г' },
  { letter: 'ד', name: 'DALET', sound: 'D', russian: 'Д' },
  { letter: 'ה', name: 'HE', sound: 'H', russian: 'Х (лёгкий)' },
  { letter: 'ו', name: 'VAV', sound: 'V', russian: 'В' },
  { letter: 'ז', name: 'ZAYIN', sound: 'Z', russian: 'З' },
  { letter: 'ח', name: 'CHET', sound: 'KH', soundNote: 'as in "loch"', russian: 'Х' },
  { letter: 'ט', name: 'TET', sound: 'T', russian: 'Т' },
  { letter: 'י', name: 'YOD', sound: 'Y', soundNote: 'as in "yes"', russian: 'Й' },
  { letter: 'כ', name: 'KAF', sound: 'K / KH', russian: 'К / Х' },
  { letter: 'ל', name: 'LAMED', sound: 'L', russian: 'Л' },
  { letter: 'מ', name: 'MEM', sound: 'M', russian: 'М' },
  { letter: 'נ', name: 'NUN', sound: 'N', russian: 'Н' },
  { letter: 'ס', name: 'SAMEKH', sound: 'S', russian: 'С' },
  {
    letter: 'ע',
    name: 'AYIN',
    sound: 'usually silent in Modern Hebrew',
    russian: 'обычно без звука в современном иврите',
  },
  { letter: 'פ', name: 'PE', sound: 'P / F', russian: 'П / Ф' },
  { letter: 'צ', name: 'TSADI', sound: 'TS', soundNote: 'as in "cats"', russian: 'Ц' },
  { letter: 'ק', name: 'QOF', sound: 'K', russian: 'К' },
  { letter: 'ר', name: 'RESH', sound: 'R', russian: 'Р' },
  { letter: 'ש', name: 'SHIN / SIN', sound: 'SH / S', russian: 'Ш / С' },
  { letter: 'ת', name: 'TAV', sound: 'T', russian: 'Т' },
  { letter: 'ך', name: 'FINAL KAF', sound: 'KH', russian: 'Х', final: true },
  { letter: 'ם', name: 'FINAL MEM', sound: 'M', russian: 'М', final: true },
  { letter: 'ן', name: 'FINAL NUN', sound: 'N', russian: 'Н', final: true },
  { letter: 'ף', name: 'FINAL PE', sound: 'F', russian: 'Ф', final: true },
  {
    letter: 'ץ',
    name: 'FINAL TSADI',
    sound: 'TS',
    soundNote: 'as in "cats"',
    russian: 'Ц',
    final: true,
  },
]
