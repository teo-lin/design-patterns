// Interfaces
interface Door {
    makePart(): void
}
interface Roof {
    makePart(): void
}
enum Car {
    HONDA,
    MAZDA,
    TESLA,
}

// Abstract Factory (table)
abstract class CarFactory{
    abstract doorAssembler(): Door
    abstract roofAssembler(): Roof
    static brand(key: Car): CarFactory {
        switch (key) {
            case Car.HONDA: return new HondaFactory()
            case Car.MAZDA: return new MazdaFactory()
            case Car.TESLA: return new TeslaFactory()
            default: throw new Error('Invalid car type.')
        }        
    }
}

// Concrete Factories (table rows)
class HondaFactory extends CarFactory{
    doorAssembler() { return new HondaDoor() }    
    roofAssembler() { return new HondaRoof() }
}
class MazdaFactory extends CarFactory{
    doorAssembler() { return new MazdaDoor() }    
    roofAssembler() { return new MazdaRoof() }
}
class TeslaFactory extends CarFactory{
    doorAssembler() { return new TeslaDoor() }    
    roofAssembler() { return new TeslaRoof() }
} // ...etc

// Concrete Products (table cells)
class HondaRoof implements Roof {
    makePart() { return 'Honda Roof' }
}
class HondaDoor implements Door {
    makePart() { return 'Honda Door' }
}
class MazdaRoof implements Roof {
    makePart() { return 'Mazda Roof' }
}
class MazdaDoor implements Door {
    makePart() { return 'Mazda Door' }
}
class TeslaRoof implements Roof {
    makePart() { return 'Tesla Roof' }
}
class TeslaDoor implements Door {
    makePart() { return 'Tesla Door' }
} // ...etc


// ------------ Usage:
const mazdaFactory = CarFactory.brand(Car.MAZDA)
const mazdaRoof = mazdaFactory.roofAssembler().makePart()
const mazdaDoor = mazdaFactory.doorAssembler().makePart()
// ..or:
const hondaRoof = CarFactory.brand(Car.HONDA).roofAssembler().makePart()

console.log(hondaRoof, mazdaRoof, mazdaDoor)
