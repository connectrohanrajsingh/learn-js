// 1. What is Increment?
// ================================
// Increment operators increase a numeric value by 1.
// Two types:
// 1. Pre-increment: ++a
// 2. Post-increment: a++

// ================================
// 2. Pre-Increment (++a)
// ================================
// - The value of 'a' is increased **before** it is used in any expression
// - Returns the **new incremented value** immediately

let a = 5;
console.log("Initial a:", a);

console.log("Pre-increment ++a:", ++a);
// Explanation: a becomes 6 first, then is returned
console.log("Value of a after ++a:", a); // 6


// 3. Post-Increment (a++)
// ================================
// - The value of 'a' is used **first** in the expression, then incremented
// - Returns the **original value**, but a is increased afterward

let b = 5;
console.log("Initial b:", b);

console.log("Post-increment b++:", b++);
// Explanation: returns 5 first, then b becomes 6
console.log("Value of b after b++:", b); // 6


// 4. Pre-Decrement (--a) and Post-Decrement (a--)
// ================================
// Works exactly like increment, but decreases by 1

let c = 10;
console.log("Pre-decrement --c:", --c); // 9
console.log("Post-decrement c--:", c--); // returns 9, then c becomes 8
console.log("Value of c now:", c); // 8


// 5. Difference in Expressions
// ================================

let x = 3;
let y = 3;

let pre = ++x + 2; // x incremented first → 4 + 2 = 6
let post = y++ + 2; // y used first → 3 + 2 = 5, then y becomes 4

console.log("Pre-increment in expression (++x + 2):", pre, "x now:", x);
console.log("Post-increment in expression (y++ + 2):", post, "y now:", y);


// 6. Using in Loops
// ================================

// Example with pre-increment
console.log("Pre-increment in for loop:");
for (let i = 0; i < 3; ++i) {
    console.log("i:", i);
}

// Example with post-increment
console.log("Post-increment in for loop:");
for (let j = 0; j < 3; j++) {
    console.log("j:", j);
}



// 7. Summary Table
// ================================
// Increment Operator Summary:

// 1. ++a (Pre-increment)
//    - Increment first, then use the value
//    - Example: let a=5; console.log(++a); // 6
//    - Used when you want the **incremented value immediately**

// 2. a++ (Post-increment)
//    - Use the current value first, then increment
//    - Example: let a=5; console.log(a++); // 5
//    - Value increases after being used
