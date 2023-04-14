import styled from "styled-components";
import { lightGray } from "@/styles/colors";

import { detailsStats, detailsStatsMapping } from "@/utils";
import { StockFinancials } from "@/types/stock";

import { breakpoints } from "@/styles/breakpoints";

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 100px;

    @media (max-width: ${breakpoints.sm}px) {
        flex-direction: column;
        gap: 15px;
    }
`

const MarketCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Title = styled.div`
    color: ${lightGray};
`

const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`


interface Props {
    // title: string;
    financials: StockFinancials;
}   

const MarketStats: React.FC<Props> = ({ financials }) => {
    return(
        <Container>
            {detailsStats.map( (stat:string, index:number) => (
                <MarketCategory key={index}>
                     <Title>{stat}</Title>
                    <div>{financials && financials[detailsStatsMapping[stat]]}</div>
                </MarketCategory>
            ))}
        </Container>
    )
}

export default MarketStats;