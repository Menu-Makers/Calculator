class CalculatorModel {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.history = [];
        this.expression = '';
        this.showingResult = false;
        
        this.taxRate = 0.13;
        this.discountRate = 0.15;
        this.tipRate = 0.18;
    }

    addNumber(number) {
        if (this.isInErrorState()) {
            this.clear();
        }
        
        if (this.shouldResetDisplay || this.showingResult) {
            this.currentInput = number;
            this.shouldResetDisplay = false;
            if (this.showingResult) {
                this.previousInput = '';
                this.operator = null;
                this.showingResult = false;
            }
        } else {
            const newInput = this.currentInput === '0' ? number : this.currentInput + number;

            if (newInput.length > 15) {
                this.handleError('Error');
                return;
            }
            
            this.currentInput = newInput;
        }

        this.updateExpression();
    }

    updateExpression() {
        if (this.showingResult) {
            return;
        }
        
        if (this.operator && this.previousInput) {
            if (this.shouldResetDisplay) {
                this.expression = `${this.previousInput} ${this.operator}`;
            } else {
                this.expression = `${this.previousInput} ${this.operator} ${this.currentInput}`;
            }
        } else {
            this.expression = this.currentInput;
        }
    }

    addDecimal() {
        if (this.isInErrorState()) {
            this.clear();
        }
        
        if (this.shouldResetDisplay || this.showingResult) {
            this.currentInput = '0.';
            this.shouldResetDisplay = false;
            if (this.showingResult) {
                this.previousInput = '';
                this.operator = null;
                this.showingResult = false;
            }
        } else if (this.currentInput.indexOf('.') === -1) {
            if (this.currentInput.length >= 15) {
                this.handleError('Error');
                return;
            }
            this.currentInput += '.';
        }
        
        this.updateExpression();
    }

    setOperator(operator) {
        if (this.isInErrorState()) {
            return;
        }
        
        if (this.operator !== null && !this.shouldResetDisplay && !this.showingResult) {
            this.calculate();
            if (this.isInErrorState()) {
                return;
            }
        }
        
        this.previousInput = this.currentInput;
        this.operator = operator;
        this.shouldResetDisplay = true;
        this.showingResult = false;
        this.updateExpression();
    }

    calculate() {
        if (this.operator === null || this.shouldResetDisplay) {
            return;
        }

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) {
            this.handleError('Error');
            return;
        }

        let result;
        const expression = `${prev} ${this.operator} ${current}`;

        try {
            switch (this.operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        if (prev === 0) {
                            this.handleError('Undefined');
                        } else {
                            this.handleError('Error');
                        }
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            if (!isFinite(result)) {
                if (isNaN(result)) {
                    this.handleError('Undefined');
                } else if (result === Infinity || result === -Infinity) {
                    this.handleError('Error');
                }
                return;
            }

            if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
                this.handleError('Error');
                return;
            }

            result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;

            this.addToHistory(`${expression} = ${result}`);
            
            this.currentInput = result.toString();
            this.expression = result.toString(); // Show only the result
            this.operator = null;
            this.previousInput = '';
            this.shouldResetDisplay = true;
            this.showingResult = true;

        } catch (error) {
            this.handleError('Error');
        }
    }

    handleError(errorMessage) {
        this.currentInput = errorMessage;
        this.expression = errorMessage;
        this.operator = null;
        this.previousInput = '';
        this.shouldResetDisplay = true;
        this.showingResult = true;
        this.addToHistory(`Error: ${errorMessage}`);
    }

    calculateTax() {
        const amount = parseFloat(this.currentInput);
        
        if (isNaN(amount)) {
            this.handleError('Error');
            return;
        }
        
        if (amount < 0) {
            this.handleError('Error');
            return;
        }
        
        if (amount > Number.MAX_SAFE_INTEGER) {
            this.handleError('Error');
            return;
        }
        
        try {
            const tax = amount * this.taxRate;
            const result = Math.round((tax + Number.EPSILON) * 100) / 100;
            
            if (!isFinite(result)) {
                this.handleError('Error');
                return;
            }
            
            this.addToHistory(`Tax (${this.taxRate * 100}%) on ${amount} = ${result}`);
            this.currentInput = result.toString();
            this.expression = result.toString(); 
            this.previousInput = '';
            this.operator = null;
            this.shouldResetDisplay = true;
            this.showingResult = true;
        } catch (error) {
            this.handleError('Error');
        }
    }

    applyDiscount() {
        const amount = parseFloat(this.currentInput);
        
        if (isNaN(amount)) {
            this.handleError('Error');
            return;
        }
        
        if (amount < 0) {
            this.handleError('Error');
            return;
        }
        
        if (amount > Number.MAX_SAFE_INTEGER) {
            this.handleError('Error');
            return;
        }
        
        try {
            const discount = amount * this.discountRate;
            const result = amount - discount;
            const finalResult = Math.round((result + Number.EPSILON) * 100) / 100;
            
            if (!isFinite(finalResult)) {
                this.handleError('Error');
                return;
            }
            
            this.addToHistory(`${amount} - ${this.discountRate * 100}% discount = ${finalResult}`);
            this.currentInput = finalResult.toString();
            this.expression = finalResult.toString(); 
            this.previousInput = '';
            this.operator = null;
            this.shouldResetDisplay = true;
            this.showingResult = true;
        } catch (error) {
            this.handleError('Error');
        }
    }

    calculateTip() {
        const amount = parseFloat(this.currentInput);
        
        if (isNaN(amount)) {
            this.handleError('Error');
            return;
        }
        
        if (amount < 0) {
            this.handleError('Error');
            return;
        }
        
        if (amount > Number.MAX_SAFE_INTEGER) {
            this.handleError('Error');
            return;
        }
        
        try {
            const tip = amount * this.tipRate;
            const result = Math.round((tip + Number.EPSILON) * 100) / 100;
            
            if (!isFinite(result)) {
                this.handleError('Error');
                return;
            }
            
            this.addToHistory(`Tip (${this.tipRate * 100}%) on ${amount} = ${result}`);
            this.currentInput = result.toString();
            this.expression = result.toString(); 
            this.previousInput = '';
            this.operator = null;
            this.shouldResetDisplay = true;
            this.showingResult = true;
        } catch (error) {
            this.handleError('Error');
        }
    }

    calculateTotal() {
        const amount = parseFloat(this.currentInput);
        
        if (isNaN(amount)) {
            this.handleError('Error');
            return;
        }
        
        if (amount < 0) {
            this.handleError('Error');
            return;
        }
        
        if (amount > Number.MAX_SAFE_INTEGER) {
            this.handleError('Error');
            return;
        }
        
        try {
            const tax = amount * this.taxRate;
            const tip = amount * this.tipRate;
            const total = amount + tax + tip;
            const result = Math.round((total + Number.EPSILON) * 100) / 100;
            
            if (!isFinite(result)) {
                this.handleError('Error');
                return;
            }
            
            this.addToHistory(`${amount} + tax + tip = ${result}`);
            this.currentInput = result.toString();
            this.expression = result.toString(); // Show only the result
            this.previousInput = '';
            this.operator = null;
            this.shouldResetDisplay = true;
            this.showingResult = true;
        } catch (error) {
            this.handleError('Error');
        }
    }

    backspace() {
        if (this.showingResult) {
            this.clear();
            return;
        }
        
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        
        this.updateExpression();
    }

    clearEntry() {
        if (this.showingResult) {
            this.clear();
            return;
        }
        
        this.currentInput = '0';
        this.shouldResetDisplay = false;

        this.updateExpression();
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.expression = '0';
        this.showingResult = false;
    }

    resetCalculator() {
        this.clear();
    }

    addToHistory(entry) {
        this.history.unshift(entry);
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
    }

    clearHistory() {
        this.history = [];
    }

    getDisplayValue() {
        return this.expression || this.currentInput;
    }

    getHistory() {
        return [...this.history]; 
    }

    isInErrorState() {
        return this.currentInput === 'Error' || this.currentInput === 'Undefined';
    }

    getState() {
        return {
            currentInput: this.currentInput,
            previousInput: this.previousInput,
            operator: this.operator,
            shouldResetDisplay: this.shouldResetDisplay,
            historyCount: this.history.length
        };
    }
}
