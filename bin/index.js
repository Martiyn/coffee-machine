let coffee = new Object();

let coffeeOptions = new Map([
  ['espresso-small',
    { grindTime: 5, grindFineness: 'semi-fine', temperature: 200, milkMl: 5, grainsGr: 2, waterMl: 4 }],
  ['espresso-medium',
    { grindTime: 4, grindFineness: 'fine', temperature: 220, milkMl: 3, grainsGr: 4, waterMl: 5 }],
  ['espresso-large',
    { grindTime: 6, grindFineness: 'wholeground', temperature: 250, milkMl: 6, grainsGr: 7, waterMl: 6 }],
  ['capuccino',
    { grindTime: 3, grindFineness: 'ground', temperature: 190, milkMl: 4, grainsGr: 3, waterMl: 4 }]
])
const units = {
  seconds: 'seconds',
  temperature: 'degrees celsius',
  miliLiters: 'Ml'
}
const timeOutTime = 2000;
const defaultGrinderSettings = {
  time: 20,
  fineness: 'fine'
}
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c <coffee>")
  .option("c", { alias: "coffee", describe: "Your coffee", type: "string", demandOption: true })
  .argv;

async function makeCoffee() {
  try {
    Object.assign(coffee, { coffeeType: options.coffee })
    if (coffeeOptions.has(coffee.coffeeType)) {
      console.log(coffee)
      const addedMilk = await addMilkToCoffee();
      console.log(coffee)
      const addedGrains = await addCoffeeGrainsToCoffee();
      console.log(coffee)
      const addedWater = await addWaterToCoffee();
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

async function addMilkToCoffee() {
  let milk = coffeeOptions.get(coffee.coffeeType)
  Object.assign(coffee, { milkMl: milk.milkMl })
  const process = await timeRequired(coffee.milkMl)
  return process
}

async function addCoffeeGrainsToCoffee() {
  let grains = coffeeOptions.get(coffee.coffeeType)
  Object.assign(coffee, { grainsGr: grains.grainsGr })
  const process = await timeRequired(coffee.grainsGr)
  return process
}

async function addWaterToCoffee() {
  let water = coffeeOptions.get(coffee.coffeeType)
  Object.assign(coffee, { waterMl: water.waterMl })
  const process = await timeRequired(coffee.waterMl)
  return process
}

async function timeRequired(task) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(task);
    }, timeOutTime);
  });
}

makeCoffee()

//'-----------------------------------------CLASSES----------------------------------------------------------'
// GRINDER CLASS
class Grinder {
  constructor(time, fineness) {
    this.time = time
    this.timeUnit = units.seconds
    this.fineness = fineness
  }
  grind() {
    return ('${this.time},${this.timeUnit},${this.fineness}')
  }
}

let grinder = new Grinder(defaultGrinderSettings.time, defaultGrinderSettings.fineness)

console.log(grinder)

// RESERVOIRE CLASS
class Reservoire {
  constructor(passAmount) {
    this.passAmount = passAmount
  }
  passToHeater() {
    return ('${this.passAmount}')
  }
}

class WaterReservoire extends Reservoire {
  constructor(passAmount, liquid) {
    super(passAmount)
    this.waterUnit = units.miliLiters
    this.liquid = liquid
  }
  passToHeater() {
    return ('${super.passToHeater},${this.waterUnit},${this.liquid}')
  }
}

class MilkReservoire extends Reservoire {
  constructor(passAmount, liquid) {
    super(passAmount)
    this.milkUnit = units.miliLiters
    this.liquid = liquid
  }
  passToHeater() {
    return ('${super.passToHeater},${this.milkUnit},${this.liquid}')
  }
}

let milkRes = new MilkReservoire(1, 'milk')
let waterRes = new WaterReservoire(2, 'water')

console.log(milkRes)
console.log(waterRes)

// HEATER CLASS
class Heater {
  constructor(liquid) {
    this.liquid = liquid
  }
  heatUpLiquid() {
    return ('${this.liquid}')
  }
}

class WaterHeater extends Heater {
  constructor(liquid, temperature) {
    super(liquid)
    this.temperature = temperature
    this.temperatureUnit = units.temperature
  }
  heatUpLiquid() {
    return ('${super.heatUpLiquid},${temperature},${this.temperatureUnit}')
  }
}

class MilkHeater extends Heater {
  constructor(liquid, temperature) {
    super(liquid)
    this.temperature = temperature
    this.temperatureUnit = units.temperature
  }
  heatUpLiquid() {
    return ('${super.heatUpLiquid},${temperature},${this.temperatureUnit}')
  }
}

let waterHot = new WaterHeater('water', 500)
let milkHot = new MilkHeater('milk', 700)

console.log(waterHot)
console.log(milkHot)