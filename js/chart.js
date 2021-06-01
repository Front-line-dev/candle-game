const START_LENGTH = 15
const END_LENGTH = 25
const CANDLE_DIV = '#candle'
const CANDLE_OPTION = {
    chart: {
        type: 'candlestick',
        height: 350,
        toolbar: {
            show: false
        }
    },

    series: [{
        data: [
            // {x: 1, y:[1,2,3,4]},
            // {x: 2, y:[5,6,7,8]}
        ]
    }]
}


class Chart {
    constructor(data, revealLength) {
        this.data = data
        this.revealLength = revealLength - 1
        this.chart = this.initChart()
        this.revealNext()
    }

    initChart() {
        document.querySelector(CANDLE_DIV).innerHTML = ''

        const chart = new ApexCharts(document.querySelector("#candle"), CANDLE_OPTION)
        chart.render()
        return chart
    }

    revealNext() {
        const candleData = this.data.slice(0, this.revealLength).map((candle, index) => ({ x: index, y: candle.p }))
        const emptyData = new Array(this.data.length - this.revealLength).fill().map(() => ({x: 0}))

        this.chart.updateSeries([{
            data: [...candleData, ...emptyData]
        }])

        this.sendLastPrice()

        this.revealLength = this.revealLength + 1

        if (this.revealLength > this.data.length)
            this.delete()
    }

    delete() {

    }

    sendLastPrice() {
        const lastPrice = this.data[this.revealLength - 1].p[3]
        money.applyPrice(lastPrice)
    }
}