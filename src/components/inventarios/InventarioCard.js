import React from 'react'
import { Link } from 'react-router-dom';

export const InventarioCard = (props) => {
    const {inventario} = props
  return (
    <div className="card-group">
      <div className="card">
        <img src={inventario.foto} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">Caraterísticas</h5>
          <hr />
          <p className="card-text">{`Serial: ${inventario.serial}`}</p>
          <p className="card-text">{`Marca: ${inventario.marca ? inventario.marca.nombre : ''}`}</p>
          <p className="card-text">{`Descripcion: ${inventario.descripción}`}</p>
          <p className="card-text">{`Precio: ${inventario.precio}`}</p>
          <p className="card-text">{`Usuario: ${inventario.usuario ? inventario.usuario.nombre: ''}`}</p>
          
          <p className="card-text">
            <Link to={`inventarios/edit/${inventario._id}`}>Ver más...</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
