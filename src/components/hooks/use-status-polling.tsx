import { Config } from "@/lib/config";
import type { MailResponse } from "@/lib/types";
import { addAssistantChat } from "@/store/generation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const useStatusPolling = (uuid: string, setLoading: (e:boolean)=>void) => {

    const [llmResponse, setLlmResponse] = useState<MailResponse>({
        uuid,
        status: "loading",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loop = setInterval(async () => {
            if (llmResponse.status !== "processed") {
                console.log(llmResponse.status);
                try {
                    const { data } = await axios.get(`${Config.backend_url}/status/${uuid}`);
                    if (data.status == "processed") {
                        dispatch(addAssistantChat(data.response.llmMessage));
                    }
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

    const sendExtraAnswers = async (answers: string) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${Config.backend_url}/input/${uuid}`, {
                answers
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
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

    return { llmResponse, sendExtraAnswers }
}