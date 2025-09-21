class Shape {
    area() {
        return
    }

    perimeter() {
        return
    }
}

class Circle extends Shape {
    constructor(raduis) {
        super();
        this.raduis = raduis;
    }

    area( PI = 3.14) {
        return PI * this.raduis * this.raduis;
    }
    perimeter( PI = 3.14) {
        return 2 * PI * this.raduis;
    }
}
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height
    }

    perimeter() {
        return 2 * (this.width + this.height)
    }
}

const circle = new Circle(5);
console.log("Circle");
console.log(circle.area());
console.log(circle.perimeter());

const rectangle = new Rectangle(4, 5);
console.log("\nRectangle");
console.log(rectangle.area());
console.log(rectangle.perimeter());


