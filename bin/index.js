let coffee = new Object();

const values = require('./Values')
const grainsManager = require('./GrainsManager')
const waterManager = require('./WaterManager')
const milkManager = require('./MilkManager')
const sugarManager = require('./SugarManager')
const timeManager = require('./TimeManager')

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
      choices: ['white-sugar', 'brown-sugar'],
      when(answers) {
        return answers.amountOfSugar !== 'no-sugar';
      },
    },
  ])
}

async function myCoffee() {
  let questionsList = await questions()
  let answers = await inquirer.prompt(questionsList)

  const initializationValues = values.coffeeOptions.get(answers.typeOfCoffee)
  const milkAmountOptions = new Map([
    ['with-milk', initializationValues.milk],
    ['double-milk', initializationValues.milk * 2],
    ['no-milk', 0]
  ])
  const selectedMilkAmount = milkAmountOptions.get(answers.amountOfMilk)
  const selectedSugarAmount = values.sugarAmountOptions.get(answers.amountOfSugar)
  const selectedSugarType = values.sugarTypeOptions.get(answers.typeOfSugar)

  async function addCoffeeGrainsToCoffee(value) {
    Object.assign(coffee,
      {
        grains: value.material.amount,
        grainsUnit: value.material.amountUnit
      })
    return await timeManager.timeNeededToAdd(coffee.grains, coffee.grainsUnit)
  }

  async function addWaterToCoffee(value) {
    Object.assign(coffee,
      {
        water: value.liquid.amount,
        waterUnit: value.liquid.amountUnit
      })
    return await timeManager.timeNeededToAdd(coffee.water, coffee.waterUnit)
  }

  async function addMilkToCoffee(value) {
    Object.assign(coffee,
      {
        milk: value.liquid.amount,
        milkUnit: value.liquid.amountUnit
      })
    return await timeManager.timeNeededToAdd(coffee.milk, coffee.milkUnit)
  }

  async function addSugarToCoffee(value) {
    Object.assign(coffee,
      {
        sugar: value.material.amount,
        sugarUnit: value.material.amountUnit,
        type: value.material.type
      })
    return await timeManager.timeNeededToAdd(coffee.sugar, coffee.sugarUnit)
  }


  async function makeCoffee() {
    try {
      Object.assign(coffee, { coffeeType: answers.typeOfCoffee })
      if (values.coffeeOptions.has(coffee.coffeeType)) {
        console.log(coffee)

        //ADDING THE GRAINS TO THE COFFEE
        const grains = new grainsManager.Grains(initializationValues.grains)
        const passGrains = new grainsManager.GrainsReservoire(grains)
        const passGrainsComplete = await timeManager.timeNeededToInitialize(passGrains)
        console.log(passGrainsComplete)
        const grind = new grainsManager.GrainGrinder(initializationValues.grindTime, passGrains, initializationValues.grindFineness)
        const grindComplete = await timeManager.timeNeededToInitialize(grind)
        console.log(grindComplete)
        const addedGrains = await addCoffeeGrainsToCoffee(grindComplete);
        console.log(coffee)
        console.log('Successfully added grains to coffee')

        //ADDING THE WATER TO THE COFFEE
        const water = new waterManager.Water(initializationValues.water)
        const passWater = new waterManager.WaterReservoire(water)
        const passWaterComplete = await timeManager.timeNeededToInitialize(passWater)
        console.log(passWaterComplete)
        const heatUpWater = new waterManager.WaterHeater(passWater, initializationValues.waterTemperature)
        const heatUpWaterComplete = await timeManager.timeNeededToInitialize(heatUpWater)
        console.log(heatUpWaterComplete)
        const addedWater = await addWaterToCoffee(heatUpWaterComplete);
        console.log(coffee)
        console.log('Successfully added water to coffee')

        //ADDING THE MILK TO THE COFFEE
        const milk = new milkManager.Milk(selectedMilkAmount)
        let addedMilk;
        if (selectedMilkAmount !== 'no-milk') {
          const passMilk = new milkManager.MilkReservoire(milk)
          const passMilkComplete = await timeManager.timeNeededToInitialize(passMilk)
          console.log(passMilkComplete)
          const heatUpMilk = new milkManager.MilkHeater(passMilk, initializationValues.milkTemperature)
          const heatUpMilkComplete = await timeManager.timeNeededToInitialize(heatUpMilk)
          console.log(heatUpMilkComplete)
          addedMilk = await addMilkToCoffee(heatUpMilkComplete);
          console.log(coffee)
          console.log('Successfully added milk to coffee')
        }
        const noMilkCheck = addedMilk === undefined || 0 ? true : true;

        //ADDING THE SUGAR TO THE COFFEE
        const sugar = new sugarManager.Sugar(selectedSugarType, selectedSugarAmount)
        let passSugarComplete;
        let addedSugar;
        if (sugar.amount !== 0) {
          switch (sugar.type) {
            case 'White Sugar':
              const passWhiteSugar = new sugarManager.WhiteSugarReservoire(sugar)
              passSugarComplete = await timeManager.timeNeededToInitialize(passWhiteSugar)
              console.log(passSugarComplete)
              break;
            case 'Brown Sugar':
              const passBrownSugar = new sugarManager.BrownSugarReservoire(sugar)
              passSugarComplete = await timeManager.timeNeededToInitialize(passBrownSugar)
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