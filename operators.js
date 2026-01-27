// 1. What are Operators?
// ================================
// Operators are symbols or keywords that **perform operations on values or variables**.
// Think of them as **tools** to manipulate data: add, compare, combine, or make decisions.

// Example: Adding two numbers
let x = 5;
let y = 3;
console.log("5 + 3 =", x + y);



// 2. Arithmetic Operators
// ================================
// Used for mathematical calculations: +, -, *, /, %, **

// Addition
let a = 10;
let b = 7;
console.log("Addition:", a + b);

// Subtraction
console.log("Subtraction:", a - b);

// Multiplication
console.log("Multiplication:", a * b);

// Division
console.log("Division:", a / b);

// Modulus (remainder)
console.log("Modulus:", a % b);

// Exponentiation
console.log("Exponentiation:", a ** 2);

// Increment / Decrement
let counter = 5;
counter++;
console.log("Increment:", counter); // 6
counter--;
console.log("Decrement:", counter); // 5


// 3. Assignment Operators
// ================================
// Used to **assign or update values**: =, +=, -=, *=, /=, %=

let score = 10;
score += 5;
console.log("Score after +=5:", score);

score -= 3;
console.log("Score after -=3:", score);

score *= 2;
console.log("Score after *=2:", score);

score /= 4;
console.log("Score after /=4:", score);

score %= 3;
console.log("Score after %=3:", score);


// 4. Comparison Operators
// ================================
// Compare values and return true / false: ==, ===, !=, !==, >, <, >=, <=

console.log("5 == '5' ?", 5 == '5');   // true → compares value only
console.log("5 === '5' ?", 5 === '5'); // false → compares value + type
console.log("5 != '5' ?", 5 != '5');   // false
console.log("5 !== '5' ?", 5 !== '5'); // true
console.log("10 > 7 ?", 10 > 7);       // true
console.log("10 < 7 ?", 10 < 7);       // false
console.log("10 >= 10 ?", 10 >= 10);   // true
console.log("10 <= 9 ?", 10 <= 9);     // false



// 5. Logical Operators
// ================================
// Combine boolean values: && (AND), || (OR), ! (NOT)

let hasKey = true;
let doorOpen = false;

console.log("hasKey && doorOpen ?", hasKey && doorOpen); // false → both must be true
console.log("hasKey || doorOpen ?", hasKey || doorOpen); // true → either one is true
console.log("!doorOpen ?", !doorOpen);                   // true → flips value


// 6. String Operators
// ================================
// + is used to **concatenate strings**

let firstName = "Rohan";
let lastName = "Singh";
console.log("Full Name:", firstName + " " + lastName);

// += can also append strings
let message = "Hello";
message += ", Maharaj!";
console.log("Message:", message);



// 7. Ternary Operator (Conditional Operator)
// ================================
// Syntax: condition ? valueIfTrue : valueIfFalse

let age2 = 18;
let canVote = (age2 >= 18) ? "Yes" : "No";
console.log("Can vote?", canVote);



// 8. Type Operators
// ================================

// typeof → returns type of variable
console.log("Type of 10:", typeof 10);
console.log("Type of 'Hello':", typeof "Hello");
console.log("Type of true:", typeof true);
console.log("Type of null:", typeof null); // quirk → object
console.log("Type of undefined:", typeof undefined);
console.log("Type of fruits array:", typeof ["Apple", "Banana"]); // object
console.log("Is Array?", Array.isArray(["Apple", "Banana"]));    // true


// instanceof → checks if object is instance of a class
console.log("[] instanceof Array?", [] instanceof Array); // true
console.log("{} instanceof Object?", {} instanceof Object); // true



// 9. Operator Precedence
// ================================
// Some operators execute before others
console.log("Operator Precedence example:");
console.log("3 + 5 * 2 =", 3 + 5 * 2); // 13 → * has higher precedence than +
console.log("(3 + 5) * 2 =", (3 + 5) * 2); // 16 → parentheses override



// 10. Summary Table (console-friendly)
// ================================
// Operators Summary:

// 1. Arithmetic: +, -, *, /, %, **, ++, --
// 2. Assignment: =, +=, -=, *=, /=, %=
// 3. Comparison: ==, ===, !=, !==, >, <, >=, <=
// 4. Logical: &&, ||, !
// 5. String: +, +=
// 6. Ternary: condition ? valueIfTrue : valueIfFalse
// 7. Type: typeof, instanceof
// 8. Operator Precedence: *, / > +, -, use parentheses to override
