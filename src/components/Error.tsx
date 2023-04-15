import styled from "styled-components";

const Container = styled.div`
    height: 450px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface ErrorProps {
    errorText?: string;
}

const defaultErrorMssg = 'An error has occurred. Please try again later.'

const Error:React.FC<ErrorProps> = ({errorText}) => {
    return(
        <Container>
            {errorText || defaultErrorMssg }
        </Container>
    )
}

export default Error;