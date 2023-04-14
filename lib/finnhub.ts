import axios from "axios";
import { Stock } from "@/types/stock";

export const FINNHUB_API_URL = "https://finnhub.io/api/v1/";
const API_KEY = process?.env?.NEXT_PUBLIC_FINN_KEY? process.env.NEXT_PUBLIC_FINN_KEY : '';
        

import { convertDatesToUnix, convertDatesToString } from "@/services/dateServices";

export const fetchCompany = async(symbol: string) => {
  try {
    const res = await axios.get(`${FINNHUB_API_URL}stock/profile2`, {
      params: {
        token: API_KEY,
        symbol,
      },
    });

    return res.data;
  } catch (error) {
    return { error };
  }
}

export const fetchStockCandles = async (symbol: string) => {
  const [ priorUnix, todayUnix ] = convertDatesToUnix( 2 )
    try {
      const res = await axios.get(`${FINNHUB_API_URL}stock/candle`, {
        params: {
          token: API_KEY,
          symbol,
          resolution: 'D',
          from: priorUnix,
          to: todayUnix
        },
      });
  
      return res.data;
    } catch (error) {
      return { error };
    }
  }

export const fetchSearch = async(query: string) => {
  try {
    const res: {data: { result: Stock[] }} = await axios.get(`${FINNHUB_API_URL}search`, {
      params: {
        token: API_KEY,
        q: query,
      },
    });

    const formatted = res.data.result.reduce( (acc: any, curr: Stock ) => [...acc, {description: curr.description, symbol: curr.symbol }], [])
    return formatted;
  } catch (error) {
    return { error };
  }
}

export async function fetchQuote(symbol: string) {
  try {
    const res = await axios.get(`${FINNHUB_API_URL}quote`, {
      params: {
        token: API_KEY,
        symbol: symbol.toUpperCase(),
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export const fetchFinancials = async(symbol: string) => {
  try {
    const res = await axios.get(`${FINNHUB_API_URL}stock/metric`, {
      params: {
        token: API_KEY,
        symbol,
        metric: 'all'
      }
    });

    return res.data.metric;
  } catch (error) {
    return { error };
  }
}

export const fetchNews = async(symbol: string) => {
  const [ priorString, todayString ] = convertDatesToString( 5 );

  try {
    const res = await axios.get(`${FINNHUB_API_URL}company-news`, {
      params: {
        token: API_KEY,
        symbol,
        from: priorString,
        to: todayString
      }
    });

    return res.data.slice(0, 5);
  } catch (error) {
    return { error };
  }
}

export const fetchCompanyProfile2 = async(symbol: string) => {
  try {
    const res = await axios.get(`${FINNHUB_API_URL}stock/profile2`, {
      params: {
        token: API_KEY,
        symbol
      }
    });

    return res.data;
  } catch (error) {
    return { error };
  }
}