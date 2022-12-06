import fs from 'fs'
import path from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseByNewLine = (data: string) => data.split('\n')

const buildPriorityReference = () => {
  const alpha = Array.from(Array(26)).map((_, i) => i + 65)
  const casedAlphabet = [
    ...alpha.map((x) => String.fromCharCode(x).toLowerCase()),
    ...alpha.map((x) => String.fromCharCode(x).toUpperCase()),
  ]

  const priorityKvPairs = casedAlphabet.map((letter, index) => [letter, index + 1] as const)

  return new Map(priorityKvPairs)
}

const findPrioritySum = () => {
  const data = readInputFile()

  const rucksacks = parseByNewLine(data)

  const priorityReference = buildPriorityReference()

  const prioritySum = rucksacks.reduce((priorityTally, rucksack) => {
    // split 'rucksack' in half
    const half1 = rucksack.slice(0, rucksack.length / 2).split('')
    const half2 = rucksack.slice(rucksack.length / 2).split('')

    // find duplicate item in the rucksack
    const [duplicate] = half1.filter((item) => half2.includes(item))

    // find item's priority
    const priority = priorityReference.get(duplicate)

    if (!priority) {
      throw new Error(`Failed to look up priority for ${duplicate}`)
    }

    // tally priority
    return priorityTally + priority
  }, 0)

  console.log('Sum of priorities of duplicate items is:', prioritySum)
}

findPrioritySum()