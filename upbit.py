API_URL = 'https://api.upbit.com/v1/candles/minutes/'

CANDLE_TYPE = {
    '1': 1,
    '15': 15,
    '60': 60
}

MARKETS = [
    'KRW-BTC',
    'KRW-ETH',
    'KRW-XRP',
    'KRW-LTC'
]

def get_hour_price(market, candle_type, year, month, day, hour):
    # make url params

    # call api

    # refine data

    # return dict
    pass

def get_day_price(market, candle_type, year, month, day):
    # iterate get_hour_price

    # return array
    pass

def get_month_price(market, candle_type, year, month):
    # Check if month is behind this month

    # Check if month first price exist

    # get month days

    # iterate days

    # make array

    # save json
    pass

candle_type = CANDLE_TYPE['15']

for year in range(2017, 2022):
    for month in range(0, 13):
        for market in MARKETS:
            # check if file exist
            get_month_price()
            # save file