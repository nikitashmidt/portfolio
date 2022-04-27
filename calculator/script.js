const btnPlus = document.querySelector('.button__plus'),
    btnMinus = document.querySelector('.button__minus'),
    btnDef = document.querySelector('.button__default'),
    btnRand = document.querySelector('.button__random'),
    headerContent = document.querySelector('.header__content');

class Counter {
    count = 0;
    inc = () => {
        this.count++;
    }
    dec = () => {
        this.count--;
    }
    def = () => {
        this.count = 0;
    }
    random = () => {
        this.count = Math.floor(Math.random() * (100 - -100) + -100)
    }
}
const res = new Counter()
function update() { headerContent.innerHTML = res.count }
btnPlus.addEventListener('click', () => {
    res.inc()
    update()
})
btnMinus.addEventListener('click', () => {
    res.dec()
    update()
})
btnDef.addEventListener('click', () => {
    res.def()
    update()
})
btnRand.addEventListener('click', () => {
    res.random()
    update()
})

// interest calculator
const calcBtn = document.querySelector('.calculator__btn'),
    calcRes = document.querySelector('.calculator__result'),
    calcNumber = document.querySelector('#calculator__number');

function plus() {
    let percentages, number, result;
    percentages = document.querySelector('#calculator__percentages').value;
    percentages = parseInt(percentages);
    number = document.querySelector('#calculator__number').value;
    number = parseInt(number);
    result = Math.floor(number / 100 * percentages);
    // if (result.length >=) { }
    if (result) { 
        return  result
    } else {
         return 'Некорректные данные'
    }
}
calcBtn.addEventListener('click', () => {
    calcRes.innerHTML = plus()
})



// 
if (window.screen.width <= 576) {
    btnDef.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
    </svg>
    `
}