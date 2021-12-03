let coffee = new Object();

const inquirer = require('inquirer');
const questions = () => {
  return Promise.resolve([
    {
      type: 'list',
      name: 'typeOfCoffee',
      message: 'What coffee would you like?',
      choices: ['espresso-small', 'espresso-medium', 'espresso-large', 'capuccino']
    },
    {
      type: 'list',
      name: 'amountOfMilk',
      message: 'How much milk would you like?',
      choices: ['with-milk', 'double-milk', 'no-milk']
    },
    {
      type: 'list',
      name: 'amountOfSugar',
      message: 'How much sugar would you like?',
      choices: ['with-sugar', 'medium-sugar', 'little-sugar', 'no-sugar']
    },
    {
      type: 'list',
      name: 'typeOfSugar',
      message: 'What type of sugar would you like?',
      choices: ['white-sugar', 'brown-sugar']
    }
  ])
}

async function myCoffee() {
  let questionsList = await questions()
  let answers = await inquirer.prompt(questionsList)

  const units = {
    seconds: 'seconds',
    temperature: 'degrees celsius',
    miliLiters: 'Ml',
    miliGrams: 'Mg',
    milk: 'Milk',
    water: 'Water'
  }

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

  const defaultSugarAmountOption = sugarAmountOptions.get('no-sugar')
  const defaultSugarTypeOption = sugarTypeOptions.get('white-sugar')
  const selectedSugarAmount = sugarAmountOptions.get(answers.amountOfSugar)
  const validSugarAmountOption = sugarAmountOptions.has(answers.amountOfSugar) ? selectedSugarAmount : defaultSugarAmountOption
  const selectedSugarType = sugarTypeOptions.get(answers.typeOfSugar)
  const validSugarTypeOption = sugarTypeOptions.has(answers.typeOfSugar) ? selectedSugarType : defaultSugarTypeOption

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

  const initializationValues = coffeeOptions.get(answers.typeOfCoffee)

  const milkAmountOptions = new Map([
    ['with-milk', initializationValues.milk],
    ['double-milk', initializationValues.milk * 2],
    ['no-milk', 0]
  ])

  const selectedMilkAmount = milkAmountOptions.get(answers.amountOfMilk)
  const validMilkAmountOption = milkAmountOptions.has(answers.amountOfMilk) ? selectedMilkAmount : initializationValues.milk

  const timeOutTime = {
    initializationTime: 3000,
    addingTime: 2000
  }
  const defaultGrinderSettings = {
    time: 6,
    amount: 5,
    fineness: 'fine'
  }

  const defaultLiquidTemperature = {
    milk: 25,
    water: 23
  }

  const amountInReservoire = {
    milk: 200,
    water: 200,
    grains: 250,
    whiteSugar: 150,
    brownSugar: 150
  }

  // GRAIN MANAGEMENT
  class Grains {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = units.miliGrams
      this.fineness = 'Whole'
    }
  }

  class GrainsReservoire {
    constructor(material) {
      this.totalAmount = amountInReservoire.grains
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = units.miliGrams
    }
  }

  class GrainGrinder {
    constructor(timeToGrind, material, fineness) {
      this.timeToGrind = timeToGrind
      this.timeUnit = units.seconds
      this.material = material.material
      this.material.fineness = fineness
    }
  }

  async function addCoffeeGrainsToCoffee(value) {
    Object.assign(coffee,
      {
        grains: value.material.amount,
        grainsUnit: value.material.amountUnit
      })
    return await timeNeededToAdd(coffee.grains, coffee.grainsUnit)
  }


  //MILK MANAGEMENT
  class Milk {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = units.miliLiters
      this.temperature = defaultLiquidTemperature.milk
      this.temperatureUnit = units.temperature
    }
  }

  class MilkReservoire {
    constructor(liquid) {
      this.totalAmount = amountInReservoire.milk
      this.liquid = liquid
      this.amountLeft = this.totalAmount - this.liquid.amount
      this.amountUnit = units.miliLiters
    }
  }

  class MilkHeater {
    constructor(liquid, temperature) {
      this.liquid = liquid.liquid
      this.liquid.temperature = temperature
    }
  }

  async function addMilkToCoffee(value) {
    Object.assign(coffee,
      {
        milk: value.liquid.amount,
        milkUnit: value.liquid.amountUnit
      })
    return await timeNeededToAdd(coffee.milk, coffee.milkUnit)
  }

  //WATER MANAGEMENT
  class Water {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = units.miliLiters
      this.temperature = defaultLiquidTemperature.water
      this.temperatureUnit = units.temperature
    }
  }

  class WaterReservoire {
    constructor(liquid) {
      this.totalAmount = amountInReservoire.water
      this.liquid = liquid
      this.amountLeft = this.totalAmount - this.liquid.amount
      this.amountUnit = units.miliLiters
    }
  }

  class WaterHeater {
    constructor(liquid, temperature) {
      this.liquid = liquid.liquid
      this.liquid.temperature = temperature
    }
  }

  async function addWaterToCoffee(value) {
    Object.assign(coffee,
      {
        water: value.liquid.amount,
        waterUnit: value.liquid.amountUnit
      })
    return await timeNeededToAdd(coffee.water, coffee.waterUnit)
  }

  //SUGAR MANAGEMENT
  class Sugar {
    constructor(type, amount) {
      this.type = type
      this.amount = amount
      this.amountUnit = units.miliGrams
    }
  }

  class WhiteSugarReservoire {
    constructor(material) {
      this.totalAmount = amountInReservoire.whiteSugar
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = units.miliGrams
    }
  }
  class BrownSugarReservoire {
    constructor(material) {
      this.totalAmount = amountInReservoire.brownSugar
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = units.miliGrams
    }
  }

  async function addSugarToCoffee(value) {
    Object.assign(coffee,
      {
        sugar: value.material.amount,
        sugarUnit: value.material.amountUnit,
        type: value.material.type
      })
    return await timeNeededToAdd(coffee.sugar, coffee.sugarUnit)
  }

  //TIME MANAGEMENT
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

  async function makeCoffee() {
    try {
      Object.assign(coffee, { coffeeType: answers.typeOfCoffee })
      if (coffee.coffeeType === undefined) {
        const grindDefault = new GrainGrinder(defaultGrinderSettings.time, defaultGrinderSettings.amount, defaultGrinderSettings.fineness)
        console.log(grindDefault)
      }
      if (coffeeOptions.has(coffee.coffeeType)) {
        console.log(coffee)

        //ADDING THE GRAINS TO THE COFFEE
        const grains = new Grains(initializationValues.grains)
        const passGrains = new GrainsReservoire(grains)
        const passGrainsComplete = await timeNeededToInitialize(passGrains)
        console.log(passGrainsComplete)
        const grind = new GrainGrinder(initializationValues.grindTime, passGrains, initializationValues.grindFineness)
        const grindComplete = await timeNeededToInitialize(grind)
        console.log(grindComplete)
        const addedGrains = await addCoffeeGrainsToCoffee(grindComplete);
        console.log(coffee)
        console.log('Successfully added grains to coffee')

        //ADDING THE MILK TO THE COFFEE
        const milk = new Milk(validMilkAmountOption)
        let addedMilk;
        if (answers.amountOfMilk !== 'no-milk') {
          const passMilk = new MilkReservoire(milk)
          const passMilkComplete = await timeNeededToInitialize(passMilk)
          console.log(passMilkComplete)
          const heatUpMilk = new MilkHeater(passMilk, initializationValues.milkTemperature)
          const heatUpMilkComplete = await timeNeededToInitialize(heatUpMilk)
          console.log(heatUpMilkComplete)
          addedMilk = await addMilkToCoffee(heatUpMilkComplete);
          console.log(coffee)
          console.log('Successfully added milk to coffee')
        }
        const noMilkCheck = addedMilk === undefined || 0 ? true : true;

        //ADDING THE WATER TO THE COFFEE
        const water = new Water(initializationValues.water)
        const passWater = new WaterReservoire(water)
        const passWaterComplete = await timeNeededToInitialize(passWater)
        console.log(passWaterComplete)
        const heatUpWater = new WaterHeater(passWater, initializationValues.waterTemperature)
        const heatUpWaterComplete = await timeNeededToInitialize(heatUpWater)
        console.log(heatUpWaterComplete)
        const addedWater = await addWaterToCoffee(heatUpWaterComplete);
        console.log(coffee)
        console.log('Successfully added water to coffee')

        //ADDING THE SUGAR TO THE COFFEE
        const sugar = new Sugar(validSugarTypeOption, validSugarAmountOption)
        let passSugarComplete;
        let addedSugar;
        if (sugar.amount !== 0) {
          switch (sugar.type) {
            case 'White Sugar':
              const passWhiteSugar = new WhiteSugarReservoire(sugar)
              passSugarComplete = await timeNeededToInitialize(passWhiteSugar)
              console.log(passSugarComplete)
              break;
            case 'Brown Sugar':
              const passBrownSugar = new BrownSugarReservoire(sugar)
              passSugarComplete = await timeNeededToInitialize(passBrownSugar)
              console.log(passSugarComplete)
          }
          addedSugar = await addSugarToCoffee(passSugarComplete)
          console.log(coffee)
          console.log('Successfully added sugar to coffee')
        }
        const noSugarCheck = addedSugar === undefined || 0 ? true : true;

        //DID EVERYTHING SUCCEED
        if (addedMilk || noMilkCheck && addedGrains && addedWater && addedSugar || noSugarCheck) {
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
  await makeCoffee()
}
myCoffee()