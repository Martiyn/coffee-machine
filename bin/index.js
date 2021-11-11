let coffee = new Object()


async function makeCoffee(){
    try{
     const selectedCoffee = await selectCoffeeType()
     console.log(coffee)
     const addedMilk = await addMilkToCoffee();
     console.log(coffee)
     const addedGrains = await addCoffeeGrainsToCoffee();
     console.log(coffee)
     const addedWater = await addWaterToCoffee();
     console.log(coffee)
     if (selectedCoffee && addedMilk && addedGrains && addedWater) {
         coffee.error = null
     }
     console.log(coffee)
     return coffee
    } catch (error) {
        catchError(error, {
          prodMsg: "Неуспешно приготвяне на кафе"
        });
      }
}


async function selectCoffeeType(){
    coffee.coffeeType = "Coffee with milk"
    return coffee
}

async function addMilkToCoffee(){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(coffee.milkMl = '0.5ml');
        }, 2000);
      });
}

async function addCoffeeGrainsToCoffee(){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(coffee.coffeeAmt = '10mg');
        }, 2000);
      });
}

async function addWaterToCoffee(){
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(coffee.waterMl = '1ml');
        }, 2000);
      });
}

makeCoffee()