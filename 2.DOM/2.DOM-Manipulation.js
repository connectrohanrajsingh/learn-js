// ==========================================================
// DOM MANIPULATION — Create, Insert, Remove, Fragment, HTML
// ==========================================================

// 1. Creating Elements
// ======================
let div = document.createElement("div")
let p = document.createElement("p")
let img = document.createElement("img")
let text = document.createTextNode("Hello, DOM!")


// 2. Setting Content
// ======================
div.textContent = "Plain text"        // Safe — treats as text
div.innerHTML = "<strong>HTML</strong>" // Renders HTML (XSS risk!)
div.innerText = "Visible text"        // Respects CSS visibility

// Differences:
// textContent: all text, even hidden, no parsing, fastest
// innerText: visible text only, triggers reflow
// innerHTML: parses HTML, slowest, XSS risk


// 3. Setting Attributes
// ======================
img.setAttribute("src", "photo.jpg")
img.setAttribute("alt", "A photo")
img.setAttribute("data-id", "123")

// Direct property access (faster):
img.src = "photo.jpg"
img.alt = "A photo"

// Boolean attributes:
let checkbox = document.createElement("input")
checkbox.type = "checkbox"
checkbox.checked = true   // presence (any truthy value) = true
checkbox.disabled = false // absence = false


// 4. Inserting Elements
// ======================
let container = document.getElementById("container") || document.body

// append/prepend — append multiple nodes/strings:
container.append(div, p, "some text")   // at end (children)
container.prepend(div)                   // at start (children)

// appendChild — single node at end (legacy):
container.appendChild(div)

// insertBefore — insert before reference node:
let ref = container.firstChild
container.insertBefore(div, ref)

// insertAdjacentHTML/Element — precise position:
// Positions: "beforebegin", "afterbegin", "beforeend", "afterend"
// <!-- beforebegin -->
// <div id="target">
//   <!-- afterbegin -->
//   existing content
//   <!-- beforeend -->
// </div>
// <!-- afterend -->

target.insertAdjacentHTML("afterend", "<p>After the div</p>")
target.insertAdjacentElement("beforebegin", newDiv)


// 5. Removing Elements
// ======================
el.remove()                // modern — removes element from DOM
parent.removeChild(el)     // legacy

// Empty an element:
while (container.firstChild) {
  container.removeChild(container.firstChild)
}
// Or: container.innerHTML = ""


// 6. Replacing Elements
// ======================
let old = document.querySelector(".old")
let replacement = document.createElement("div")
replacement.textContent = "New element"

old.replaceWith(replacement)
// parent.replaceChild(replacement, old)  // legacy


// 7. Cloning Elements
// ======================
let original = document.querySelector(".card")
let shallow = original.cloneNode(false)  // no children
let deep = original.cloneNode(true)      // with children

// Clone preserves attributes and content, but NOT event listeners
// deep = true is the common case


// 8. DocumentFragment — Batch Operations
// ======================
// Fragment is a lightweight container in memory
// Adding to DOM at once = only ONE reflow

let fragment = document.createDocumentFragment()

for (let i = 0; i < 100; i++) {
  let item = document.createElement("li")
  item.textContent = `Item ${i}`
  fragment.appendChild(item)
}

// Single DOM operation:
list.appendChild(fragment)

// Faster than appending 100 items individually


// 9. innerHTML vs textContent — Security
// ======================
// Never use innerHTML with user-provided data (XSS):
// userInput = "<img src=x onerror=alert('XSS')>"
// div.innerHTML = userInput  // DANGER!

// Always use textContent for user data:
div.textContent = userInput  // safe

// For safe HTML, use createElement + textContent:
let msg = document.createElement("div")
msg.textContent = userInput


// 10. Style Manipulation
// ======================
div.style.color = "red"
div.style.backgroundColor = "black"  // CSS property with camelCase
div.style.fontSize = "16px"          // always set units
div.style.cssText = "color: red; font-size: 16px; background: black"
div.setAttribute("style", "color: blue;")


// 11. Summary
// ======================
// Create: createElement, createTextNode, createDocumentFragment
// Content: textContent (safe), innerHTML (risky)
// Insert: append, prepend, insertBefore, insertAdjacentHTML
// Remove: el.remove(), parent.removeChild(el)
// Replace: el.replaceWith()
// Clone: cloneNode(true/false)
// Fragment: batch DOM updates (single reflow)
// Security: NEVER innerHTML with user input
