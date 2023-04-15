import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components';

import StockChart from '../../components/StockChart'
import NewsArticle from '@/components/Company/NewsArticle';
import CompanyInfo from '@/components/Company/CompanyInfo';
import MarketStats from '@/components/Company/MarketStats';

import { fetchStockDetails } from '@/services/stockServices';
import { lightGray } from '@/styles/colors';

import { Company, StockNews } from '@/types/stock';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.div`
  font-size: 26px;
`

const MarketCategory = styled.div`
  display: flex;
  flex-direction: column;
`
const NewsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const NewsItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${lightGray};
`

const Detail = () => {
  const router = useRouter()
  const { stock } = router.query;
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [company, setCompany] = useState<Company>();


  console.log('Company: ', company)

  useEffect( () => {
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
    
  }, [stock])

  return (
      <div>
        {
          loading
          ? 'loading'
          : error ? <div>{error}</div>
          : company?.priceHistory ? (
            <DetailsContainer>
              <StockChart stockData={[company?.priceHistory]} /> 
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
          : 'loading'
        }
      </div>
  )
}

export default Detail;