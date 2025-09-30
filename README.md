# Menu-Makers Calculator - MVC Architecture Implementation

## Overview

This calculator application demonstrates the **Model-View-Controller (MVC)** architectural pattern, specifically designed for the Menu-Makers application to help users calculate costs, discounts, taxes, and tips.

## Architecture Overview

The application is structured using the MVC pattern to ensure scalability, maintainability, and separation of concerns:

### 🏗️ **Model** (`js/model/CalculatorModel.js`)
- **Responsibility**: Data management and business logic
- **Features**:
  - Handles all calculation operations
  - Manages calculation history
  - Implements Menu-Makers specific functions (tax, discount, tip calculations)
  - Validates input data
  - Maintains application state

### 🎨 **View** (`js/view/CalculatorView.js`)
- **Responsibility**: User interface and user interactions
- **Features**:
  - Manages DOM elements and event listeners
  - Updates display and history
  - Handles keyboard input
  - Provides visual feedback and notifications
  - Responsive design implementation

### 🎮 **Controller** (`js/controller/CalculatorController.js`)
- **Responsibility**: Coordinates between Model and View
- **Features**:
  - Processes user input and delegates to appropriate model methods
  - Updates view based on model changes
  - Handles error states and validation
  - Manages application flow and business rules

## Features

### Basic Calculator Functions
- ➕ Addition, ➖ Subtraction, ✖️ Multiplication, ➗ Division
- 🔢 Decimal number support
- ⌫ Backspace and clear functions
- ⌨️ Full keyboard support

### Menu-Makers Special Functions
- 💰 **Tax Calculation** (10%): Calculate tax on menu items
- 🏷️ **Discount Application** (15%): Apply standard discount
- 💡 **Tip Calculation** (18%): Calculate recommended tip
- 📊 **Total Calculator**: Calculate total with tax and tip included

### Advanced Features
- 📝 Calculation history (last 10 calculations)
- 🎨 Modern, responsive UI design
- 🔔 Toast notifications for user feedback
- ⌨️ Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z)
- 📱 Mobile-friendly design
- ❌ Comprehensive error handling

## File Structure

```
calculator/
├── index.html                          # Main HTML file
├── styles/
│   └── style.css                      # CSS styles and responsive design
├── js/
│   ├── model/
│   │   └── CalculatorModel.js         # Model component
│   ├── view/
│   │   └── CalculatorView.js          # View component
│   ├── controller/
│   │   └── CalculatorController.js    # Controller component
│   └── app.js                         # Application initialization
└── README.md                          # This documentation
```

## How to Run

1. **Open the Application**:
   - Open `index.html` in a modern web browser
   - No server setup required - runs entirely in the browser

2. **Use the Calculator**:
   - Click number buttons or use keyboard input
   - Use operators (+, -, *, /) for basic calculations
   - Try Menu-Makers special functions for business calculations

3. **Keyboard Shortcuts**:
   - `0-9`: Number input
   - `+`, `-`, `*`, `/`: Operations
   - `Enter` or `=`: Calculate result
   - `Escape`: Clear calculator
   - `Backspace`: Remove last digit
   - `Ctrl+C`: Copy result to clipboard
   - `Ctrl+V`: Paste number from clipboard

## MVC Implementation Details

### Data Flow
1. **User Interaction** → View captures input
2. **View** → Controller processes the input
3. **Controller** → Model updates data/performs calculations
4. **Model** → Controller receives results
5. **Controller** → View updates display

### Separation of Concerns
- **Model**: Never directly interacts with the DOM
- **View**: Never performs calculations or business logic
- **Controller**: Acts as the mediator, keeping Model and View decoupled

### Benefits of This Architecture
- 🔧 **Maintainability**: Easy to modify individual components
- 🧪 **Testability**: Each component can be tested independently
- 📈 **Scalability**: Easy to add new features without affecting existing code
- 🔄 **Reusability**: Components can be reused in other applications
- 👥 **Team Development**: Multiple developers can work on different components

## Development and Debugging

### Browser Console Commands
```javascript
// Get application info
window.MenuMakersCalculator.getInfo()

// Get current state
window.MenuMakersCalculator.getState()

// Run diagnostics
window.MenuMakersCalculator.runDiagnostics()

// Access MVC components directly
window.calculatorApp.model
window.calculatorApp.view
window.calculatorApp.controller
```

### Development Mode
When running on localhost, additional debugging tools are available:
```javascript
// Development helpers
window.dev.showState()  // Show current state
window.dev.runTests()   // Run diagnostics
window.dev.info()       // Get app info
```

## Menu-Makers Integration

This calculator is designed to integrate seamlessly into the larger Menu-Makers application:

### Business Logic
- **Tax Rate**: 10% (configurable in model)
- **Discount Rate**: 15% (configurable in model)
- **Tip Rate**: 18% (configurable in model)

### Integration Points
- Export calculation results for order processing
- Import values from menu items
- History tracking for audit purposes

## Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- 📱 Mobile browsers (iOS Safari, Chrome Mobile)

## Code Quality Features

- 📋 **JSDoc Documentation**: Comprehensive code documentation
- 🛡️ **Error Handling**: Robust error handling throughout
- 🧹 **Clean Code**: Follows best practices and coding standards
- 🔒 **Input Validation**: Validates all user input
- 🎯 **Single Responsibility**: Each class has a single, well-defined purpose

## Future Enhancements

Potential improvements that maintain the MVC pattern:
- 💾 Local storage for persistent history
- 🌐 API integration for real-time tax rates
- 📊 Advanced calculation functions
- 🎨 Theme customization
- 📈 Usage analytics
- 🔄 Calculation import/export

## Learning Objectives Met

This implementation demonstrates:
1. ✅ **MVC Architectural Pattern**: Clear separation of Model, View, and Controller
2. ✅ **Industry Standards**: Following established patterns and best practices
3. ✅ **Scalability**: Architecture supports easy feature additions
4. ✅ **Maintainability**: Clean, documented, and organized code
5. ✅ **User Experience**: Modern, intuitive interface design

---

**Built for Menu-Makers Development Team**  
*Demonstrating MVC architectural pattern implementation*
