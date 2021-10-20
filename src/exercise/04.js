// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

const initialSquares = Array(9).fill(null)
const firstStep = {id: 0, squares: initialSquares}
const initialSteps = [firstStep]

function Board({squares, onSquareClick}) {
  const renderSquare = i => {
    return (
      <button className="square" onClick={() => onSquareClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
const Status = ({status}) => {
  return <div className="status">{status}</div>
}
const History = ({steps, onItemClick, currentStep}) => (
  <ul
    style={{
      listStyle: 'number',
    }}
  >
    {steps.map(step => (
      <li key={step.id}>
        <button
          onClick={() => onItemClick(step.id)}
          disabled={currentStep === step.id}
        >
          {step.id === 0
            ? 'Go to game start'
            : `Go to move #${step.id}${
                step.id === currentStep ? '(Current)' : ''
              }`}
        </button>
      </li>
    ))}
  </ul>
)

function Game() {
  const [steps, setSteps] = useLocalStorageState('steps', initialSteps)
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  const saveStep = squares => {
    const copy = [...steps].slice(0, currentStep + 1)
    const nextStep = {id: copy.length, squares}
    setSteps([...copy, nextStep])
    setCurrentStep(nextStep.id)
  }

  const {squares} = steps.find(({id}) => id === currentStep)
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  const selectSquare = square => {
    if (winner || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    saveStep(squaresCopy)
  }
  const restart = () => {
    setSteps(initialSteps)
    setCurrentStep(firstStep.id)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onSquareClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <Status status={status} />
        <History
          currentStep={currentStep}
          onItemClick={setCurrentStep}
          steps={steps}
        />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
