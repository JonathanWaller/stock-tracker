import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from "next/router";

import { fetchStockCandles } from 'lib/finnhub';

import { inputHoverFill, lightGray } from '@/styles/colors';

import StockChart from '../components/StockChart';
import Button from '@/components/Button';

import { formatCandleData } from '../services/stockServices';

import { RootState } from '@/store';
import { addListItem, removeFromList } from '@/redux/listSlice';
import { savedListSelector } from '@/redux/listSelector';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 40px;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${inputHoverFill};
    border-radius: 10px;
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
    const { savedList } = useSelector( ( state: RootState ) => ( { savedList: savedListSelector( state )}))
    const [ candleData, setCandleData ] = useState<any>()

    const isSaved = (ticker: string) => savedList.includes(ticker);

    const handleClick = (e: any, ticker: string) => {
        e.stopPropagation();
        return isSaved(ticker) ? dispatch( removeFromList( ticker) ) : dispatch(addListItem( ticker ));
    }

    const handleStockClick = (stockSymbol: string) => router.push(`/detail/search?stock=${stockSymbol}`);

    useEffect( () => {
        if( savedList && savedList.length) {
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
        }
        
      }, [savedList])

    return(
        <Container>
            <StockChart stockData={candleData} />   

            <Title>Your List</Title>
            <ListContainer>
            {
                savedList.length
                ?
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
                : <EmptyText>You do not have any items on your list.</EmptyText>
            } 
            </ListContainer>
        </Container>
    )
}

export default Portfolio;