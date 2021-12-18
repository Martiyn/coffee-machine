const values = require('./Values')

class Water {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = values.units.miliLiters
      this.temperature = values.defaultLiquidTemperature.water
      this.temperatureUnit = values.units.temperature
    }
  }

  class WaterReservoire {
    constructor(liquid) {
      this.totalAmount = values.amountInReservoire.water
      this.liquid = liquid
      this.amountLeft = this.totalAmount - this.liquid.amount
      this.amountUnit = values.units.miliLiters
    }
  }

  class WaterHeater {
    constructor(liquid, temperature) {
      this.liquid = liquid.liquid
      this.liquid.temperature = temperature
    }
  }

  
  module.exports = { Water, WaterReservoire, WaterHeater }