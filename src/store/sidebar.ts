import { Config } from "@/lib/config";
import type { MailHistoryItem } from "@/lib/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface SidebarState {
    open: boolean
    history: MailHistoryItem[]
}

const initialState: SidebarState = {
    open: false,
    history: []
}

export const getHistory = createAsyncThunk('sidebar/get-history', async () => {
    const { data } = await axios.get(`${Config.backend_url}/history`, {
        withCredentials: true
    });
    const items: MailHistoryItem[] = data;
    return items;
})

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebar: (state, data: PayloadAction<boolean>) => {
            state.open = data.payload
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getHistory.fulfilled, (state, data: PayloadAction<MailHistoryItem[]>) => {
                state.history = data.payload;
            })
})

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;