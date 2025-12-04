import { Config } from "@/lib/config";
import type { ChatMessage } from "@/lib/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface GenerationState {
    processingChat: boolean,
    currentChatId: string,
    chats: ChatMessage[]
}

const initialState: GenerationState = {
    processingChat: false,
    currentChatId: "",
    chats: []
}

export const updateChats = createAsyncThunk("generation/update-chats", async (mail_id: string) => {

    const { data } = await axios.get(`${Config.backend_url}/chats/${mail_id}`, {
        withCredentials: true
    });

    return data.chats.map((chat: any) => ({
        message: chat.message,
        role: chat.role
    }));

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
        addUserChat: (state, action: PayloadAction<string>) => {
            state.chats.push({
                role: "user",
                message: action.payload
            })
        },
        addAssistantChat: (state, action: PayloadAction<string>) => {
            state.chats.push({
                role: "assistant",
                message: action.payload
            })
        },
        setChats: (state, action: PayloadAction<ChatMessage[]>) => {
            state.chats = action.payload;
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

export const { startProcessingChat, endProcessingChat, addAssistantChat, addUserChat, setChats } = generationSlice.actions;
export default generationSlice.reducer;
