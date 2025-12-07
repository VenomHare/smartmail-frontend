import { Config } from "@/lib/config";
import type { ChatMessage } from "@/lib/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface GenerationState {
    processingChat: boolean,
    currentChatId: string,
    remainingChats: number,
    chats: ChatMessage[]
}

const initialState: GenerationState = {
    processingChat: false,
    currentChatId: "",
    remainingChats: Config.MAX_CHATS,
    chats: []
}

export const updateChats = createAsyncThunk("generation/update-chats", async (mail_id: string) => {

    const { data } = await axios.get(`${Config.backend_url}/chats/${mail_id}`, {
        withCredentials: true
    });

    return data.chats.map((chat:any) => ({...chat, timestamp: new Date(chat.timestamp) }));

})

const generationSlice = createSlice({
    name: "generation",
    initialState,
    reducers: {
        startProcessingChat: (state, action: PayloadAction<string>) => {
            state.processingChat = true;
            state.currentChatId = action.payload;
        },
        endProcessingChat: (state) => {
            state.currentChatId = "";
            state.processingChat = false;
        },
        setChats: (state, action: PayloadAction<ChatMessage[]>) => {
            state.chats = action.payload;
        },
        setRemainingChats: (state, action: PayloadAction<number>) => {
            state.remainingChats = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateChats.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
                state.chats = action.payload;
            })
            .addCase(updateChats.rejected, (state) => {
                toast.warning("Failed to update chat!");
                state.chats = [];
            })
            
    }

})

export const { startProcessingChat, endProcessingChat, setChats, setRemainingChats } = generationSlice.actions;
export default generationSlice.reducer;
