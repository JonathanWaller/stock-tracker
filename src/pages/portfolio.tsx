import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'

import { subMonths } from 'date-fns';
const finnhub = require('finnhub');

import { getCandleData } from 'lib/stocks';
import { fetchStockCandles } from 'lib/finnhub';

// import PortfolioChart from './chart';
import StockChart from './stockChart';

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.FINN_KEY
     }
    }
}

const Portfolio = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps> ) => {
    const [ candleData, setCandleData ] = useState<any>()

    useEffect( () => {
        if( apiKey ) {

            const plzWork = async( stocks: string[]) => {

                const mapping = {
                    c: 'close',
                    h: 'high',
                    l: 'low',
                    o: 'open',
                    t: 'timestamp',
                    v: 'volume',
                    s: 'status'
                }

                const unresolvedPromises = stocks.map( async (stock: string, index: number ) => {
                    try {
                        const helpMe: any = await fetchStockCandles(apiKey, stock)
                         
                        for( const [key, value] of Object.entries(mapping)) {
                            delete Object.assign( helpMe, {[value]: helpMe[key]}) [key];
                        }
    
                        // delete Object.assign( helpMe, {['close']: helpMe['c']}) ['c'];
                        // delete Object.assign( helpMe, {['low']: helpMe['l']}) ['l'];
                        
                        const formatted: any = {}
                        // formatted[stock] = helpMe

                        formatted.stock = stock;
                        formatted.stockData = helpMe;

                        return formatted;
    
                    } catch ( e: any) {
                        console.log('bummer dodue')
                    }
                })
                const results = await Promise.all(unresolvedPromises);  
                setCandleData( results )
            }

            plzWork(['AAPL', 'TSLA']);

        }
      }, [apiKey])


      console.log('CANDLE DATA: ', candleData)

    return(
        <div>
            
            Portfolio

            <StockChart stockData={candleData} />    
        </div>
    )
}

export default Portfolio;