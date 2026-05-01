// ==========================================================
// JAVASCRIPT SCOPES & CLOSURES
// ==========================================================



// ==================================================
// 1. WHAT IS SCOPE?
// ==================================================
// Scope = where a variable is accessible in code



// ==================================================
// 2. GLOBAL SCOPE
// ==================================================
let globalVar = "I am global";

function testGlobal() {
    console.log(globalVar);
    // I am global
}

testGlobal();



// ==================================================
// 3. FUNCTION SCOPE
// ==================================================
function funcScope() {
    let x = 10;
    console.log(x);
    // 10
}

funcScope();

// console.log(x); ❌ Error (x not accessible outside)



// ==================================================
// 4. BLOCK SCOPE (let, const)
// ==================================================
{
    let a = 5;
    const b = 10;
    console.log(a, b);
    // 5 10
}

// console.log(a); ❌ Error
// console.log(b); ❌ Error



// var is NOT block scoped
{
    var c = 20;
}
console.log(c);
// 20



// ==================================================
// 5. LEXICAL SCOPE (IMPORTANT)
// ==================================================
// Scope is determined by WHERE function is defined,
// not where it is called

function outer() {

    let outerVar = "outer";

    function inner() {
        console.log(outerVar);
        // outer
    }

    inner();
}

outer();



// ==================================================
// 6. NESTED SCOPE CHAIN
// ==================================================
let x = "global";

function A() {
    let x = "A";

    function B() {
        let x = "B";
        console.log(x);
        // B
    }

    B();
}

A();



// ==================================================
// 7. SCOPE CHAIN
// ==================================================
// JS looks for variable in:
// current scope → parent → global

let g = "global";

function parent() {
    let p = "parent";

    function child() {
        let c = "child";

        console.log(c); // child
        console.log(p); // parent
        console.log(g); // global
    }
    child();
}

parent();



// ==================================================
// 8. CLOSURE (CORE CONCEPT)
// ==================================================
// Closure = function + its lexical environment

function outerClosure() {

    let count = 0;

    function innerClosure() {
        count++;
        console.log(count);
    }

    return innerClosure;
}

let counter = outerClosure();

counter(); // 1
counter(); // 2
counter(); // 3



// Explanation:
// innerClosure remembers count
// even after outerClosure finished



// ==================================================
// 9. PRACTICAL CLOSURE EXAMPLE
// ==================================================
function createMultiplier(x) {

    return function (y) {
        return x * y;
    }

}

let double = createMultiplier(2);

console.log(double(5));
// 10



// ==================================================
// 10. PRIVATE VARIABLES USING CLOSURE
// ==================================================
function createCounter() {

    let count = 0;

    return {
        increment() {
            count++;
            console.log(count);
        },
        get() {
            console.log(count);
        }
    };

}

let c1 = createCounter();

c1.increment(); // 1
c1.increment(); // 2
c1.get();       // 2

// count is private (not directly accessible)



// ==================================================
// 11. COMMON CLOSURE INTERVIEW TRAP
// ==================================================

for (var i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);
}

// Output:
// 4
// 4
// 4

// because var is function scoped



// FIX using let

for (let i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);

}

// Output:
// 1
// 2
// 3



// ==================================================
// 12. LEXICAL vs DYNAMIC SCOPE
// ==================================================

// JAVASCRIPT USES LEXICAL SCOPE (NOT dynamic)

let name = "Global";

function show() {
    console.log(name);
}

function run() {
    let name = "Local";
    show();
}

run();
// Output:
// Global



// Why?
// Because show() was defined in global scope



// ==================================================
// 13. WHAT IS DYNAMIC SCOPE? (NOT IN JS)
// ==================================================
// In dynamic scope, value depends on WHERE function is called

// Hypothetical (NOT JS):

// run() → name = "Local"
// so output would be "Local"

// But JS DOES NOT work like this



// ==================================================
// 14. CLOSURE + LEXICAL COMBINED
// ==================================================

function outer() {
    let x = 10;

    return function inner() {
        console.log(x);
    };
}

let fn = outer();

fn();
// 10



// ==================================================
// 15. MEMORY NOTE
// ==================================================
// Closures keep variables in memory
// until references are removed

// avoid memory leaks in heavy apps



// ==================================================
// 16. SUMMARY
// ==================================================

// Scope:
// global
// function
// block

// Lexical scope:
// based on definition location

// Scope chain:
// inner → outer → global

// Closure:
// function remembers outer variables

// Uses:
// data hiding
// factory functions
// callbacks
// async code

// JS uses:
// lexical scope (NOT dynamic)