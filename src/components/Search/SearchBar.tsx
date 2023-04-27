import { debounce } from "lodash";
import { Search } from "react-feather";

import { fetchSearch } from "lib/finnhub";
import { Stock } from "@/types/stock";

import { LIGHT_GRAY, inputHoverFill, inputFill } from "@/styles/colors";

import styled from "styled-components";

const InputContainer = styled.div`
    width: 250px;
    border-radius: 12px;

    &:hover {
        background: ${inputHoverFill};
    }
`

const InputInnerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    border-radius: 4px;
    border: none;
    background: ${inputFill};
    border: 1px solid transparent;

    &:hover {
        background: ${inputHoverFill};
    }
`

const Input = styled.input`
    width: 100%;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    background: transparent;
    font-size: 16px;

    &:active, &:focus, &:focus-visible {
        border: none;
        outline: none;
        box-shadow: none;
    }

    &:focus { 
        outline: none;
     }

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${LIGHT_GRAY}66;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${LIGHT_GRAY}66;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
        color: ${LIGHT_GRAY}66;
    }
`

const LeftSideIconContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
`


interface Props {
    inputRef: HTMLInputElement;
    setActiveSearch: ( isActive: boolean ) => void;
    setSearchResults: ( searchResults: Stock[]) => void;
    handleFocus?: () => void;
    handleBlur?: () => void;
}

const SearchBar: React.FC<Props> = ({inputRef, setActiveSearch, setSearchResults, handleFocus, handleBlur }) => {

     // debounce the onChange to prevent multiple calls being made while typing
    const handleSearch = debounce(async (e) => {
        if (e.target.value == "") {
            setActiveSearch( false )
            setSearchResults([])
            return;
        }

        try {
            const res: any = await fetchSearch(e.target.value);
            setSearchResults( res )
            setActiveSearch( true )
        } catch ( e:any) {
            // todo: handle error in search
        }

        
    }, 500);

    return (
        <InputContainer>
            <InputInnerContainer>
                <LeftSideIconContainer>
                    <Search size={20} strokeWidth={2}/>
                </LeftSideIconContainer>
                <Input
                    ref={inputRef}
                    placeholder={'Search for stocks...'}
                    name='searh'
                    onChange={handleSearch}
                    type='search'
                    autoComplete="off"
                    spellCheck='false'
                />
            </InputInnerContainer>
        </InputContainer>
    )
}

export default SearchBar;