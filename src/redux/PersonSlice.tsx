import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, DEFAULT_PERSON } from '../common_interfaces';

// export interface SelectedPerson {
//     person: Person;
// }

export const slice = createSlice({
    name: 'person',
    initialState: DEFAULT_PERSON as Person,
    reducers: {
        replacePerson: (state, action: PayloadAction<Person>) => {
            return state = action.payload;
        },
    },
});

export const { replacePerson } = slice.actions;
export const selectPerson = (state: Person) => state;
export default slice.reducer;