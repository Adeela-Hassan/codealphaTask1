// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let isNewInput = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.dataset.num) {
                handleNumber(button.dataset.num);
            }

            if (button.dataset.operator) {
                handleOperator(button.dataset.operator);
            }

            if (button.id === 'clear') {
                clear();
            }

            if (button.id === 'equals') {
                calculate();
            }
        });
    });

    function handleNumber(num) {
        if (isNewInput) {
            currentInput = num;
            isNewInput = false;
        } else {
            if (currentInput === '0' && num !== '.') {
                currentInput = num;
            } else if (currentInput.includes('.') && num === '.') {
                return;
            } else {
                currentInput += num;
            }
        }
        display.textContent = currentInput;
    }

    function handleOperator(op) {
        if (previousInput && operator && !isNewInput) {
            calculate();
        } else {
            previousInput = currentInput;
        }
        operator = op;
        isNewInput = true;
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        display.textContent = currentInput;
    }

    function calculate() {
        let result;
        const current = parseFloat(currentInput);
        const previous = parseFloat(previousInput);

        if (isNaN(current) || isNaN(previous)) return;

        switch(operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        isNewInput = true;
        display.textContent = currentInput;
    }
});
