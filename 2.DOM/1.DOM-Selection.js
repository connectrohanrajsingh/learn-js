// ==========================================================
// DOM SELECTION — getAllById/Class/Tag, querySelector, matches/closest
// ==========================================================

// 1. Legacy Selectors
// ======================
// These return "live" collections that update when DOM changes:

// By ID — returns single element (fastest)
let header = document.getElementById("header")

// By Class — returns HTMLCollection (live)
let cards = document.getElementsByClassName("card")

// By Tag — returns HTMLCollection (live)
let paragraphs = document.getElementsByTagName("p")

// By Name — returns NodeList (live in some browsers)
let inputs = document.getElementsByName("email")


// 2. Modern Selectors (CSS Selectors)
// ======================

// querySelector — first match, returns Element or null
let firstBtn = document.querySelector(".btn")
let nav = document.querySelector("#nav ul li.active")

// querySelectorAll — all matches, returns static NodeList
let allBtns = document.querySelectorAll(".btn")
let rows = document.querySelectorAll("table tr:nth-child(even)")

// Supports any CSS selector:
// document.querySelector("[data-id='123']")
// document.querySelector("input[type='text']")
// document.querySelector("div > p:first-child")


// 3. Live vs Static Collections
// ======================
// HTMLCollection (getElementsBy*) → LIVE
//   - Reflects DOM changes in real-time
//   - No forEach, no array methods
//   - Convert: Array.from() or [...coll]

// NodeList (querySelectorAll) → STATIC
//   - Snapshot at time of query
//   - Has forEach, but no map/filter/reduce
//   - Convert: Array.from() or [...coll]

let divsByClass = document.getElementsByClassName("item")
let divsByQuery = document.querySelectorAll(".item")

let newDiv = document.createElement("div")
newDiv.className = "item"
document.body.appendChild(newDiv)

console.log(divsByClass.length)  // updated (live)
console.log(divsByQuery.length)  // unchanged (static)


// 4. Closest — Find Ancestor
// ======================
// Traverses UP from element to find matching selector
// Returns null if no match

// <div class="card">
//   <div class="body">
//     <button class="btn">Click</button>
//   </div>
// </div>

let button = document.querySelector(".btn")
let card = button.closest(".card")      // finds ancestor .card
let parentDiv = button.closest("div")    // finds nearest div ancestor

// Useful for event delegation:
// document.addEventListener("click", e => {
//   let item = e.target.closest(".list-item")
//   if (item) { /* handle */ }
// })


// 5. matches — Check Selector
// ======================
// Returns true if element matches the CSS selector

let el = document.querySelector("p")
console.log(el.matches(".active"))      // boolean
console.log(el.matches("p:first-child")) // boolean


// 6. contains — Check Descendant
// ======================
// Returns true if element contains another element

let parent = document.querySelector(".container")
let child = document.querySelector(".child")
console.log(parent.contains(child))  // true/false


// 7. Comparing Elements
// ======================
// isEqualNode — checks structural equality:
let div1 = document.createElement("div")
let div2 = document.createElement("div")
div1.textContent = "hello"
div2.textContent = "hello"
console.log(div1.isEqualNode(div2)) // true

// isSameNode / === — checks reference equality:
console.log(div1 === div2)          // false
console.log(div1.isSameNode(div1))  // true


// 8. Summary
// ======================
// Fastest: getElementById → getElementsBy* → querySelectorAll
// Live: HTMLCollection (getElementsBy*) updates with DOM
// Static: NodeList (querySelectorAll) is snapshot
// closest(): find ancestor matching selector
// matches(): test if element matches selector
// contains(): test if element is descendant
// Always prefer querySelector/querySelectorAll for flexibility
