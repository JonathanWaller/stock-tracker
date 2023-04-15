import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'

import { fetchStockCandles } from 'lib/finnhub';

import store from '@/store';

import StockChart from '../components/StockChart';

import { formatCandleData } from '../services/stockServices';

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.NEXT_PUBLIC_FINN_KEY
     }
    }
}

const Portfolio = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps> ) => {
    const [ candleData, setCandleData ] = useState<any>()
    const { savedList } = store.getState().list;

    useEffect( () => {
        const fetchData = async( stocks: string[]) => {

            const unresolvedPromises = stocks.map( async (stock: string ) => {
                try {
                    const helpMe: any = await fetchStockCandles(stock)
                    return formatCandleData( helpMe, stock )
                } catch ( e: any) {
                    console.log('bummer dodue')
                }
            })
            const results = await Promise.all(unresolvedPromises);  
            setCandleData( results )
        }
        fetchData(savedList)
      }, [])


      console.log('CANDLE DATA: ', candleData)

    return(
        <div>
            <StockChart stockData={candleData} />    
        </div>
    )
}

export default Portfolio;