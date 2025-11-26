import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './auth'
import generationSlice from './generation'

const store = configureStore({
    reducer: {
        userdata: AuthSlice,
        generation: generationSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store