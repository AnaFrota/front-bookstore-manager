import { http } from "./config";

export default {
  findAll: (params) => {
    return http.get("/usuarios", { params });
  },
  findAllNotPaged: () => {
    return http.get("/usuarios/all");
  },
  save: (usuario) => {
    return http.post("/usuarios", usuario);
  },
  update: (usuario) => {
    return http.put("/usuarios", usuario);
  },
  delete: (id) => {
    return http.delete(`/usuarios/${id}`);
  },
};