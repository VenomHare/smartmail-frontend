import { Config } from "@/lib/config";
import type { User } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


export interface AuthState {
    user?: User
}


const initialState: AuthState = {
}


export const getUserData = createAsyncThunk("userdata/getUserData", async () => {
    const { data } = await axios.get(`${Config.backend_url}/auth/me`, {
        withCredentials: true
    });
    return (data as { user: User });
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
    }
})

export const { } = AuthSlice.actions;
export default AuthSlice.reducer