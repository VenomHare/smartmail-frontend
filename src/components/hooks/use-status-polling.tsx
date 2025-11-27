import { Config } from "@/lib/config";
import type { MailResponse } from "@/lib/types";
import { addAssistantChat, startProcessingChat, endProcessingChat, updateChats, setChats } from "@/store/generation";
import type { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAppDispatch from "./use-app-dispatch";

export const useStatusPolling = (uuid: string, setLoading: (e: boolean) => void) => {

    const [llmResponse, setLlmResponse] = useState<MailResponse>({
        uuid,
        status: "loading",
    });
    const { processingChat, currentChatId } = useSelector((state: RootState) => state.generation);

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loop = setInterval(async () => {
            if (llmResponse.status !== "processed") {
                console.log(llmResponse.status);
                try {
                    const { data } = await axios.get(`${Config.backend_url}/status/${uuid}`);
                    setLlmResponse(data);
                }
                catch (err) {
                    alert("Something Went Wrong! Try Again!")
                    navigate("/generate");
                }
            }
            else {
                clearInterval(loop);
            }
        }, Config.status_polling_delay);
        return () => {
            clearInterval(loop);
        }
    }, [uuid, Config.backend_url, llmResponse.status])

    useEffect(() => {
        let loop: number;
        if (processingChat) {
            loop = setInterval(async () => {
                try {
                    const { data } = await axios.get(`${Config.backend_url}/chat/${currentChatId}`, {
                        withCredentials: true
                    });

                    console.log(data);

                    if (data.status == "processed") {
                        const { data } = await axios.get(`${Config.backend_url}/status/${uuid}`);
                        setLlmResponse(data);
                        appDispatch(updateChats(uuid));
                        dispatch(endProcessingChat());
                    }
                }
                catch (error) {
                    alert("Failed to update email");
                    dispatch(endProcessingChat())
                }

            }, Config.status_polling_delay);
        }
        return () => {
            clearInterval(loop);
        }
    }, [processingChat])

    useEffect(()=>{
        appDispatch(updateChats(uuid));
        return () => {
            dispatch(setChats([]));
        }
    },[])

    const sendExtraAnswers = async (answers: string) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${Config.backend_url}/input/${uuid}`, {
                answers
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            setLlmResponse(data);
        }
        catch (err) {
            alert("Something Went Wrong! Try Again!")
            navigate("/generate");
        }
        finally {
            setLoading(false);
        }
    }

    const sendChat = async (message: string) => {
        try 
        {   
            if (processingChat) {
                return
            }

            const { data } = await axios.post(`${Config.backend_url}/mail/${uuid}/chat`, { message }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (data.status && data.status == "inqueue") {
                console.log("Inqueue lets start polling")
                dispatch(startProcessingChat(data.chat_id));
            }
        }
        catch (err) {
            alert("Failed to send chat!")
        }
    }


    return { llmResponse, sendExtraAnswers, sendChat }
}