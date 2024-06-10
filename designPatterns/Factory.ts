// Interfaces
interface CarPartAssembler {
  makePart(): void
}

// Factory
export class CarFactory {
  carPartAssembler(partType: string): CarPartAssembler {
    switch (partType) {
      case 'roof': return new RoofAssembler()
      case 'door': return new DoorAssembler()
      default: throw new Error('Invalid car part type.')
    }
  }
}

// Concrete Classes
class RoofAssembler implements CarPartAssembler {
  makePart() { return 'Car Roof' }
}
class DoorAssembler implements CarPartAssembler {
  makePart() { return 'Car Door' }
} // ...etc


// ------------ Usage:
const factory = new CarFactory()
const roof = factory.carPartAssembler('roof').makePart()
const door = factory.carPartAssembler('door').makePart()

console.log(roof, door)
