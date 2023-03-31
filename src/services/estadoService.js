import {axiosInstance} from '../helpers/axios-config'

const getEstadoEquipo  =() =>{
    return axiosInstance.get('/api/estadoEquipo',{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

const crearEstadoEquipo  = (data)=>{
    return axiosInstance.post('api/estadoEquipo',data,{
        headers:{
            'Content-Type':'application/json'
        } 
})
}
const editEstadoEquipo = (estadoEquipoId,data) =>{
    return axiosInstance.put(`api/estadoEquipo/${estadoEquipoId}`,data,{
        headers:{
            'Content-Type':'application/json'
        } 
}) 
}

export{
    getEstadoEquipo,crearEstadoEquipo,editEstadoEquipo
}