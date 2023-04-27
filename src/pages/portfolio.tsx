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

import { StockHistory, StockData, SavedStock } from '@/types/stock';

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

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 35px 200px;

    &:hover {
        cursor: pointer;
        border-radius: 4px;
        border: 2px solid ${inputHoverFill};
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);
    }

    @media( max-width: ${breakpoints.sm}px) {
        flex-direction: column;
        gap: 20px;
    }

    @media( max-width: ${breakpoints.md}px) {
        padding: 35px 80px;
     }
`

const ButtonContainer = styled.div`
  width: 200px;
`

const Title = styled.div`
  font-size: 26px;
`

const StyledStock = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;

    @media( max-width: ${breakpoints.sm}px) {
        align-items: center;
    }
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

    const isSaved = ( ticker: string) => savedList.find( (item: SavedStock) => item.ticker === ticker)

    const handleClick = (e: MouseEvent<HTMLButtonElement>, stock: SavedStock) => {
        e.stopPropagation();
        return isSaved(stock.ticker) ? dispatch( removeFromList( stock.ticker) ) : dispatch(addListItem( stock ));
    }

    const handleStockClick = (stockSymbol: string) => router.push(`/detail/search?stock=${stockSymbol}`);

    useEffect( () => {
        if( savedList && savedList.length) {
            const fetchData = async( stocks: SavedStock[]) => {

                const unresolvedPromises = stocks.map( async (stock: SavedStock ) => {
                    try {
                        const stockData: StockData = await fetchStockCandles(stock.ticker)
                        return formatCandleData( stockData, stock.ticker )
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
                    <ListContainer>
                    {
                        savedList.map( (item: SavedStock, index: number) => (
                            <ListItem key={index} onClick={()=>handleStockClick(item.ticker)}>
                                <StyledStock>
                                    <div>{item.ticker}</div>
                                    <div>{item.name}</div>
                                </StyledStock>
                                <ButtonContainer>
                                <Button 
                                    type={isSaved(item.ticker) ? 'danger' : 'primary'}
                                    onClick={(e)=>{handleClick(e, item)}}
                                    >
                                    {isSaved(item.ticker) ? 'Remove from list' : '+ Add to list' }
                                    </Button> 
                                </ButtonContainer>
                            </ListItem>
                        ))
                    } 
                    </ListContainer>
                </Container>
                : <EmptyText>You do not have any items on your list.</EmptyText>
            }
        </>
    )
}

export default Portfolio;