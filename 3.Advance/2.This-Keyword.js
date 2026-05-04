// ==========================================================
// "this" WITH call, apply, bind
// ==========================================================


// ==================================================
// 1. WHY WE NEED call / apply / bind
// ==================================================
// "this" depends on HOW function is called
// Sometimes we want to FORCE "this" manually



// ==================================================
// 2. BASIC FUNCTION
// ==================================================

function show() {
    console.log(this.name);
}



// ==================================================
// 3. call()
// ==================================================
// call → immediately invokes function
// and sets "this"

let user1 = {
    name: "Rohan"
};

show.call(user1);
// Rohan

// Explanation:
// this = user1



// ==================================================
// 4. call() with arguments
// ==================================================

function greet(age) {
    console.log(this.name, age);
}

let user2 = { name: "Amit" };

greet.call(user2, 22);
// Amit 22

// call(obj, arg1, arg2...)



// ==================================================
// 5. apply()
// ==================================================
// apply = same as call BUT arguments in array

greet.apply(user2, [25]);
// Amit 25

// call → comma separated
// apply → array



// ==================================================
// 6. bind()
// ==================================================
// bind does NOT call function immediately
// it returns a NEW function

let boundFunc = show.bind(user1);

boundFunc();
// Rohan

// "this" permanently fixed to user1



// ==================================================
// 7. bind() with arguments
// ==================================================

let greetBound = greet.bind(user2, 30);

greetBound();
// Amit 30

// preset arguments also possible



// ==================================================
// 8. REAL PROBLEM (LOST this)
// ==================================================

let person = {
    name: "Ravi",
    show: function () {
        console.log(this.name);
    }
};

let fn = person.show;

fn();
// undefined

// why?
// function is detached from object



// ==================================================
// 9. FIX USING bind()
// ==================================================

let fixed = person.show.bind(person);

fixed();
// Ravi



// ==================================================
// 10. call vs apply vs bind (SUMMARY)
// ==================================================

// call → runs immediately
// apply → runs immediately (args array)
// bind → returns new function (no immediate run)



// ==================================================
// 11. VISUAL UNDERSTANDING
// ==================================================

// call()
// "run now with this = X"

// apply()
// "run now with this = X (array args)"

// bind()
// "remember this = X for later"



// ==================================================
// 12. EVENT + THIS EXAMPLE (IMPORTANT)
// ==================================================

let btn = document.getElementById("btn");

function clickHandler() {
    console.log(this);
}

// normal function → this = button

btn.addEventListener("click", clickHandler);

// arrow function loses this
btn.addEventListener("click", () => {
    console.log(this);
});



// ==================================================
// 13. PRACTICAL PATTERN
// ==================================================

let obj = {
    name: "Rohan"
};

function print() {
    console.log(this.name);
}

setTimeout(print.bind(obj), 1000);
// Rohan

// bind fixes "this" inside async code



// ==================================================
// 14. GOLDEN RULE
// ==================================================

// call → execute now
// apply → execute now (array args)
// bind → execute later with fixed this



// ==================================================
// 15. FINAL MEMORY TRICK
// ==================================================

// call → "call now"
// apply → "array call now"
// bind → "bind and save for later"