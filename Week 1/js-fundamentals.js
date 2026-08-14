// Task 1: Standard console outputs
const enrolledUnits = [
    {code:"FIT2095", name:"Full-Stack-Dev", credits: 6},
    {code:"FIT2004", name:"Algo", ASD: 6},
];


//Create a table
// console.table(enrolledUnits)
// console.log()
// /* Creates an exapandable heading
// ▼ Student Information
//   Item 1
//   Item 2
//   Item 3
// */
// console.group("Check List");
// console.log("Item 1");
// console.log("Item 2");
// console.log("Item 3");
// console.groupEnd();
// console.log()
// console.error('This is what a logged error looks like (it does not stop execution)');
// console.log()

// Task 2: Variable, Type Coercion, and Strict Equality
// To check datatype - typeof

// console.log(typeof "hello");
// console.log(typeof 1);
// console.log(`${typeof 1} + 1 + 2`); 
// console.log(typeof ("1" + 2));


// Functions
// Method 1
// console.log(sayHello("My name is Bob"));
function sayHello(name) {
    return `${name}`;
}

//Method 2
square = (n) => {
    n*n
};

const recipe = {title: "Salmon", prepMins: 2};

const menu =  ({title, prepMins}) => { //The arguments are keyword sensitive
	`We are serving ${title}, and the prep time is ${prepMins}`;
}

// console.log(menu(recipe))

const power = (n=3) => n**n;

// console.log(power(2))

function totalSum(...numbers) { //Creates an array called numbers on the spot
	//reduce is an iterable array function, applies an iterative function on the array. In this case 
	return numbers.reduce((total, n)=> total+n, 0);  
}

// console.log(totalSum(1,2,3)); //6



//Closures
function makeCounter() {
	counter = 0;
	
	return function count() {
		counter++;   //Uses counter variable from makeCounter Scope
		return counter;
	}
}

// a = () => {console.log("Hello")}

const recipeA = {title:"Salmon", prepMins:2, describe: function () { console.log(this.asd)} }//Create an object

// recipeA.describe()
// a = [1,2,"2"]
// console.log(a)

total = 1
function addToTotal(n) {total += n 
    return total} //Mutate the total variable




//Promises
function getOrder(id) {
    return new Promise(resolve => {setTimeout(()=>resolve({id, name:"Toast"}), 1000)})
}

//Example 1
async function serveOrder(id) {
    console.log("Taking Order")
    const orderUp = await getOrder(1)
    console.log(`Preparing Order: ${orderUp.name}`)
    console.log("Order Completed")
}

//Example 2
//Example 1 Store output as variable
async function serveOrder(id) {
    console.log("Taking Order")
    const orderUp = await getOrder(1)
    console.log(`Preparing Order: ${orderUp.name}`)
    console.log("Order Completed")
}

//Example 2 Directly call function when its done
async function serveOrder(id) {
    console.log("Taking Order")
    await getOrder(id).then((order)=>{console.log(`Making order ${order.name}`)})
    console.log("Order Completed")
}


// serveOrder(1)

async function raceHello() {
	await Promise.all(
        [new Promise((resolve)=>{setTimeout(()=>resolve(console.log("Hellow 1 Wins")), 3000)}),
        new Promise((resolve)=>{setTimeout(()=>resolve(console.log("Hellow 2 Wins")), 1000)})]
    )
}

// raceHello()

//Generator Function
function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numbers();

// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())

function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

const genA = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
// genA.next(); // 0
// genA.next("pretzel"); // 1 pretzel
// genA.next("california"); // 2 california
// genA.next("mayonnaise"); // 3 mayonnaise


// Control Flows

// let age = 20
// const group = age >= 21 ? "adult":"child"

// console.log(group)


function parseConfig(input) {
    try {
        const config = JSON.parse(input);
        return config;
    } catch (err) {
        console.error("Error message:", err.message);
        return {theme:"light"};
    } finally {
        console.log("parsing completed")
    }

}

// parseConfig('{"theme":"dark"}');  // {theme: "dark"}
// parseConfig("haha"); //Returns error message

// const asd = {title: "Salmon", prepTime: 2}
let numArr = [1,2,3,4,5]

// for (let i in numArr) {
//     console.log(i, numArr[i])
// }

numArr.forEach((recipe, index, asd, a) => {
    // console.log(recipe, index, asd, a);
});


//Async Iteration
async function processInBatches (ids) {     //Function to process ids
    async function* fetchEach(ids) {    //Function to generate id 
        for (const id of ids) {
            const item = await getUserAsPromise(id);    //Generate a user id
            yield item; //Allow the item to be returned once done
        }
    }

    for await (const user of fetchEach(ids)) {
        console.log("Got:", user.name) //Retrieve each user once ready
    }
}


//Classes
class Shape {
    #width;
    #height;

    constructor(w, h) {
        this.#width = w;
        this.#height = h;
    }

    getArea() {
        return this.#width * this.#height;
    }
}

const rectangle = new Shape(2,3);
// console.log(rectangle.getArea())

function print(text) {
    console.log(text)
}

let date = new Date();

let formatter = new Intl.DateTimeFormat("en-sg", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
})

// console.log(date)
// console.log(formatter.format(date))
// console.log(date.toLocaleString("en-au"))
// console.log(date.toLocaleDateString())
// console.log(date.toISOString())

let countWithFilter = (arr, target) => arr.filter(item => item === 2).length;
let countWithReduce = (arr, target) => arr.reduce( (count, item) => ((item === target) ? count+1 : count), 0 )

let arr1 = [1,2,3,2,4,2];

// console.log(countWithFilter(arr1, 2))
// console.log(countWithReduce(arr1, 2))


const recipes = [
  { title: 'Salmon Teriyaki', prepMinutes: 20, difficulty: 'easy' },
  { title: 'Beef Wellington', prepMinutes: 90, difficulty: 'hard' },
  { title: 'Avocado Toast', prepMinutes: 5, difficulty: 'easy' },
  { title: 'Ramen from Scratch', prepMinutes: 180, difficulty: 'hard' },
  { title: 'Error', prepMinutes: -10, difficulty: 'null' },
];


let quickRecipes = recipes.filter((x) => (x.prepMinutes <= 20) && (x.prepMinutes >=0))
// console.log(quickRecipes.map((x) => x.title))

let countOnlyQuickRecipes = recipes.reduce(((sum, currElement) => (currElement.difficulty === "easy") ? sum : sum+1), 0)
// console.log(countOnlyQuickRecipes)

let a = [1,1,2,3,4,1,]
// console.log(a)

let b = [...new Set(a)]
// console.log(b)


//Creating a StackClass

class StackUnderflowError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}


class Stack {
    #items = [];

    get size() {
        return this.#items.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    //push
    push(x) {
        this.#items.push(x);
    }

    //pop
    pop() {
        if (this.isEmpty()) throw new StackUnderflowError("Cannot pop from empty stack");
        return this.#items.pop()
    }
    
    //peek
    peek() {
        if (this.isEmpty()) throw new StackUnderflowError("Cannot pop from empty stack");
        return this.#items[this.#items.length -1]
    }

    //contains element
    contains(x) {
        if (this.isEmpty()) throw new StackUnderflowError("Cannot pop from empty stack");
        return this.#items.includes(x)
    }

    //display
    display() {
        if (this.#items.length === 0) {
            console.log("Empty Stack") 
            return;
        }

        for (let i of this.#items) {
            console.log(i)
        }
    }
}

let myStack = new Stack()
// myStack.display()
// myStack.push(1)
// myStack.push(2)
// myStack.push(3)
// myStack.display()


// console.log(myStack.peek())



//Practice
//Creating a class

class Recipe {
    constructor (title, prepMins, difficulty) {
        this.title = title;
        this.prepMins = prepMins;
        this.difficulty = difficulty;
    }

    describe() {
        return `Title of Dish: ${this.title}\nPrep Time: ${this.prepMins} mins\nDifficulty ${this.difficulty}\n`
    }
}


class Animal {
    static #animalCounter = 0;

    constructor(title, sound) {
        this.title = title;
        this.sound = sound;
        Animal.#animalCounter++;
    }

    speak() {
        return `${this.title} ${this.sound}ed`
    }

    static showCount() {
        return this.#animalCounter
    }
}

class Dog extends Animal {
    constructor(title, sound, type) {
        super(title, sound);
        this.type = type
    }

    // speak(x) {
    //     return `${x} hohoho`
    // }
}

let blitz = new Dog("Blitz", "bark", "Spitz")
let doggo = new Dog("Doggo", "bark", "Spitz")

console.log(blitz.speak())
console.log(Animal.showCount())
