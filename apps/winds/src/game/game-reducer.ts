import { State } from 'howler'
import { cloneDeep, defaultsDeep } from 'lodash'
import { Reducer } from 'use-immer'

import { level0 } from '../levels/level-0'
import { s } from '../levels/story'
import { INTRO_TEXT } from './constants'
import * as handlers from './handlers'
import { makeHelpers, Helpers } from './helpers'
import { parseGameCommand } from './parse-game-command'
import { triggers } from './triggers'
import { Game } from './types'

export type PhraseReducer = (
  state: Game.State,
  action: Game.Actions.PhraseCommand,
  helpers: Helpers
) => any

export const gameReducer: Reducer<Game.State, Game.Actions.All> = (
  draft,
  preaction
) => {
  let action = cloneDeep(preaction)
  if (action.type === 'Reset') {
    localStorage.clear()
    window.location.reload()
    return defaultsDeep({}, defaultState)
  }

  const helpers = makeHelpers(draft)

  if (action.type === 'HideIntro') {
    draft.showIntro = false
    action = parseGameCommand(Game.Actions.userCommand('walk north'))
  } else if (action.type === 'UserCommand') {
    draft.value = ''
    draft.messages.push({
      dir: Game.GameMessageDirection.IN,
      msg: action.payload.command,
    })
    action = parseGameCommand(action)
  }

  if (action.type === 'MoveThief') {
    return
  } else if (action.type === 'HideIntro') {
    draft.showIntro = false
  } else if (action.type === 'UserInput') {
    draft.value = action.payload.command
  } else if (action.type === 'CommandFailed') {
    helpers.outMessage(s.unknown())
  } else {
    ;(handlers as any)[action.payload.handler](draft, action, helpers)
    triggers[draft.currentLevel]?.(draft, action, helpers)
  }
}

const savedState = localStorage.getItem('game')
const defaultState = {
  value: 'look around',
  showIntro: true,
  inventory: [],
  messages: [{ dir: Game.GameMessageDirection.OUT, msg: INTRO_TEXT }],
  currentLevel: 0,
  currentRoom: -1,
  levels: [level0],
}

export const initialState: Game.State = defaultsDeep(
  JSON.parse(savedState || '{}'),
  defaultState
)
