// 1. LOOPS (Repetition)
// ==================================================
// Loops execute code multiple times.



// 1.1 for Loop
// Best when number of iterations is known
for (let i = 1; i <= 5; i++) {
  console.log("for loop i:", i);
}



// 1.2 while Loop
// Runs while condition is TRUE
let w = 1;

while (w <= 5) {
  console.log("while loop w:", w);
  w++;
}



// 1.3 do...while Loop
// Runs at least ONCE even if condition is false
let d = 1;

do {
  console.log("do...while d:", d);
  d++;
} while (d <= 5);



// 1.4 for...of (Values of iterable)
// Works with arrays, strings, maps, sets
let fruits = ["Apple", "Banana", "Mango"];

for (let fruitName of fruits) {
  console.log("for...of fruit:", fruitName);
}



// 1.5 for...in (Keys of object)
let person = { name: "Rohan", age: 22, city: "Delhi" };

for (let key in person) {
  console.log("for...in key:", key, "value:", person[key]);
}



// 1.6 break Statement
// Stops the loop completely
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log("break example:", i);
}



// 1.7 continue Statement
// Skips current iteration only
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log("continue example:", i);
}



// 1.8 Nested Loops
// Loop inside another loop
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(`Nested loop i=${i}, j=${j}`);
  }
}



// 2. INFINITE LOOPS (Danger)
// ==================================================
// Happens when condition never becomes false
// Example (DON'T RUN):
// while (true) {
//   console.log("Infinite loop");
// }



// 3. SUMMARY
// ==================================================
// LOOPS:
// - for
// - while
// - do...while
// - for...of (values)
// - for...in (keys)
// - break (exit loop)
// - continue (skip iteration)
// - nested loops
// - infinite loops (avoid)
