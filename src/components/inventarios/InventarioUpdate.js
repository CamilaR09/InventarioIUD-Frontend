import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  getInventarioPorId,
  editInventario,
} from "../../services/inventarioService";
import { getUsuario } from "../../services/usuarioService";
import { getMarca } from "../../services/marcaService";
import { getTipoEquipo } from "../../services/tipoService";
import { getEstadoEquipo } from "../../services/estadoService";

export const InventarioUpdate = () => {
  const { inventarioId = "" } = useParams();
  const [inventario, setInventario] = useState();
  const [usuarios, setUsuario] = useState([]);
  const [marcas, setMarca] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valoresFrom, setValoresForm] = useState([]);
  const {
    serial = "",
    modelo = "",
    descripción = "",
    color = "",
    foto = "",
    fechaCompra = "",
    precio = "",
    usuario,
    marca,
    tipoEquipo,
    estadoEquipo,
  } = valoresFrom;

  /*-----Ordenar y Listar los datos alfabéticamente----- */
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getUsuario();
        setUsuario(data);
        console.log(data);
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
        setMarca(data);
        console.log(data);
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
        setTipos(data);
        console.log(data);
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
        setEstados(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  /*-------------------------------------------- */
  const getInventario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getInventarioPorId(inventarioId);
      console.log(data);
      setInventario(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  useEffect(() => {
    getInventario();
  }, [inventarioId]);
  /*-------------------------------------------- */
  useEffect(() => {
    if (inventario) {
      setValoresForm({
        serial: inventario.serial,
        modelo: inventario.modelo,
        descripción: inventario.descripción,
        color: inventario.color,
        foto: inventario.foto,
        fechaCompra: inventario.fechaCompra,
        precio: inventario.precio,
        usuario: inventario.usuario,
        marca: inventario.marca,
        tipoEquipo: inventario.tipoEquipo,
        estadoEquipo: inventario.estadoEquipo,
      });
    }
  }, [inventario]);
  /*-------------------------------------------- */
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresFrom, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventario = {
      serial,
      modelo,
      descripción,
      color,
      foto,
      fechaCompra,
      precio,
      usuario: { _id: usuario },
      marca: { _id: marca },
      tipoEquipo: { _id: tipoEquipo },
      estadoEquipo: { _id: estadoEquipo },
    };
    console.log(inventario);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await editInventario(inventario,inventarioId);
      Swal.close();
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      Swal.close();
      let mensaje;
      if(error && error.response && error.response.data){
        mensaje= error.response.data;
      }else{
        mensaje= 'Ocurrio un error,porfavor intente de nuevo'
      }
      Swal.fire('Error ','Ocurrio un error, por favor verifique los datos')
    }
  };
  /*-------------------------------------------- */
  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Detalle Activo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={inventario?.foto}
                alt="Imagen del inventario"
                width="350px"
              />
            </div>
            <div className="col-md-8">
              <form onSubmit={(e) => handleOnSubmit(e)}>
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
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="usuario"
                        value={usuario}
                      >
                        <option value="">--SELECCIONÉ--</option>
                        {usuarios.map(({ _id, nombre }) => {
                          return (
                            <option key={_id} value={_id}>
                              {nombre}
                            </option>
                          );
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
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="marca"
                        value={marca}
                      >
                        <option value="">--SELECCIONÉ--</option>
                        {marcas.map(({ _id, nombre }) => {
                          return (
                            <option key={_id} value={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  {/*---------------------------------------------------- */}
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Tipo Equipo</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="tipoEquipo"
                        value={tipoEquipo}
                      >
                        <option value="">--SELECCIONÉ--</option>
                        {tipos.map(({ _id, nombre }) => {
                          return (
                            <option key={_id} value={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  {/*---------------------------------------------------- */}
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Estado Equipo</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="estadoEquipo"
                        value={estadoEquipo}
                      >
                        <option value="">--SELECCIONÉ--</option>
                        {estados.map(({ _id, nombre }) => {
                          return (
                            <option key={_id} value={_id}>
                              {nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
