import Link from 'next/link';
import styled from 'styled-components';
import NavSearch from './Search/NavSearch';
import Image from 'next/image';

import Logo from '../../public/st-logo.png';


const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    padding: 10px 30px;
`

const NavInnerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
`

const Nav = () => {
    return(
        <NavContainer>
            <Link href={'/'}>
                <Image
                    src={Logo}
                    alt="logo"
                    width={35}
                    height={35}
                />
            </Link>
            <NavInnerContainer>
                <Link href={'/portfolio'}>Watch List</Link>
                <NavSearch />
            </NavInnerContainer>
            
        </NavContainer>
    )
}

export default Nav;