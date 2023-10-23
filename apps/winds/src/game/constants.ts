import { arrayToOrRegex } from '@warebots/utils-browser'

export const INTRO_TEXT =
  'Everything is black.  Your head is pounding.  Something warm washes over your leg.  Your eyes open, and your blinded by bright sunlight. You stand up and see you are soaking wet and covered in sand.'

export const COMBO_FAILS: Array<(a: string, b: string) => string> = [
  (a, b) =>
    `You wack ${a} against ${b} for awhile. The only thing you get is tired.`,
  (a, b) => `${a} can't be used with ${b}`,
]

export const BUZZ_WORDS = [
  'again',
  'g',
  'oops',
  'a',
  'an',
  'the',
  'is',
  'and',
  'of',
  'then',
  'all',
  'one',
  'but',
  'except',
  'yes',
  'no',
  'y',
  'here',
]

export const buzz = arrayToOrRegex(BUZZ_WORDS)

export const SPELL_1_TEXT = `
1. a jump start
`
