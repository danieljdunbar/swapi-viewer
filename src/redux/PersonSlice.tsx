import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, DEFAULT_PERSON } from '../common_interfaces';

export const slice = createSlice({
    name: 'person',
    initialState: DEFAULT_PERSON,
    reducers: {
        replacePerson: (state, action: PayloadAction<Person>) => {
            return state = action.payload;
        },
    },
});

export const { replacePerson } = slice.actions;
export const selectPerson = (state: Person) => state;
export default slice.reducer;