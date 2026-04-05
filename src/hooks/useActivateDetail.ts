import { useCallback } from 'react'

export function useActivateDetail() {
  return useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 980) {
      setTimeout(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, 60)
    }
    setTimeout(() => { ref.current?.focus({ preventScroll: true }) }, 80)
  }, [])
}
