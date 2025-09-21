class Book {
    constructor(title, author, ISBN, status = "available") {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.status = status;
        this.isAvailable = status === "available";
    }

    isBorrow() {
        if (this.isAvailable) {
            this.isAvailable = false;
            this.status = "not available";
            return `${this.title} has been borrowed.`;
        } else {
            return `${this.title} is already borrowed.`;
        }
    }

    isReturn() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            this.status = "available";
            return `${this.title} has been returned.`;
        } else {
            return `${this.title} was not borrowed.`;
        }
    }

    checkStatus() {
        return `${this.title} by ${this.author} (ISBN: ${this.ISBN}) - Status: ${this.status}`;
    }
}

class Library {
    static totalBooks = 0;

    constructor(libraryName) {
        this.libraryName = libraryName;
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        Library.totalBooks++;
        return `${book.title} by ${book.author} added to ${this.libraryName}`;
    }

    borrowBook(isbn) {
        const book = this.books.find(b => b.ISBN === isbn);
        if (book) {
            return book.isBorrow();
        } else {
            return `The book with ISBN: ${isbn} was not found in ${this.libraryName}.`;
        }
    }

    returnBook(isbn) {
        const book = this.books.find(b => b.ISBN === isbn);
        if (book) {
            return book.isReturn();
        } else {
            return `The book with ISBN: ${isbn} was not found in ${this.libraryName}.`;
        }
    }

    listBooks() {
        return this.books.map(book => book.checkStatus()).join("\n");
    }

    static getTotalBooksNumber() {
        return Library.totalBooks;
    }
}

// Example usage
const library1 = new Library("Central Library");
const library2 = new Library("Community Library");

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "12345");
const book2 = new Book("1984", "George Orwell", "67890");
const book3 = new Book("The Catcher in the Rye", "J.D. Salinger", "11223");

console.log(library1.addBook(book1));
console.log(library1.addBook(book2));
console.log(library2.addBook(book3));

console.log("\n📚 Books in Central Library:");
console.table(library1.listBooks());

console.log("\n" + library1.borrowBook("12345"));
console.log(library1.borrowBook("12345"));
console.log(library1.returnBook("12345"));

console.log("\n📊 Total books across all libraries: " + Library.getTotalBooksNumber());
