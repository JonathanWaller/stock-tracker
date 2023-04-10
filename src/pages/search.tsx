import { useState } from 'react';

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'
import styled from 'styled-components';

import SearchBar from "@/components/SearchBar";
import SearchList from '@/components/searchList';

import { Stock } from '@/types/stock';

const Holder = styled.div`
    position: relative;
    width: 100%;
`

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.NEXT_PUBLIC_FINN_KEY
     }
    }
}

const Search = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    const [ searchResults, setSearchResults ] = useState<Stock[]>([])
    const [ activeSearch, setActiveSearch ] = useState<boolean>( false )

    // console.log('search results: ', searchResults)

    const handleSelection = (selection: Stock) => {
        console.log('SELECTED: ', selection)
    }

    return(
        <div>
            <SearchBar 
                setActiveSearch={setActiveSearch}
                setSearchResults={setSearchResults}  
            /> 
            <Holder>
            {
                searchResults?.length && (
                    <SearchList 
                        name="searchList"
                        // isOpen={activeSearch}
                        options={searchResults} 
                        select={handleSelection } 
                    /> 
                )
            }
            </Holder>
              
        </div>
    )
}

export default Search;