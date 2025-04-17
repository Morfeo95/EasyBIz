import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Nav from "./components/interface/Nav"
import OpenCalc from './pages/OpenCalc';
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage';
import Footer from "./components/interface/Footer"
import { Analytics } from "@vercel/analytics/react"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Analytics />

      {/* Contenido principal que se expande */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/opencalc" element={<OpenCalc />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
