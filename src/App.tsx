import Home from "./components/landing/Home"
import { ThemeProvider } from "./components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home/>
    </ThemeProvider>
  )
}
