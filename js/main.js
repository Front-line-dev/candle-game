let chart

const startNewGame = async () => {
    const marketIndex = await fetchJSON('./index.json')
    const market = getRandomFromArray(Object.keys(marketIndex))
    const [date, nextMonthDate] = getRandomDate(marketIndex[market])
    const [targetMonth, nextMonth] = await Promise.all([
        fetchJSON(`./data/${market}/${date.year}/${date.month}.json`),
        fetchJSON(`./data/${market}/${nextMonthDate.year}/${nextMonthDate.month}.json`)
    ])

    const chartData = [...targetMonth, ...nextMonth]
    const chartStartIndex = getRandomIndex(targetMonth)
    chart = new Chart(chartData, chartStartIndex)
}

startNewGame()