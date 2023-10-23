import { arrayToOrRegexStr } from '@warebots/utils-browser'

import { buzz } from './constants'
import { Game } from './types'

const matchSyntax =
  (
    verb: string,
    phrase: [
      verb: string | string[],
      mp?: string | string[],
      mo?: string | string[],
      ip?: string | string[],
      io?: string | string[]
    ]
  ) =>
  (input: string) => {
    const verbs = arrayToOrRegexStr(phrase[0])
    const mps = arrayToOrRegexStr(phrase[1])
    const mos = arrayToOrRegexStr(phrase[2], '.*')
    const ips = arrayToOrRegexStr(phrase[3])
    const ios = arrayToOrRegexStr(phrase[4], '.*')

    let regexStr = `(?<v>${verbs})`
    if (mps) {
      regexStr += `(?<mp>${mps})`
    }

    regexStr += `(?<mo>${mos})`

    if (ips) {
      regexStr += `(?<ip>${ips})(?<io>${ios})`
    }

    const regex = new RegExp(regexStr)
    const str = ('   ' + input.replace(/\s/gi, '  ') + '   ').replace(buzz, '')

    const result = str.match(regex)

    if (result?.groups) {
      result.groups['ov'] = result.groups['v'].trim()
      result.groups['v'] = verb

      result.groups['mo'] = (result.groups['mo'] || '')
        .replace(/\s\s/gi, ' ')
        .trim()

      result.groups['mp'] = (result.groups['mp'] || '')
        .replace(/\s\s/gi, ' ')
        .trim()

      result.groups['io'] = (result.groups['io'] || '')
        .replace(/\s\s/gi, ' ')
        .trim()

      result.groups['ip'] = (result.groups['ip'] || '')
        .replace(/\s\s/gi, ' ')
        .trim()

      return result.groups as Game.SyntaxPhrase
    }

    return null
  }

export const parseGameCommand = (
  action: Exclude<Game.Actions.All, { type: 'Reset' }>
): Exclude<Game.Actions.All, { type: 'UserCommand' } | { type: 'Reset' }> => {
  if (action.type !== 'UserCommand') return action
  const input = action.payload.command
  let phrase: Game.SyntaxPhrase | null = null

  for (const syntax of syntaxes) {
    phrase = syntax(input)
    if (phrase) break
  }

  if (phrase) {
    return {
      type: 'PhraseCommand',
      payload: { phrase, handler: `${phrase.v}Command` },
    }
  }

  return {
    type: 'CommandFailed',
    payload: action.payload,
  }
}

const syntaxes = [
  matchSyntax('walk', [
    [''],
    [
      'n',
      's',
      'e',
      'w',
      'u',
      'd',
      'north',
      'south',
      'east',
      'west',
      'up',
      'down',
    ],
  ]),
  matchSyntax('walk', [
    ['walk', 'go', 'run', 'cross'],
    [
      'n',
      's',
      'e',
      'w',
      'u',
      'd',
      'north',
      'south',
      'east',
      'west',
      'up',
      'down',
    ],
  ]),
  matchSyntax('examine', [
    ['look', 'inspect', 'check'],
    [
      'at',
      'above',
      'over',
      'below',
      'under',
      'by',
      'in',
      'down  at',
      'up  at',
      'through',
      'into',
    ],
  ]),
  matchSyntax('explore', [
    ['look', 'peek', 'gaze', 'explore'],
    ['', 'around', 'west', 'east', 'north', 'south', 'up', 'down'],
  ]),
  matchSyntax('combine', [
    ['use', 'combine', 'put'],
    undefined,
    ['.*'],
    ['in', 'on', 'with'],
  ]),
  matchSyntax('take', [['take', 'grab', 'pick'], ['up']]),
  matchSyntax('take', [['take', 'grab', 'pick']]),
  matchSyntax('inventory', [['inventory', 'i']]),
  matchSyntax('dig', [
    ['dig', 'open', 'o', 'd'],
    ['up', 'in'],
  ]),
  matchSyntax('dig', [['dig', 'open', 'o', 'd']]),
  matchSyntax('attack', [
    ['tip', 'hit', 'push', 'shove', 'strike', 'break'],
    ['', 'over'],
    ['.*'],
    ['with', 'using'],
  ]),
  matchSyntax('attack', [
    ['tip', 'hit', 'push', 'shove', 'strike', 'break'],
    ['over'],
  ]),
  matchSyntax('attack', [
    ['tip', 'hit', 'push', 'shove', 'strike', 'break', 'punch', 'kick'],
    undefined,
    ['.*'],
    ['over'],
  ]),
  matchSyntax('attack', [
    ['tip', 'hit', 'push', 'shove', 'strike', 'break', 'punch', 'kick'],
  ]),
  matchSyntax('consume', [['eat', 'drink'], undefined, ['.*']]),
]
