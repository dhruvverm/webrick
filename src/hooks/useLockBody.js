import { useEffect } from 'react'

/** Prevents background scrolling while `locked` is true (menus, modals). */
export default function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = prev
      document.body.style.paddingRight = prevPad
    }
  }, [locked])
}
