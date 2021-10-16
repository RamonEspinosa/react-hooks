// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useState} from 'react'
import {useRef} from 'react'

const useLocalStorage = ({
  item: key,
  initialValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) => {
  const [value, setValue] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })
  const prevKeyRef = useRef(key)
  useEffect(() => {
    if (prevKeyRef.current !== key) {
      window.localStorage.removeItem(prevKeyRef)
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])
  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage({
    key: 'name',
    initialValue: initialName,
  })
  function handleChange(event) {
    setName(event.target.value)
  }
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
  return <Greeting />
}

export default App
