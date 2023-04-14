import styled from "styled-components";
import { lightGray, secondaryDark, tertiaryDark, SUPPORT_APP_LIGHT_GRAY } from "@/styles/colors";

import { CompanyProfile } from "@/types/stock";

import { getReadableTimeSince } from "@/services/dateServices";
import { detailsInfoMapping, detailsInfo } from "@/utils";

const Table = styled.div`
    display: flex;
    gap: 75px;
`

const ColumnOne = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const ColumnTwo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Source = styled.div`
    color: ${tertiaryDark};
    display: flex;
    gap: 10px;
`
const Headline = styled.div`
    font-size: 25px;
`

const Info = styled.div`
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

const Summary = styled.div`

`

interface Props {
    companyProfile: CompanyProfile;
    // data: string;
}

const CompanyInfo: React.FC<Props> = ({companyProfile}) => {

    return(
        <Table>
            <ColumnOne>
                <Group>
                    <Title>Industry</Title>
                    <div>{companyProfile.finnhubIndustry}</div>
                </Group>
                <Group>
                    <Title>Ticker</Title>
                    <div>{companyProfile.ticker}</div>
                </Group>
            </ColumnOne>
            <ColumnTwo>
                <Group>
                    <Title>Company site</Title>
                    <div>{companyProfile.weburl}</div>
                </Group>
                <Group>
                    <Title>IPO Date</Title>
                    <div>{companyProfile.ipo}</div>
                </Group>
            </ColumnTwo>
        </Table>
    )

    // return (
    //     <Container>
    //         {
    //             detailsInfo.map( ( stat:string, index: number) => (
    //                 <>
    //                 <div>{stat}</div>
    //                 {/* @ts-ignore */}
    //                 <div>{companyProfile && companyProfile[detailsInfoMapping[stat]]}</div>
    //                 </>
    //             ))
    //         }
    //     </Container>
    // )
}

export default CompanyInfo;