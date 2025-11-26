import type { ChatMessage } from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GenerationState {
    processingChat: boolean,
    chats: ChatMessage[]
}

const initialState: GenerationState = {
    processingChat: false,
    chats: []
}   

const generationSlice = createSlice({
    name: "generation",
    initialState,
    reducers: {
        setProcessingChat: (state, action: PayloadAction<boolean>) => {
            state.processingChat = action.payload
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
    }
})

export const { setProcessingChat, addAssistantChat, addUserChat, setChats } = generationSlice.actions;
export default generationSlice.reducer;
