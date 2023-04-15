import { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import SearchBar from "../SearchBar";
import styled from "styled-components";

import { Stock } from "@/types/stock";

import { tertiaryDark, linkHoverFill, inputHoverFill, primaryButtonHover } from "@/styles/colors";
import { truncateStringFn } from "@/services/generalServices";

const Popover = styled.div<{isActive?: boolean}>`
    display: ${({isActive}) => isActive ? 'block' : 'none' };
    position: absolute;
    top: 2.5rem;
    right: 0;
    // min-width: 6rem;
    width: 100%;
    padding: .5rem;
    background: transparent;
    color: #FFFFFF;
    backdrop-filter: blur(5px) contrast(.8);
    border-radius: 4px;
    // border: 1px solid red;
    max-height: 300px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    // gap: 25px;
    gap: 5px;
    height: 100%;
    padding-top: 5px;
    width: 100%;
`

const ListItem = styled.div`
    flex-direction: column;
    padding: 10px;
    gap: 3px;


    &:hover {
        cursor: pointer;
        border-radius: 4px;
        background: ${inputHoverFill};
    }
`

const EmptyResult = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${tertiaryDark};
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
            style={{position: 'relative'}}
        >
            <SearchBar 
                inputRef={inputRef}
                setActiveSearch={()=>{}} 
                setSearchResults={setSearchResults}
                handleFocus={ handleFocus}
                handleBlur={ handleBlur }
                
            />
            <Popover isActive={Boolean(listAnchorEl)}>
                <ListContainer>
                {
                    searchResults.length
                    ?
                    searchResults.map( (result: Stock, index: number) => (
                        <ListItem key={index} onClick={()=>handleStockClick(result.symbol)}>
                            <div>{result.symbol}</div>
                            <div>{truncateStringFn(result.description, 22)}</div>
                        </ListItem>
                    ))
                    : <EmptyResult>Results will appear here...</EmptyResult>
                }
                </ListContainer>
            </Popover>
        </div>
    )
    
    
}

export default NavSearch;