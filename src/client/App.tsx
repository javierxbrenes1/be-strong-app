import { useState } from 'react'
import {Button, styled, Box } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button variant="outlined">Click here</Button>
    </div>
  )
}

export default App
