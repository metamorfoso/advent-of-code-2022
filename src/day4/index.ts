import fs from 'fs'
import path from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseByNewLine = (data: string) => data.split('\n')

const parseRangeBounds = (rawRange: string): [number, number] => {
  const [lowerBound, upperBound] = rawRange.split('-').map((value) => parseInt(value, 10))
  return [lowerBound, upperBound]
}

const findOverlappingSections = () => {
  const data = readInputFile()

  const sectionRangePairs = parseByNewLine(data)

  const overlappingSections = sectionRangePairs.filter((rangePair) => {
    // parse range pairs
    const [rawRange1, rawRange2] = rangePair.split(',')

    const [range1LowerBound, range1UpperBound] = parseRangeBounds(rawRange1)
    const [range2LowerBound, range2UpperBound] = parseRangeBounds(rawRange2)

    // determine overlap (partial)
    const hasOverlap =
      (range1UpperBound >= range2LowerBound && range1LowerBound <= range2UpperBound) ||
      (range2UpperBound >= range1LowerBound && range2LowerBound <= range1UpperBound)

    return hasOverlap
  })

  console.log('Number of assignment pairs with partial overlap:', overlappingSections.length)
}

findOverlappingSections()