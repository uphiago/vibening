import { useCallback, useEffect, useRef } from 'react'

export function useActivateDetail() {
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => { timersRef.current.forEach(clearTimeout) }, [])

  return useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 980) {
      timersRef.current.push(
        setTimeout(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, 60)
      )
    }
    timersRef.current.push(
      setTimeout(() => { ref.current?.focus({ preventScroll: true }) }, 80)
    )
  }, [])
}
