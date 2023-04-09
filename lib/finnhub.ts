import axios from "axios";
import { Stock } from "@/types/stock";

export const FINNHUB_API_URL = "https://finnhub.io/api/v1/";
export const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY;

import { convertDatesToUnix } from "@/services/dateServices";

export async function fetchCompany(symbol: string) {
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

export const fetchStockCandles = async (apiKey: string, symbol: string) => {
  const [ priorUnix, todayUnix ] = convertDatesToUnix( 2 )
    try {
      const res = await axios.get(`${FINNHUB_API_URL}stock/candle`, {
        params: {
        //   token: API_KEY,
            token: apiKey,
          symbol,
          resolution: 'D',
          // from: 1590988249,
          // to: 1591252249
          from: priorUnix,
          to: todayUnix
        },
      });
  
      return res.data;
    } catch (error) {
      return { error };
    }
  }

export const fetchSearch = async(apiKey: string, query: string) => {
  try {
    const res: {data: { result: Stock[] }} = await axios.get(`${FINNHUB_API_URL}search`, {
      params: {
        // token: API_KEY,
        token: apiKey,
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

    return res.data;
  } catch (error) {
    return { error };
  }
}