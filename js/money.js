const LEVERAGE = 5

POSITION_MAP = {
    long: 1,
    short: -1
}

const calcProfit = (userPrice, lastPrice) => {
    return (lastPrice - userPrice)/userPrice * LEVERAGE
}

class Money {
    constructor({dayElement, moneyElement, entryElement}) {
        this.day = 1
        this.money = 1000
        this.userPrice = undefined
        this.lastPrice = undefined
        this.position = 'cash'

        this.init()
        this.dayElement = dayElement
        this.moneyElement = moneyElement
        this.entryElement = entryElement
    }

    init() {
        document.querySelector('#long_button').addEventListener('click', () => {
            this.selectPosition('long')
        })

        document.querySelector('#cash_button').addEventListener('click', () => {
            this.selectPosition('cash')
        })

        document.querySelector('#short_button').addEventListener('click', () => {
            this.selectPosition('short')
        })
    }

    selectPosition(position) {
        if (position !== this.position) {
            // finish previous position
            if (this.position !== 'cash') {
                this.money = this.money + this.money*calcProfit(this.userPrice, this.lastPrice)*POSITION_MAP[this.position]
            }

            // set new position
            this.position = position
            this.userPrice = this.lastPrice
            this.entryElement.innerText = position
        }
        
        chart.revealNext()
    }

    applyPrice(price) {
        this.lastPrice = price

        if (this.position === 'cash')
            return

        this.drawScoreboard(this.money + this.money*calcProfit(this.userPrice, this.lastPrice)*POSITION_MAP[this.position])
        console.table(this)
    }

    drawScoreboard(money) {
        this.dayElement.innerText = this.day
        this.moneyElement.innerText = money
    }
}

window.addEventListener('load', () => {
    money = new Money({
        dayElement: document.querySelector('#day'),
        moneyElement: document.querySelector('#money'),
        entryElement: document.querySelector('#entry')
    })
})