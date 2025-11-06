import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
})

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;