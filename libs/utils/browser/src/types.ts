/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Function0, Function1, Dictionary } from 'lodash'

export type CaseInsensitive<T extends string> = Lowercase<T> | Uppercase<T>

export type ListenerSignature<L> = {
  [E in keyof L]: (...args: any[]) => any
}

export type DefaultListener = {
  [k: string]: (...args: any[]) => any
}

export type AnyFn = () => any
export type F0<R> = Function0<R>
export type F1<T1, R> = Function1<T1, R>
export type Dict<T> = Dictionary<T>
