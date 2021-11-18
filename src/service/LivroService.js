import { http } from "./config";

export default {
  findAll: (params) => {
    return http.get("/livros", { params });
  },
  findAllNotPaged: () => {
    return http.get("/livros/all");
  },
  save: (livro) => {
    return http.post("/livros", livro);
  },
  update: (livro) => {
    return http.put("/livros", livro);
  },
  delete: (id) => {
    return http.delete(`/livros/${id}`);
  },
};