import React, { useState, useEffect } from "react";
import {} from "bootstrap";
import styled from "styled-components";
import moment from "moment";
import Swal from "sweetalert2";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import {
  getMarca,
  crearMarca,
  editMarca,
  eliminarMarca,
} from "../../services/marcaService";

export const MarcaView = () => {
  const [marcas, setMarca] = useState([]);
  const [valoresFrom, setValoresForm] = useState([]);
  // const { nombre = "", estado = "" } = valoresFrom;
  /*---------------------------------------------------------------------------------------------- */
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [marcaActual, setMarcaActual] = useState({});
  /*---------------------------------------------------------------------------------------------- */
  const handleOnChange = (e) => {
    setValoresForm({ ...valoresFrom, [e.target.name]: e.target.value });
  };
  /*----------------------------------------------------------------------------------------------*/
  const handleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresFrom);
    try {
      const resp = await crearMarca(valoresFrom);
      setValoresForm({ nombre: "", estado: "" });
      setModalInsertar(false);
      ListarMarcas();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  /*---------------------------------------------------------------------------------------------- */
  const handleEditarMarca = async (e) => {
    e.preventDefault();
    try {
      const resp = await editMarca(marcaActual._id, marcaActual);
      setMarcaActual({});
      setModalEditar(false);
      ListarMarcas();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  /*----------------------------------------------------------------------------------------------*/

  const handleEliminarMarca = async (id) => {
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
          const resp = await eliminarMarca(id);
          ListarMarcas();
          Swal.fire("Eliminado!", "La marca ha sido eliminada.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  /*----------------------------------------------------------------------------------------------*/
  const ListarMarcas = async () => {
    try {
      const resp = await getMarca();
      setMarca(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  useEffect(() => {
    ListarMarcas();
  }, []);
  /*---------------------------------------------------------------------------------------------- */
  const seleccionarMarca = (marca) => {
    setMarcaActual(marca);
    setModalEditar(true);
  };
  /*----------------------------------------------------------------------------------------------*/
  return (
    <>
      <Content>
        <Emcabezado>
          <h3>Marcas</h3>
        </Emcabezado>
        <Emcabezado>
          <Button color="success" onClick={() => setModalInsertar(true)}>
            Nueva Marca
          </Button>
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
            {marcas.length > 0 &&
              marcas.map((marca, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{marca.nombre}</td>
                    <td>{marca.estado}</td>
                    <td>
                      {moment(marca.fechaCreacion).format("DD-MM-YYYY / HH:mm")}
                    </td>
                    <td>
                      {moment(marca.fechaActualizacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => seleccionarMarca(marca)}
                      >
                        Editar
                      </Button>
                    </td>
                    {"  "}
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleEliminarMarca(marca._id)}
                      >
                        Eliminar
                      </Button>
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
            <h3>Insertar Marca</h3>
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
          <Button color="primary" onClick={handleCrearMarca}>
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
            <h3>Editar Marca</h3>
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
              value={marcaActual.nombre}
              onChange={(e) =>
                setMarcaActual({ ...marcaActual, nombre: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Estado</label>
            <select
              className="form-control"
              required
              name="estado"
              value={marcaActual.estado}
              onChange={(e) =>
                setMarcaActual({ ...marcaActual, estado: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleEditarMarca}>
            {" "}
            Editar
          </Button>
          <Button color="danger" onClick={() => setModalEditar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

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
