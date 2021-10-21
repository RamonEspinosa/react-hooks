import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary'

const PokemonError = ({error, resetErrorBoundary}) => (
  <div role="alert">
    There was an error:{' '}
    <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: STATUS.IDLE,
  })
  React.useEffect(() => {
    if (pokemonName) {
      setState({
        pokemon: null,
        error: null,
        status: STATUS.PENDING,
      })

      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({
            pokemon: pokemonData,
            status: STATUS.RESOLVED,
            error: null,
          })
        })
        .catch(error => {
          setState({
            pokemon: null,
            status: STATUS.REJECTED,
            error,
          })
        })
    }
  }, [pokemonName])
  const {status, error, pokemon} = state
  if (status === STATUS.REJECTED) {
    throw error
  }
  if (status === STATUS.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === STATUS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />
  }
  return <span>Submit a pokemon</span>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={PokemonError} onReset={() => setPokemonName("")} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
