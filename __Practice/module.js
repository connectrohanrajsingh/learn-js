// let makeTable = import("./calculate-table.js");

import { calculateTable } from "./calculate-table.js";

let renderBtn = document.querySelector("#render");

renderBtn.addEventListener('click', function () {
    let userInput = document.querySelector("#userinput").value;
    console.log(userInput);
    if (userInput.length == 0) {
        return;
    }

    let calculateArray = calculateTable(userInput);

    let ul = document.querySelector("#counter");
    ul.textContent = '';

    calculateArray.forEach(element => {
        let li = document.createElement('li');
        li.textContent = element;
        ul.append(li);
    });

});
