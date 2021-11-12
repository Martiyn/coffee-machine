let coffee = new Object()
const espressoSmall = "espresso-small"
const espressoMedium = "espresso-medium"
const espressoLarge = "espresso-large"
const capuccino = "capuccino"

const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c <coffee>")
  .option("c", { alias: "coffee", describe: "Your coffee", type: "string", demandOption: true })
  .argv;

async function makeCoffee() {
  try {
    coffee.coffeeType = options.coffee
    if (coffee.coffeeType === capuccino || coffee.coffeeType === espressoSmall || coffee.coffeeType === espressoMedium || coffee.coffeeType === espressoLarge) {
      console.log(coffee)
      const addedMilk = await addMilkToCoffee();
      console.log(coffee)
      const addedGrains = await addCoffeeGrainsToCoffee();
      console.log(coffee)
      const addedWater = await addWaterToCoffee();
      console.log(coffee)
      if (addedMilk && addedGrains && addedWater) {
        coffee.error = null
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
  if (coffee.coffeeType === espressoSmall) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.milkMl = '0.2ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoMedium) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.milkMl = '0.5ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoLarge) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.milkMl = '0.8ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === capuccino) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.milkMl = '0.4ml');
      }, 2000);
    });
  }
}

async function addCoffeeGrainsToCoffee() {
  if (coffee.coffeeType === espressoSmall) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.coffeeAmt = '5mg');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoMedium) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.coffeeAmt = '7mg');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoLarge) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.coffeeAmt = '10mg');
      }, 2000);
    });
  }
  if (coffee.coffeeType === capuccino) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.coffeeAmt = '12mg');
      }, 2000);
    });
  }
}

async function addWaterToCoffee() {
  if (coffee.coffeeType === espressoSmall) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.waterMl = '0.5ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoMedium) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.waterMl = '0.7ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === espressoLarge) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.waterMl = '1ml');
      }, 2000);
    });
  }
  if (coffee.coffeeType === capuccino) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(coffee.waterMl = '0.9ml');
      }, 2000);
    });
  }
}

makeCoffee()