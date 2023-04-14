import styled from "styled-components";
import { lightGray, secondaryDark, tertiaryDark } from "@/styles/colors";

import { StockNews } from "@/types/stock";

import { getReadableTimeSince } from "@/services/dateServices";

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

const Container = styled.a`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-bottom: 1px solid ${lightGray};
    padding-bottom: 30px;
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

const Summary = styled.div`

`

interface Props {
    article: StockNews
}

const NewsArticle: React.FC<Props> = ({article}) => {

    return (
        <Container href={article.url} target="_blank" rel="noopener noreferrer">
            <Source>
                <div>{article.source}</div>
                <div>{getReadableTimeSince(new Date(article.datetime*1000))} ago</div>
            </Source>
            <Info>
                <Headline>{article.headline}</Headline>
                <Summary>{article.summary}</Summary>
            </Info>
        </Container>
    )
}

export default NewsArticle;