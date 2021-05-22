const makeCandle = () => {
    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
            toolbar: {
                show: false
            }
        },

        series: [{
            data: [
                {x: 1, y:[1,2,3,4]},
                {x: 2, y:[5,6,7,8]}
            ]
        }]
    }

    const chart = new ApexCharts(document.querySelector("#container"), options)
    chart.render()
}

window.addEventListener('load', () => {
    makeCandle()
})