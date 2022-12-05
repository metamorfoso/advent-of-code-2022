import fs from 'fs'
import path from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseData = (data: string) => data.split('\n')

const playerShapeIndex = {
  'X': 'rock',
  'Y': 'paper',
  'Z': 'scissors',
} as const

const opponentShapeIndex = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
} as const

const shapeScoreIndex = {
  'X': 1,
  'Y': 2,
  'Z': 3,
} as const


type Shape = 'rock' | 'paper' | 'scissors'

type Winner = 'opponent' | 'player' | 'draw'

const roundWinnerScoreIndex = {
  'player': 6,
  'draw': 3,
  'opponent': 0,
} as const

const resolveWinner = (opponent: Shape, player: Shape) => {
  if (opponent === "rock" && player === "rock") {
    return "draw"
  }

  if (opponent === "rock" && player === "paper") {
    return "player"
  }

  if (opponent === "rock" && player === "scissors") {
    return "opponent"
  }

  if (opponent === "paper" && player === "rock") {
    return "opponent"
  }

  if (opponent === 'paper' && player === 'paper') {
    return 'draw'
  }

  if (opponent === 'paper' && player === 'scissors') {
    return 'player'
  }

  if (opponent === 'scissors' && player === 'rock') {
    return 'player'
  }

  if (opponent === 'scissors' && player === 'paper') {
    return 'opponent'
  }

  if (opponent === 'scissors' && player === 'scissors') {
    return 'draw'
  }

  throw new Error(`Could not resolve winner where opponent arg is ${opponent} as player arg is ${player}`)
}

const predictScore = () => {
  const data = readInputFile()

  const rounds = parseData(data)

  const score = rounds.reduce((acc, current) => {
    const [opponent, player]  = current.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']

    const shapeScore = shapeScoreIndex[player]

    const opponentShape = opponentShapeIndex[opponent]
    const playerShape = playerShapeIndex[player]
    const winner = resolveWinner(opponentShape, playerShape)

    const roundWinnerScore = roundWinnerScoreIndex[winner]

    const scoreForRound = shapeScore + roundWinnerScore

    return acc + scoreForRound
  }, 0)

  console.log('Total score with this strategy guide:', score)
}

predictScore()
