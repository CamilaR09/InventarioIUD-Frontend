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
import {getTipoEquipo,crearTipoEquipo,editTipoEquipo,eliminarTipo } from "../../services/tipoService";

export const TipoView = () => {

  const [tipos, setTipos] = useState([]);
  const [valoresFrom, setValoresForm] = useState([]);
 // const { nombre = "", estado = "" } = valoresFrom;
 /*---------------------------------------------------------------------------------------------- */
 const [modalInsertar, setModalInsertar] = useState(false);
 const [modalEditar, setModalEditar] = useState(false);
 const [tipoActual, setTipoActual] = useState({});
 /*---------------------------------------------------------------------------------------------- */
 const handleOnChange = (e) => {
  setValoresForm({ ...valoresFrom, [e.target.name]: e.target.value });
};
/*----------------------------------------------------------------------------------------------*/
const handleCrearTipo = async (e) => {
  e.preventDefault();
  console.log(valoresFrom);
  try {
    const resp = await crearTipoEquipo(valoresFrom);
    setValoresForm({ nombre: "", estado: "" });
    setModalInsertar(false); 
    ListarTipos(); 
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};
/*---------------------------------------------------------------------------------------------- */
const handleEditarTipo = async (e) => {
  e.preventDefault();
  try {
    const resp = await editTipoEquipo(tipoActual._id, tipoActual);
    setTipoActual({});
    setModalEditar(false);
    ListarTipos();
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};
/*----------------------------------------------------------------------------------------------*/
const handleEliminarTipo = async (TipoId) => {
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
        const resp = await eliminarTipo(TipoId);
    ListarTipos();
    Swal.fire("Eliminado!", "El estado ha sido eliminada.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  });
};
/*----------------------------------------------------------------------------------------------*/
  const ListarTipos = async () => {
    try {
      const resp = await getTipoEquipo();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  useEffect(() => {
    ListarTipos();
  },[]);
/*---------------------------------------------------------------------------------------------- */
const seleccionarTipo = (tipo) => {
  setTipoActual(tipo);
  setModalEditar(true);
};
/*----------------------------------------------------------------------------------------------*/
  return (
    <>
      <Content>
        <Emcabezado>
          <h3>Tipos</h3>
        </Emcabezado>
        <Emcabezado>
         
          <Button color="success" onClick={() => setModalInsertar(true)}>Nueva Tipo</Button>
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
            {tipos.length > 0 &&
              tipos.map((tipo, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.estado}</td>
                    <td>
                      {moment(tipo.fechaCreacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      {moment(tipo.fechaActualizacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      <Button color="primary" onClick={() => seleccionarTipo(tipo)}>Editar</Button>
                    </td>
                    {"  "}
                    <td>
                      <Button color="danger"onClick={() => handleEliminarTipo(tipo._id)}>Eliminar</Button>
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
            <h3>Insertar Tipos</h3>
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
          <Button color="primary" onClick={handleCrearTipo}>
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
            <h3>Editar Tipos</h3>
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
              value={tipoActual.nombre}
              onChange={(e) =>
                setTipoActual({ ...tipoActual, nombre: e.target.value})
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Estado</label>
            <select
              className="form-control"
              required
              name="estado"
              value={tipoActual.estado}
              onChange={(e) =>
                setTipoActual({ ...tipoActual, estado: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleEditarTipo}>
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
