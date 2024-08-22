let inputEle = document.getElementById('display');

function appendToDisplay(value) {
  inputEle.value += value;
}

function clearDisplay() {
  inputEle.value = '';
}

function deleteLastCharacter() {
  let currentValue = inputEle.value;
  inputEle.value = currentValue.slice(0, -1);
}

function calculate() {
  try {
    let expression = inputEle.value;
    expression = expression.replace(/\^/g, '**'); // Replace ^ with ** for exponentiation
    const result = eval(expression);
    inputEle.value = result;
  } catch (error) {
    inputEle.value = 'Error';
    inputEle.style.color = 'red';
    setTimeout(() => {
      inputEle.value = '';
      inputEle.style.color = 'black';
    }, 1000);
  }
}

function calculateSquareRoot() {
  const value = parseFloat(inputEle.value);
  if (!isNaN(value) && value >= 0) {
    inputEle.value = Math.sqrt(value);
  } else {
    inputEle.value = 'Error';
    inputEle.style.color = 'red';
    setTimeout(() => {
      inputEle.value = '';
      inputEle.style.color = 'black';
    }, 1000);
  }
}
