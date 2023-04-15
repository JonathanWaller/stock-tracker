import styled, { keyframes } from "styled-components"

import { green, lightGray } from "@/styles/colors"

const Container = styled.div`
    height: 450px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const StyledLoader = styled.div`
    border: 8px solid ${lightGray};
    border-top: 8px solid ${green};
    border-radius: 50%;
    height: 60px;
    width: 60px;
    animation: ${Spin} 2s linear infinite;
`

const Loader = () => <Container><StyledLoader /></Container>

export default Loader;