import { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import SearchBar from "../SearchBar";

import { Stock } from "@/types/stock";

import styled from "styled-components";

const Popover = styled.div<{isActive?: boolean}>`
    display: ${({isActive}) => isActive ? 'block' : 'none' };
    position: absolute;
    top: 2rem;
    right: 0;
    min-width: 6rem;
    padding: .5rem;
    background: transparent;
    color: #FFFFFF;
    backdrop-filter: blur(5px) contrast(.8);
    border-radius: 4px;
    border: 1px solid red;
    max-height: 300px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    border: 1px solid green;
    height: 100%;
`

const NavSearch = () => {
    const [ searchResults, setSearchResults ] = useState<Stock[]>([])
    const [ listAnchorEl, setListAnchorEl ] = useState( null );
    const [ searchValue, setSearchValue ] = useState('');
    const router = useRouter();
    const settingsRef = useRef<any>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleMenuToggle = ( event:any ) => {
        console.log('YEP')
        setListAnchorEl( listAnchorEl ? null : event.currentTarget );
    };

    const handleFocus = () => {
        console.log('focus')
        // handleMenuToggle();
    }

    const handleBlur = () => {
        console.log('blur')
    }

    const handleStockClick = (stockSymbol: string) => {
        if( inputRef.current) inputRef.current.value = '';
        router.push(`/detail/search?stock=${stockSymbol}`)
    }

    useEffect( () => {
        // Detecting click away
        const documentClickHandler = (e:any) => {
            if ( 
                settingsRef.current && (
                    settingsRef.current.contains( e.target ) ||
                    settingsRef.current === e.target
                )
            ) {
                // In settings
                return;
            }
            // Not in settings
            setListAnchorEl( null );
            return;
        }    
        document.addEventListener( 'click', documentClickHandler );
        document.addEventListener( 'touchend', documentClickHandler );
        return () => {
            document.removeEventListener( 'click', documentClickHandler );
            document.removeEventListener( 'touchend', documentClickHandler );
        }
    }, [] );
    

    return(
        <div ref={settingsRef}
            onClick={ handleMenuToggle }
            style={{border: '1px solid red', position: 'relative'}}

        >
            <SearchBar 
                inputRef={inputRef}
                setActiveSearch={()=>{}} 
                setSearchResults={setSearchResults}
                handleFocus={ handleFocus}
                handleBlur={ handleBlur }
                
            />
            <Popover isActive={Boolean(listAnchorEl)}>
                {/* <ul
                    className="nav_settingsPopoverList"
                >
                    <li
                        className="nav_settingsPopoverItem"
                    >
                        <div
                        >
                            <span>
                                About
                            </span>
                        </div>
                    </li>
                
                
                </ul> */}
                <ListContainer>
                {
                    searchResults.map( (result: Stock, index: number) => (
                        <div key={index} onClick={()=>handleStockClick(result.symbol)}>
                            {/* <Link href='/detail/search?search=tsla'> */}
                            {/* <Link href={`/detail/search?stock=${result.symbol}`}> */}
                                <div>{result.symbol}</div>
                                <div>{result.description}</div>
                            {/* </Link> */}
                        </div>
                    ))
                }
                </ListContainer>
            </Popover>
        </div>
    )
    
    
}

export default NavSearch;