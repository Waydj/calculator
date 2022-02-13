let runninTotal = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
};

function handleSymbol(value){
    switch(value){
        case "C": 
            buffer = "0";
            runninTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }    
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runninTotal;
            runninTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}


  
  
function handleMath(value){
    if(buffer === "0"){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runninTotal === 0){
        runninTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
} 

function flushOperation(intBuffer){
    if (previousOperator === "+") {
        runninTotal += intBuffer;
    } else if (previousOperator === "-") {
        runninTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runninTotal *= intBuffer;
    } else {
        runninTotal /= intBuffer;
    }
}

  
function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    } else {
        buffer += value;
    }
};

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();