class Person {
     name: string;
     colleagues: Person[] = [];
     save(): void { 
         console.log('saving to database');
     }
     load(): void {
         console.log('loading from database');
     }
}

class Angel {
    public execute(): void {
        const person = new Person();
        person.name = 'John';
        person.colleagues.push(new Person());
        person.colleagues.push(new Person());

        person.save(); // Lazy: saves only current entity, Eager: saves colleagues
        // Usually implemented via accessors
        // Lazy load only loads the current person, eager load, loads his/her colleagues as well
    }
}