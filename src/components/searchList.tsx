import { useEffect, useState } from "react";
import styled from 'styled-components';

import {Stock} from '../types/stock';

import { LabelText } from "@/styles/typography";
import { SUPPORT_APP_LIGHT_GRAY, SUPPORT_APP_BLACK, SUPPORT_APP_WHITE } from "@/styles/colors";



const Container = styled.div`
    border: 1px solid blue;
`

const DropdownContainer = styled.div`
    width: 100%;
    position: relative;
    border: 1px solid red;
`

const DropdownLabel = styled(LabelText)`
    padding-left: 3px;
    margin-bottom: 7px;
`

const DropdownInnerContainer = styled.div<{selected: boolean, open: boolean}>`
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

    ${({ selected }) => selected ? `
        // color: ${SUPPORT_APP_BLACK};
        color: red;
    ` : `
        // color: ${SUPPORT_APP_BLACK}66;
        color: red;
    `}

    ${({ open }) => open ? `
        border-radius: 4px 4px 0px 0px;
    ` : `
        border-radius: 4px;
    `}

    &:hover {
        cursor: pointer;
        filter: brightness(.95);
    }
`

const DropdownSelections = styled.div`
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;

    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid ${SUPPORT_APP_LIGHT_GRAY};

    display: flex;
    flex-direction: column;
    background-color: ${SUPPORT_APP_WHITE};
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
`

interface Props {
    options: Stock[];
    select: ( stock: Stock ) => void;
}

const SearchList: React.FC<Props> = ({options, select}) => {
    const [ open, setOpen ] = useState<boolean>(false);

    console.log('INNER OPTIONS: ', options)

    useEffect( () => {
        let dropdown = document.getElementById(`${name}-dropdown`)
        const documentClickHandler = ( e:any ) => {
            if ( dropdown?.contains(e.target) ) {
                // In select
                return;
            }
            // Not in select
            setOpen(false)
            return;
        }    
        document.addEventListener( 'click', documentClickHandler );
        document.addEventListener( 'touchend', documentClickHandler );
        return () => {
            document.removeEventListener( 'click', documentClickHandler );
            document.removeEventListener( 'touchend', documentClickHandler );
        }
        //eslint-disable-next-line
    }, [] );

    return(
        // <DropdownContainer id={`${name}-dropdown`}>
        <DropdownContainer>
            {/* {label && <DropdownLabel>{label}</DropdownLabel>} */}
            <DropdownInnerContainer open={open} selected={false} onClick={() => setOpen(!open)}>
                {/* { selection ? selection.symbol : placeholderText } */}
                hey
                {/* {open ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />} */}
            </DropdownInnerContainer>
            {open && (
                <DropdownSelections>
                    {options.map((option, index) => (
                        <OptionRow key={`option-${index}`}onClick={() => { select(option); setOpen(false); }}>
                            {option.symbol}
                        </OptionRow>
                    ))}
                    {/* <OptionRow>
                        heyyyyyy
                    </OptionRow> */}
                </DropdownSelections>
            )}
        </DropdownContainer>
    )

}

export default SearchList;