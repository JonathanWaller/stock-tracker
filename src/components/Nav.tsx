import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// import SearchBar from './SearchBar';
import NavSearch from './Search/NavSearch';

import styles from './Nav.module.css';

const NavContainer = styled.div`
    border: 1px solid red;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background: black;

    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    padding: 10px;

    border: 1px solid green;
`

const Nav = () => {
    const [ input, setInput ] = useState<string>('')

    return(
        <NavContainer>
            <div>
                <Link href={'/portfolio'}>Portfolio</Link>
            </div>
            <div>
                {/* Watchlist */}
                <Link href={'/portfolio'}>Watchlist</Link>
            </div>
            {/* <div>
                <Link href={'/search'}>Search</Link>
            </div> */}
            <div>
                <NavSearch />
            </div>
        </NavContainer>
    )
}

export default Nav;