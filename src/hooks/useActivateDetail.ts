import { useCallback, useEffect, useRef } from 'react'

export function useActivateDetail() {
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current)
    },
    [],
  )

  return useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 980) {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    }
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current)
    focusTimerRef.current = setTimeout(() => {
      ref.current?.focus({ preventScroll: true })
    }, 80)
  }, [])
}
