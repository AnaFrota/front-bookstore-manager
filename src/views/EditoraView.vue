<template>
  <div>
    <v-card rounded="0">
      <v-data-table
        :headers="headers"
        :items="editoras"
        :items-per-page="pageSize"
        :search="search"
        hide-default-footer
        :loading="loading"
        class="elevation-1 rounded-t"
      >
        <template v-slot:top>
          <v-toolbar flat class="indigo lighten-3 rounded-t">
            <v-toolbar-title class="white--text">Editoras</v-toolbar-title>
            <v-divider class="mx-4 white" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Procurar..."
              single-line
              hide-details
              class="white--text"
              dark
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="indigo accent-1"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nova Editora
                </v-btn>
              </template>
              <v-card  width="300">
                <v-card-title class="indigo lighten-3">
                  <span class="text-h5 white--text">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-container>
                      <v-row>
                        <v-col cols="20">
                          <v-text-field
                            v-model="editora.nome"
                            label="Nome"
                            :rules="rules"
                            outlined
                            hint="Digite o nome da editora"
                            color="indigo lighten-3"
                            counter="40"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="20">
                          <v-text-field
                            v-model="editora.cidade"
                            label="Cidade"
                            :rules="rules"
                            outlined
                            hint="Digite a cidade da editora"
                            color="indigo accent-1"
                            counter="40"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="green darken-1" text @click="save">
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Você realmente deseja excluir esse item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="green darken-1" text @click="deleteItemConfirm"
                    >Confirmar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="20" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="20" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-divider></v-divider>
    <v-card color="indigo lighten-3 rounded-b" rounded="0">
      <v-col cols="12">
        <v-row>
          <v-col cols="4" sm="4">
            <v-select
              v-model="pageSize"
              :items="pageSizes"
              label="Itens por Página"
              @change="handlePageSizeChange"
              outlined
              item-color="black"
              color="black"
              dark
            ></v-select>
          </v-col>
          <v-col cols="12" sm="8">
            <v-pagination
              v-model="page"
              :length="totalPages"
              total-visible="7"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              @input="handlePageChange"
              color="indigo accent-1"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import editoraService from "../service/EditoraService";
import Swal from "sweetalert2";
export default {
  name: "App",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    search: "",
    editoras: [],
    totalEditoras: 0,
    page: 1,
    totalPages: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    editora: {
      id: null,
      nome: "",
      cidade: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Nome", value: "nome" },
      { text: "Cidade", value: "cidade" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    rules: [
      (value) => !!value || "Campo obrigatório",
      (value) => (value && value.length >= 3) || "No mínimo 3 caracteres",
      (value) => (value && value.length <= 40) || "No máximo 40 caracteres",
    ],
  }),
  computed: {
    formTitle() {
      return !this.editora.id ? "Nova editora" : "Editar editora";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      const params = this.getRequestParams(this.page, this.pageSize);
      this.loading = true;
      editoraService.findAll(params).then((res) => {
        const { totalElements, totalPages, content } = res.data;
        this.editoras = content;
        this.totalEditoras = totalElements;
        this.totalPages = totalPages;
        this.loading = false;
      });
    },
    getRequestParams(page, pageSize) {
      let params = {};
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.initialize();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.initialize();
    },
    editItem(item) {
      this.editora = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.editora = { ...item };
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      editoraService
        .delete(this.editora.id)
        .then(() => {
          Swal.fire("Editora deletada com sucesso", "", "success");
          this.editora = {};
          this.initialize();
        })
        .catch(() => {
          Swal.fire(
            "Editora não pode ser deletada",
            "Essa editora está vinculada a um livro",
            "error"
          );
        });
      this.dialogDelete = false;
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      if (!this.dialog) {
        this.editora = {};
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.editora.id) {
          editoraService.update(this.editora).then(() => {
            Swal.fire("Editora alterada com sucesso", "", "success");
            this.editora = {};
            this.initialize();
          });
        } else {
          editoraService.save(this.editora).then(() => {
            Swal.fire("Editora cadastrada com sucesso", "", "success");
            this.editora = {};
            this.initialize();
          });
        }
        this.editora = {};
        this.close();
      }
    },
  },
};
</script>