import {axiosInstance} from '../helpers/axios-config'

const getMarca  =() =>{
    return axiosInstance.get('/api/marca',{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

const crearMarca  = (data)=>{
    return axiosInstance.post('api/marca',data,{
        headers:{
            'Content-Type':'application/json'
        } 
})
}
const editMarca = (marcaId,data) =>{
    return axiosInstance.put(`api/marca/${marcaId}`,data,{
        headers:{
            'Content-Type':'application/json'
        } 
}) 
}

export{
    getMarca,crearMarca,editMarca
}