import { useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore'

export function useThemeSync() {
  const theme = useAppStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light' : ''
  }, [theme])
}
