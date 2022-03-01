-
<template>
  <div>
    <v-card rounded="0">
      <v-data-table
        :headers="headers"
        :items="livros"
        :items-per-page="pageSize"
        :loading="loading"
        :search="search"
        class="elevation-1 rounded-t"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat class="indigo lighten-3 rounded-t">
            <v-toolbar-title class="white--text">Livros</v-toolbar-title>
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
                  Novo Livro
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="indigo lighten-3">
                  <span class="text-h5 white--text">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="livro.nome"
                            label="Nome"
                            :rules="[
                              rules.required,
                              rules.counterMin,
                              rules.counterMax40,
                            ]"
                            outlined
                            hint="Digite o nome do livro"
                            counter="40"
                            color="indigo accent-1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="livro.autor"
                            label="Autor"
                            :rules="[
                              rules.required,
                              rules.counterMin,
                              rules.counterMax40,
                            ]"
                            outlined
                            hint="Digite o autor do livro"
                            counter="40"
                            color="indigo lighten-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            v-model="livro.editoraId"
                            :items="editoras"
                            item-text="nome"
                            item-value="id"
                            :rules="[rules.required]"
                            label="Escolha uma editora"
                            outlined
                            color="indigo lighten-3"
                            item-color="indigo lighten-3"
                          >
                            <template slot="selection" slot-scope="editoras">
                              {{ editoras.item.id }} - {{ editoras.item.nome }}
                            </template>
                            <template slot="item" slot-scope="editoras">
                              {{ editoras.item.id }} - {{ editoras.item.nome }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="livro.lancamento"
                                label="Lançamento"
                                append-icon="mdi-calendar"
                                readonly
                                outlined
                                :rules="[rules.required]"
                                hint="Selecione a data de lançamento"
                                color="indigo lighten-3"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              @input="menu = false"
                              no-title
                              scrollable
                              :max="todayDate"
                              color="indigo lighten-3"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="livro.quantidade"
                            label="Quantidade"
                            outlined
                            hint="Digite a quantidade do(e) livro(s)"
                            :rules="[rules.required, rules.requiredNumber]"
                            color="indigo lighten-3"
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
              item-color="black"
              color="black"
              dark
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="8">
            <v-pagination
              v-model="page"
              :length="totalPages"
              total-visible="7"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              color="indigo accent-1"
              @input="handlePageChange"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import livroService from "@/service/LivroService";
import editoraService from "@/service/EditoraService";
export default {
  name: "App",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    menu: false,
    search: "",
    livros: [],
    editoras: [],
    totallivros: 0,
    page: 1,
    totalPages: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    todayDate: new Date().toISOString().slice(0, 10),
    date: "",
    dateFormatted: "",
    livro: {
      id: null,
      nome: "",
      autor: "",
      lancamento: "",
      quantidade: "",
      editora: {
        id: "",
        nome: "",
        cidade: "",
      },
      editoraId: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Nome", value: "nome" },
      { text: "Autor", value: "autor" },
      { text: "Editora", value: "editora.nome" },
      { text: "Lacamento", value: "lancamento" },
      { text: "Quantidade", value: "quantidade" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    rules: {
      required: (value) => !!value || "Campo obrigatório",
      counterMin: (value) =>
        (value && value.length >= 3) || "No mínimo 3 caracteres",
      counterMax40: (value) =>
        (value && value.length <= 40) || "No máximo 40 caracteres",
      requiredEditora: (value) => value == undefined || "Escolha uma editora",
      requiredNumber: (value) =>
        !isNaN(value) || "Somente caracteres numéricos",
    },
  }),
  computed: {
    formTitle() {
      return !this.livro.id ? "Novo livro" : "Editar livro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    date() {
      this.livro.lancamento = this.formatDate(this.date);
    },
  },
  created() {
    this.initialize();
    this.findAllEditoras();
  },
  methods: {
    initialize() {
      this.loading = true;
      const params = this.getRequestParams(this.page, this.pageSize);
      livroService.findAll(params).then((res) => {
        const { totalElements, content, totalPages } = res.data;
        this.livros = content;
        this.totallivros = totalElements;
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
      this.livro.id = item.id;
      this.livro.nome = item.nome;
      this.livro.autor = item.autor;
      this.livro.quantidade = item.quantidade;
      this.livro.lancamento = item.lancamento;
      this.livro.editora = item.editora;
      this.livro.editoraId = item.editora.id;
      this.dialog = true;
    },
    deleteItem(item) {
      this.livro = { ...item };
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      livroService
        .delete(this.livro.id)
        .then(() => {
          Swal.fire("Livro deletado com sucesso", "", "success");
          this.livro = {};
          this.initialize();
        })
        .catch(() => {
          Swal.fire(
            "Livro não pode ser deletado",
            "Esse livro está vinculado a um aluguel",
            "error"
          );
        });
      this.dialogDelete = false;
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      if (!this.dialog) {
        this.livro = {};
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.livro.id) {
          livroService.update(this.livro).then(() => {
            Swal.fire("Livro alterado com sucesso", "", "success");
            this.livro = {};
            this.initialize();
          });
        } else {
          livroService.save(this.livro).then(() => {
            Swal.fire("Livro cadastrado com sucesso", "", "success");
            this.livro = {};
            this.initialize();
          });
        }
        this.livro = {};
        this.close();
      }
    },
    findAllEditoras() {
      editoraService.findAllNotPaged().then((res) => {
        this.editoras = res.data;
      });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
