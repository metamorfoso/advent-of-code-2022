import fs from 'fs'
import path from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseData = (data: string) => data.split('\n')

const opponentShapeIndex = {
  'A': 'rock',
  'B': 'paper',
  'C': 'scissors',
} as const

const shapeScoreIndex = {
  'rock': 1,
  'paper': 2,
  'scissors': 3,
} as const


const desiredWinnderIndex = {
  'X': 'opponent',
  'Y': 'draw',
  'Z': 'player',
} as const

type Shape = 'rock' | 'paper' | 'scissors'

type Winner = 'opponent' | 'player' | 'draw'

const roundWinnerScoreIndex = {
  'player': 6,
  'draw': 3,
  'opponent': 0,
} as const

const getPlayerShape = (opponentShape: Shape, desiredWinner: Winner): Shape => {
  switch (desiredWinner) {
    case 'player': {
      if (opponentShape === 'paper') {
        return 'scissors'
      }
      if (opponentShape === 'rock') {
        return 'paper'
      }
      if (opponentShape === 'scissors') {
        return 'rock'
      }
    }
    case 'opponent': {
      if (opponentShape === 'paper') {
        return 'rock'
      }
      if (opponentShape === 'scissors') {
        return 'paper'
      }
      if (opponentShape === 'rock') {
        return 'scissors'
      }
    }
    case 'draw':
      return opponentShape
  }
}

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
    const [opponentShapeCode, desiredWinnerCode]  = current.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']

    const opponentShape = opponentShapeIndex[opponentShapeCode]

    const desiredWinner = desiredWinnderIndex[desiredWinnerCode]

    const playerShape = getPlayerShape(opponentShape, desiredWinner)

    const winner = resolveWinner(opponentShape, playerShape)

    const roundWinnerScore = roundWinnerScoreIndex[winner]

    const shapeScore = shapeScoreIndex[playerShape]

    const scoreForRound = shapeScore + roundWinnerScore

    return acc + scoreForRound
  }, 0)

  console.log('Total score with this strategy guide:', score)
}

predictScore()
