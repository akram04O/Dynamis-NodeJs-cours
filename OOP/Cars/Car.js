
class Car {
    constructor(body, wheels, engine = new Engine()) { 
        this.body = body;
        this.wheels = wheels;
        this.engine = engine;
    }

    getDetails() {
        return `Car with ${this.body} body and ${this.wheels} wheels.`;
    }

    startEngine() {
        this.engine.start();
    }

    stopEngine() {
        this.engine.stop();
    }
}

class Engine {
    constructor() {
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        console.log("Engine started.");
    }

    stop() {
        this.isRunning = false;
        console.log("Engine stopped.");
    }
}


const myCar = new Car("sedan", 4); 
console.log(myCar.getDetails());   
myCar.startEngine();              
myCar.stopEngine();               

export default Car;
