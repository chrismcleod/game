import EventEmitter from 'events'

import { DefaultListener, ListenerSignature } from './types'

export class TypedEmitter<L extends ListenerSignature<L> = DefaultListener> {
  private emitter
  constructor(options?: { captureRejections?: boolean | undefined }) {
    this.emitter = new EventEmitter(options)
  }

  addListener<U extends keyof L>(event: Exclude<U, number>, listener: L[U]) {
    this.emitter.addListener(event, listener)

    return this
  }

  prependListener<U extends keyof L>(
    event: Exclude<U, number>,
    listener: L[U]
  ) {
    this.emitter.prependListener(event, listener)

    return this
  }

  prependOnceListener<U extends keyof L>(
    event: Exclude<U, number>,
    listener: L[U]
  ) {
    this.emitter.prependOnceListener(event, listener)

    return this
  }

  removeListener<U extends keyof L>(event: Exclude<U, number>, listener: L[U]) {
    this.emitter.removeListener(event, listener)

    return this
  }

  removeAllListeners(event?: Exclude<keyof L, number>) {
    this.emitter.removeAllListeners(event)

    return this
  }

  once<U extends keyof L>(event: Exclude<U, number>, listener: L[U]) {
    this.emitter.once(event, listener)

    return this
  }

  on<U extends keyof L>(event: Exclude<U, number>, listener: L[U]) {
    this.emitter.on(event, listener)

    return this
  }

  off<U extends keyof L>(event: Exclude<U, number>, listener: L[U]) {
    this.emitter.off(event, listener)
  }

  emit<U extends keyof L>(
    event: Exclude<U, number>,
    ...args: Parameters<L[U]>
  ) {
    return this.emitter.emit(event, ...args)
  }

  eventNames<U extends keyof L>(): U[] {
    return this.emitter.eventNames() as U[]
  }

  listenerCount(type: Exclude<keyof L, number>) {
    return this.emitter.listenerCount(type)
  }

  listeners<U extends keyof L>(type: Exclude<U, number>): L[U][] {
    return this.emitter.listeners(type) as L[U][]
  }

  rawListeners<U extends keyof L>(type: Exclude<U, number>): L[U][] {
    return this.emitter.rawListeners(type) as L[U][]
  }

  getMaxListeners() {
    return this.emitter.getMaxListeners()
  }

  setMaxListeners(n: number) {
    this.emitter.setMaxListeners(n)

    return this
  }
}
