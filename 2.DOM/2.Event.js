// ==========================================================
// JAVASCRIPT EVENTS 
// INCLUDING BUBBLING & CAPTURING
// ==========================================================


// Events = things that happen in browser
// click, submit, input, scroll, keypress etc.


// Example HTML:
//
// <button id="btn">Click Me</button>
// <input id="name">
// <div id="parent">
//   <button id="child">Child Button</button>
// </div>




// ==================================================
// 1. INLINE EVENT (old way)
// ==================================================

/*
<button onclick="sayHi()">
Click
</button>
*/

function sayHi() {
    console.log("Hello");
    // Hello
}




// ==================================================
// 2. DOM PROPERTY EVENT
// ==================================================

let btn = document.getElementById("btn");

btn.onclick = function () {
    console.log("Button clicked");
    // Button clicked
};




// ==================================================
// 3. addEventListener()
// ==================================================
// preferred modern way

btn.addEventListener("click", function () {
    console.log("Clicked using listener");
    // Clicked using listener
});



// Arrow function
btn.addEventListener("click", () => {
    console.log("Arrow click");
    // Arrow click
});




// ==================================================
// 4. MULTIPLE LISTENERS
// ==================================================
// unlike onclick,
// multiple listeners can exist

btn.addEventListener("click", () => {
    console.log("First");
});

btn.addEventListener("click", () => {
    console.log("Second");
});

// click output:
// First
// Second




// ==================================================
// 5. COMMON EVENTS
// ==================================================

// click
btn.addEventListener("click", () => {
    console.log("clicked");
});


// dblclick
btn.addEventListener("dblclick", () => {
    console.log("double clicked");
});


// mouseover
btn.addEventListener("mouseover", () => {
    console.log("hover");
});


// mouseout
btn.addEventListener("mouseout", () => {
    console.log("mouse left");
});



// keyboard
document.addEventListener("keydown", (e) => {
    console.log(e.key);
    // if A pressed:
    // a
});



// input event
let input = document.getElementById("name");

input.addEventListener("input", (e) => {
    console.log(e.target.value);
    // prints typed value live
});




// ==================================================
// 6. EVENT OBJECT
// ==================================================

btn.addEventListener("click", (e) => {

    console.log(e.type);
    // click

    console.log(e.target);
    // clicked element

    console.log(e.currentTarget);
    // listener attached element

});




// ==================================================
// 7. preventDefault()
// ==================================================
// stops default browser action

/*
<form id="form">
<button type="submit">
Submit
</button>
</form>
*/

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    console.log("Form prevented");
    // Form prevented

});




// ==================================================
// 8. stopPropagation()
// ==================================================
// stops bubbling

let parent = document.getElementById("parent");
let child = document.getElementById("child");

parent.addEventListener("click", () => {
    console.log("Parent clicked");
});

child.addEventListener("click", (e) => {

    e.stopPropagation();

    console.log("Child clicked");
});

// clicking child:
// Child clicked

// parent won't run




// ==================================================
// 9. EVENT BUBBLING
// ==================================================
// default event flow
// child -> parent -> document

parent.addEventListener("click", () => {
    console.log("Parent");
});

child.addEventListener("click", () => {
    console.log("Child");
});


// click child output:
/// Child
/// Parent


// Why?
// event bubbles upward




// ==================================================
// 10. EVENT CAPTURING
// ==================================================
// reverse flow
// document -> parent -> child

parent.addEventListener("click", () => {
    console.log("Parent Capture");
},
    true
);

child.addEventListener("click", () => {
    console.log("Child Capture");
},
    true
);


// clicking child:

// Parent Capture
// Child Capture

// third parameter true enables capture




// ==================================================
// 11. EVENT FLOW
// ==================================================

// Phase 1 Capturing
// document ↓ parent ↓ child

// Phase 2 Target
// actual clicked element

// Phase 3 Bubbling
// child ↑ parent ↑ document




// ==================================================
// 12. BUBBLING vs CAPTURING
// ==================================================

// bubbling
child.addEventListener("click", () => console.log("Bubble"));

// capturing
child.addEventListener("click", () => console.log("Capture"), true);




// ==================================================
// 13. EVENT DELEGATION
// ==================================================
// attach one listener to parent
// handle child events through bubbling

/*
<ul id="list">
 <li>One</li>
 <li>Two</li>
</ul>
*/

let list = document.getElementById("list");

list.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {
        console.log(e.target.innerText);
    }

});

// clicking Two:
// Two



// Why use delegation?
// less memory
// dynamic elements work
// scalable




// ==================================================
// 14. removeEventListener()
// ==================================================

function handleClick() {
    console.log("clicked");
}

btn.addEventListener("click", handleClick);

btn.removeEventListener("click", handleClick);

// listener removed




// ==================================================
// 15. once option
// ==================================================

btn.addEventListener("click", () => {
    console.log("Runs once");
},
    { once: true }
);

// fires only first click




// ==================================================
// 16. PASSIVE EVENTS
// ==================================================
// improves scroll performance

window.addEventListener("scroll", () => {
    console.log("scroll");
},
    { passive: true }
);




// ==================================================
// 17. CUSTOM EVENTS
// ==================================================

let custom = new Event("hello");

document.addEventListener("hello", () => {
    console.log("Custom event fired");
}
);

document.dispatchEvent(custom);

// Custom event fired




// ==================================================
// 18. IMPORTANT DIFFERENCE
// ==================================================

// target
// actual clicked element

// currentTarget
// where listener attached




// ==================================================
// 19. SUMMARY
// ==================================================

// onclick
// addEventListener
// event object e
// preventDefault()
// stopPropagation()

// Bubbling:
// child -> parent

// Capturing:
// parent -> child

// Delegation:
// parent handles child events

// removeEventListener
// once
// passive
// custom events