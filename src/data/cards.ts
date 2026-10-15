export interface Card {
  readonly letter: string
  readonly name: string
  readonly sound: string
  readonly soundNote?: string
  readonly final?: boolean
}

export const CARDS: readonly Card[] = [
  { letter: 'א', name: 'ALEPH', sound: 'usually silent / glottal stop' },
  { letter: 'ב', name: 'BET', sound: 'B / V' },
  { letter: 'ג', name: 'GIMEL', sound: 'G' },
  { letter: 'ד', name: 'DALET', sound: 'D' },
  { letter: 'ה', name: 'HE', sound: 'H' },
  { letter: 'ו', name: 'VAV', sound: 'V' },
  { letter: 'ז', name: 'ZAYIN', sound: 'Z' },
  { letter: 'ח', name: 'CHET', sound: 'KH', soundNote: 'as in "loch"' },
  { letter: 'ט', name: 'TET', sound: 'T' },
  { letter: 'י', name: 'YOD', sound: 'Y', soundNote: 'as in "yes"' },
  { letter: 'כ', name: 'KAF', sound: 'K / KH' },
  { letter: 'ל', name: 'LAMED', sound: 'L' },
  { letter: 'מ', name: 'MEM', sound: 'M' },
  { letter: 'נ', name: 'NUN', sound: 'N' },
  { letter: 'ס', name: 'SAMEKH', sound: 'S' },
  { letter: 'ע', name: 'AYIN', sound: 'usually silent in Modern Hebrew' },
  { letter: 'פ', name: 'PE', sound: 'P / F' },
  { letter: 'צ', name: 'TSADI', sound: 'TS', soundNote: 'as in "cats"' },
  { letter: 'ק', name: 'QOF', sound: 'K' },
  { letter: 'ר', name: 'RESH', sound: 'R' },
  { letter: 'ש', name: 'SHIN / SIN', sound: 'SH / S' },
  { letter: 'ת', name: 'TAV', sound: 'T' },
  { letter: 'ך', name: 'FINAL KAF', sound: 'KH', final: true },
  { letter: 'ם', name: 'FINAL MEM', sound: 'M', final: true },
  { letter: 'ן', name: 'FINAL NUN', sound: 'N', final: true },
  { letter: 'ף', name: 'FINAL PE', sound: 'F', final: true },
  {
    letter: 'ץ',
    name: 'FINAL TSADI',
    sound: 'TS',
    soundNote: 'as in "cats"',
    final: true,
  },
]
