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
    if ( numberRes.className === 'colorRes fieldClear' ) {
        cleanAfterResult();
        numberRes.classList.remove('fieldClear');
    }

    if (numberRes.className === 'colorRes') {
        numberRes.classList.remove('colorRes');
    }

    arrayPressKey.push(event.target.innerText);

    const convertArrayForString = arrayPressKey.join(' ');
    
    numberRes.innerText = convertArrayForString;
}

function showResult() {
    const convertArrayForString = arrayPressKey.join('');

    const adjustingOperators = adjustingMultiplyAndDivideOperator(convertArrayForString);

    const operandString = Function(`return ${adjustingOperators}`);
    
    const result = operandString();

    const getResponse = String(result);

    if ( stockHistoric.length > 9 ) {
        stockHistoric.shift();
    }

    stockHistoric.push(`${convertArrayForString} = ${getResponse}`);

    numberRes.innerText = result;

    numberRes.classList.add('colorRes');

    numberRes.classList.add('fieldClear')
}

function cleanAfterResult() {
    arrayPressKey.length = 0;
}

function clearLastNumber() {
    arrayPressKey.pop();
    const convertArrayForString = arrayPressKey.join(' ');
    numberRes.innerText = convertArrayForString;
}

function viewHistory() {
    if (historyList.classList.contains('active')) {
        historyList.classList.remove('active');
        historyList.innerHTML = ""
        return
    };

    historyList.classList.add('active');

    stockHistoric.forEach( result => {
        const li = document.createElement('li');

        li.innerText = result

        historyList.appendChild(li);
    })
}

function adjustingMultiplyAndDivideOperator(string) {
    let stg = string;

    if ( stg.includes('x') ) {
        stg = stg.replaceAll('x', '*');
    }

    if ( stg.includes('÷') ) {
        stg = stg.replaceAll('÷', '/');
    }

    return stg
}