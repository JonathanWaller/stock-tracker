import { createSelector } from 'reselect';
import { RootState } from '@/store';

const getSavedList = ( state: RootState) => {
    return state.list.savedList
}

export const savedListSelector = createSelector(
    getSavedList,
    result => result 
)