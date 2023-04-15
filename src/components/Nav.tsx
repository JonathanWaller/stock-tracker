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
    align-items: center;
    gap: 10px;
    background: black;

    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    padding: 10px;

    border: 1px solid yellow;
`

const Nav = () => {
    const [ input, setInput ] = useState<string>('')

    return(
        <NavContainer>

                <Link href={'/portfolio'}>Portfolio</Link>
      
   
                {/* Watchlist */}
                <Link href={'/portfolio'}>Watchlist</Link>

            {/* <div>
                <Link href={'/search'}>Search</Link>
            </div> */}
            
                <NavSearch />
      
        </NavContainer>
    )
}

export default Nav;