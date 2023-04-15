import { useEffect, useState, useRef } from "react";
import styled from 'styled-components';

import {Stock} from '../types/stock';

import { LabelText } from "@/styles/typography";
import { SUPPORT_APP_LIGHT_GRAY, SUPPORT_APP_BLACK, SUPPORT_APP_WHITE } from "@/styles/colors";


const DropdownContainer = styled.div`
    width: 100%;
    position: relative;
    border: 1px solid red;
`

const DropdownInnerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40px;

    display: flex;
    background-color: ${SUPPORT_APP_LIGHT_GRAY};

    align-items: center;
    justify-content: space-between;
    border: none;

    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    padding: 12px;

    border: 1px solid green;

    border-radius: 4px;

    &:hover {
        cursor: pointer;
        filter: brightness(.95);
    }
`

const DropdownSelections = styled.div`
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;

    // position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid ${SUPPORT_APP_LIGHT_GRAY};

    display: flex;
    flex-direction: column;
    background-color: ${SUPPORT_APP_WHITE};

    border: 1px solid blue;
`

const OptionRow = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.03em;
    padding: 20px;

    &:not(:last-child) { 
        border-bottom: 1px solid ${SUPPORT_APP_LIGHT_GRAY};
    }

    &:hover {
        cursor: pointer;
        background-color: ${SUPPORT_APP_BLACK}03;
        text-decoration: underline;
    }

    color: red;
`

interface Props {
    name: string;
    options: Stock[];
    select: ( stock: Stock ) => void;
}

const SearchList: React.FC<Props> = ({name, options, select}) => {
    const [ open, setOpen ] = useState<boolean>(true);
    // const [ anchorRef, setAnchorRef ] = useRef();
    const [ listAnchorEl, setListAnchorEl ] = useState( null );
    const anchorRef = useRef();

    console.log('INNER OPTIONS: ', options)

    useEffect( () => {
        // Detecting click away
        const documentClickHandler = (e:any) => {
            if ( 
                anchorRef.current && (
                    // @ts-ignore
                    anchorRef.current.contains( e.target ) ||
                    anchorRef.current === e.target
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

    // useEffect( () => {
    //     let dropdown = document.getElementById(`${name}-dropdown`)
    //     const documentClickHandler = ( e:any ) => {
    //         if ( dropdown?.contains(e.target) ) {
    //             // In select
    //             return;
    //         }
    //         // Not in select
    //         // setOpen(false)
    //         return;
    //     }    
    //     document.addEventListener( 'click', documentClickHandler );
    //     document.addEventListener( 'touchend', documentClickHandler );
    //     return () => {
    //         document.removeEventListener( 'click', documentClickHandler );
    //         document.removeEventListener( 'touchend', documentClickHandler );
    //     }
    //     //eslint-disable-next-line
    // }, [] );


    return(
        // <DropdownContainer id={`${name}-dropdown`}>
        // <DropdownContainer>
        <>
            {/* <DropdownInnerContainer>
            </DropdownInnerContainer> */}
                <DropdownSelections>
                    {options.map((option, index) => (
                        <OptionRow key={`option-${index}`} onClick={() => { select(option) }}>
                            {option.symbol}
                        </OptionRow>
                    ))}
                </DropdownSelections>
        </>
        // </DropdownContainer>
    )

}

export default SearchList;