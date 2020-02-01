/*
    TODO : 
    touche pour effacer la valeur actuelle chiffre par chiffre
    ajout de la touche 'exposant' et éventuelement 'racine de'

*/

const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keys')
let error = false

function calculateResult(currentResult, lastValue, lastAction){
    let result
    const fCurrentResult = parseFloat(currentResult)
    const fValue = parseFloat(lastValue)

    switch (lastAction){
        case 'add':
            result = fCurrentResult + fValue
            break
        case 'substract':
            result = fCurrentResult - fValue
            break
        case 'multiply':
            result = fCurrentResult * fValue
            break
        case 'divide':
            if(fValue != 0){
                result = fCurrentResult / fValue
            }else{
                error = true
                result = 'Error : dividing by 0'
            }
            break
        case 'exponant': 
            result = Math.pow(fCurrentResult,  fValue)
            break
        case 'root':
            if(fValue != 0){
                result = Math.pow(fCurrentResult,  1/fValue)
            }else{
                error = true
                result = 'Error : dividing by 0'
            }
            break
    }
    calculator.dataset.result = result
    displayHistory(fCurrentResult, fValue, result, lastAction)
}

function displayHistory(value1, value2, result, action){
    if(!error){
        const history = document.querySelector('.column2')
        const p = document.createElement('p')
        let symbol = ''

        switch (action){
            case 'add':
                symbol = ' + '
                break
            case 'substract':
                symbol = ' - '
                break
            case 'multiply':
                symbol = ' * '
                break
            case 'divide':
                symbol = ' / '
                break
            case 'exponant': 
                symbol = ' ^ '
                break
            case 'root':
                symbol = ' root '
                break
        }

        p.textContent =  value1  + symbol  + value2 + ' = ' + result
        history.prepend(p)
    }
}


keys.addEventListener('click', e =>{
    if(e.target.matches('button')){
        const key = e.target
        const keyAction = key.dataset.action
        const display = document.querySelector('.display p')
        const currentResult = calculator.dataset.result
        const currentValue = display.textContent
        const lastAction = calculator.dataset.lastAction

        if(!error){
            if(keyAction >= 0 || keyAction <= 9){ // number pressed
                if(currentValue == '0'){
                    display.textContent = key.textContent

                }else{
                    display.textContent += key.textContent

                }
            }
    
            if(keyAction == 'decimal'){
                if(currentValue.indexOf('.') == '-1'){
                    display.textContent += '.'
                }
            }
    
            if(keyAction == 'add' || keyAction == 'substract' || keyAction == 'multiply' || keyAction == 'divide' || keyAction == 'exponant' || keyAction == 'root' ){
                if(currentResult == ''){
                    calculator.dataset.result = currentValue

                }else if(lastAction != 'equal'){
                    calculateResult(currentResult, currentValue, lastAction)

                }
                calculator.dataset.lastAction = keyAction
                display.textContent = '0'            
            }
    
            if(keyAction == 'equal'){
                if(lastAction != '' && lastAction != 'equal'){ 
                    calculateResult(currentResult, currentValue, lastAction)
                    display.textContent = currentResult
                    calculator.dataset.lastAction = 'equal'

                }
            }
        }

        if(keyAction == 'clear'){
            error = false
            display.textContent = '0'
            calculator.dataset.result = ''
            calculator.dataset.lastAction = ''
        }
    }
})

document.onkeypress = function(e){
    const keyCode = e.keyCode
    let key = ""

    switch(keyCode){
        case 13:
            key = "equal"
            break
        case 42:
            key = "multiply"
            break
        case 43:
            key = "add"
            break
        case 46:
            key = "decimal"
            break
        case 45:
            key = "substract"
            break
        case 47:
            key = "divide"
            break
        case 48:    //0
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:    //9     
            key = String.fromCharCode(keyCode)
            break
        case 99:    //c
            key = "clear"
            break
           
    }
    if(key != ""){
        document.querySelector('[data-action="' + key + '"]').click()
    }
}