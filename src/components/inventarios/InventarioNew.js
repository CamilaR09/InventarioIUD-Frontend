import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';
import {getUsuario} from '../../services/usuarioService'
import {getMarca} from '../../services/marcaService'
import {getTipoEquipo} from '../../services/tipoService'
import {getEstadoEquipo} from '../../services/estadoService'
import {crearInventario} from'../../services/inventarioService'


export const InventarioNew = ({handleOpenModal}) => {
  const [usuarios, setUsuario] = useState([]);
  const [marcas, setMarca] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valoresFrom, setValoresForm] = useState([]);
  const {serial= "", modelo= "",descripción= "",color= "",foto= "",
  fechaCompra= "",precio= "",usuario,marca,tipoEquipo,estadoEquipo,
  }=valoresFrom
  /*-----Ordenar y Listar los datos alfabéticamente----- */
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getUsuario();
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setUsuario(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  /*-------------------------------------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getMarca();
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setMarca(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  /*-------------------------------------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getTipoEquipo();
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setTipos(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  /*-------------------------------------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getEstadoEquipo();
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setEstados(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresFrom, [name]: value });
  };
  const handleOnSubmit= async(e) => {
    e.preventDefault()
    const inventario = {
      serial,
      modelo,
      descripción,
      color,
      foto,
      fechaCompra,
      precio,
      usuario: {_id: usuario},
      marca: {_id: marca},
      tipoEquipo: {_id: tipoEquipo},
      estadoEquipo: {_id: estadoEquipo},
    }
    console.log(inventario)
    try {
      Swal.fire({
        allowOutsideClick:false,
        text:'Cargando...'
      })
      Swal.showLoading()
      const {data} = await crearInventario(inventario)
      //console.log(data)
      Swal.close()
      handleOpenModal()
      window.location.reload()
    } catch (error) {
      console.log(error)
      Swal.close()
    }
  };

  return (
    <>
      <Overlay>
        <Content>
          <Emcabezado>
            <h3>Nuevo Inventario</h3>
          </Emcabezado>
          <BotonX>
            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
          </BotonX>
          <form onSubmit={(e)=> handleOnSubmit(e)}>
            {/*----------------------------------------------------------------------- */}
            <div className="row">
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Serial</label>
                  <input
                    type="text"
                    name="serial"
                    className="form-control"
                    required
                    minLength={4}
                    value={serial}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Modelo</label>
                  <input
                    type="text"
                    name="modelo"
                    className="form-control"
                    required
                    value={modelo}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    name="descripción"
                    className="form-control"
                    required
                    minLength={20}
                    value={descripción}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <input
                    type="text"
                    name="color"
                    className="form-control"
                    required
                    value={color}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
            </div>
            {/*----------------------------------------------------------------------- */}
            <div className="row">
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Foto</label>
                  <input
                    type="text"
                    name="foto"
                    className="form-control"
                    required
                    value={foto}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Fecha Compra</label>
                  <input
                    type="date"
                    name="fechaCompra"
                    className="form-control"
                    required
                    value={fechaCompra}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    className="form-control"
                    required
                    value={precio}
                    onChange={(e) => handleOnChange(e)}
                  ></input>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <select className="form-select" required
                  onChange={(e) => handleOnChange(e)} 
                  name='usuario' value={usuario}>
                    <option value="">--SELECCIONÉ--</option>
                    {usuarios.map(({ _id, nombre }) => {
                     return <option key={_id} value={_id}>{nombre}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            {/*----------------------------------------------------------------------- */}
            <div className="row">
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Marca</label>
                  <select className="form-select" required
                  onChange={(e) => handleOnChange(e)} 
                  name='marca' value={marca}>
                    <option value="">--SELECCIONÉ--</option>
                    {marcas.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })}
                  </select>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Tipo Equipo</label>
                  <select className="form-select" required
                  onChange={(e) => handleOnChange(e)} 
                  name='tipoEquipo' value={tipoEquipo}>
                    <option value="">--SELECCIONÉ--</option>
                    {tipos.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })}
                  </select>
                </div>
              </div>
              {/*---------------------------------------------------- */}
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Estado Equipo</label>
                  <select className="form-select" required
                  onChange={(e) => handleOnChange(e)} 
                  name='estadoEquipo' value={estadoEquipo}>
                    <option value="">--SELECCIONÉ--</option>
                    {estados.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">
              Guardar
            </button>
          </form>
        </Content>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  width:100vw;
  height:100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  padding: 40px;
  display: flex;
  align-items:center;
  justify-content:center;
`;

const Content = styled.div`
  width: 900px;
  min-height: 100px;
  background: #fff;
  position:relative;
  border-radius:5px;
  box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px ;
  padding:20px;
`;

const Emcabezado  = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;

  h3{
    font-weight: 500;
    font-size: 16px;
    color: #1766DC;
  }
`;

const BotonX = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition:.3s ease all;
  border-radius: 5px;
  color: #1766DC;
  &:hover{
    background: #f2f2f2;
  }



`;
