import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'

import { subMonths } from 'date-fns';
const finnhub = require('finnhub');

import { getCandleData } from 'lib/stocks';
import { fetchStockCandles } from 'lib/finnhub';

// import PortfolioChart from './chart';
import StockChart from '../components/StockChart';

// import { stockCodeMapping } from '../utils';

import { formatCandleData } from '../services/stockServices';
import { stockCodeMapping } from '@/utils';

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.NEXT_PUBLIC_FINN_KEY
     }
    }
}

const Portfolio = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps> ) => {
    const [ candleData, setCandleData ] = useState<any>()

    useEffect( () => {
        const plzWork = async( stocks: string[]) => {

            const unresolvedPromises = stocks.map( async (stock: string, index: number ) => {
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

        plzWork(['AAPL', 'TSLA']);
      }, [])


      console.log('CANDLE DATA: ', candleData)

    return(
        <div>
            
            Portfolio

            <StockChart stockData={candleData} />    
        </div>
    )
}

export default Portfolio;