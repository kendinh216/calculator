class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperandElement = '';
        this.previousOperandElement = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperandElement = this.currentOperandElement.substring(0, this.currentOperandElement.length -1);
    }

    appendNumnber(number){
        if (number === '.' && this.currentOperandElement.includes('.')) return;
        this.currentOperandElement = this.currentOperandElement.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperandElement === '') return;
        if (this.previousOperandElement !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperandElement = this.currentOperandElement;
        this.currentOperandElement = '';
    }

    compute(){
        let result;
        let prev = parseFloat(this.previousOperandElement);
        let curr = parseFloat(this.currentOperandElement);
        if (isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperandElement = result;
        this.previousOperandElement = '';
        this.operation = undefined;
    }

    getDisplayNumber(number){
        const stringNumer = number.toString();
        const integerDigits = parseFloat(stringNumer.split('.')[0]);
        const decimalDigits = stringNumer.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits))
            integerDisplay = '';
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null){
            return `${integerDigits}.${decimalDigits}`;
        }
        else
            return integerDisplay;
            
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperandElement);
        if (this.operation === undefined){
            this.previousOperandTextElement.innerText = '';
        } 
        else
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperandElement)} ${this.operation}`;
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumnber(button.innerText);
        calculator.updateDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
        calculator.clear();
        calculator.updateDisplay();
})

deleteButton.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay();
})