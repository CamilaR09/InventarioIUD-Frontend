import React, {useState,useEffect} from 'react'
import { getInventario } from '../../services/inventarioService'
import { InventarioCard } from './InventarioCard'
import { InventarioNew } from './InventarioNew'

export const InventarioView = () => {
  
  const[inventario, setInventarios]= useState([])
  const[openModal, setOpenModal]= useState(false)

  const listarInventario = async () =>{
    try {
      const {data} = await getInventario()
      console.log(data)
      setInventarios(data)

    } catch (error) {
      
    }
  }
  useEffect(() => {listarInventario()},[])
  
  const handleOpenModal = () =>{
    setOpenModal(!openModal)
  }

  return (
    <div className='container'>
      <div className='mt-2 mb-2 row row-cols-1 row-cols-md-4'>
        {
          inventario.map((inventario) =>{
            return <InventarioCard key= {inventario._id} inventario={inventario} />
          })
        }
      </div>
      {openModal ? <InventarioNew handleOpenModal={handleOpenModal}/>:
      (<button className='btn btn-success fab' title="Agregar" onClick={handleOpenModal}>
        <i  className='fa-solid fa-plus'></i>
      </button>)}
    </div>
  )
}

