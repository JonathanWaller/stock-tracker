import { useState } from 'react';

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { InferGetStaticPropsType } from 'next'

import SearchBar from "@/components/searchBar";
import SearchList from '@/components/searchList';

import { Stock } from '@/types/stock';

export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
     props: {
        apiKey: process.env.FINN_KEY
     }
    }
}

const Search = ({apiKey}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    const [ searchResults, setSearchResults ] = useState<Stock[]>([])

    // console.log('search results: ', searchResults)

    const handleSelection = (selection: Stock) => {
        console.log('SELECTED: ', selection)
    }

    return(
        <div>
            <SearchBar apiKey={apiKey} setSearchResults={setSearchResults}  /> 
            <SearchList options={searchResults} select={handleSelection } />   
        </div>
    )
}

export default Search;