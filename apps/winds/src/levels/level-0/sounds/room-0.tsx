import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

const V = [0.05, 0.5]

export const Room0 = () => {
  const layer1 = useRef(
    new Howl({ src: 'assets/room0-1.wav', volume: 0, loop: true })
  )
  const layer2 = useRef(
    new Howl({ src: 'assets/room0-2.mp3', volume: 0, loop: true })
  )

  useEffect(() => {
    const { current: l1 } = layer1
    const { current: l2 } = layer2
    l1.play()
    l2.play()
    l1.fade(0, V[0], 2000)
    l2.fade(0, V[1], 2000)

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
