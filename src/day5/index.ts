import fs from 'fs'
import path from 'path'

// import initialArrangement from './input/initialArrangement'

// const INPUT_PATH = './input/rearrangementProceedure.txt'
const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseByNewLine = (data: string) => data.split('\n')

const rearrangeCrates = () => {
  const data = readInputFile(INPUT_PATH)

  const lines = parseByNewLine(data)

  const workingStacks: string[][] = []

  const stacks: string[][] = []

  lines.forEach((line) => {
    // normalize stacks before procedure starts (i.e. at empty line)
    if (line === '') {
        workingStacks.forEach((stack, index) => {
          // remove stack key (i.e. always the last item to be written to that stack)
          // reverse stack so it can be read from "bottom up" (i.e. it was written "top down")
          const normalizedStack = [...stack].slice(0, -1).reverse()
          stacks[index] = normalizedStack

        })
    }

    // parse lines beginning with 'move' as crate movement instructions
    if (line.includes('move')) {
      // parse instruction
      const [crateCount, from, to] = line
        .split(' ')
        .map((char) => parseInt(char, 10))
        .filter((parsed) => !Number.isNaN(parsed))

      // apply each instruction to stacks map
      Array.from({ length: crateCount }).forEach(() => {
        const originIndex = from - 1
        const destinationIndex = to - 1

        const crate = stacks[originIndex].pop()

        if (!crate) {
          throw new Error(`Could not execute line: ${line}. No more crates in stack ${originIndex}`)
        }

        stacks[destinationIndex].push(crate)
      })
    }

    // parse remaning lines as description of the initial stack
    // get crates in the line
    const stackLine = line.split('').reduce((resultArray, char, index) => {
      const chunkIndex = Math.floor(index/4)

      // start new chunk
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }
      resultArray[chunkIndex].push(char)

      return resultArray
    }, [] as string[][])

    const cratePositions = stackLine.map((socket) =>
      socket.filter((char) => char !== " " && char !== "[" && char !== "]")
    )

    // construct working stacks
    // add crates to stacks arrays under correct key
    cratePositions.forEach((crateNode, index) => {
      const crate = crateNode.toString()
      if (crate && crate !== '') {
        workingStacks[index] = [...workingStacks[index] || [], crate]
      }
    })
  })

  const topCrates = stacks.map((stack) => [...stack].pop()).join('')

  console.log(topCrates)
}

rearrangeCrates()