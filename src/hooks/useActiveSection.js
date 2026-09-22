import { useEffect, useState } from 'react'

/** Returns the id of the section currently closest to the top third of the viewport. */
export default function useActiveSection(ids, offset = 0.35) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const line = window.innerHeight * offset
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}
