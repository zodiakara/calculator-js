let lastOperation = null; //symbol pressed after last result
let lastResult = null; // first number inserted ( before the function button)

let isOperationComplete = false;
//onload function for starting the browser :
window.onload = function () {
  const numericBtn = document.querySelectorAll(".numeric");
  const functionBtn = document.querySelectorAll(".function");
  const cancelBtn = document.querySelector(".cancel");
  const resultBtn = document.querySelector(".result");

  //for attatching event listeners to number buttons
  console.log(numericBtn);
  for (let node of numericBtn) {
    node.addEventListener("click", addNumberToResult);
  }

  //for attatching event listeners to function buttons
  console.log(functionBtn);
  for (let node of functionBtn) {
    node.addEventListener("click", saveOperationAndValue);
  }

  resultBtn.addEventListener("click", showResult);
  cancelBtn.addEventListener("click", resetState);
};

const addNumberToResult = function (event) {
  const displayNode = document.getElementById("result");

  const clickedNode = event.target;
  const numberPressed = clickedNode.innerText;

  // wrapping an if statement around pressed number function so it overrides input value '0' and concatenates pressed numbers from there
  if (
    displayNode.value === "0" ||
    displayNode.value === "Error" ||
    isOperationComplete
  ) {
    displayNode.value = numberPressed;
  } else {
    displayNode.value += numberPressed;
  }

  //making note which number got clicked - event.target itself knows which node triggered the event
  //now we can decide what happens when the button gets clicked!
};
// another function to store number string from 'number Pressed' when 'function button' is fired (also stores the operator '/*-+')
const saveOperationAndValue = function (event) {
  const displayNode = document.getElementById("result");

  const clickedNode = event.target;
  lastOperation = clickedNode.innerText; // symbol of the operation
  lastResult = displayNode.value; // accessing the display value to save for later

  displayNode.value = "0"; // reset the display value
};

//functionality that doesn't need a parameter, just a temp function
const executeLastOperation = function () {
  //reading the current value of the display which will be our second operand
  const displayNode = document.getElementById("result");
  const currentResult = displayNode.value;

  //convert strings into numbers and store them in new variables
  const firstOperand = parseInt(lastResult);
  const secondOperand = parseInt(currentResult);

  //using lastOperation symbol to determine what operation to do
  switch (lastOperation) {
    case "+":
      lastResult = firstOperand + secondOperand;
      break;
    case "-":
      lastResult = firstOperand - secondOperand;
      break;
    case "/":
      lastResult = firstOperand / secondOperand;
      break;
    case "*":
      lastResult = firstOperand * secondOperand;
      break;
    default:
      return;
  }
  // the switch case will update the global lastResult variable value with the result of the operation
};

const showResult = function () {
  const displayNode = document.getElementById("result");
  executeLastOperation();
  displayNode.value = lastResult;

  if (lastResult === null) {
    displayNode.value = "0";
  } else {
    displayNode.value = lastResult;
  }

  isOperationComplete = true;
  //calculate the result between first operant (let lastResult) and second Operand (currently in the display)
  // we need to diffrentiate the operations so function has to take a value from function button
};
const clearMemory = function () {
  lastOperation.value = null;
  lastResult.value = null;
};
const clearResult = function () {
  const displayNode = document.getElementById("result");
  displayNode.value = "0";
};

const resetState = function () {
  clearMemory();
  clearResult();
};
