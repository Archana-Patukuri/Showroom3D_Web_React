import { configureStore} from '@reduxjs/toolkit' ; 
import dayNightToggle  from './GlobalState/DayNightToggle';

export const store = configureStore({
    reducer : {
        dayNightSlice : dayNightToggle ,             
    } , 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;