import React, { useState, useEffect } from "react";
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
  getUsuario,
  crearUsuario,
  editUsuario,
} from "../../services/usuarioService";

export const UsuarioView = () => {
  
  const [usuarios, setUsuario] = useState([]);
  const [valoresFrom, setValoresForm] = useState({});
  /*---------------------------------------------------------------------------------------------- */
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState({});
  /*---------------------------------------------------------------------------------------------- */
  const handleOnChange = (e) => {
    setValoresForm({ ...valoresFrom, [e.target.name]: e.target.value });
  };
  /*----------------------------------------------------------------------------------------------*/
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    console.log(valoresFrom);
    try {
      const resp = await crearUsuario(valoresFrom);
      setValoresForm({ nombre: "", email: "", estado: "" });
      setModalInsertar(false); // Cerramos el modal después de crear el usuario exitosamente
      ListarUsuarios(); // Actualizamos la lista de usuarios para mostrar el nuevo registro
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  /*---------------------------------------------------------------------------------------------- */
  const handleEditarUsuario = async (e) => {
    e.preventDefault();
    try {
      const resp = await editUsuario(usuarioActual._id, usuarioActual);
      setUsuarioActual({});
      setModalEditar(false);
      ListarUsuarios();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  /*----------------------------------------------------------------------------------------------*/
  const ListarUsuarios = async () => {
    try {
      const resp = await getUsuario();
      setUsuario(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  useEffect(() => {
    ListarUsuarios();
  },[]);
  /*---------------------------------------------------------------------------------------------- */
  const seleccionarUsuario = (usuario) => {
    setUsuarioActual(usuario);
    setModalEditar(true);
  };
  /*----------------------------------------------------------------------------------------------*/
  return (
    <>
      <Content>
        <Emcabezado>
          <h3>Usuarios</h3>
        </Emcabezado>
        <Emcabezado>
          <Button color="success" onClick={() => setModalInsertar(true)}>
            Nuevo Usuario
          </Button>
        </Emcabezado>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Creacion</th>
              <th scope="col">Fecha Actualizacion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 &&
              usuarios.map((usuario, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.estado}</td>
                    <td>
                      {moment(usuario.fechaCreacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      {moment(usuario.fechaActualizacion).format(
                        "DD-MM-YYYY / HH:mm"
                      )}
                    </td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => seleccionarUsuario(usuario)}
                      >
                        Editar
                      </Button>
                    </td>
                    {"  "}
                    <td>
                      <Button color="danger">Eliminar</Button>
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
            <h3>Insertar Usuario</h3>
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
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              required
              name="email"
              value={valoresFrom.email}
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
          <Button color="primary" onClick={handleCrearUsuario}>
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
            <h3>Editar Usuario</h3>
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
              value={usuarioActual.nombre}
              onChange={(e) =>
                setUsuarioActual({ ...usuarioActual, nombre: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              required
              name="email"
              value={usuarioActual.email}
              onChange={(e) =>
                setUsuarioActual({ ...usuarioActual, email: e.target.value })
              }
            />
            <input
              className="form-control"
              type="text"
              required
              name="email"
              value={usuarioActual._id}
              onChange={(e) =>
                setUsuarioActual({ ...usuarioActual, email: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <label>Estado</label>
            <select
              className="form-control"
              required
              name="estado"
              value={usuarioActual.estado}
              onChange={(e) =>
                setUsuarioActual({ ...usuarioActual, estado: e.target.value })
              }
            >
              <option value="">Seleccionar</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={handleEditarUsuario}>
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
