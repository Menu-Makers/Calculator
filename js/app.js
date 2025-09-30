
document.addEventListener('DOMContentLoaded', function() {
    try {
        const model = new CalculatorModel();
        const view = new CalculatorView();
        const controller = new CalculatorController(model, view);
        window.calculatorApp = {
            model: model,
            view: view,
            controller: controller,
            version: '1.0.0',
            architecture: 'MVC'
        };
        document.addEventListener('keydown', (event) => {
            controller.handleKeyboardShortcut(event);
        });
        addApplicationMetadata();
        view.showNotification('Welcome to Menu-Makers Calculator!', 'success');
   
    } catch (error) {
        console.error('❌ Error initializing calculator:', error);
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #e74c3c;
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Segoe UI', sans-serif;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = 'Error: Calculator failed to initialize. Please refresh the page.';
        document.body.appendChild(errorDiv);
    }
});

function addApplicationMetadata() {
    const versionInfo = document.createElement('div');
    versionInfo.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 0.8em;
        color: #666;
        background: rgba(255,255,255,0.8);
        padding: 5px 10px;
        border-radius: 15px;
        backdrop-filter: blur(5px);
    `;
    versionInfo.textContent = 'Menu-Makers Calculator v1.0.0';
    document.body.appendChild(versionInfo);
    const metaTags = [
        { name: 'application-name', content: 'Menu-Makers Calculator' },
        { name: 'description', content: 'A calculator application built with MVC architecture for Menu-Makers' },
        { name: 'version', content: '1.0.0' },
        { name: 'architecture', content: 'Model-View-Controller' },
        { name: 'author', content: 'Menu-Makers Development Team' }
    ];
    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}

window.MenuMakersCalculator = {
   
    getInfo: function() {
        return {
            name: 'Menu-Makers Calculator',
            version: '1.0.0',
            architecture: 'Model-View-Controller (MVC)',
            features: [
                'Basic arithmetic operations',
                'Tax calculation (10%)',
                'Discount application (15%)',
                'Tip calculation (18%)',
                'Total with tax and tip',
                'Calculation history',
                'Keyboard support',
                'Responsive design',
                'Error handling',
                'Clipboard integration'
            ],
            components: {
                model: 'Handles data and business logic',
                view: 'Manages user interface and interactions',
                controller: 'Coordinates between model and view'
            }
        };
    },
 
    exportData: function() {
        if (window.calculatorApp) {
            return window.calculatorApp.controller.exportResult();
        }
        return null;
    },
    
    importCalculation: function(expression) {
        if (window.calculatorApp) {
            window.calculatorApp.controller.importCalculation(expression);
        }
    },
    
    reset: function() {
        if (window.calculatorApp) {
            window.calculatorApp.controller.reset();
        }
    },
    
    getState: function() {
        if (window.calculatorApp) {
            return window.calculatorApp.controller.getState();
        }
        return null;
    },
    
    runDiagnostics: function() {
      
        const results = {
            timestamp: new Date().toISOString(),
            components: {
                model: typeof CalculatorModel !== 'undefined',
                view: typeof CalculatorView !== 'undefined',
                controller: typeof CalculatorController !== 'undefined'
            },
            dom: {
                display: !!document.getElementById('display'),
                buttons: document.querySelectorAll('.btn').length,
                historyList: !!document.getElementById('history-list')
            },
            application: !!window.calculatorApp
        };
       
        const allGood = Object.values(results.components).every(x => x) && 
                       results.dom.display && 
                       results.dom.buttons > 0 && 
                       results.dom.historyList && 
                       results.application;
       
        return results;
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
       
    });
}

window.addEventListener('error', function(event) {

    if (window.calculatorApp && window.calculatorApp.view) {
        window.calculatorApp.view.showNotification('An unexpected error occurred', 'error');
    }
});

window.addEventListener('unhandledrejection', function(event) {
   
    if (window.calculatorApp && window.calculatorApp.view) {
        window.calculatorApp.view.showNotification('An unexpected error occurred', 'error');
    }
    event.preventDefault();
});
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  
    window.dev = {
        showState: () => window.MenuMakersCalculator.getState(),
        runTests: () => window.MenuMakersCalculator.runDiagnostics(),
        info: () => window.MenuMakersCalculator.getInfo()
    };
}
