import { useEffect, useState, MouseEvent } from 'react';
import { GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from "next/router";
import useWindowWidth from 'react-hook-use-window-width';

import { fetchStockCandles } from 'lib/finnhub';
import { inputHoverFill, lightGray } from '@/styles/colors';

import StockChart from '../components/StockChart';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { formatCandleData } from '../services/stockServices';

import { RootState } from '@/store';
import { addListItem, removeFromList } from '@/redux/listSlice';
import { savedListSelector } from '@/redux/listSelector';
import { breakpoints } from '@/styles/breakpoints';

import { StockHistory, StockData } from '@/types/stock';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 40px;

    @media( max-width: ${breakpoints.sm}px) {
        align-items: center;
        padding-top: 60px;
    }
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;

    &:hover {
        cursor: pointer;
        border-radius: 4px;
        background: ${inputHoverFill};
    }

    @media( max-width: ${breakpoints.sm}px) {
        // border: 1px solid green;
        flex-direction: column;
        gap: 10px;
    }
`

const ButtonContainer = styled.div`
  width: 200px;
`

const Title = styled.div`
  font-size: 26px;
`
const EmptyText = styled.div`
    color: ${lightGray};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.NEXT_PUBLIC_FINN_KEY
     }
    }
}

const Portfolio = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps> ) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const width = useWindowWidth();
    const { savedList } = useSelector( ( state: RootState ) => ( { savedList: savedListSelector( state )}))
    const [ candleData, setCandleData ] = useState<StockHistory[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const isSaved = (ticker: string) => savedList.includes(ticker);

    const handleClick = (e: MouseEvent<HTMLButtonElement>, ticker: string) => {
        e.stopPropagation();
        return isSaved(ticker) ? dispatch( removeFromList( ticker) ) : dispatch(addListItem( ticker ));
    }

    const handleStockClick = (stockSymbol: string) => router.push(`/detail/search?stock=${stockSymbol}`);

    useEffect( () => {
        if( savedList && savedList.length) {
            const fetchData = async( stocks: string[]) => {

                const unresolvedPromises = stocks.map( async (stock: string ) => {
                    try {
                        const stockData: StockData = await fetchStockCandles(stock)
                        return formatCandleData( stockData, stock )
                    } catch ( e: any) {
                        console.log(`Error loading stock data - ${e.message}`)
                        setError('Error retrieving list data')
                    } finally {
                        setLoading( false )
                    }
                })
                const results = await Promise.all(unresolvedPromises);  
                setCandleData( results )
            }
            fetchData(savedList)
        }
      }, [savedList])

    return(
        <>
            {
                loading ? <Loader />
                : error ? <Error errorText={error} />
                : savedList.length ?
                <Container>
                    { width > breakpoints.sm && <StockChart stockData={candleData} />   }
                    <Title>Your List</Title>
                    {
                        savedList.map( (item: string, index: number) => (
                            <ListItem key={index} onClick={()=>handleStockClick(item)}>
                                <div>{item}</div>
                                <ButtonContainer>
                                <Button 
                                    type={isSaved(item) ? 'danger' : 'primary'}
                                    onClick={(e)=>{handleClick(e, item)}}
                                    >
                                    {isSaved(item) ? '- Remove from list' : '+ Add to list' }
                                    </Button> 
                                </ButtonContainer>
                            </ListItem>
                        ))
                    } 
                </Container>
                : <EmptyText>You do not have any items on your list.</EmptyText>
            }
        </>
    )
}

export default Portfolio;