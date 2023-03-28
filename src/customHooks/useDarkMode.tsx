import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDarkMode])

  return [isDarkMode, setIsDarkMode] as const
}

export default useDarkMode