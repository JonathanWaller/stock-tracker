import Link from 'next/link';
import { useState } from 'react';

import SearchBar from './SearchBar';
import NavSearch from './Search/NavSearch';

import styles from './Nav.module.css';

const Nav = () => {
    const [ input, setInput ] = useState<string>('')

    return(
        <div className={styles.container}>
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
        </div>
    )
}

export default Nav;