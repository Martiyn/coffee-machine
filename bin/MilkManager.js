const values = require('./Values')

class Milk {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = values.units.miliLiters
      this.temperature = values.defaultLiquidTemperature.milk
      this.temperatureUnit = values.units.temperature
    }
  }

  class MilkReservoire {
    constructor(liquid) {
      this.totalAmount = values.amountInReservoire.milk
      this.liquid = liquid
      this.amountLeft = this.totalAmount - this.liquid.amount
      this.amountUnit = values.units.miliLiters
    }
  }

  class MilkHeater {
    constructor(liquid, temperature) {
      this.liquid = liquid.liquid
      this.liquid.temperature = temperature
    }
  }

  module.exports = { Milk, MilkReservoire, MilkHeater }