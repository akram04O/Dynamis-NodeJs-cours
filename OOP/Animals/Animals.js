class animals {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return `${this.name} makes a sound.`;
    }
}

class dog extends animals {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    fetch() {
        return `${this.name} is fetching the ball!`;
    }
}

class cat extends animals {
    constructor(name, color) {
        super(name);
        this.color = color;
    }

    scratch() {
        return `${this.name} scratches with its nails.`;
    }
}

const myCat = new cat("Linda", "White");
console.log(myCat.makeSound());
console.log(myCat.scratch());

const myDog = new dog("Max", "Brown");
console.log(myDog.makeSound());
console.log(myDog.fetch());