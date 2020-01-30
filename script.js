/*
    TODO : 
    touche pour effacer la valeur actuelle chiffre par chiffre
    integration du clavier
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
        case "add":
            result = fCurrentResult + fValue
            break
        case "substract":
            result = fCurrentResult - fValue
            break
        case "multiply":
            result = fCurrentResult * fValue
            break
        case "divide":
            if(fValue != 0){
                result = fCurrentResult / fValue
            }else{
                error = true
                result = "Error : dividing by 0"
            }
            break
    }
    calculator.dataset.result = result
    displayHistory(fCurrentResult, fValue, result, lastAction)
}

function displayHistory(value1, value2, result, action){
    if(!error){
        const history = document.querySelector('.column2')
        let symbol
        let p

        switch (action){
            case "add":
                symbol = '+'
                break
            case "substract":
                symbol = '-'
                break
            case "multiply":
                symbol = '*'
                break
            case "divide":
                symbol = '/'
                break
        }

        p = document.createElement('p')
        p.textContent =  value1 + ' ' + symbol + ' ' + value2 + ' = ' + result
        history.prepend(p)
    }
}


keys.addEventListener('click', e =>{
    if(e.target.matches('button')){
        const key = e.target
        const keyAction = key.dataset.action
        const keyValue = key.textContent
        const display = document.querySelector('.display p')
        const currentResult = calculator.dataset.result
        const lastAction = calculator.dataset.lastAction

        if(!error){
            if(!keyAction){ // number pressed
                if(display.textContent == "0"){
                    display.textContent = keyValue
                }else{
                    display.textContent += keyValue
                }
            }
    
            if(keyAction == "decimal"){
                if(display.textContent.indexOf(".") == "-1"){
                    display.textContent += "."
                }
            }
    
            if(keyAction == "add" || keyAction == "substract" || keyAction == "multiply" || keyAction == "divide" ){
                if(currentResult == ""){
                    calculator.dataset.result = display.textContent
                }else{
                    if(lastAction != "equal"){
                        calculateResult(currentResult, display.textContent, lastAction)
                    }                
                }
                calculator.dataset.lastAction = keyAction
                display.textContent = '0'            
            }
    
            if(keyAction == "equal"){
                if(lastAction != "" && lastAction != "equal"){ 
                    calculateResult(calculator.dataset.result, display.textContent, lastAction)
                    display.textContent = calculator.dataset.result
                    calculator.dataset.lastAction = "equal"
                }
            }
        }

        if(keyAction == "clear"){
            error = false
            display.textContent = "0"
            calculator.dataset.result = ""
            calculator.dataset.lastAction = ""
        }
    }
})