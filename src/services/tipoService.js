import {axiosInstance} from '../helpers/axios-config'

const getTipoEquipo  =() =>{
    return axiosInstance.get('/api/tipoEquipo',{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

const crearTipoEquipo = (data)=>{
    return axiosInstance.post('api/tipoEquipo',data,{
        headers:{
            'Content-Type':'application/json'
        } 
})
}
const editTipoEquipo = (tipoEquipoId,data) =>{
    return axiosInstance.put(`api/tipoEquipo/${tipoEquipoId}`,data,{
        headers:{
            'Content-Type':'application/json'
        } 
}) 
}

const eliminarTipo = (tipoEquipoId) => {
    return axiosInstance.delete(`api/tipoEquipo/${tipoEquipoId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

export{
    getTipoEquipo,crearTipoEquipo,editTipoEquipo,eliminarTipo
}