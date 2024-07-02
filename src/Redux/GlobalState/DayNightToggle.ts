import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type DayInitialtate = {
  day: boolean;
};

const initialState: DayInitialtate = {
  day: false,
};

export const dayNightSlice = createSlice({
  name: 'dayNightSlice',
  initialState,
  reducers: {
    dayNightToggle: (state) => {
      state.day = !state.day;
    },
    dayNightPayloadToggle: (state, action: PayloadAction<boolean>) => {
      state.day = action.payload;
    },
  },
});

export const { dayNightPayloadToggle, dayNightToggle } = dayNightSlice.actions;
export default dayNightSlice.reducer;
