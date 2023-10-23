/* eslint-disable @typescript-eslint/no-namespace */
export type Maybe<T> = T | undefined
export namespace Game {
  export enum GameMessageDirection {
    IN = 'in',
    OUT = 'out',
    INVENTORY = 'inventory',
  }

  export type GameMessage = {
    dir: GameMessageDirection
    msg: string
  }

  export type State = {
    value: string
    showIntro?: boolean
    messages: GameMessage[]
    levels: Level[]
    inventory: Item[]
    currentLevel: number
    currentRoom: number
  }

  export type Level = {
    start: Room
    children: Room[]
  }

  export type Room = {
    id: string
    visited: boolean
    visitDesc: string
    enterDesc: string
    exits: { [K in Direction]?: Exit }
    children: Item[]
  }

  export enum Direction {
    N = 'north',
    S = 'south',
    E = 'east',
    W = 'west',
    U = 'up',
    D = 'down',
  }

  export type Exit = {
    open: boolean
    openedDesc: string
    closedDesc: string
    room: number
  }

  export enum ItemBits {
    ATTACKABLE,
    CLOSED,
    CONSUMABLE,
    CONTAINED,
    CONTAINER,
    CORPSE,
    DESTROY_ON_OPEN,
    DYING,
    EXAMINED,
    INVISIBLE,
    OPEN_ON_EXAMINE,
    PERMANENT,
    SINGLETON,
    TAKE_COPY,
    TAKEABLE,
    UNTAKEABLE,
    VISIBLE,
    WEAPON,
  }

  export type Item = {
    id: string
    name: string
    bits: ItemBits[]
    adj: string[]
    syn: string[]
    desc: string
    descs: { [K in ItemBits]?: string }
    children: Item[]
  }

  export type Combination = {
    ids: [string, string]
    reversible?: boolean
    destroys?: boolean
    desc: string
  }

  export type SyntaxPhrase = {
    io: string
    mo: string
    mp: string
    ip: string
    v: string
    ov: string
  }

  export namespace Actions {
    export type Action<T extends (...args: any[]) => unknown> = ReturnType<T>

    export type Reset = Action<typeof reset>
    export const reset = () => ({ type: 'Reset' } as const)

    export type UserCommand = Action<typeof userCommand>
    export const userCommand = (command: string) =>
      ({
        type: 'UserCommand',
        payload: { command },
      } as const)

    export type MoveThief = Action<typeof moveThief>
    export const moveThief = (command: string) =>
      ({
        type: 'MoveThief',
        payload: { command },
      } as const)

    export type CommandFailed = Action<typeof commandFailed>
    export const commandFailed = (command: string) =>
      ({
        type: 'CommandFailed',
        payload: { command },
      } as const)

    export type UserInput = Action<typeof userInput>
    export const userInput = (command: string) =>
      ({
        type: 'UserInput',
        payload: { command },
      } as const)

    export type HideIntro = Action<typeof hideIntro>
    export const hideIntro = () =>
      ({
        type: 'HideIntro',
      } as const)

    // user commands
    export type PhraseCommand = {
      type: `PhraseCommand`
      payload: { phrase: SyntaxPhrase; handler: string }
    }

    export type All =
      | Reset
      | UserInput
      | CommandFailed
      | UserCommand
      | MoveThief
      | PhraseCommand
      | HideIntro
  }
}
