let firstOperand = "";
let operator = "";
let secondOperand = "";
let currentInput = "";
const display = document.querySelector(".display");

// Basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

// Operate function
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

// Event listeners for number buttons
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    display.textContent = currentInput;
  });
});

// Event listener for decimal button
document.querySelector(".decimal").addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    // Check if decimal already exists
    currentInput += ".";
    display.textContent = currentInput;
  }
});

// Event listener for operator buttons
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    if (firstOperand !== "" && secondOperand !== "") {
      const result = operate(
        operator,
        parseFloat(firstOperand),
        parseFloat(secondOperand)
      );
      display.textContent = result;
      firstOperand = result.toString();
      secondOperand = "";
      currentInput = "";
    }
    operator = button.textContent;
    firstOperand = currentInput;
    currentInput = "";
  });
});

// Event listener for equals button
document.querySelector(".equals").addEventListener("click", () => {
  if (firstOperand !== "" && currentInput !== "") {
    secondOperand = currentInput;
    const result = operate(
      operator,
      parseFloat(firstOperand),
      parseFloat(secondOperand)
    );
    display.textContent = result;
    firstOperand = result.toString();
    secondOperand = "";
    currentInput = "";
  }
});

// Event listener for clear button
document.querySelector(".clear").addEventListener("click", () => {
  firstOperand = "";
  operator = "";
  secondOperand = "";
  currentInput = "";
  display.textContent = "0";
});

// Event listener for backspace button
document.querySelector(".backspace").addEventListener("click", () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1); // Remove last character
    display.textContent = currentInput;
  }
});

// Event listener for keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Handle numeric keys and decimal
  if (!isNaN(key) || key === ".") {
    if (key === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    currentInput += key;
    display.textContent = currentInput;
  }

  // Handle operator keys
  if (["+", "-", "*", "/"].includes(key)) {
    if (firstOperand !== "" && secondOperand !== "") {
      const result = operate(
        operator,
        parseFloat(firstOperand),
        parseFloat(secondOperand)
      );
      display.textContent = result;
      firstOperand = result.toString();
      secondOperand = "";
      currentInput = "";
    }
    operator = key;
    firstOperand = currentInput;
    currentInput = "";
  }

  // Handle equals key
  if (key === "=" || key === "Enter") {
    if (firstOperand !== "" && currentInput !== "") {
      secondOperand = currentInput;
      const result = operate(
        operator,
        parseFloat(firstOperand),
        parseFloat(secondOperand)
      );
      display.textContent = result;
      firstOperand = result.toString();
      secondOperand = "";
      currentInput = "";
    }
  }

  // Handle clear key
  if (key === "Escape") {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    currentInput = "";
    display.textContent = "0";
  }

  // Handle backspace key
  if (key === "Backspace") {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput;
    }
  }
});
