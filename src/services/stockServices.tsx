import { stockCodeMapping } from "@/utils";
import { fetchStockCandles, fetchFinancials, fetchCompanyProfile2, fetchNews } from "lib/finnhub";

export const formatCandleData = ( data: any, stock: string ) => {
    const formatted: any = {}

    // delete Object.assign( helpMe, {['close']: helpMe['c']}) ['c'];
                    // delete Object.assign( helpMe, {['low']: helpMe['l']}) ['l'];

    for( const [key, value] of Object.entries(stockCodeMapping)) {
        delete Object.assign( data, {[value]: data[key]}) [key];
    }

    formatted.stock = stock;
    formatted.stockData = data;
    return formatted;
}



const fetchPriceHistory = async( stock: string ) => {
    try {
        const priceHistory = await fetchStockCandles( stock )
        return formatCandleData( priceHistory, stock)
    } catch ( e:any ) {
        console.log(`Error fetching price history - ${e.message}`)
        return null;
    }   
}

const fetchCompanyFinancials = async( stock: string ) => {
    try {
        const financials = await fetchFinancials( stock );
        financials['52WeekHigh'] = financials['52WeekHigh'].toFixed(2)
        financials['52WeekLow'] = financials['52WeekLow'].toFixed(2)
        return financials;
    } catch ( e: any ) {
        console.log(`Error fetching company financials - ${e.message}`)
        return null;
    }
}

const fetchCompanyNews = async(stock: string) => {
    try {
        return await fetchNews( stock )
    } catch ( e: any ) {
        console.log(`Error fetching company news- ${e.message}`)
        return null;
    }
}

const fetchCompanyProfile = async(stock: string) => {
    try {
        return await fetchCompanyProfile2( stock )
    } catch ( e: any ) {
        console.log(`Error fetching company news- ${e.message}`)
        return null;
    }
}

export const fetchStockDetails = async( stock: string ) => {

    const [ priceHistory, financials, companyNews, companyProfile ] = await Promise.all([
        fetchPriceHistory(stock),
        fetchCompanyFinancials( stock ),
        fetchCompanyNews(stock),
        fetchCompanyProfile( stock )
    ])

    return [priceHistory, financials, companyNews, companyProfile ]
}