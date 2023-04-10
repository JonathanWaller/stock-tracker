import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components';

import StockChart from '../../components/StockChart'

import { fetchStockDetails } from '@/services/stockServices';
import { detailsStats, detailsStatsMapping } from '@/utils';

import { Company } from '@/types/stock';

const MarketStats = styled.div`
  border: 1px solid red;
  width: 100%;
  display: flex;
  gap: 10px;
`

const MarketCategory = styled.div`
  display: flex;
  flex-direction: column;
`

const Detail = () => {
  const router = useRouter()
  const { stock } = router.query;
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [company, setCompany] = useState<Company>();

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

  console.log('finalcompany: ', company)

  return (
      <div>
        {
          loading
          ? 'loading'
          : error ? <div>{error}</div>
          : company?.priceHistory ? (
            <>
            <StockChart stockData={[company?.priceHistory]} /> 

            <MarketStats>
              {detailsStats.map( (stat:string, index: number) => (
                <MarketCategory key={index}>
                  <div>{stat}</div>
                  <div>{company?.financials && company.financials[detailsStatsMapping[stat]]}</div>
                </MarketCategory>
              ))}
            </MarketStats>

          </>
          )
          : 'loading'
          
        }
      </div>
  )
}

export default Detail;