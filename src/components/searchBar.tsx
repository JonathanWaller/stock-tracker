import { useState } from "react";
import { debounce } from "lodash";

import { fetchSearch } from "lib/finnhub";
import { Stock } from "@/types/stock";

interface Props {
    apiKey: string;
    setSearchResults: ( searchResults: Stock[]) => void;
}

const SearchBar: React.FC<Props> = ({apiKey, setSearchResults}) => {

     // debounce the onChange to prevent multiple calls being made while typing
    const handleSearch = debounce(async (e) => {
        if (e.target.value == "") {
            setSearchResults([])
            return;
        }

        try {
            const res: any= await fetchSearch(apiKey, e.target.value);
            setSearchResults( res )
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
                placeholder="Search for Stocks..."
                onChange={handleSearch}
                autoComplete="off"
            />
        </div>
    )
}

export default SearchBar;