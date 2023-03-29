import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

const useDarkMode = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useLocalStorage("THEME_NOTEAPP", false)

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