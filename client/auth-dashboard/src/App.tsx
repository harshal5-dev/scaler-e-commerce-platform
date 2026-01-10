import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/layout"
import { Home, Login, Register, Dashboard, Profile } from "@/pages"

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="securegate-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard routes with shared layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App