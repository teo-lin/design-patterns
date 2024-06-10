// Flyweight interface
interface Sword {
    use(): void;
}

// Concrete flyweight class representing a sword
class MagicSword implements Sword {
    constructor(
        private meshPath: string, private texturePath: string, // Intrinsic properties (large assets shared among all Magic swords) 
        private damage: number, private durability: number, private price: number // Extrinsic properties (state unique to each sword)
    ) {}

    use(): void {
        console.log(`Using a sword with shape: ${this.meshPath}, texture: ${this.texturePath}. Damage: ${this.damage}, Durability: ${this.durability}, Price: ${this.price}`);
    }
}

// Flyweight factory
class SwordFactory {
    constructor(private sharedShapePath: string, private sharedTexturePath: string) {}

    newSword(damage: number, durability: number, price: number): Sword {
        return new MagicSword(this.sharedShapePath, this.sharedTexturePath, damage, durability, price);
    }
}

// Client code - using swords with different stats
const swordFactory = new SwordFactory('meshes/sword.nif', 'textures/sword.tif'); // Shared assets
const swordsData: [number, number, number][] = [
    [20, 50, 100],
    [15, 40, 80],
    [25, 60, 120],
    // More sword data...
];
swordsData.forEach(([damage, durability, price]) => {
    const sword = swordFactory.newSword(damage, durability, price);
    sword.use();
});
