import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
    savedList: string[];
}

const initialState: State = {
    savedList: ['AAPL', 'TSLA']
}

// slice
export const listSlice = createSlice( {
    name: 'list',
    initialState,
    reducers: {
        // handle synchornous actions

        addListItem: ( state, action: PayloadAction<string> ) => {
            state.savedList = [...state.savedList, action.payload]
        },
        removeFromList: ( state, action: PayloadAction<string>) => {
            let stateCopy = [...state.savedList]
            const foundIndex = stateCopy.findIndex(x => x === action.payload)
            if( foundIndex > -1 ) stateCopy.splice(foundIndex, 1)
            state.savedList = stateCopy;
        }
    }
})

export const { addListItem, removeFromList } = listSlice.actions;

export default listSlice.reducer;