// ==========================================================
// EVENT DELEGATION — Pattern, Dynamic Elements, Performance
// ==========================================================

// 1. The Problem
// ======================
// Adding listeners to many elements wastes memory and code

// ❌ Bad — listener per item:
// let items = document.querySelectorAll(".item")
// items.forEach(item => {
//   item.addEventListener("click", () => { ... })
// })


// 2. Delegation Solution
// ======================
// Attach ONE listener to a parent
// Use event.target to determine which child was clicked

let list = document.getElementById("list")

list.addEventListener("click", (e) => {
  let item = e.target.closest(".item")
  if (!item) return  // ignore clicks outside items

  console.log("Clicked:", item.textContent)
})

// Advantages:
// - Single listener (less memory)
// - Works for DYNAMICALLY added elements
// - One place to manage


// 3. Matching with closest()
// ======================
// The safest way to check which child was clicked:

list.addEventListener("click", (e) => {
  let button = e.target.closest("button")
  if (!button) return

  if (button.matches(".delete-btn")) {
    button.closest(".item")?.remove()
  } else if (button.matches(".edit-btn")) {
    console.log("Edit:", button.dataset.id)
  }
})


// 4. Delegation with Dynamic Elements
// ======================
// Elements added after page load still work (bubbling)

function addItem(text) {
  let li = document.createElement("li")
  li.className = "item"
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">✕</button>
  `
  list.appendChild(li)
}

// No need to attach listener to new items — parent handles it!
addItem("New dynamic item")


// 5. Data Attributes with Delegation
// ======================
// <li class="user" data-id="42" data-role="admin">Rohan</li>

list.addEventListener("click", (e) => {
  let user = e.target.closest(".user")
  if (!user) return

  console.log("User ID:", user.dataset.id)      // "42"
  console.log("Role:", user.dataset.role)        // "admin"
})


// 6. Delegation Pattern Matrix
// ======================
// Structure:
// <table id="table">
//   <tr><td>Cell 1</td><td><button>Action</button></td></tr>
// </table>

document.getElementById("table")?.addEventListener("click", (e) => {
  let td = e.target.closest("td")
  if (!td) return

  let row = td.closest("tr")
  let actionBtn = td.querySelector("button")

  if (actionBtn) {
    console.log("Button in cell clicked")
  } else {
    console.log("Cell text:", td.textContent)
  }
})


// 7. When NOT to Use Delegation
// ======================
// - Events that don't bubble: focus, blur, load, scroll, mouseenter/leave
//   (use focusin/focusout which bubble, or use capture phase)
// - When event needs to stop immediate propagation
// - Very deeply nested DOM (performance cost of climbing up each time)

// Non-bubbling events — use capture phase:
// parent.addEventListener("focus", handler, true)  // capture


// 8. Performance Considerations
// ======================
// - closest() is fast but avoid excessive DOM operations
// - Check e.target.tagName before closest() for simple cases
// - Keep delegation as close to targets as possible (not document level)

// Fast path:
list.addEventListener("click", (e) => {
  let target = e.target
  if (target.tagName === "BUTTON" && target.classList.contains("delete")) {
    // direct, no closest() needed
  }
})


// 9. Summary
// ======================
// Delegate: ONE parent listener for MANY children
// Use closest() to find the relevant child
// Works with dynamically added elements
// Data attributes (dataset) pair perfectly with delegation
// Events that DON'T bubble: focus, blur, scroll, load, mouseenter/leave
//   Use capture phase or focusin/focusout for those
// Keep delegation scope tight (not document-level)
