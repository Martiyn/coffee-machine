
const units = {
  seconds: 'seconds',
  temperature: 'degrees celsius',
  miliLiters: 'Ml',
  miliGrams: 'Mg',
}

const coffeeOptions = new Map([
  ['espresso-small',
    {
      grindTime: 5,
      grindFineness: 'semi-fine',
      milkTemperature: 250,
      waterTemperature: 200,
      milk: 5,
      milkUnit: units.miliLiters,
      grains: 2,
      grainsUnit: units.miliGrams,
      water: 4,
      waterUnit: units.miliLiters,
      sugar: 0,
      sugarUnit: units.miliGrams,
      sugarType: 'No Sugar'
    }],
  ['espresso-medium',
    {
      grindTime: 4,
      grindFineness: 'fine',
      milkTemperature: 270,
      waterTemperature: 220,
      milk: 3,
      milkUnit: units.miliLiters,
      grains: 4,
      grainsUnit: units.miliGrams,
      water: 5,
      waterUnit: units.miliLiters,
      sugar: 0,
      sugarUnit: units.miliGrams,
      sugarType: 'No Sugar'
    }],
  ['espresso-large',
    {
      grindTime: 6,
      grindFineness: 'wholeground',
      milkTemperature: 300,
      waterTemperature: 250,
      milk: 6,
      milkUnit: units.miliLiters,
      grains: 7,
      grainsUnit: units.miliGrams,
      water: 6,
      waterUnit: units.miliLiters,
      sugar: 0,
      sugarUnit: units.miliGrams,
      sugarType: 'No Sugar'
    }],
  ['capuccino',
    {
      grindTime: 3,
      grindFineness: 'ground',
      milkTemperature: 240,
      waterTemperature: 190,
      milk: 4,
      milkUnit: units.miliLiters,
      grains: 3,
      grainsUnit: units.miliGrams,
      water: 4,
      waterUnit: units.miliLiters,
      sugar: 0,
      sugarUnit: units.miliGrams,
      sugarType: 'No Sugar'
    }]
])


const sugarTypeOptions = new Map([
  ['white-sugar', 'White Sugar'],
  ['brown-sugar', 'Brown Sugar']
])

const sugarAmountOptions = new Map([
  ['with-sugar', 5],
  ['medium-sugar', 3],
  ['little-sugar', 1],
  ['no-sugar', 0]
])

const amountInReservoire = {
  milk: 200,
  water: 200,
  grains: 250,
  whiteSugar: 150,
  brownSugar: 150
}

const timeOutTime = {
  initializationTime: 3000,
  addingTime: 2000
}

const defaultLiquidTemperature = {
  milk: 25,
  water: 23
}

module.exports = {
  units,
  coffeeOptions,
  sugarAmountOptions,
  sugarTypeOptions,
  amountInReservoire,
  timeOutTime,
  defaultLiquidTemperature
}