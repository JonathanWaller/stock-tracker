import styled from "styled-components";
import { lightGray, tertiaryDark} from "@/styles/colors";

import { CompanyProfile } from "@/types/stock";

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

interface Props {
    companyProfile: CompanyProfile;
}

const CompanyInfo: React.FC<Props> = ({companyProfile}) => {

    return(
        <Table>
            <ColumnOne>
                <Group>
                    <Title>Industry</Title>
                    <div>{companyProfile.finnhubIndustry || 'N/A'}</div>
                </Group>
                <Group>
                    <Title>Ticker</Title>
                    <div>{companyProfile.ticker || 'N/A'}</div>
                </Group>
            </ColumnOne>
            <ColumnTwo>
                <Group>
                    <Title>Company site</Title>
                    <div>{companyProfile.weburl || 'N/A'}</div>
                </Group>
                <Group>
                    <Title>IPO Date</Title>
                    <div>{companyProfile.ipo || 'N/A'}</div>
                </Group>
            </ColumnTwo>
        </Table>
    )
}

export default CompanyInfo;