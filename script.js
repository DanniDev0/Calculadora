const display = document.getElementById("display");
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

display.textContent = '0';

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0) return "Error";
    return a / b;
}

function operate(operator, a, b){
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    
    if (isNaN(num1) || isNaN(num2)) return '';

    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
        default:
            return null;
    }
    
    if (result === "Error") return result;
    
    return Math.round(result * 100000) / 100000;
}

const numberButtons = document.querySelectorAll('.btn:not(.btn-op):not(.btnClear):not(.btnDelete):not(.btn-equal)');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent === '0' || display.textContent === "Error" || shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false; 
        }
        if (button.textContent === '.' && display.textContent.includes('.'))
        if (button.textContent === '.' && display.textContent === '') {
            display.textContent = '0';
        }
        
        display.textContent += button.textContent;
    });
});

const operatorButtons = document.querySelectorAll('.btn-op');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent === "Error") return;
        if (currentOperation !== null && !shouldResetDisplay) {
            secondOperand = display.textContent;
            let result = operate(currentOperation, firstOperand, secondOperand);
            display.textContent = result;
            firstOperand = result;
        } else {
            firstOperand = display.textContent;
        }
        
        currentOperation = button.textContent;
        shouldResetDisplay = true;
    });
});

const equalButton = document.querySelector('.btn-equal');

equalButton.addEventListener('click', () => {
    if (currentOperation === null || shouldResetDisplay || display.textContent === "Error") return;
    
    secondOperand = display.textContent;
    let result = operate(currentOperation, firstOperand, secondOperand);

    display.textContent = result;
    firstOperand = result;
    currentOperation = null;
    shouldResetDisplay = true;
});

const clearButton = document.querySelector('.btnClear');
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    shouldResetDisplay = false;
});

const deleteButton = document.querySelector('.btnDelete');
deleteButton.addEventListener('click', () => {
    if (shouldResetDisplay || display.textContent === "Error") return;
    display.textContent = display.textContent.toString().slice(0, -1);
    if (display.textContent === '' || display.textContent === '-') {
        display.textContent = '0';
    }
});