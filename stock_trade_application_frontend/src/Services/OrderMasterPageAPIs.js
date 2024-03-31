import { myAxios } from "./helper"

export async function createOrder(tradeId,body){
    try{
        const params = {
            tradeDetailId : tradeId
        }
        console.log('params',params,body)
        const response = await myAxios.post('/api/createOrder',body,{
            params: params
        })
        return response.data
    }catch(error){
        throw error
    }
}

export async function getAllOrders(pageNumber,pageSize){
    try{
        const params = {
            pageNumber : pageNumber,
            pageSize : pageSize
        }
        const response = await myAxios.get('/api/getAllOrders',{
            params : params
        })
        return response.data
    }catch(error){
        throw error
    }
}