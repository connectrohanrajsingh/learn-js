// Arrays store multiple values in a single variable
// Index starts from 0



// 1. CREATING ARRAYS
// ==================================================
let arr1 = [1, 2, 3, 4];
let arr2 = new Array(5, 6, 7);

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [5, 6, 7]




// 2. ACCESSING ELEMENTS
// ==================================================
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // Apple
console.log(fruits[fruits.length - 1]); // Mango




// 3. ARRAY LENGTH
// ==================================================
console.log("Length:", fruits.length); // Length: 3




// 4. MODIFYING ARRAYS
// ==================================================
fruits[1] = "Orange";
console.log(fruits); // ["Apple", "Orange", "Mango"]




// 5. ADDING & REMOVING ELEMENTS
// ==================================================

// push() → add at end
fruits.push("Grapes");
console.log("push:", fruits); // ["Apple","Orange","Mango","Grapes"]

// pop() → remove from end
fruits.pop();
console.log("pop:", fruits); // ["Apple","Orange","Mango"]

// unshift() → add at start
fruits.unshift("Pineapple");
console.log("unshift:", fruits); // ["Pineapple","Apple","Orange","Mango"]

// shift() → remove from start
fruits.shift();
console.log("shift:", fruits); // ["Apple","Orange","Mango"]




// 6. LOOPING ARRAYS
// ==================================================

// for loop
for (let i = 0; i < fruits.length; i++) {
  console.log("for loop:", fruits[i]);
}
// for loop: Apple
// for loop: Orange
// for loop: Mango

// for...of
for (let fruit of fruits) {
  console.log("for...of:", fruit);
}
// for...of: Apple
// for...of: Orange
// for...of: Mango

// forEach()
fruits.forEach(function (fruit, index) {
  console.log("forEach:", index, fruit);
});
// forEach: 0 Apple
// forEach: 1 Orange
// forEach: 2 Mango




// 7. SEARCHING IN ARRAYS
// ==================================================
let numbers = [10, 20, 30, 40, 50];

console.log("indexOf 30:", numbers.indexOf(30)); // 2
console.log("includes 40:", numbers.includes(40)); // true
console.log("find >25:", numbers.find(n => n > 25)); // 30
console.log("findIndex >25:", numbers.findIndex(n => n > 25)); // 2




// 8. TRANSFORMING ARRAYS
// ==================================================

// map() → create new array
let doubled = numbers.map(n => n * 2);
console.log("map doubled:", doubled); // [20, 40, 60, 80, 100]

// filter() → filter values
let bigNums = numbers.filter(n => n > 25);
console.log("filter >25:", bigNums); // [30, 40, 50]

// reduce() → reduce to single value
let sum = numbers.reduce((total, n) => total + n, 0);
console.log("reduce sum:", sum); // 150




// 9. SORTING & REVERSING
// ==================================================
let vals = [5, 2, 9, 1];

vals.sort();
console.log("sort default:", vals); // [1, 2, 5, 9] (string sort works here by chance)

vals.sort((a, b) => a - b);
console.log("sort numeric:", vals); // [1, 2, 5, 9] (do b-a for descending sort)

vals.reverse();
console.log("reverse:", vals); // [9, 5, 2, 1]




// 10. SLICE & SPLICE
// ==================================================
let arr = [1, 2, 3, 4, 5];

// slice returns an another array as instructed
console.log("slice(1,4):", arr.slice(1, 4)); // [2, 3, 4]
console.log("original after slice:", arr); // [1, 2, 3, 4, 5]

// splice modifies the original array (it can be used to push elements on desired place too)
arr.splice(2, 1, 99);
console.log("splice result:", arr); // [1, 2, 99, 4, 5]




// 11. JOIN & SPLIT
// ==================================================
let words = ["JS", "is", "fun"];
let sentence = words.join(" ");
console.log("join:", sentence); // "JS is fun"

let backToArray = sentence.split(" ");
console.log("split:", backToArray); // ["JS","is","fun"]




// 12. CONCAT & SPREAD
// ==================================================
let a = [1, 2];
let b = [3, 4];

console.log("concat:", a.concat(b)); // [1,2,3,4]
console.log("spread:", [...a, ...b]); // [1,2,3,4]




// 13. MULTI-DIMENSIONAL ARRAYS
// ==================================================
let matrix = [[1, 2], [3, 4]];

console.log("matrix[0][1]:", matrix[0][1]); // 2



// 14. ARRAY DESTRUCTURING
// ==================================================
let colors = ["red", "green", "blue"];
let [first, second] = colors;
console.log("destructuring:", first, second); // red green




// 15. ARRAY IS OBJECT
// ==================================================
console.log(typeof fruits); // object
console.log(Array.isArray(fruits)); // true




// 16. SUMMARY
// ==================================================
// Creation: [], new Array()
// Access: arr[index]
// Length: arr.length
// Add/Remove: push, pop, shift, unshift
// Loop: for, for...of, forEach
// Search: indexOf, includes, find, findIndex
// Transform: map, filter, reduce
// Modify: slice (copy), splice (change)
// Combine: concat, spread [...]
// Convert: join (array→string), split (string→array)
// Sort: sort(), reverse()
// Advanced: destructuring, multi-dimensional arrays
