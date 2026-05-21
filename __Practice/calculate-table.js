
export function calculateTable(userInput) {
    let arr = [];
    for (let index = 1; index <= 10; index++) {
        arr.push(`${userInput} * ${index} = ${userInput * index}`);
    }
    return arr;
}