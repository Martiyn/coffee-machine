let coffee = new Object();

let coffeeOptions = new Map([
  ['espresso-small'],
  ['espresso-medium'],
  ['espresso-large'],
  ['capuccino']
])
const timeOutTime = 2000;
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
  switch (coffee.coffeeType) {
    case "espresso-small":
      Object.assign(coffee, { milkMl: '0.2ml' })
      break;

    case "espresso-medium":
      Object.assign(coffee, { milkMl: '0.5ml' })
      break;

    case "espresso-large":
      Object.assign(coffee, { milkMl: '0.8ml' })
      break;

    case "capuccino":
      Object.assign(coffee, { milkMl: '0.7ml' })
      break;

    default:
      break;
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(coffee.milkMl);
    }, timeOutTime);
  });
}

async function addCoffeeGrainsToCoffee() {
  switch (coffee.coffeeType) {
    case 'espresso-small':
      Object.assign(coffee, { coffeeAmt: '5mg' })
      break;

    case 'espresso-medium':
      Object.assign(coffee, { coffeeAmt: '7mg' })
      break;

    case 'espresso-large':
      Object.assign(coffee, { coffeeAmt: '10mg' })
      break;

    case 'capuccino':
      Object.assign(coffee, { coffeeAmt: '9mg' })
      break;

    default:
      break;
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(coffee.coffeeAmt);
    }, timeOutTime);
  });
}

async function addWaterToCoffee() {
  switch (coffee.coffeeType) {
    case 'espresso-small':
      Object.assign(coffee, { waterMl: '0.5ml' })
      break;

    case 'espresso-medium':
      Object.assign(coffee, { waterMl: '0.7ml' })
      break;

    case 'espresso-large':
      Object.assign(coffee, { waterMl: '1ml' })
      break;

    case 'capuccino':
      Object.assign(coffee, { waterMl: '0.9ml' })
      break;

    default:
      break;
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(coffee.waterMl);
    }, timeOutTime);
  });
}

makeCoffee()