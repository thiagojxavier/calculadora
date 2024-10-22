const operators = document.querySelectorAll('.main__calculator__operator');
const numbers = document.querySelectorAll('.main__calculator__number');
const clear = document.querySelector('.main__calculator__clear');
const calculate = document.querySelector('.main__calculator__equal');
const numberRes = document.getElementById('numberRes');
const historicIcon = document.querySelector('.bi-clock-history');
const historyList = document.querySelector('.main__list-history')
const arrayPressKey = [];
const stockHistoric = [];
const numbersAndOperatorsKeyDown = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', 'Enter', 'e']

const operatorsEvent = operators.forEach( operator => {
    operator.addEventListener('click', addToDisplay );
});

const numbersEvent = numbers.forEach( operator => {
    operator.addEventListener('click', addToDisplay );
});

addEventListener('keydown', (event) => {
    if(numbersAndOperatorsKeyDown.includes(event.key)) {
        console.log('a')
    }
})

const operatorCalculate = calculate.addEventListener('click', showResult);

const btn_clear = clear.addEventListener('click', clearLastNumber);

const historic = historicIcon.addEventListener('click', viewHistory);

function addToDisplay(event) {
    clearFieldToReuse();

    checkIfItIsActive();

    arrayPressKey.push(event.target.innerText);

    console.log(arrayPressKey)

    const numberInString = arrayPressKey.join(' ');
    
    numberRes.innerText = numberInString;
}

function showResult() {
    const numberInString = arrayPressKey.join('');

    if ( numberInString === "" ) {
        return
    }

    const result = calculatingOperation(numberInString);

    storeOperationInHistory(numberInString, result);

    numberRes.innerText = result;
    clearResultArray();
    arrayPressKey.push(result);

    numberRes.classList.add('colorRes');

    numberRes.classList.add('fieldClear')
}

function adjustingOperators(string) {
    let stringOperation = string;

    const valueAfterAdjustingOperatorMultiply = adjustingMultiplyOperator(stringOperation);

    stringOperation = valueAfterAdjustingOperatorMultiply;

    const valueAfterAdjustingOperatorDivide = adjustingDivideOperator(stringOperation);

    stringOperation = valueAfterAdjustingOperatorDivide;

    return stringOperation;
}

function clearLastNumber() {
    arrayPressKey.pop();
    const numberInString = arrayPressKey.join(' ');
    numberRes.innerText = numberInString;
    clearFieldToReuse();
}

function viewHistory() {
    if(stockHistoric.length === 0) return;

    const historicActive = checkIfItIsActive();

    if(historicActive) return;

    historyList.classList.add('active');

    stockHistoric.forEach( result => {
        const li = document.createElement('li');
        li.classList.add('item')

        li.innerText = result

        historyList.appendChild(li);

        li.addEventListener('click', recoverValueFromHistory)
    })
}

function recoverValueFromHistory(event) {
    clearResultArray();
    const resultInHistory = event.target.innerText;
    const resultHistory = resultInHistory.split("=")[1].trim();

    arrayPressKey.push(resultHistory);
    numberRes.innerText = resultHistory;
}

function checkIfItIsActive() {
    if (historyList.classList.contains('active')) {
        historyList.classList.remove('active');
        historyList.innerHTML = ""
        return true;
    };

    return false;
}

function clearFieldToReuse() {
    if (numberRes.className === 'main__response__digits colorRes fieldClear') {
        numberRes.classList.remove('colorRes');
    }

    if ( numberRes.className === 'main__response__digits fieldClear' ) {
        numberRes.innerText = "";
        numberRes.classList.remove('fieldClear');
    }
}

function clearResultArray() {
    arrayPressKey.length = 0;
}

function calculatingOperation(stringOperation) {
    const valueAfterAdjusting = adjustingOperators(stringOperation);

    const result = eval(valueAfterAdjusting);

    return result
}

function adjustingMultiplyOperator(string) {
    let stg = string;

    if ( stg.includes('x') ) {
        stg = stg.replaceAll('x', '*');
    }

    return stg
}

function adjustingDivideOperator(string) {
    let stg = string;

    if ( stg.includes('÷') ) {
        stg = stg.replaceAll('÷', '/');
    }

    return stg
}

function storeOperationInHistory(numberInString, result) {
    const getResponse = String(result);

    stockHistoric.push(`${numberInString} = ${getResponse}`);

    limitHistoryToTenDisplayed();
}

function limitHistoryToTenDisplayed() {
    if ( stockHistoric.length > 10 ) {
        stockHistoric.shift();
    }
}