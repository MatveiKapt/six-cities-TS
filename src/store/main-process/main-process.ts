import {MainProcess} from '../../types/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';

const initialState: MainProcess = {
  currentCity: 'Paris',
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<MainProcess ['currentCity']>) => {
      state.currentCity = action.payload;
    }
  },
});

export const {changeCity} = mainProcess.actions;
