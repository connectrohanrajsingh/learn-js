// Objects store data in key-value pairs
// Keys are strings (or Symbols), values can be any type




// 1. CREATING OBJECTS
// ==================================================
let person = {
  name: "Rohan",
  age: 22,
  isStudent: true
};

console.log(person); 
// { name: "Rohan", age: 22, isStudent: true }




// 2. ACCESSING PROPERTIES
// ==================================================

// Dot notation
console.log(person.name); // Rohan

// Bracket notation (Will try to evaluate)
console.log(person["age"]); // 22

let key = "isStudent";
console.log(person[key]); // true




// 3. ADDING & UPDATING PROPERTIES
// ==================================================
person.city = "Delhi"; // add
person.age = 23;       // update

console.log(person.city); // Delhi
console.log(person.age);  // 23




// 4. DELETING PROPERTIES
// ==================================================
delete person.isStudent;
console.log(person.isStudent); // undefined




// 5. OBJECT METHODS (Functions inside objects)
// ==================================================
let user = {
  name: "Amit",
  greet: function() {
    return "Hello " + this.name;
  }
};

console.log(user.greet()); // Hello Amit




// 6. NESTED OBJECTS
// ==================================================
let student = {
  name: "Rohan",
  marks: {
    math: 90,
    science: 85
  }
};

console.log(student.marks.math); // 90




// 7. LOOPING THROUGH OBJECTS
// ==================================================
let car = { brand: "Toyota", model: "Camry", year: 2020 };

for (let key in car) {
  console.log(key, ":", car[key]);
}
// brand : Toyota
// model : Camry
// year : 2020




// 8. OBJECT METHODS (Built-in)
// ==================================================
let obj = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj));   // ["a","b","c"]
console.log(Object.values(obj)); // [1,2,3]
console.log(Object.entries(obj)); // [["a",1],["b",2],["c",3]]




// 9. OBJECT ASSIGN (Copy/Merge)
// ==================================================
let o1 = { x: 1 };
let o2 = { y: 2 };

let merged = Object.assign({}, o1, o2);
console.log(merged); // { x:1, y:2 }




// 10. SPREAD OPERATOR WITH OBJECTS
// ==================================================
let obj1 = { a: 1 };
let obj2 = { b: 2 };

let combined = { ...obj1, ...obj2 };
console.log(combined); // { a:1, b:2 }
// Use Json.stringify and Json.parse to deep clone



// 11. OBJECT DESTRUCTURING
// ==================================================
let profile = { username: "Raj", level: 5 };

let { username, level } = profile;
console.log(username); // Raj
console.log(level);    // 5




// 12. CHECKING PROPERTY EXISTENCE
// ==================================================
console.log("name" in person); // true
console.log(person.hasOwnProperty("age")); // true




// 13. OBJECT FREEZE & SEAL
// ==================================================
let settings = { theme: "dark" };

Object.freeze(settings);
settings.theme = "light";
console.log(settings.theme); // dark (cannot change)

let config = { mode: "test" };
Object.seal(config);
config.mode = "prod";   // allowed
config.newProp = "no";  // not added
console.log(config); // { mode: "prod" }




// 14. THIS KEYWORD IN OBJECT
// ==================================================
let calculator = {
  num: 10,
  double: function() {
    return this.num * 2;
  }
};

console.log(calculator.double()); // 20




// 15. SUMMARY
// ==================================================
// Creation: { key: value }
// Access: obj.key or obj["key"]
// Modify: add/update/delete properties
// Methods: functions inside objects
// Loop: for...in
// Built-ins: Object.keys(), values(), entries()
// Merge: Object.assign(), spread {...}
// Destructuring: let {a,b} = obj
// Check property: "key" in obj, hasOwnProperty()
// Protection: Object.freeze(), Object.seal()
// 'this' refers to the object calling the method