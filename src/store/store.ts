import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './auth'
import generationSlice from './generation'
import SidebarSlice from './sidebar'

const store = configureStore({
    reducer: {
        userdata: AuthSlice,
        generation: generationSlice,
        sidebar: SidebarSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store