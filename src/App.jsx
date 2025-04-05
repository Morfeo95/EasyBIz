import { useState } from 'react'
import Nav from "./components/interface/Nav"
import Footer from "./components/interface/Footer"
import OpenCalc from './components/opencalc/OpenCalc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section >
      <Nav />
      <OpenCalc />
      <Footer />
    </section>
  )
}

export default App
