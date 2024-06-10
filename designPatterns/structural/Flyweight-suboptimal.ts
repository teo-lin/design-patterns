// Example of a simplified implementation of the Flyweight pattern for characters in a text editor
class CharacterFlyweight {
    private char: string;
    private font: string;
    private size: number;

    constructor(char: string, font: string, size: number) {
        this.char = char;
        this.font = font;
        this.size = size;
    }

    public display(): void {
        console.log(`Character: ${this.char}, Font: ${this.font}, Size: ${this.size}`);
    }
}

class CharacterFlyweightFactory {
    private flyweights: { [key: string]: CharacterFlyweight } = {};

    public getCharacter(char: string, font: string, size: number): CharacterFlyweight {
        const key = `${char}-${font}-${size}`;
        if (!this.flyweights[key]) {
            this.flyweights[key] = new CharacterFlyweight(char, font, size);
        }
        return this.flyweights[key];
    }

    public getTotalFlyweights(): number {
        return Object.keys(this.flyweights).length;
    }
}

// Example usage
const factory = new CharacterFlyweightFactory();
const charA = factory.getCharacter('A', 'Arial', 12);
const charB = factory.getCharacter('B', 'Times New Roman', 14);
const charC = factory.getCharacter('A', 'Arial', 12); // Reusing existing flyweight

charA.display(); // Output: Character: A, Font: Arial, Size: 12
charB.display(); // Output: Character: B, Font: Times New Roman, Size: 14
charC.display(); // Output: Character: A, Font: Arial, Size: 12

console.log('Total number of flyweights created:', factory.getTotalFlyweights()); // Output: Total number of flyweights created: 2
