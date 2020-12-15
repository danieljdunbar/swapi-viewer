import { configureStore } from '@reduxjs/toolkit';
import { personReducer } from './PersonSlice';

export default configureStore({
    reducer: personReducer,
});