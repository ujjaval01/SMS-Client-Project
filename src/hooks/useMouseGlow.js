import { useEffect, useRef, useState } from 'react'

export function useMouseGlow() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 40 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  return { ref, pos }
}
