// 1. CONDITIONS (Decision Making)
// ==================================================
// Conditions allow JavaScript to make decisions based on true/false expressions.



// 1.1 if Statement
// Runs block only if condition is TRUE
let temperature = 35;

if (temperature > 30) {
  console.log("It's a hot day");
}



// 1.2 if...else
// Executes one block if TRUE, another if FALSE
let num = -10;

if (num >= 0) {
  console.log("Positive number");
} else {
  console.log("Negative number");
}



// 1.3 if...else if...else
// Used when checking multiple conditions in order
let marks = 82;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 50) {
  console.log("Grade C");
} else {
  console.log("Fail");
}



// 1.4 Nested if
// An if inside another if
let username = "admin";
let password = "1234";

if (username === "admin") {
  if (password === "1234") {
    console.log("Login successful");
  } else {
    console.log("Wrong password");
  }
} else {
  console.log("User not found");
}



// 1.5 Ternary Operator (Short if-else)
// Syntax: condition ? value_if_true : value_if_false
let age = 16;
let result = (age >= 18) ? "Adult" : "Minor";
console.log("Ternary result:", result);



// 1.6 switch Statement (IN DEPTH)
// Best when comparing ONE value to MANY exact matches

let day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break; // stops here
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}

// break prevents execution from continuing into next cases


// 1.6.1 Fallthrough (When break is missing)
// Execution continues to next cases even if they don’t match
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("Apple selected");
  case "banana":
    console.log("Banana also runs due to fallthrough");
  case "mango":
    console.log("Mango also runs due to fallthrough");
}
// All lines after match run until switch ends or break is found



// 1.6.2 Grouping Cases
// Multiple cases can share same code
let grade = "B";

switch (grade) {
  case "A":
  case "B":
  case "C":
    console.log("Pass");
    break;
  case "D":
  case "F":
    console.log("Fail");
    break;
  default:
    console.log("Invalid grade");
}



// 1.6.3 switch uses STRICT comparison (===)
let value = "5";

switch (value) {
  case 5:
    console.log("Number 5");
    break;
  case "5":
    console.log("String 5 matched");
    break;
}

// 2. SUMMARY
// ==================================================
// CONDITIONS:
// - if
// - if...else
// - if...else if...else
// - nested if
// - ternary operator
// - switch (with break, fallthrough, grouping, strict match)