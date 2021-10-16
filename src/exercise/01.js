import * as React from 'react'
import {useState} from 'react'

function Greeting({initialName}) {
  const [name, setName] = useState(initialName)

  const handleChange = ({target: {value}}) => setName(value)

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Bob" />
}

export default App
