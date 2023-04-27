import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SavedStock } from '@/types/stock';

interface State {
    savedList: SavedStock[];
}

const initialState: State = {
    savedList: [
        {ticker: 'PYPL', name: 'PayPal Holdings Inc'},
        {ticker: 'COIN', name: 'Coinbase Global Inc'},
        {ticker: 'NDAQ', name: 'Nasdaq Inc'}
    ]
}

// slice
export const listSlice = createSlice( {
    name: 'list',
    initialState,
    reducers: {
        addListItem: ( state, action: PayloadAction<{ticker: string, name: string}> ) => {
            state.savedList = [...state.savedList, action.payload]
        },
        removeFromList: ( state, action: PayloadAction<string>) => {
            let stateCopy = [...state.savedList]
            const foundIndex = stateCopy.findIndex(x => x.ticker === action.payload)
            if( foundIndex > -1 ) stateCopy.splice(foundIndex, 1)
            state.savedList = stateCopy;
        }
    }
})

export const { addListItem, removeFromList } = listSlice.actions;

export default listSlice.reducer;