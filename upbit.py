import os
import json
import datetime
import requests
import calendar
import time

API_URL = 'https://api.upbit.com/v1/candles/minutes/'
API_WAIT = 0.5

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

def get_file_path(market, year, month):
    return os.path.join(os.getcwd(), 'data', str(market), str(year), f'{month}.json')

def save_data(path, data):
    file_dir = os.path.dirname(path)

    if not os.path.isdir(file_dir):
        os.makedirs(file_dir)

    with open(path, 'w') as outfile:
        json.dump(data, outfile)

def is_empty_data(data):
    if len(data) == 0:
        return True
    return False

def refine_data(api_data):
    data = []
    for candlestick in api_data:
        data.append({
            'p': [
                candlestick['opening_price'],
                candlestick['high_price'],
                candlestick['low_price'],
                candlestick['trade_price']
            ],
            'v': candlestick['candle_acc_trade_price']
        })
    return data

def get_day_price(market, candle_type, year, month, day):
    # make url params
    # https://api.upbit.com/v1/candles/minutes/15?market=KRW-BTC&to=2021-05-05T02%3A00%3A00Z&count=4
    params = {
        'market': market,
        'to': datetime.datetime(year, month, day).isoformat() + 'Z',
        'count': (24*60) // candle_type
    }

    # call api
    res = requests.get(API_URL + str(candle_type), params=params)

    # prevent too many api call
    time.sleep(API_WAIT)

    print(res.status_code, market, year, month, day)
    api_data = json.loads(res.text)

    # error
    if len(api_data) == 0:
        return []

    return refine_data(api_data)

def get_month_price(market, candle_type, year, month):
    # Check if file already exist
    path = get_file_path(market, year, month)
    if os.path.exists(path):
        return

    # Check if month is behind this month
    today = datetime.datetime.today()
    if today.year == year and today.month <= month:
        return

    # Check if month first price exist
    if len(get_day_price(market, candle_type, year, month, 1)) == 0:
        return

    # get month days
    days = calendar.monthrange(year, month)[1]

    # iterate days
    data = []
    for day in range(1, days + 1):
        data = [*data, *get_day_price(market, candle_type, year, month, day)]

    # save json
    save_data(path, data)
    print('saved data', market, year, month)

candle_type = CANDLE_TYPE['15']

for year in range(2017, 2022):
    for month in range(1, 13):
        for market in MARKETS:
            get_month_price(market, candle_type, year, month)

