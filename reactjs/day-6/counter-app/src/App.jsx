import { useState } from 'react'
import './App.css'
import { Counter } from './components/Counter.jsx'
function App() { 
  const [showCounter, setShowCounter] = useState(true);
  let counterComponent;
  if(showCounter) {
    counterComponent = <Counter />
  } 
  else {
    counterComponent = null;
  }
  return (
    <>
      <button className='button-show-counter' onClick={() => setShowCounter(!showCounter)}>
        {showCounter ? 'Ẩn counter' : 'Hiện counter'}
      </button>

      {counterComponent}
    </>
  )
}

export default App
