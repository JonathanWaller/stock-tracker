import { useState } from "react";
import { debounce } from "lodash";

import { fetchSearch } from "lib/finnhub";
import { Stock } from "@/types/stock";

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
            const res: any= await fetchSearch(e.target.value);
            setSearchResults( res )
            setActiveSearch( true )
        } catch ( e:any) {
            // todo: handle error in search
        }

        
    }, 500);

    return (
        <div>
            <input
                // className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded text-sm focus:outline-none"
                type="search"
                name="search"
                ref={inputRef}
                placeholder="Search for Stocks..."
                onChange={handleSearch}
                autoComplete="off"
                onFocus={handleFocus ? handleFocus : undefined}
                onBlur={handleBlur ? handleBlur : undefined}
            />
        </div>
    )
}

export default SearchBar;