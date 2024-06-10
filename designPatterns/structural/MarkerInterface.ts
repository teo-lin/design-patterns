// The Marker Interface
interface Serializable {
  getName(): unknown;
  getPrice(): unknown;
}

// Class implementing the Marker Interface
class Car implements Serializable {
  constructor(private name: string, private price: number) {}

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

// Function to serialize objects that implement the Serializable Marker Interface
function serialize(obj: Serializable): string {
  if (isSerializable(obj)) {
    return JSON.stringify({ name: obj.getName(), price: obj.getPrice() });
  } else {
    throw new Error('Object cannot be serialized.');
  }
}

// Type guard to check if an object is serializable
function isSerializable(obj: any): obj is Serializable {
  return (
    typeof obj.getName === 'function' && typeof obj.getPrice === 'function'
  );
}

// Usage
const product = new Car('Laptop', 999);
const serializedProduct = serialize(product);
const nonStandardProduct = { name: 'Laptop', price: 'not available' };
// const serializedNonStandardProduct = serialize(nonStandardProduct);// will throw
console.log(serializedProduct);
