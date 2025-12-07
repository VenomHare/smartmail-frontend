import { Config } from "@/lib/config";
import type { LinkedMail, User } from "@/lib/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


export interface AuthState {
    user?: User,
    linkedAccounts: LinkedMail[]
}


const initialState: AuthState = {
    user: undefined,
    linkedAccounts: [],
}


export const getUserData = createAsyncThunk("userdata/getUserData", async () => {
    const { data } = await axios.get(`${Config.backend_url}/auth/me`, {
        withCredentials: true
    });
    return (data as { user: User });
});

export const getLinkedAccounts = createAsyncThunk("userdata/getLinkedAccounts", async () => {
    const { data } = await axios.get(
        `${Config.backend_url}/gmail/accounts`,
        { withCredentials: true },
    );
    return data
})


const AuthSlice = createSlice({
    name: "userdata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, data) => {
                state.user = data.payload.user
            })
            .addCase(getUserData.rejected, (_, payload) => {
                if (payload.error instanceof AxiosError && payload.error.status == 401) {
                    console.log("User not logged in!!");
                }
                else {
                    console.log("Failed to fetch User data",);
                }
            })
            .addCase(getLinkedAccounts.fulfilled, (state, data: PayloadAction<LinkedMail[]>) => {
                state.linkedAccounts = data.payload;
            })
    }
})

export const { } = AuthSlice.actions;
export default AuthSlice.reducer