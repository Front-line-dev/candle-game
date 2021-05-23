const START_LENGTH = 15
const END_LENGTH = 25
const CANDLE_DIV = '#candle'
const candleOptions = {
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
    constructor(data, startIndex) {
        this.data = data
        this.startIndex = startIndex
        this.normalizePrice = data[startIndex].p[0] / 1000
        this.initChart()
    }

    initChart() {
        document.querySelector(CANDLE_DIV).innerHTML = ''
        const data = this.data
            .slice(this.startIndex, this.startIndex + START_LENGTH)
            .map((candle, index) => ({
                x: index,
                y: candle.p
                    // upbit bug correction
                    .map((price, index) => {
                        if (index === 0)
                            return candle.p[3]
                        else if (index === 3)
                            return candle.p[0]
                        return price
                    })
                    // normalize
                    .map((price) => price / this.normalizePrice)
                    
            }))


        const options = {
            ...candleOptions,
            series: [{data}]
        }

        this.chart = new ApexCharts(document.querySelector("#candle"), options)
        this.chart.render()
    }

    revealNext() {

    }

    delete() {

    }
}