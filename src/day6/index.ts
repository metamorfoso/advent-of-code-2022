import fs from 'fs'
import path, { format } from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const filterUnique = (chars: string[]): string[] => {
  const charsSet = new Set(chars.filter((char) => char != undefined))
  return Array.from(charsSet)
}

const markerLength = 4

const identifyStartOfPacket = () => {
  const data = readInputFile(INPUT_PATH)

  const signalChars = data.split('')

  const markerIndexes = [
    ...(Array.from({ length: markerLength - 1 }) as string[]),
    ...signalChars,
  ].reduce((acc, char, index, allChars) => {
    const prev = allChars.slice(index - markerLength + 1, index)

    const uniques = filterUnique([...prev, char])

    const markerIndexes = [...acc]

    if (uniques.length === markerLength) {
      markerIndexes.push(index - markerLength + 1) // add one because the marker includes current char; message begins at following index
    }

    return markerIndexes;
  }, [] as number[])

  console.log(markerIndexes[0] + 1) // add one to index to designate position of the marker starting at 1 (rather than 0)
}

identifyStartOfPacket()