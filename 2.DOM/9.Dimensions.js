// ==========================================================
// DIMENSIONS & GEOMETRY — offset, client, scroll, bounding rect, visibility
// ==========================================================

// 1. Element Dimensions — offset vs client vs scroll
// ======================
// These properties are read-only numbers (no "px" suffix)

let box = document.querySelector(".box")

// offset — includes border
console.log(box.offsetWidth)      // width + padding + border
console.log(box.offsetHeight)     // height + padding + border
console.log(box.offsetLeft)       // distance from offsetParent left edge
console.log(box.offsetTop)        // distance from offsetParent top edge
console.log(box.offsetParent)     // nearest positioned ancestor (or table/body)

// client — excludes border, includes padding
console.log(box.clientWidth)      // width + padding (content area)
console.log(box.clientHeight)     // height + padding
console.log(box.clientLeft)       // border-left width
console.log(box.clientTop)        // border-top width

// scroll — includes scrollable content
console.log(box.scrollWidth)      // full content width (including overflow)
console.log(box.scrollHeight)     // full content height (including overflow)
console.log(box.scrollLeft)       // current horizontal scroll position
console.log(box.scrollTop)        // current vertical scroll position


// 2. getBoundingClientRect
// ======================
// Returns the element's position relative to the viewport
// More detailed than offsetLeft/offsetTop

let rect = box.getBoundingClientRect()
// {
//   x: 100,        // left edge (same as left)
//   y: 200,        // top edge (same as top)
//   top: 200,      // top edge from viewport
//   right: 300,    // left + width
//   bottom: 400,   // top + height
//   left: 100,     // left edge from viewport
//   width: 200,    // same as offsetWidth
//   height: 200    // same as offsetHeight
// }

// Using rect for collision/overlap detection:
function isInViewport(el) {
  let rect = el.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  )
}


// 3. Scrolling
// ======================
// Programmatically scroll:
window.scrollTo(0, 0)                         // to specific coordinates
window.scrollTo({ top: 500, behavior: "smooth" }) // smooth scrolling

window.scrollBy({ top: 100, left: 0 })        // relative scroll

element.scrollIntoView()                       // scroll element into view
element.scrollIntoView({ behavior: "smooth", block: "center" })

// Scrollable element:
box.scrollTop = 0        // set scroll position
box.scrollLeft = 100

// Check if scrolled to bottom:
function isAtBottom(el) {
  return el.scrollHeight - el.scrollTop - el.clientHeight < 1
}


// 4. Element Visibility
// ======================
// Check if element is hidden:
function isHidden(el) {
  return el.offsetParent === null ||
         el.offsetWidth === 0 ||
         el.offsetHeight === 0
}

// Check computed display:
function isDisplayed(el) {
  return getComputedStyle(el).display !== "none"
}


// 5. Coordinates — Page vs Client vs Screen
// ======================
// Page coordinates: relative to document (includes scroll)
// Client coordinates: relative to viewport
// Screen coordinates: relative to physical screen

element.addEventListener("click", (e) => {
  console.log("Page:", e.pageX, e.pageY)       // document-relative
  console.log("Client:", e.clientX, e.clientY) // viewport-relative
  console.log("Screen:", e.screenX, e.screenY) // screen-relative
})


// 6. elementFromPoint
// ======================
// Get element at specific viewport coordinates:
let elem = document.elementFromPoint(100, 200)
console.log(elem) // element at (100, 200) or null

// Note: elementFromPoint returns null for coordinates outside viewport


// 7. matchMedia — Responsive Checks
// ======================
let mq = window.matchMedia("(max-width: 768px)")

console.log(mq.matches)  // true if viewport ≤ 768px

mq.addEventListener("change", (e) => {
  if (e.matches) {
    console.log("Mobile layout")
  } else {
    console.log("Desktop layout")
  }
})


// 8. ResizeObserver — Track Element Size Changes
// ======================
// See Advance/Web-APIs.js for full details

let ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log(entry.contentRect.width)
    console.log(entry.contentRect.height)
  }
})
ro.observe(element)
// ro.disconnect() when done


// 9. Summary
// ======================
// offsetWidth/Height: element + padding + border (visual box)
// clientWidth/Height: element + padding only (content + padding)
// scrollWidth/Height: full content including overflow
// getBoundingClientRect(): viewport-relative position
// scrollTo/scrollBy/scrollIntoView: programmatic scroll
// pageX/Y: document-relative, clientX/Y: viewport-relative
// elementFromPoint(x, y): element at coordinates
// matchMedia: responsive breakpoint detection
// isInViewport: check if element is visible in viewport
