// ==========================================================
// EVENTS — addEventListener, Object, Flow, Bubbling, Capturing
// ==========================================================

// 1. Adding Event Listeners
// ======================
let btn = document.getElementById("btn") || document.createElement("button")

btn.addEventListener("click", function (e) {
  console.log("clicked")
})

// Arrow function:
btn.addEventListener("click", (e) => {
  console.log("clicked with arrow")
})


// 2. Inline vs Property vs Listener
// ======================
// Inline:   <button onclick="handle()">  (avoid, mixes concerns)
// Property: btn.onclick = function        (only one listener)
// Modern:   btn.addEventListener("click", fn)  (multiple, fine-grained)

// addEventListener advantages:
// - Multiple listeners on same event
// - Can remove specific listener
// - Control capture/bubble phase
// - once, passive options


// 3. Event Types
// ======================

// Mouse:
// click, dblclick, mousedown, mouseup, mouseover, mouseout
// mousemove, mouseenter, mouseleave, contextmenu

// Keyboard:
// keydown, keypress (deprecated), keyup

// Touch (mobile):
// touchstart, touchmove, touchend, touchcancel

// Form:
// submit, reset, change, input, focus, blur, select

// Window:
// scroll, resize, load, unload, beforeunload, hashchange

// Drag:
// dragstart, drag, dragenter, dragleave, dragover, drop, dragend

// Clipboard:
// copy, cut, paste

// Animation:
// animationstart, animationend, animationiteration

// Transition:
// transitionstart, transitionrun, transitionend, transitioncancel


// 4. Event Object — Properties
// ======================
btn.addEventListener("click", (e) => {
  console.log(e.type)           // "click"
  console.log(e.target)         // element that triggered event
  console.log(e.currentTarget)  // element listener was attached to
  console.log(e.eventPhase)     // 1=capture, 2=at target, 3=bubble
  console.log(e.timeStamp)      // milliseconds from page load
  console.log(e.isTrusted)      // true = user action, false = script dispatch
  e.preventDefault()            // stop default behavior
  e.stopPropagation()           // stop bubbling
  e.stopImmediatePropagation()  // stop bubbling + remaining listeners
})

// Mouse-specific:
btn.addEventListener("mousedown", (e) => {
  console.log(e.clientX, e.clientY)     // viewport coordinates
  console.log(e.pageX, e.pageY)         // page coordinates (with scroll)
  console.log(e.screenX, e.screenY)     // screen coordinates
  console.log(e.button)                 // 0=left, 1=middle, 2=right
  console.log(e.ctrlKey, e.shiftKey, e.altKey, e.metaKey) // modifier keys
})

// Keyboard-specific:
document.addEventListener("keydown", (e) => {
  console.log(e.key)                    // "a", "Enter", "ArrowUp"
  console.log(e.code)                   // "KeyA", "Enter", "ArrowUp"
  console.log(e.repeat)                 // true if held down
  console.log(e.ctrlKey, e.shiftKey, e.altKey, e.metaKey)
  if (e.key === "Escape") { /* cancel */ }
})

// Touch-specific:
document.addEventListener("touchstart", (e) => {
  console.log(e.touches)                // all touch points
  console.log(e.changedTouches)          // changed in this event
  console.log(e.targetTouches)           // touches on this element
})


// 5. Event Flow — Bubbling vs Capturing
// ======================
// Capture phase  →  Target phase  →  Bubbling phase
// window  ↓                           ↑  window
// parent  ↓                           ↑  parent
// child   ↓   →  (target)  →          ↑  child

// Default: listeners fire in bubble phase (useCapture = false)
// Setting useCapture = true fires in capture phase

let parent = document.querySelector(".parent")
let childEl = document.querySelector(".child")

// Bubble (default):
parent.addEventListener("click", () => console.log("parent bubble"))
childEl.addEventListener("click", () => console.log("child bubble"))
// Click child → "child bubble" → "parent bubble"

// Capture:
parent.addEventListener("click", () => console.log("parent capture"), true)
childEl.addEventListener("click", () => console.log("child capture"), true)
// Click child → "parent capture" → "child capture"


// 6. preventDefault()
// ======================
// Stops the browser's default action for the event:
// - form submit: page reload
// - link click: navigate
// - checkbox click: toggle
// - right click: context menu
// - keypress: character input

form.addEventListener("submit", (e) => {
  e.preventDefault()
  // handle validation, submit via fetch
})

document.addEventListener("contextmenu", (e) => {
  e.preventDefault()
  // show custom context menu
})


// 7. stopPropagation vs stopImmediatePropagation
// ======================
// stopPropagation:
//   Prevents further propagation (bubble/capture)
//   Other listeners on SAME element still fire

// stopImmediatePropagation:
//   Prevents propagation AND stops other listeners on same element

btn.addEventListener("click", () => console.log("1 still fires"))
btn.addEventListener("click", (e) => {
  e.stopImmediatePropagation()
  console.log("2 stops all remaining")
})
btn.addEventListener("click", () => console.log("3 never runs"))


// 8. removeEventListener
// ======================
// Must pass the SAME function reference

function handleClick() { console.log("clicked") }
btn.addEventListener("click", handleClick)
btn.removeEventListener("click", handleClick)

// Anonymous functions CANNOT be removed:
// btn.addEventListener("click", () => {})
// Can't remove this listener


// 9. Listener Options
// ======================
btn.addEventListener("click", handler, {
  capture: false,      // use capture phase
  once: true,          // auto-remove after one fire
  passive: true        // indicates preventDefault will NOT be called
})

// passive: true is critical for scroll performance
// Browser can't optimize scroll without it

// once: automatically removes after first invocation


// 10. Triggering Events Programmatically
// ======================
// Using dispatchEvent:
btn.dispatchEvent(new Event("click"))

// With data:
btn.dispatchEvent(new CustomEvent("userAction", {
  detail: { userId: 123 }
}))

btn.addEventListener("userAction", (e) => {
  console.log(e.detail.userId) // 123
})


// 11. Summary
// ======================
// addEventListener: modern, multiple, options
// Event object: target, currentTarget, type, timeStamp, preventDefault, stopPropagation
// Capture/Bubble: capture → target → bubble
// preventDefault: stop browser default
// stopPropagation: stop parent handlers
// stopImmediatePropagation: stop all handlers including siblings
// Once: auto-remove after first fire
// Passive: mark as non-preventable for scroll perf
// dispatchEvent: fire events programmatically
