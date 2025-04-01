import { useState } from 'react'
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import OpenCalc from './components/OpenCalc'

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
