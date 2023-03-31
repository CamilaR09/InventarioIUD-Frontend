import {axiosInstance} from '../helpers/axios-config'

const getInventario =() =>{
    return axiosInstance.get('/api/inventario',{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

const crearInventario = (data)=>{
    return axiosInstance.post('api/inventario',data,{
        headers:{
            'Content-Type':'application/json'
        } 
})
}
const editInventario = (inventarioId,data) =>{
    return axiosInstance.put(`api/inventario/${inventarioId}`,data,{
        headers:{
            'Content-Type':'application/json'
        } 
}) 
}

const getInventarioPorId = (inventarioId) =>{
    return axiosInstance.get(`api/inventario/${inventarioId}`,{
        headers:{
            'Content-Type':'application/json'
        } 
}) 
}

export{
    getInventario,crearInventario,editInventario,getInventarioPorId
}