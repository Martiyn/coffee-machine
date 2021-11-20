let coffee = new Object();

const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c <coffee>")
  .option("c",
    {
      alias: "coffee",
      describe: "Select coffee type",
      type: "string",
      demandOption: false
    })
  .usage("Usage: -m <milk>")
  .option("m",
    {
      alias: "milk",
      describe: "Select milk amount",
      type: "string",
      demandOption: false
    })
  .usage("Usage: -a <sugarAmount>")
  .option("a",
    {
      alias: "sugarAmount",
      describe: "Select sugar amount",
      type: "string",
      demandOption: false
    })
  .usage("Usage: -t <sugarType>")
  .option("t",
    {
      alias: "sugarType",
      describe: "Select sugar type",
      type: "string",
      demandOption: false
    })
  .argv;

const units = {
  seconds: 'seconds',
  temperature: 'degrees celsius',
  miliLiters: 'Ml',
  miliGrams: 'Mg',
  milk: 'Milk',
  water: 'Water'
}

sugarTypeOptions = new Map([
  ['white-sugar', 'White Sugar'],
  ['brown-sugar', 'Brown Sugar']
])

const sugarAmountOptions = new Map([
  ['with-sugar', 5],
  ['medium-sugar', 3],
  ['little-sugar', 1],
  ['no-sugar', 0]
])

const defaultSugarAmountOption = sugarAmountOptions.get('no-sugar')
const defaultSugarTypeOption = sugarTypeOptions.get('white-sugar')

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
      sugar: defaultSugarAmountOption,
      sugarUnit: units.miliGrams,
      sugarType: defaultSugarTypeOption
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
      sugar: defaultSugarAmountOption,
      sugarUnit: units.miliGrams,
      sugarType: defaultSugarTypeOption
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
      sugar: defaultSugarAmountOption,
      sugarUnit: units.miliGrams,
      sugarType: defaultSugarTypeOption
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
      sugar: defaultSugarAmountOption,
      sugarUnit: units.miliGrams,
      sugarType: defaultSugarTypeOption
    }]
])

const timeOutTime = {
  initializationTime: 3000,
  addingTime: 2000
}
const defaultGrinderSettings = {
  time: 6,
  amount: 5,
  fineness: 'fine'
}

// GRINDER CLASS
class GrainGrinder {
  constructor(time, amount, fineness) {
    this.time = time
    this.timeUnit = units.seconds
    this.amount = amount
    this.amountUnit = units.miliGrams
    this.fineness = fineness
  }
  grind() {
    return (`${this.time},${this.timeUnit},${this.amount},${this.amountUnit},${this.fineness}`)
  }
}

// RESERVOIRE CLASS
class Reservoire {
  constructor(liquid) {
    this.liquid = liquid
  }
  passToHeater() {
    return (`${this.liquid}`)
  }
}

class WaterReservoire extends Reservoire {
  constructor(liquid, passAmount) {
    super(liquid)
    this.passAmount = passAmount
    this.amountUnit = units.miliLiters
  }
  passToHeater() {
    return (`${super.passToHeater},${this.passAmount},${this.waterUnit}`)
  }
}

class MilkReservoire extends Reservoire {
  constructor(liquid, passAmount) {
    super(liquid)
    this.passAmount = passAmount
    this.amountUnit = units.miliLiters
  }
  passToHeater() {
    return (`${super.passToHeater},${this.passAmount},${this.milkUnit}`)
  }
}

// HEATER CLASS
class Heater {
  constructor(liquid) {
    this.liquid = liquid
  }
  heatUpLiquid() {
    return (`${this.liquid}`)
  }
}

class WaterHeater extends Heater {
  constructor(liquid, amount, temperature) {
    super(liquid)
    this.amount = amount
    this.amountUnit = units.miliLiters
    this.temperature = temperature
    this.temperatureUnit = units.temperature
  }
  heatUpLiquid() {
    return (`${super.heatUpLiquid},${this.amount},${this.amountUnit},${this.temperature},${this.temperatureUnit}`)
  }
}

class MilkHeater extends Heater {
  constructor(liquid, amount, temperature) {
    super(liquid)
    this.amount = amount
    this.amountUnit = units.miliLiters
    this.temperature = temperature
    this.temperatureUnit = units.temperature
  }
  heatUpLiquid() {
    return (`${super.heatUpLiquid},${this.amount},${this.amountUnit},${this.temperature},${this.temperatureUnit}`)
  }
}

async function makeCoffee() {
  try {
    Object.assign(coffee, { coffeeType: options.coffee })
    if (coffee.coffeeType === undefined) {
      const grindDefault = new GrainGrinder(defaultGrinderSettings.time, defaultGrinderSettings.amount, defaultGrinderSettings.fineness)
      console.log(grindDefault)
    }
    if (coffeeOptions.has(coffee.coffeeType)) {
      console.log(coffee)
      const initializationValues = coffeeOptions.get(coffee.coffeeType)
      const grind = new GrainGrinder(initializationValues.grindTime, initializationValues.grains, initializationValues.grindFineness)
      const grindComplete = await timeNeededToInitialize(grind)
      console.log(grindComplete)
      if (options.milk !== 'no-milk') {
        const passMilk = new MilkReservoire(units.milk, initializationValues.milk)
        const passMilkComplete = await timeNeededToInitialize(passMilk)
        console.log(passMilkComplete)
        const heatUpMilk = new MilkHeater(units.milk, initializationValues.milk, initializationValues.milkTemperature)
        const heatUpMilkComplete = await timeNeededToInitialize(heatUpMilk)
        console.log(heatUpMilkComplete)
      }
      const passWater = new WaterReservoire(units.water, initializationValues.water)
      const passWaterComplete = await timeNeededToInitialize(passWater)
      console.log(passWaterComplete)
      const heatUpWater = new WaterHeater(units.water, initializationValues.milk, initializationValues.waterTemperature)
      const heatUpWaterComplete = await timeNeededToInitialize(heatUpWater)
      console.log(heatUpWaterComplete)
      const addedMilk = await addMilkToCoffee(initializationValues);
      const milkCheck = addedMilk === 0 ? true : true;
      console.log(coffee)
      const addedGrains = await addCoffeeGrainsToCoffee(initializationValues);
      console.log(coffee)
      const addedWater = await addWaterToCoffee(initializationValues);
      console.log(coffee)
      const addedSugar = await addSugarToCoffee(initializationValues);
      console.log(coffee)
      const sugarCheck = addedSugar === 0 ? true : true;
      if (milkCheck && addedGrains && addedWater && sugarCheck) {
        Object.assign(coffee,
          {
            error: null
          })
      }
      console.log(coffee)
      return coffee
    } else {
      console.log("Please select one of the available coffees")
    }
  } catch (error) {
    console.error(error)
  }
}

async function addMilkToCoffee(value) {
  const milkOptions = new Map([
    ['with-milk', value.milk],
    ['double-milk', value.milk * 2],
    ['no-milk', 0]
  ])
  if (milkOptions.has(options.milk)) {
    const selectedAmount = milkOptions.get(options.milk)
    Object.assign(coffee,
      {
        milk: selectedAmount, milkUnit: value.milkUnit
      })
  } else {
    Object.assign(coffee,
      {
        milk: value.milk,
        milkUnit: value.milkUnit
      })
  }
  return await timeNeededToAdd(coffee.milk, coffee.milkUnit)
}

async function addCoffeeGrainsToCoffee(value) {
  Object.assign(coffee,
    {
      grains: value.grains,
      grainsUnit: value.grainsUnit
    })
  return await timeNeededToAdd(coffee.grains, coffee.grainsUnit)
}

async function addWaterToCoffee(value) {
  Object.assign(coffee,
    {
      water: value.water,
      waterUnit: value.waterUnit
    })
  return await timeNeededToAdd(coffee.water, coffee.waterUnit)
}

async function addSugarToCoffee(value) {
  if (sugarAmountOptions.has(options.sugarAmount)) {
    const selectedAmount = sugarAmountOptions.get(options.sugarAmount)
    Object.assign(coffee,
      {
        sugar: selectedAmount,
        sugarUnit: value.sugarUnit
      })
  } else {
    Object.assign(coffee,
      {
        sugar: value.sugar,
        sugarUnit: value.sugarUnit
      })
  }
  if (coffee.sugar !== 0) {
    if (sugarTypeOptions.has(options.sugarType)) {
      const selectedType = sugarTypeOptions.get(options.sugarType)
      Object.assign(coffee,
        {
          sugarType: selectedType
        })
    } else {
      Object.assign(coffee,
        {
          sugarType: value.sugarType
        })
    }
  } else {
    Object.assign(coffee,
      {
        sugarType: 'No Sugar'
      })
  }
  return await timeNeededToAdd(coffee.sugar, coffee.sugarUnit)
}

async function timeNeededToAdd(task, unit) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(task, unit);
    }, timeOutTime.addingTime);
  });
}

async function timeNeededToInitialize(task) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(task);
    }, timeOutTime.initializationTime);
  });
}

makeCoffee()