let resultEle = document.getElementById("result");

function appendChar(char) {
    resultEle.value += char;
}

function clearDisplay() {
    resultEle.value = '';
}

function deleteChar() {
    var currentDisplay = resultEle.value;
    resultEle.value = currentDisplay.slice(0, -1);
}

function calculateResult() {
    var currentDisplay = resultEle.value;
    try {
        var result = eval(currentDisplay);
        resultEle.value = result;
        resultEle.style.color = 'darkblue';
    } catch (e) {
        resultEle.value = 'Error';
        resultEle.style.color = 'red';
        setTimeout(() => {
            resultEle.value = '';
            resultEle.style.color = 'black';
        }, 1000);
    }
}
