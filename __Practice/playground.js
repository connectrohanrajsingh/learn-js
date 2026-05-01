// lexical vs dynamic scoping
// let x = 10;

// function inner() {
//     document.querySelector("#output").textContent = x;
//     return;
// }

// function outer() {
//     let x = 20;
//     inner();
//     return;
// }
// outer();


// ===============================================================================


// scope example
document.querySelector("#output").textContent = '';
for (var i = 1; i < 3; i++) {
    setTimeout(() => {
        document.querySelector("#output").textContent += i;
    }, 1000);
}
