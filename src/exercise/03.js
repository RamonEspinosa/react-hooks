import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={({target:{value}}) => setName(value)} />
    </div>
  )
}

function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')
  return (
    <>
      <div>
        <label htmlFor="animal">Favorite Animal: </label>
        <input
          id="animal"
          value={animal}
          onChange={({target: {value}}) => setAnimal(value)}
        />
      </div>
      <Display animal={animal} />
    </>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  return (
    <form>
      <Name />
      <FavoriteAnimal />
    </form>
  )
}

export default App
