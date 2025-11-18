/* ---(Problem -> 1)--- */

const formatValue = (value : string | number | boolean): string | number | boolean =>{
    if(typeof value === "number"){
        return value*10;
    }
    else if (typeof value === "string") {
        return value.toUpperCase();
    } 
    else {
        return !value;
    }
    
};




/* ---(Problem -> 2)--- */

function getLength <T>(value : T): number | undefined {
    if(Array.isArray(value)){
        return value.length;
    }
    else if (typeof value === "string") {
        return value.length;
    } 
    return undefined;
}


/* ---(Problem -> 3)--- */

class Person{
    name : string;
    age : number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}



/* ---(Problem -> 4)--- */

type Item = {
    title: string;
    rating: number;
};

function filterByRating(items: Item[]): Item[] {
    return items.filter(item => item.rating >= 4);
}


/* ---(Problem -> 5)--- */

type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

function filterActiveUsers(users: User[]): User[] {
    return users.filter(user => user.isActive);
}



/* ---(Problem -> 6)--- */

interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

function printBookDetails(book: Book): void {
    const availability = book.isAvailable ? 'Yes' : 'No';
    console.log(
        `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`
    );
}



/* ---(Problem -> 7)--- */

function getUniqueValues(array1: string[] | number[], array2: string[] | number[]) {
    let sz1 = array1.length;
    let sz2 = array2.length;

    let result : string[] | number[] = [];

    for (let i = 0; i < array1.length; i++) {
        result[i] = array1[i];
    }

    let insertIndex = result.length;

    for (let i = 0; i < array2.length; i++) {
        let found = false;

        for (let j = 0; j < result.length; j++) {
            if (array2[i] === result[j]) {
                found = true;
                break;
            }
        }

        if (!found) {
            result[insertIndex] = array2[i]; 
            insertIndex++;                   
        }
    }


    return result;
}



/* ---(Problem -> 8)--- */

type Product = {
    name: string;
    price: number;
    quantity: number;
    discount?: number; 
};

function calculateTotalPrice(products: Product[]): number {
    if (products.length === 0) return 0;

    return products
        .map(product => {
            const basePrice = product.price * product.quantity;

            if (product.discount !== undefined) {
                const discountAmount = basePrice * (product.discount / 100);
                return basePrice - discountAmount;
            }

            return basePrice;
        })
        .reduce((total, value) => total + value, 0);
}


