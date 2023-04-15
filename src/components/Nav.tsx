import Link from 'next/link';
import styled from 'styled-components';

import NavSearch from './Search/NavSearch';

const NavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
    background: black;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    padding: 10px;
`

const Nav = () => {
    return(
        <NavContainer>
            <Link href={'/portfolio'}>Watch List</Link>
            <NavSearch />
        </NavContainer>
    )
}

export default Nav;