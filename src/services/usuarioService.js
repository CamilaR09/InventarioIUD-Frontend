import { axiosInstance } from "../helpers/axios-config";

const getUsuario = () => {
  return axiosInstance.get("/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const crearUsuario = (data) => {
  return axiosInstance.post("api/users", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const editUsuario = (usuarioId, data) => {
  return axiosInstance.put(`api/users/${usuarioId}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const eliminarUsuario = (usuarioId) => {
  return axiosInstance.delete(`api/users/${usuarioId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { getUsuario, editUsuario, crearUsuario,eliminarUsuario};
