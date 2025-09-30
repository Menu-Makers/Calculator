class CalculatorView {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.historyListElement = document.getElementById('history-list');
        this.clearHistoryButton = document.getElementById('clear-history');

        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => {
                const number = e.target.dataset.number;
                this.onNumberClick(number);
            });
        });

        document.querySelectorAll('[data-operation]').forEach(button => {
            button.addEventListener('click', (e) => {
                const operation = e.target.dataset.operation;
                this.onOperatorClick(operation);
            });
        });

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.onActionClick(action);
            });
        });

        document.querySelectorAll('[data-special]').forEach(button => {
            button.addEventListener('click', (e) => {
                const special = e.target.dataset.special;
                this.onSpecialClick(special);
            });
        });

        this.clearHistoryButton.addEventListener('click', () => {
            this.onClearHistoryClick();
        });

        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });

        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    handleKeyboardInput(event) {
        const key = event.key;

        if ('0123456789+-*/.='.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
            event.preventDefault();
        }

        if ('0123456789'.includes(key)) {
            this.onNumberClick(key);
        }

        else if (key === '+') {
            this.onOperatorClick('+');
        }
        else if (key === '-') {
            this.onOperatorClick('-');
        }
        else if (key === '*') {
            this.onOperatorClick('*');
        }
        else if (key === '/') {
            this.onOperatorClick('/');
        }
  
        else if (key === '.' || key === ',') {
            this.onActionClick('decimal');
        }
        else if (key === '=' || key === 'Enter') {
            this.onActionClick('equals');
        }
        else if (key === 'Escape') {
            this.onActionClick('clear');
        }
        else if (key === 'Backspace') {
            this.onActionClick('backspace');
        }
    }

    updateDisplay(value) {
        this.displayElement.value = value;
        
        if (value === 'Error' || value === 'Undefined') {
            this.displayElement.style.color = '#e74c3c';
            this.displayElement.style.backgroundColor = '#fdf2f2';
            this.displayElement.style.border = '2px solid #e74c3c';
            this.displayElement.style.fontWeight = 'bold';
           
            this.displayElement.classList.add('error-shake');
            setTimeout(() => {
                this.displayElement.classList.remove('error-shake');
            }, 600);
        } else {
            this.displayElement.style.color = '#0f2236';
            this.displayElement.style.backgroundColor = 'linear-gradient(145deg, #f8fffe 0%, #eafffe 100%)';
            this.displayElement.style.border = '2px solid #26d0ce';
            this.displayElement.style.fontWeight = '600';
        }
    }

    updateHistory(history) {
        this.historyListElement.innerHTML = '';
        
        if (history.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No calculations yet';
            emptyItem.style.fontStyle = 'italic';
            emptyItem.style.color = '#999';
            this.historyListElement.appendChild(emptyItem);
            return;
        }

        history.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = entry;
            listItem.style.animationDelay = `${index * 0.1}s`;
            listItem.classList.add('history-item');
            this.historyListElement.appendChild(listItem);
        });
    }

    addButtonFeedback(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
        }, 100);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #fd7e7e, #e17055)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #fdcb6e, #e17055)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    highlightSpecialFunction(functionType) {
        const button = document.querySelector(`[data-special="${functionType}"]`);
        if (button) {
            button.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
            button.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                button.style.background = '';
                button.style.transform = '';
            }, 200);
        }
    }

    setEventHandlers(handlers) {
        this.onNumberClick = handlers.onNumberClick || this.onNumberClick;
        this.onOperatorClick = handlers.onOperatorClick || this.onOperatorClick;
        this.onActionClick = handlers.onActionClick || this.onActionClick;
        this.onSpecialClick = handlers.onSpecialClick || this.onSpecialClick;
        this.onClearHistoryClick = handlers.onClearHistoryClick || this.onClearHistoryClick;
    }

    getElements() {
        return {
            display: this.displayElement,
            historyList: this.historyListElement,
            clearHistoryButton: this.clearHistoryButton
        };
    }

    focusDisplay() {
        this.displayElement.focus();
    }

    setButtonsEnabled(enabled) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.disabled = !enabled;
            button.style.opacity = enabled ? '1' : '0.5';
        });
    }

    showLoading() {
        this.updateDisplay('Calculating...');
        this.setButtonsEnabled(false);
    }

    hideLoading() {
        this.setButtonsEnabled(true);
    }
}
