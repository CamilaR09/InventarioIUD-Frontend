import React, { useState, useEffect } from "react";
import {} from "bootstrap";
import styled from "styled-components";
import moment from "moment";
import Swal from 'sweetalert2';
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { getEstadoEquipo,crearEstadoEquipo,editEstadoEquipo,eliminarEquipo} from "../../services/estadoService";

export const EstadoView = () => {

  const [estados, setEstados] = useState([]);
  const [valoresFrom, setValoresForm] = useState([]);
 // const { nombre = "", estado = "" } = valoresFrom;
 /*---------------------------------------------------------------------------------------------- */
 const [modalInsertar, setModalInsertar] = useState(false);
 const [modalEditar, setModalEditar] = useState(false);
 const [estadoActual, setEstadoActual] = useState({});
 /*---------------------------------------------------------------------------------------------- */
 const handleOnChange = (e) => {
  setValoresForm({ ...valoresFrom, [e.target.name]: e.target.value });
};
/*----------------------------------------------------------------------------------------------*/
const handleCrearEstado = async (e) => {
  e.preventDefault();
  console.log(valoresFrom);
  try {
    const resp = await crearEstadoEquipo(valoresFrom);
    setValoresForm({ nombre: "", estado: "" });
    setModalInsertar(false); 
    ListarEstado(); 
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};
/*---------------------------------------------------------------------------------------------- */
const handleEditarEstado = async (e) => {
  e.preventDefault();
  try {
    const resp = await editEstadoEquipo(estadoActual._id, estadoActual);
    setEstadoActual({});
    setModalEditar(false);
    ListarEstado();
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};
/*----------------------------------------------------------------------------------------------*/
const handleEliminarEstado = async (estadoId) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const resp = await eliminarEquipo(estadoId);
    ListarEstado();
    Swal.fire("Eliminado!", "El estado ha sido eliminada.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
/*----------------------------------------------------------------------------------------------*/
  const ListarEstado = async () => {
    try {
      const resp = await getEstadoEquipo();
      setEstados(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  useEffect(() => {
    ListarEstado();
  },[]);
/*---------------------------------------------------------------------------------------------- */
const seleccionarEstado = (estado) => {
  setEstadoActual(estado);
  setModalEditar(true);
};
/*----------------------------------------------------------------------------------------------*/
  return (
    <>
      <Content>
        <Emcabezado>
          <h3>Estados de Equipo</h3>
        </Emcabezado>
        <Emcabezado>
         
          <Button color="success" onClick={() => setModalInsertar(true)}>Nueva Estado</Button>
        </Emcabezado>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Creacion</th>
              <th scope="col">Fecha Actualizacion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estados.length > 0 &&
              estados.map((estado, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{estado.nombre}</td>
                    <td>{estado.estado}</td>
                    <td>
                      {moment(estado.fechaCreacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      {moment(estado.fechaActualizacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      <Button color="primary" onClick={() => seleccionarEstado(estado)}>Editar</Button>
                    </td>
                    {"  "}
                    <td>
                      <Button color="danger" onClick={() => handleEliminarEstado(estado._id)}>Eliminar</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Content>
      {/*---------------------------------------------------------------------------------------------- */}
      <Modal
        isOpen={modalInsertar}
        toggle={() => setModalInsertar(!modalInsertar)}
      >
        <ModalHeader>
          <div>
            <h3>Insertar Estado</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              required
              name="nombre"
              value={valoresFrom.nombre}
              onChange={(e) => handleOnChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label>Estado</label>
            <select
              className="form-control"
              required
              name="estado"
              value={valoresFrom.estado}
              onChange={(e) => handleOnChange(e)}
            >
              <option value="">Seleccionar</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleCrearEstado}>
            {" "}
            Insertar
          </Button>
          <Button color="danger" onClick={() => setModalInsertar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/*---------------------------------------------------------------------------------------------- */}
      <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
        <ModalHeader>
          <div>
            <h3>Editar Estado</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              required
              name="nombre"
              value={estadoActual.nombre}
              onChange={(e) =>
                setEstadoActual({ ...estadoActual, nombre: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Estado</label>
            <select
              className="form-control"
              required
              name="estado"
              value={estadoActual.estado}
              onChange={(e) =>
                setEstadoActual({ ...estadoActual, estado: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleEditarEstado}>
            {" "}
            Editar
          </Button>
          <Button color="danger" onClick={() => setModalEditar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      </>
  )
}
const Content = styled.div`
  width: 100%;
  min-height: 100%;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;
const Emcabezado = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;
