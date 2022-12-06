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

  const groupedRucksacks = rucksacks.reduce((acc, rucksack, index) => {
    const lastGroup = acc[acc.length - 1]

    if (lastGroup.length === 3) {
      // start next group
      return [
        ...acc,
        [rucksack],
      ]
    }

    // add to last group
    return [
      ...acc.slice(0, acc.length - 1),
      [...lastGroup, rucksack]
    ]
  }, [[]] as string[][])


  const badgeSum = groupedRucksacks.reduce((tally, rucksackGroup) => {
    const [ rucksack1, rucksack2, rucksack3 ] = rucksackGroup
    const [groupBadge] = rucksack1
      .split('')
      .filter((item) => rucksack2.includes(item) && rucksack3.includes(item))

    const groupBadgePriority = priorityReference.get(groupBadge)

    if (!groupBadgePriority) {
      throw new Error(`Failed to look up priority for ${groupBadgePriority}`)
    }

    return tally + groupBadgePriority
  }, 0)

  console.log('Sum of item priorities of the badge of all three-Elf groups:', badgeSum)

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