function convertTemperature() {
    const inputTemp = document.getElementById('inputTemp').value;
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultElement = document.getElementById('result');

    if (inputTemp === '') {
        resultElement.textContent = 'Please enter a temperature value*';
        resultElement.style.color = 'red';
        return;
    }

    const temp = parseFloat(inputTemp);
    let result;

    if (inputUnit === outputUnit) {
        result = temp;
    } else {
        if (inputUnit === 'Celsius') {
            if (outputUnit === 'Fahrenheit') {
                result = (temp * 9/5) + 32;
            } else if (outputUnit === 'Kelvin') {
                result = temp + 273.15;
            }
        } else if (inputUnit === 'Fahrenheit') {
            if (outputUnit === 'Celsius') {
                result = (temp - 32) * 5/9;
            } else if (outputUnit === 'Kelvin') {
                result = (temp - 32) * 5/9 + 273.15;
            }
        } else if (inputUnit === 'Kelvin') {
            if (outputUnit === 'Celsius') {
                result = temp - 273.15;
            } else if (outputUnit === 'Fahrenheit') {
                result = (temp - 273.15) * 9/5 + 32;
            }
        }
    }

    resultElement.textContent = `Result: ${result.toFixed(2)} ${outputUnit}`;
    resultElement.style.color = 'black';
}
