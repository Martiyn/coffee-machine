let coffee = new Object();

const units = {
  seconds: 'seconds',
  temperature: 'degrees celsius',
  miliLiters: 'Ml',
  miliGrams: 'Mg',
  milk: 'Milk',
  water: 'Water'
}

const coffeeOptions = new Map([
  ['espresso-small',
    { grindTime: 5, grindFineness: 'semi-fine', milkTemperature: 250, waterTemperature: 200, milk: 5, milkUnit: units.miliLiters, grains: 2, grainsUnit: units.miliGrams, water: 4, waterUnit: units.miliLiters }],
  ['espresso-medium',
    { grindTime: 4, grindFineness: 'fine', milkTemperature: 270, waterTemperature: 220, milk: 3, milkUnit: units.miliLiters, grains: 4, grainsUnit: units.miliGrams, water: 5, waterUnit: units.miliLiters }],
  ['espresso-large',
    { grindTime: 6, grindFineness: 'wholeground', milkTemperature: 300, waterTemperature: 250, milk: 6, milkUnit: units.miliLiters, grains: 7, grainsUnit: units.miliGrams, water: 6, waterUnit: units.miliLiters }],
  ['capuccino',
    { grindTime: 3, grindFineness: 'ground', milkTemperature: 240, waterTemperature: 190, milk: 4, milkUnit: units.miliLiters, grains: 3, grainsUnit: units.miliGrams, water: 4, waterUnit: units.miliLiters }]
])

const timeOutTime = 2000;
const defaultGrinderSettings = {
  time: 6,
  amount: 5,
  fineness: 'fine'
}
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c <coffee>")
  .option("c", { alias: "coffee", describe: "Your coffee", type: "string", demandOption: false })
  .argv;

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
      console.log(grind)
      const passMilk = new MilkReservoire(units.milk, initializationValues.milk)
      console.log(passMilk)
      const passWater = new WaterReservoire(units.water, initializationValues.water)
      console.log(passWater)
      let heatUpMilk = new MilkHeater(units.milk, initializationValues.milk, initializationValues.milkTemperature)
      console.log(heatUpMilk)
      let heatUpWater = new WaterHeater(units.water, initializationValues.milk, initializationValues.waterTemperature)
      console.log(heatUpWater)
      const addedMilk = await addMilkToCoffee(initializationValues);
      console.log(coffee)
      const addedGrains = await addCoffeeGrainsToCoffee(initializationValues);
      console.log(coffee)
      const addedWater = await addWaterToCoffee(initializationValues);
      console.log(coffee)
      if (addedMilk && addedGrains && addedWater) {
        Object.assign(coffee, { error: null })
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
  Object.assign(coffee, { milk: value.milk }, { milkUnit: value.milkUnit })
  return await timeRequired(coffee.milk, coffee.milkUnit)
}

async function addCoffeeGrainsToCoffee(value) {
  Object.assign(coffee, { grains: value.grains }, { grainsUnit: value.grainsUnit })
  return await timeRequired(coffee.grains, coffee.grainsUnit)
}

async function addWaterToCoffee(value) {
  Object.assign(coffee, { water: value.water }, { waterUnit: value.waterUnit })
  return await timeRequired(coffee.water, coffee.waterUnit)
}

async function timeRequired(task, unit) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(task, unit);
    }, timeOutTime);
  });
}

makeCoffee()