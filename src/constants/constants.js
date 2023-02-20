const marketTabs = [
    {
        id: 1,
        title: "Cryptoassets",
    },
    {
        id: 2,
        title: "Exchanges",
    },
]

//API
// My Holdings
// `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`

// Coin Market
// const coinMarketURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
const coinMarketURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=7d`;
const holdingsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cbitcoin&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d`
const constants = {
    marketTabs,
    coinMarketURL,holdingsUrl
};

export default constants;