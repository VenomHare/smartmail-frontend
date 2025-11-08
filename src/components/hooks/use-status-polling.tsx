import { Config } from "@/lib/config";
import type { MailResponse } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useStatusPolling = (uuid: string, setLoading: (e:boolean)=>void) => {

    const [llmResponse, setLlmResponse] = useState<MailResponse>({
        uuid,
        status: "inqueue",
    });
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