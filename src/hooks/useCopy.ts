import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copy = useCallback(() => {
    if (!navigator?.clipboard?.writeText) return
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), 1800)
      })
      .catch(() => {})
  }, [text])
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )
  return { copied, copy }
}
