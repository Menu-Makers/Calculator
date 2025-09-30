class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.bindEventHandlers();
        this.updateDisplay();
        this.updateHistory();
    }

   
    bindEventHandlers() {
        this.view.setEventHandlers({
            onNumberClick: this.handleNumberInput.bind(this),
            onOperatorClick: this.handleOperatorInput.bind(this),
            onActionClick: this.handleActionInput.bind(this),
            onSpecialClick: this.handleSpecialFunction.bind(this),
            onClearHistoryClick: this.handleClearHistory.bind(this)
        });
    }

    handleNumberInput(number) {
        try {
            if (this.model.isInErrorState()) {
                this.model.clear();
            }
            
            this.model.addNumber(number);
            this.updateDisplay();
            
            const button = document.querySelector(`[data-number="${number}"]`);
            if (button) {
                this.view.addButtonFeedback(button);
            }
            
        } catch (error) {
            console.error('Error handling number input:', error);
            this.view.showNotification('Error processing number input', 'error');
        }
    }


    handleOperatorInput(operator) {
        try {
            
            if (this.model.isInErrorState()) {
                this.model.clear();
                return;
            }
            
            this.model.setOperator(operator);
            this.updateDisplay();
            this.updateHistory();
            
            const button = document.querySelector(`[data-operation="${operator}"]`);
            if (button) {
                this.view.addButtonFeedback(button);
            }
            
        } catch (error) {
            console.error('Error handling operator input:', error);
            this.view.showNotification('Error processing operator', 'error');
        }
    }

    handleActionInput(action) {
        try {
            switch (action) {
                case 'equals':
                    this.handleEquals();
                    break;
                    
                case 'clear':
                    this.handleClear();
                    break;
                    
                case 'clear-entry':
                    this.handleClearEntry();
                    break;
                    
                case 'decimal':
                    this.handleDecimal();
                    break;
                    
                case 'backspace':
                    this.handleBackspace();
                    break;
                    
                default:
                    console.warn('Unknown action:', action);
            }
            
            const button = document.querySelector(`[data-action="${action}"]`);
            if (button) {
                this.view.addButtonFeedback(button);
            }
            
        } catch (error) {
            console.error('Error handling action input:', error);
            this.view.showNotification('Error processing action', 'error');
        }
    }

   
    handleSpecialFunction(functionType) {
        try {
            if (this.model.isInErrorState()) {
                this.model.clear();
                return;
            }
            
            const currentValue = parseFloat(this.model.getDisplayValue());
            
            if (isNaN(currentValue)) {
                this.view.showNotification('Please enter a valid number first', 'warning');
                return;
            }
            
            switch (functionType) {
                case 'tax':
                    this.model.calculateTax();
                    this.view.showNotification('Tax calculated (13%)', 'success');
                    break;
                    
                case 'discount':
                    this.model.applyDiscount();
                    this.view.showNotification('Discount applied (15%)', 'success');
                    break;
                    
                case 'tip':
                    this.model.calculateTip();
                    this.view.showNotification('Tip calculated (18%)', 'success');
                    break;
                    
                case 'total':
                    this.model.calculateTotal();
                    this.view.showNotification('Total with tax and tip calculated', 'success');
                    break;
                    
                default:
                    console.warn('Unknown special function:', functionType);
                    return;
            }
            
            this.updateDisplay();
            this.updateHistory();
            this.view.highlightSpecialFunction(functionType);
            
        } catch (error) {
            console.error('Error handling special function:', error);
            this.view.showNotification('Error processing special function', 'error');
        }
    }

    handleEquals() {
        if (this.model.isInErrorState()) {
            this.model.clear();
            return;
        }
        
        this.model.calculate();
        this.updateDisplay();
        this.updateHistory();
    }

    handleClear() {
        this.model.clear();
        this.updateDisplay();
        this.view.showNotification('Calculator cleared', 'info');
    }

    handleClearEntry() {
        this.model.clearEntry();
        this.updateDisplay();
    }

    handleDecimal() {
        if (this.model.isInErrorState()) {
            this.model.clear();
        }
        
        this.model.addDecimal();
        this.updateDisplay();
    }

    handleBackspace() {
        if (this.model.isInErrorState()) {
            this.model.clear();
            this.updateDisplay();
            return;
        }
        
        this.model.backspace();
        this.updateDisplay();
    }

    handleClearHistory() {
        this.model.clearHistory();
        this.updateHistory();
        this.view.showNotification('History cleared', 'info');
    }

    updateDisplay() {
        const displayValue = this.model.getDisplayValue();
        this.view.updateDisplay(displayValue);
    }

    updateHistory() {
        const history = this.model.getHistory();
        this.view.updateHistory(history);
    }

    getState() {
        return {
            model: this.model.getState(),
            display: this.model.getDisplayValue(),
            history: this.model.getHistory()
        };
    }

    reset() {
        this.model.resetCalculator();
        this.updateDisplay();
        this.updateHistory();
        this.view.showNotification('Calculator reset', 'info');
    }

    importCalculation(expression) {
        try {
            
            const operators = ['+', '-', '*', '/'];
            let operator = null;
            let operatorIndex = -1;
            
            for (let i = expression.length - 1; i >= 0; i--) {
                if (operators.includes(expression[i]) && i > 0) {
                    operator = expression[i];
                    operatorIndex = i;
                    break;
                }
            }
            
            if (operator && operatorIndex > 0) {
                const num1 = expression.substring(0, operatorIndex).trim();
                const num2 = expression.substring(operatorIndex + 1).trim();
                
                this.model.clear();
                this.model.addNumber(num1);
                this.model.setOperator(operator);
                this.model.addNumber(num2);
                this.model.calculate();
                
                this.updateDisplay();
                this.updateHistory();
                
                this.view.showNotification('Calculation imported successfully', 'success');
            } else {
                this.model.clear();
                this.model.addNumber(expression.trim());
                this.updateDisplay();
            }
            
        } catch (error) {
            console.error('Error importing calculation:', error);
            this.view.showNotification('Error importing calculation', 'error');
        }
    }

    exportResult() {
        const result = this.model.getDisplayValue();
        const history = this.model.getHistory();
        
        return {
            result: result,
            lastCalculation: history.length > 0 ? history[0] : null,
            timestamp: new Date().toISOString()
        };
    }

    validateInput(input) {
        const numberRegex = /^-?\d*\.?\d*$/;
        return numberRegex.test(input);
    }

    handleKeyboardShortcut(event) {
        if (event.ctrlKey && event.key === 'c') {
            event.preventDefault();
            this.copyResultToClipboard();
        }
        
        else if (event.ctrlKey && event.key === 'v') {
            event.preventDefault();
            this.pasteFromClipboard();
        }
        
        else if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            this.undoLastOperation();
        }
    }

    async copyResultToClipboard() {
        try {
            const result = this.model.getDisplayValue();
            await navigator.clipboard.writeText(result);
            this.view.showNotification('Result copied to clipboard', 'success');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            this.view.showNotification('Error copying to clipboard', 'error');
        }
    }

    async pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            if (this.validateInput(text)) {
                this.model.clear();
                this.model.addNumber(text);
                this.updateDisplay();
                this.view.showNotification('Number pasted from clipboard', 'success');
            } else {
                this.view.showNotification('Clipboard content is not a valid number', 'warning');
            }
        } catch (error) {
            console.error('Error pasting from clipboard:', error);
            this.view.showNotification('Error pasting from clipboard', 'error');
        }
    }

    undoLastOperation() {
        this.view.showNotification('Undo functionality not implemented yet', 'info');
    }
}
