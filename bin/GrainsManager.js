const values = require('./Values')

class Grains {
    constructor(amount) {
      this.amount = amount
      this.amountUnit = values.units.miliGrams
      this.fineness = 'Whole'
    }
  }

  class GrainsReservoire {
    constructor(material) {
      this.totalAmount = values.amountInReservoire.grains
      this.material = material
      this.amountLeft = this.totalAmount - this.material.amount
      this.amountUnit = values.units.miliGrams
    }
  }

  class GrainGrinder {
    constructor(timeToGrind, material, fineness) {
      this.timeToGrind = timeToGrind
      this.timeUnit = values.units.seconds
      this.material = material.material
      this.material.fineness = fineness
    }
  }

  module.exports = { Grains, GrainsReservoire, GrainGrinder }