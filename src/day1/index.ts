import fs from 'fs'
import path from 'path'

const INPUT_PATH = './input.txt'

const readInputFile = (relativePath: string = INPUT_PATH) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, relativePath))
  return buffer.toString()
}

const parseData = (data: string) => data.split('\n')

const reduceCaloriesToTotals = (calories: string[]) =>
  calories.reduce(
    (acc, current) => {
      const workingAcc = [...acc];

      if (current === "") {
        workingAcc.push(0);
        return workingAcc;
      }

      const last = workingAcc.pop() as number;
      const updated = parseInt(current, 10) + last;
      workingAcc.push(updated);

      return workingAcc;
    },
    [0]
  );


const findHighestTotal = (totals: number[]) => totals.sort((a, b) => b - a)[0];

const findHighestCalories = () => {
  const data = readInputFile()

  const calories = parseData(data)

  const totals = reduceCaloriesToTotals(calories)

  const highest = findHighestTotal(totals)
  console.log(highest)
}

findHighestCalories()
