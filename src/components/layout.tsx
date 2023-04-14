import styled from "styled-components";
import Nav from "./Nav";
import { breakpoints } from "@/styles/breakpoints";

const AppContainer = styled.div`
    padding: 100px;

    @media (max-width: ${breakpoints.sm}px) {
        padding: 50px;
     }
`

interface Props {
    children: any;
}

const Layout = ({children}: Props ) => {
    return(
        <AppContainer>
            <Nav />
            <main>{children}</main>
        </AppContainer>
    )
}

export default Layout;