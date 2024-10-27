import api from "@/utils/axios-config"
import { message } from "antd"
import { useState } from "react"

interface QueryDataType {
    data: any,
    loading: boolean
    error: any
    status: "loading" | "success" | "error" | null
}

type StatusType = "loading" | "success" | "error" | "info" | "warning"

type QueryPayloads = {
    fn: () => Promise<any>,
    onSuccess: ((res:any) => void) | null,
    onFail: ((err:any) => void) | null,
    successMessage: string | null
}


export const useQuery = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [queryData, setQueryData] = useState<QueryDataType>({
        data: null,
        loading:false,
        error: null,
        status: null
    })

    const query = (payloads: QueryPayloads) => {

        const {fn, onSuccess, onFail, successMessage} = payloads

        setQueryData(curr => ({
            data: null,
            loading: true,
            error: null,
            status: "loading"
        }))

        showAlert("loading", "Loading", 0)

        fn()
            .then(res => {
                setQueryData(curr => ({
                    data: res.data,
                    loading: false,
                    error: null,
                    status: "success"
                }))

                if(onSuccess) onSuccess(res)
                showAlert("success", successMessage || "Request Successful", 5)
            })
            .catch(err => {
                setQueryData(curr => ({
                    data: null,
                    loading: false,
                    error: err?.response?.data,
                    status: "error"
                }))

                if(onFail) onFail(err)
                showAlert("error", err?.response?.data || "Something Went Wrong", 5)
            })
    }
    const showAlert = (status: StatusType, message:string, duration:number) => {
        messageApi.open({
            key: 1,
            type: status,
            content: message,
            duration: duration
        })
    }

    return {
        ...queryData,
        contextHolder,
        query
    }
}