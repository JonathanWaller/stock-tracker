export const stockCodeMapping = {
    c: 'close',
    h: 'high',
    l: 'low',
    o: 'open',
    t: 'timestamp',
    v: 'volume',
    s: 'status'
}

export const detailsStats: string[] = ['52 Week High', '52 Week Low', 'Market Cap'];

export const detailsStatsMapping: {[key: string]: string}  = {
    '52 Week High': '52WeekHigh',
    '52 Week Low': '52WeekLow',
    'Market Cap': 'marketCapitalization'
}