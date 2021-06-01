const CHART_LENGTH = 40
const CHART_REVEAL_LENGTH = 30
let chart
let money

const sliceChartData = (chartData, startIndex) => {
    return chartData.slice(startIndex, startIndex + CHART_LENGTH)
}

const correctUpbit = (chartData) => {
    return chartData.map((candle) => ({
        p: [candle.p[3], candle.p[1], candle.p[2], candle.p[0]],
        v: candle.v
    }))
}

const normalizeChartData = (chartData) => {
    const BASE_PRICE = 1000
    const firstPrice = chartData[0].p[0]

    return chartData.map((candle) => ({
        p: candle.p.map((price) => price / firstPrice * BASE_PRICE),
        v: candle.v
    }))
    
}

const processChartData = (chartData, startIndex) => {
    chartData = sliceChartData(chartData, startIndex)
    chartData = correctUpbit(chartData)
    chartData = normalizeChartData(chartData)
    return chartData
}

const startNewGame = async () => {
    // Get market data
    const marketIndex = await fetchJSON('./index.json')
    // Select market
    const market = getRandomFromArray(Object.keys(marketIndex))
    // Select month
    const [date, nextMonthDate] = getRandomDate(marketIndex[market])
    // Get month
    const [targetMonth, nextMonth] = await Promise.all([
        fetchJSON(`./data/${market}/${date.year}/${date.month}.json`),
        fetchJSON(`./data/${market}/${nextMonthDate.year}/${nextMonthDate.month}.json`)
    ])

    // Merge month data
    const chartData = [...targetMonth, ...nextMonth]
    // Select start point from first month
    const chartStartIndex = getRandomIndex(targetMonth)
    // Make chart object
    chart = new Chart(processChartData(chartData, chartStartIndex), CHART_REVEAL_LENGTH)
}

window.addEventListener('load', () => {
    startNewGame()
})

/*
FLOW

make chart and money instance
button click -> money.selectPosition -> chart.revealNext
-> chart.sendLastPrice -> money.applyPrice -> money.drawScoreboard

*/