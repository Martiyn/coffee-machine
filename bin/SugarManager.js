const values = require('./Values')

class Sugar {
    constructor(type, amount) {
      this.type = type
      this.amount = amount
      this.amountUnit = values.units.miliGrams
    }
  }

  class WhiteSugarReservoire {
    constructor(material) {
      this.totalAmount = values.amountInReservoire.whiteSugar
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = values.units.miliGrams
    }
  }
  class BrownSugarReservoire {
    constructor(material) {
      this.totalAmount = values.amountInReservoire.brownSugar
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = values.units.miliGrams
    }
  }

  module.exports = { Sugar, WhiteSugarReservoire, BrownSugarReservoire }