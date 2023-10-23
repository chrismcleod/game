import { Howl } from 'howler'
import { useCallback, useEffect, useRef } from 'react'

const V = [0.5, 0.5]

export const Room1 = () => {
  const layer1 = useRef(
    new Howl({ src: 'assets/room0-1.wav', volume: 0, loop: true })
  )

  const layer2 = useRef(
    new Howl({ src: 'assets/room0-1.wav', volume: 0, loop: false })
  )

  const crossFade = useCallback((entering: Howl, leaving: Howl) => {
    const eV = entering === layer1.current ? V[0] : V[1]

    entering.pos(0).play()
    entering.fade(0, eV, 5000)
    setTimeout(() => {
      entering.fade(eV, 0, 5000)
      crossFade(leaving, entering)
    }, layer1.current.duration() * 1000 - 5000)
  }, [])

  useEffect(() => {
    const { current: l1 } = layer1
    const { current: l2 } = layer2

    l1.on('load', () => {
      crossFade(l1, l2)
    })
  }, [crossFade])

  useEffect(() => {
    const { current: l1 } = layer1
    const { current: l2 } = layer2
    l1.load()

    return () => {
      l1.fade(V[0], 0, 2000)
      l2.fade(V[1], 0, 2000)
      setTimeout(() => {
        l1.unload()
        l2.unload()
      }, 2016)
    }
  }, [])

  return null
}
