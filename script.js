const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keys')

keys.addEventListener('click', e =>{
    if(e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyValue = key.textContent
        const display = document.querySelector('.display p')
        const displayValue = display.textContent
        

        if(!action){ //key pressed is a number
            if(displayValue!="0"){
                display.textContent += keyValue;
            }else{
                display.textContent = keyValue;
            }
        }

        if(
            action === 'add' || 
            action === 'substract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            display.dataset.value1 = display.textContent
            display.dataset.action = action
            display.dataset.lastAction = action
            display.textContent = "0"
        }

        if(action === 'decimal'){
            if(displayValue.indexOf(".") == "-1"){
                display.textContent += '.'
            }
        }

        if(action === 'clear'){
            display.textContent = "0"
            display.dataset.lastValue = "0"
        }

        if(action === 'equal'){
            if(display.dataset.lastAction != action){
                display.dataset.lastAction = "equal"
                display.dataset.value2 = display.textContent
            }
            const value1 = parseFloat(display.dataset.value1)
            const value2 = parseFloat(display.dataset.value2)
            
            switch(display.dataset.action){
                case "add":
                    display.textContent = value1 + value2
                    break
                case "substract": 
                    display.textContent = value1 - value2
                    break
                case "multiply":
                    display.textContent = value1 * value2
                    break
                case "divide": // TODO error if value1 == 0
                    display.textContent = value1 / value2
                    break
            }

            display.dataset.value1 = display.textContent

        }
    }
})