export const stockCodeMapping = {
    c: 'close',
    h: 'high',
    l: 'low',
    o: 'open',
    t: 'timestamp',
    v: 'volume',
    s: 'status'
}

export const detailsInfo: string[] = ['Industry', 'Ticker', 'Company Site', 'IPO Date'];
export const detailsStats: string[] = ['52 Week High', '52 Week Low', 'Market Cap'];

export const detailsInfoMapping: {[key: string]: string } = {
    'Industry': 'finnhubIndustry',
    'Ticker': 'ticker',
    'Company Site': 'weburl',
    'IPO Date': 'ipo'
}

export const detailsStatsMapping: {[key: string]: string}  = {
    '52 Week High': '52WeekHigh',
    '52 Week Low': '52WeekLow',
    'Market Cap': 'marketCapitalization'
}

export const chartColorMapping: {[key: string]: {lineColor: string, background: string} } = {
    'AAPL': { lineColor: 'rgba(246, 36, 89, .9)', background: 'rgba(246, 36, 89, .4)' },
    'TSLA': { lineColor: 'rgba(255, 0, 0, .9)', background: 'rgba(255, 0, 0, .4)' },
    'HOOD': { lineColor: 'rgba(11, 156, 49, .9)', background: 'rgba(11, 156, 49, .4)' },
    'PYPL': { lineColor: 'rgba(48,85,255, .9)', background: 'rgba(48,85,255, .4)' },
    'NDAQ': {lineColor: 'rgba(240, 255, .9)' , background: 'rgba(240, 255, .4)' }
}

export const defaultChartColor: {lineColor: string, background: string} = {
    lineColor: 'rgb(57,255,20, .9)' ,
    background: 'rgb(57,255,.4)'
}