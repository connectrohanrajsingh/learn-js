// ==========================================================
// STYLING THE DOM — className, classList, Computed Styles, CSS Custom Props
// ==========================================================

// 1. className vs classList
// ======================
let el = document.querySelector(".box")

// className — full class string (overwrites):
el.className = "new-class"           // replaces all classes

// classList — additive, modern API:
el.classList.add("active")            // add class
el.classList.remove("inactive")       // remove class
el.classList.toggle("visible")        // add if missing, remove if present
el.classList.replace("old", "new")    // replace one class with another
console.log(el.classList.contains("active")) // true/false
console.log(el.classList.length)      // number of classes
console.log(el.classList.item(0))     // class at index
console.log(el.classList.value)       // full class string

// classList is the preferred API — additive, specific


// 2. Inline Styles — element.style
// ======================
// Only reads/writes INLINE styles (not computed)

el.style.color = "red"
el.style.backgroundColor = "#333"     // camelCase property names
el.style.fontSize = "16px"            // always include units
el.style.cssText = "color: red; background: blue; margin: 0"

// Reading inline styles:
console.log(el.style.color)           // "red"
console.log(el.style.marginTop)       // "" (if not set inline)

// Removing inline style:
el.style.color = ""
el.style.removeProperty("color")


// 3. Computed Styles — getComputedStyle
// ======================
// Returns the ACTUAL style (after CSS cascade)
// Read-only

let styles = window.getComputedStyle(el)
console.log(styles.color)            // rgb(255, 0, 0) or computed value
console.log(styles.fontSize)         // "16px" (computed, always in px)
console.log(styles.display)          // "block", "flex", etc.
console.log(styles.getPropertyValue("background-color")) // alternate syntax


// 4. CSS Custom Properties (Variables)
// ======================
// Set CSS variable on element:
el.style.setProperty("--primary", "#007bff")
el.style.setProperty("--spacing", "1rem")

// Read CSS variable:
let primary = getComputedStyle(el).getPropertyValue("--primary").trim()
console.log(primary) // "#007bff"

// Useful for dynamic theming:
// document.documentElement.style.setProperty("--theme", "dark")


// 5. Window Dimensions
// ======================
console.log(window.innerWidth)        // viewport width (includes scrollbar)
console.log(window.innerHeight)       // viewport height
console.log(window.outerWidth)        // browser window width
console.log(window.outerHeight)       // browser window height
console.log(window.screenX)           // window position from left
console.log(window.screenY)           // window position from top
console.log(window.scrollX)           // current horizontal scroll
console.log(window.scrollY)           // current vertical scroll


// 6. Keeping Styles in JS (CSS-in-JS approach)
// ======================
// Avoid inline styles for complex styling — use classes:

// Good:
el.classList.add("highlight")

// Avoid:
// el.style.color = "yellow"
// el.style.background = "black"
// el.style.padding = "10px"


// 7. Measuring Element Dimensions
// ======================
// See DOM-Dimensions.js for complete coverage

let rect = el.getBoundingClientRect()
console.log(rect.top, rect.left, rect.width, rect.height)


// 8. Summary
// ======================
// - classList: add, remove, toggle, replace, contains (preferred)
// - className: full class string (overwrites, avoid)
// - element.style: inline styles only, camelCase, include units
// - getComputedStyle: actual rendered style (read-only)
// - CSS custom properties: setProperty("--name", value)
// - Prefer classes over inline styles for maintainability
// - window dimensions: innerWidth/Height, outerWidth/Height, scrollX/Y
