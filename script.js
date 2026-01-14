
let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let currentNumber = "0";
let firstNumber = null;
let currentOperator = null;
let isSecondNumber = false;

function showDisplay() {
    display.value = currentNumber;
}

function pressNumber(num) {
    if (isSecondNumber) {
        currentNumber = num;
        isSecondNumber = false;
    } else {
        if (currentNumber === "0") {
            currentNumber = num;
        } else {
            currentNumber += num;
        }
    }
    showDisplay();
}

function pressDecimal() {
    if (isSecondNumber) {
        currentNumber = "0.";
        isSecondNumber = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }
    showDisplay();
}

function clearAll() {
    currentNumber = "0";
    firstNumber = null;
    currentOperator = null;
    isSecondNumber = false;
    showDisplay();
}

function deleteOne() {
    if (currentNumber.length === 1 || currentNumber === "Error") {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }
    showDisplay();
}

function percent() {
    currentNumber = String(Number(currentNumber) / 100);
    showDisplay();
}

function pressOperator(op) {
    if (firstNumber !== null && currentOperator !== null && !isSecondNumber) {
        calculateResult();
    }
    firstNumber = Number(currentNumber);
    currentOperator = op;
    isSecondNumber = true;
}

function calculateResult() {
    if (firstNumber === null || currentOperator === null) return;

    let secondNumber = Number(currentNumber);
    let result = 0;

    if (currentOperator === "+") result = firstNumber + secondNumber;
    if (currentOperator === "-") result = firstNumber - secondNumber;
    if (currentOperator === "X") result = firstNumber * secondNumber;
    if (currentOperator === "/") {
        result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
    }

    currentNumber = String(result);
    firstNumber = null;
    currentOperator = null;
    isSecondNumber = false;
    showDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        if (button.classList.contains("number")) {
            pressNumber(value);
        }
        else if (button.classList.contains("decimal")) {
            pressDecimal();
        }
        else if (button.classList.contains("operator")) {
            if (value === "%") {
                percent();
            } else {
                pressOperator(value);
            }
        }
        else if (button.classList.contains("equals")) {
            calculateResult();
        }
        else if (value === "AC") {
            clearAll();
        }
        else if (value === "DEL") {
            deleteOne();
        }
    });
});

showDisplay();
