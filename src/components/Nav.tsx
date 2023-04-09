import Link from 'next/link';

import styles from './Nav.module.css';

const Nav = () => {
    return(
        <div className={styles.container}>
            <div>
                <Link href={'/portfolio'}>Portfolio</Link>
            </div>
            <div>
                {/* Watchlist */}
                <Link href={'/portfolio'}>Watchlist</Link>
            </div>
            <div>
                {/* Watchlist */}
                <Link href={'/search'}>Search</Link>
            </div>
        </div>
    )
}

export default Nav;