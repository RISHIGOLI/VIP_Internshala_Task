import { myAxios } from "./helper"

export async function addTradeDetail(body){
    try{
        const response = await myAxios.post('/api/addTradeDetail',body,null)
        return response.data
    }catch(error){
        throw error
    }
}

export async function getAllTradeDetails(pageNumber,pageSize){
    try{
        const params = {
            pageNumber : pageNumber,
            pageSize : pageSize
        }
        console.log('params',params)
        const response = await myAxios.get('/api/getAllTradeDetails',{
            params : params
        })
        return response.data
    }catch(error){
        throw error
    }
}

export async function updateTradeDetails(body){
    try{
        const response = await myAxios.put('/api/updateTradeDetail',body,null)
        return response.data
    }catch(error){
        throw error
    }
}

export async function deleteTradeDetails(tradeId){
    try{
        const params = {
            tradeDetailId : tradeId
        }
        const response = await myAxios.delete('/api/deleteTradeDetailById',{
            params : params
        })
        return response.data
    }catch(error){
        throw error
    }
}