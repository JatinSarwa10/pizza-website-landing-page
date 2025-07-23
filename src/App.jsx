import { useState } from 'react'
import PizzaWebsite from './PizzaWebsite'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PizzaWebsite />
    </>
  )
}

export default App
