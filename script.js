const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('.clear');
const calculate = document.querySelector('.btn-res');
const numberRes = document.getElementById('numberRes');
const historicIcon = document.querySelector('.bi-clock-history');
const historyList = document.querySelector('.list-history')
const arrayPressKey = [];
const stockHistoric = [];

const operatorsEvent = operators.forEach( operator => {
    operator.addEventListener('click', addNumber );
});

const numbersEvent = numbers.forEach( operator => {
    operator.addEventListener('click', addNumber );
});

const operatorCalculate = calculate.addEventListener('click', showResult);

const btn_clear = clear.addEventListener('click', clearLastNumber);

const historic = historicIcon.addEventListener('click', viewHistory);

function addNumber(event) {
    clearFieldToReuse();

    arrayPressKey.push(event.target.innerText);

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
    const HistoricActive = checkIfItIsActive();

    if(HistoricActive) return;

    historyList.classList.add('active');

    stockHistoric.forEach( result => {
        const li = document.createElement('li');

        li.innerText = result

        historyList.appendChild(li);
    })
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
    if (numberRes.className === 'colorRes fieldClear') {
        numberRes.classList.remove('colorRes');
    }

    if ( numberRes.className === 'fieldClear' ) {
        clearResultArray();
        numberRes.innerText = "";
        numberRes.classList.remove('fieldClear');
    }
}

function clearResultArray() {
    arrayPressKey.length = 0;
}

function calculatingOperation(stringOperation) {
    const valueAfterAdjusting = adjustingOperators(stringOperation);

    const operandString = Function(`return ${valueAfterAdjusting}`);
    
    const result = operandString();

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
