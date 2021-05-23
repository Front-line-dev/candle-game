const getRandomFromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const getRandomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length)
}

const getRandomDate = (arr) => {
    const monthIndex = Math.floor(Math.random() * (arr.length - 1))
    return [arr[monthIndex], arr[monthIndex + 1]]
}

const fetchCache = new Map()

const fetchJSON = async (url) => {
    if (fetchCache.has(url))
        return fetchCache.get(url)

    const res = await fetch(url)
    const json = await res.json()
    fetchCache.set(url, json)
    return json
}