import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useWindowWidth from 'react-hook-use-window-width';

import StockChart from '../../components/StockChart'
import NewsArticle from '@/components/Company/NewsArticle';
import CompanyInfo from '@/components/Company/CompanyInfo';
import MarketStats from '@/components/Company/MarketStats';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { addListItem, removeFromList } from '@/redux/listSlice';
import { savedListSelector } from '@/redux/listSelector';
import { RootState } from '@/store';

import { fetchStockDetails } from '@/services/stockServices';

import { Company, StockNews } from '@/types/stock';
import { breakpoints } from '@/styles/breakpoints';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 65px;
  padding-top: 40px;

  @media( max-width: ${breakpoints.sm}px) {
    gap: 40px;
    padding-top: 60px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 75px;

  @media( max-width: ${breakpoints.sm}px) {
    gap: 40px;
  }
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.div`
  font-size: 26px;
`

const NewsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: -30px;
`

const ButtonContainer = styled.div`
  width: 200px;
`

const Detail = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const { stock } = router.query;
  const { savedList } = useSelector( ( state: RootState ) => ( { savedList: savedListSelector( state )}))
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [company, setCompany] = useState<Company>();

  const checkIsSaved = (ticker: string) =>  savedList.includes(ticker);

  const isSaved = useMemo( () => {
    if( company?.companyProfile?.ticker || company?.priceHistory?.stock ) return checkIsSaved(company.companyProfile?.ticker || company.priceHistory?.stock )  
  },[company, savedList])

  const handleClick = (ticker: string) => isSaved ? dispatch( removeFromList( ticker) ) : dispatch(addListItem( ticker ))

  useEffect( () => {
    const controller = new AbortController();
    if( stock && typeof stock === 'string' ) {
      try {
        const fetchCompanyDetails = async() => {
          const [priceHistory, financials, news, companyProfile ] = await fetchStockDetails(stock)  
          setCompany( {priceHistory, news, financials, companyProfile})
        }
  
        fetchCompanyDetails();
      } catch (e:any) {
        setError('Error retrieving company details. Please try again later.')
      } finally {
        setLoading( false );
      }
    }

    return () => {
      // cancel the request on cleanup
      controller.abort()
    }
  }, [stock])  

  return (
      <div>
        {
          loading
          ? <Loader />
          : error ? <Error errorText={error} />
          : company?.priceHistory ? (
            <DetailsContainer>
              { width > breakpoints.sm && <StockChart stockData={[company.priceHistory]} />  }
              
              <ButtonContainer>
                <Button 
                  type={isSaved ? 'danger' : 'primary'}

                  // @ts-ignore
                  onClick={()=>{handleClick(company.companyProfile?.ticker || company.priceHistory?.stock)}}
                >
                  {isSaved ? '- Remove from list' : '+ Add to list' }
                </Button>      
              </ButtonContainer>
              <InfoContainer>
                <InfoGroup>
                  <Title>About {company.companyProfile.name}</Title>
                      <CompanyInfo companyProfile={company.companyProfile}/>
                </InfoGroup>
                <InfoGroup>
                  <Title>Stats</Title>
                    <MarketStats  financials={company.financials}/>
                  </InfoGroup>
                <InfoGroup>
                  <Title>News</Title>
                  <NewsGroup>
                      {company.news.length
                        ? company.news.map( (article: StockNews, index:number)  => <div key={index}><NewsArticle article={article}/></div>)
                        : <div>No news to display</div>
                      }
                  </NewsGroup>
                </InfoGroup>
              </InfoContainer>
          </DetailsContainer>
          )
          : <Loader />
        }
      </div>
  )
}

export default Detail;