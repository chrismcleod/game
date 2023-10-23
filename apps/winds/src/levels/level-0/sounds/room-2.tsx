import { Howl } from 'howler'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AnyFn } from '@warebots/utils-browser'

const V = [0.15, 0.15]

export const Room2 = () => {
  const [visited, setVisited] = useState(
    localStorage.getItem('com.warebots.games.winds.room3visited') === 'true'
  )

  const handleVisit = () => {
    localStorage.setItem('com.warebots.games.winds.room3visited', 'true')
    setVisited(true)
  }

  if (visited) {
    return <Room2Enter />
  } else {
    return <Room2Visit onComplete={handleVisit} />
  }
}

const Room2Visit = (props: { onComplete: AnyFn }) => {
  const { onComplete } = props

  const layer1 = useRef(
    new Howl({ src: 'assets/room2-0.m4a', volume: 0, loop: true })
  )

  useEffect(() => {
    const { current } = layer1

    current.on('load', () => {
      current
        .fade(0, V[0] + 0.4, 2000)
        .pos(0)
        .play()
      setTimeout(() => {
        onComplete()
      }, current.duration() * 1000 - 5000)
    })

    current.load()

    return () => {
      const { current: l1 } = layer1
      l1.fade(V[0] + 0.4, 0, 5000)
      setTimeout(() => {
        l1.unload()
      }, 5016)
    }
  }, [onComplete])

  return null
}

const Room2Enter = () => {
  const layer1 = useRef(
    new Howl({ src: 'assets/room2-1.m4a', volume: 0, loop: true })
  )

  const layer2 = useRef(
    new Howl({ src: 'assets/room2-1.m4a', volume: 0, loop: false })
  )

  const crossFade = useCallback((entering: Howl, leaving: Howl) => {
    const eV = entering === layer1.current ? V[0] : V[1]
    const lV = entering === layer1.current ? V[1] : V[0]

    entering.pos(0).play()
    entering.fade(0, eV, 5000)
    leaving.fade(lV, 0, 6000)
    setTimeout(() => {
      leaving.stop()
    }, 6000)
    setTimeout(() => {
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
