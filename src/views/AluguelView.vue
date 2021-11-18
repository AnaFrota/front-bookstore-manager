-<template>
  <div>
    <v-card rounded="0">
      <v-data-table
        :headers="headers"
        :items="alugueis"
        :items-per-page="pageSize"
        :search="search"
        hide-default-footer
        :loading="loading"
        class="elevation-1 rounded-t"
      >
        <template v-slot:top>
          <v-toolbar flat class="indigo lighten-3 rounded-t">
            <v-toolbar-title class="white--text">Alugueis</v-toolbar-title>
            <v-divider class="mx-4 white" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Procurar..."
              single-line
              hide-details
              class="white--text"
              color="white"
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
                  Novo Aluguel
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
                          <v-select
                            v-model="aluguel.livroId"
                            :items="livros"
                            item-text="nome"
                            item-value="id"
                            label="Escolha um livro"
                            color="indigo lighten-3"
                            item-color="indigo lighten-3"
                            no-data-text="Sem livros no estoque"
                            :rules="[rules.required]"
                            outlined
                          >
                            <template slot="selection" slot-scope="livros">
                              {{ livros.item.id }} - {{ livros.item.nome }}
                            </template>
                            <template slot="item" slot-scope="livros">
                              {{ livros.item.id }} - {{ livros.item.nome }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            v-model="aluguel.usuarioId"
                            :items="usuarios"
                            item-text="nome"
                            item-value="id"
                            label="Escolha um usuario"
                            color="indigo lighten-3"
                            item-color="indigo lighten-3"
                            :rules="[rules.required]"
                            outlined
                          >
                            <template slot="selection" slot-scope="usuarios">
                              {{ usuarios.item.id }} - {{ usuarios.item.nome }}
                            </template>
                            <template slot="item" slot-scope="usuarios">
                              {{ usuarios.item.id }} - {{ usuarios.item.nome }}
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-menu
                            v-model="menuAluguel"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="aluguel.dataAluguel"
                                label="Data de aluguel"
                                append-icon="mdi-calendar"
                                readonly
                                outlined
                                :rules="[rules.required]"
                                hint="Selecione a data de aluguel"
                                color="indigo lighten-3"
                                v-bind="attrs"
                                @blur="dateAluguel = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dateAluguel"
                              @input="menuAluguel = false"
                              no-title
                              scrollable
                              color="indigo lighten-3"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-menu
                            v-model="menuPrevisao"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="aluguel.dataPrevisao"
                                label="Data de previsão"
                                append-icon="mdi-calendar"
                                readonly
                                outlined
                                :rules="[rules.required]"
                                hint="Selecione a data de previsão"
                                color="indigo lighten-3"
                                v-bind="attrs"
                                @blur="datePrevisao = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datePrevisao"
                              @input="menuPrevisao = false"
                              no-title
                              scrollable
                              :min="dateAluguel"
                              color="indigo lighten-3"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-menu
                            v-model="menuDevolucao"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="aluguel.dataDevolucao"
                                label="Data de devolução"
                                append-icon="mdi-calendar"
                                readonly
                                outlined
                                hint="Selecione a data de devolução"
                                v-bind="attrs"
                                @blur="dateDevolucao = parseDate(dateFormatted)"
                                v-on="on"
                                color="indigo lighten-3"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dateDevolucao"
                              @input="menuDevolucao = false"
                              no-title
                              :min="dateAluguel"
                              scrollable
                              color="indigo lighten-3"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red accent-4" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="teal accent-4" text @click="save">
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="20" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            size="20"
            v-show="!item.dataDevolucao"
            class="mr-2"
            @click="returnBook(item)"
          >
            mdi-book-check-outline
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-divider></v-divider>
    <v-card rounded="0" color="indigo lighten-3 rounded-b">
      <v-col cols="12">
        <v-row>
          <v-col cols="4" sm="4">
            <v-select
              v-model="pageSize"
              :items="pageSizes"
              label="Itens por Pagina"
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
import aluguelService from "../service/AluguelService";
import usuarioService from "../service/UsuarioService";
import livroService from "../service/LivroService";
import moment from "moment";
export default {
  name: "App",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    menuAluguel: false,
    menuPrevisao: false,
    menuDevolucao: false,
    search: "",
    alugueis: [],
    livros: [],
    usuarios: [],
    dateAluguel: "",
    datePrevisao: "",
    dateDevolucao: "",
    dateFormatted: "",
    totalAlugueis: 0,
    page: 1,
    totalPages: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    aluguel: {
      id: null,
      usuarioId: null,
      usuario: {},
      livroId: null,
      livro: {},
      dataAluguel: "",
      dataPrevisao: "",
      dataDevolucao: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Livro", value: "livro.nome" },
      { text: "Usuário", value: "usuario.nome" },
      { text: "Aluguel", value: "dataAluguel" },
      { text: "Previsão", value: "dataPrevisao" },
      { text: "Devolução", value: "dataDevolucao" },
      { text: "Status", value: "status" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    rules: {
      required: (value) => !!value || "Campo obrigatório",
      quantityLivro: (value) => value.quantidade != 0 || "Livro faltando",
    },
  }),
  computed: {
    formTitle() {
      return !this.aluguel.id ? "Novo Aluguel" : "Editar Aluguel";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dateAluguel() {
      this.aluguel.dataAluguel = this.formatDate(this.dateAluguel);
    },
    datePrevisao() {
      this.aluguel.dataPrevisao = this.formatDate(this.datePrevisao);
    },
    dateDevolucao() {
      this.aluguel.dataDevolucao = this.formatDate(this.dateDevolucao);
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      const params = this.getRequestParams(this.page, this.pageSize);
      this.loading = true;
      aluguelService.findAll(params).then((res) => {
        const { totalElements, totalPages, content } = res.data;
        this.alugueis = content.map((aluguel) => {
          Object.defineProperty(aluguel, "status", {
            value: this.getStatus(aluguel),
          });
          return aluguel;
        });
        this.totalAlugueis = totalElements;
        this.totalPages = totalPages;
        this.loading = false;
      });
      this.findAllUsuarios();
      this.findAllLivros();
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
      this.aluguel.id = item.id;
      this.aluguel.usuarioId = item.usuario.id;
      this.aluguel.usuario = item.usuario;
      this.aluguel.livroId = item.livro.id;
      this.aluguel.livro = item.livro;
      this.aluguel.dataAluguel = item.dataAluguel;
      this.aluguel.dataPrevisao = item.dataPrevisao;
      this.aluguel.dataDevolucao = item.dataDevolucao;
      this.dialog = true;
    },
    returnBook(item) {
      this.aluguel.id = item.id;
      this.aluguel.usuarioId = item.usuario.id;
      this.aluguel.usuario = item.usuario;
      this.aluguel.livroId = item.livro.id;
      this.aluguel.livro = item.livro;
      this.aluguel.dataAluguel = item.dataAluguel;
      this.aluguel.dataPrevisao = item.dataPrevisao;
      this.aluguel.dataDevolucao = moment(
        new Date().toISOString().slice(0, 10)
      ).format("DD-MM-YYYY");
      aluguelService.update(this.aluguel).then(() => {
        this.aluguel = {};
        this.initialize();
        Swal.fire("Livro devolvido com sucesso", "", "success");
      });
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      if (!this.dialog) {
        this.dateAluguel = "";
        this.aluguel = {};
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (
          moment(this.aluguel.dataPrevisao, "DD-MM-YYYY").isBefore(
            moment(this.aluguel.dataAluguel, "DD-MM-YYYY")
          ) ||
          moment(this.aluguel.dataDevolucao, "DD-MM-YYYY").isBefore(
            moment(this.aluguel.dataAluguel, "DD-MM-YYYY")
          )
        ) {
          this.close();
          Swal.fire(
            "Data de aluguel não pode ser maior que às demais",
            "",
            "error"
          );
        } else if (this.aluguel.id) {
          aluguelService
            .update(this.aluguel)
            .then(() => {
              Swal.fire("Aluguel alterado com sucesso", "", "success");
              this.aluguel = {};
              this.initialize();
            })
            .catch(() => {
              this.close();
              Swal.fire(
                "Livro selecionado, com 0 quantidade no estoque",
                "",
                "error"
              );
            });
        } else {
          aluguelService
            .save(this.aluguel)
            .then(() => {
              Swal.fire("Aluguel cadastrado com sucesso", "", "success");
              this.aluguel = {};
              this.initialize();
            })
            .catch(() => {
              this.close();
              Swal.fire(
                "Livro selecionado, com 0 quantidade no estoque",
                "",
                "error"
              );
            });
        }
        this.aluguel = {};
        this.close();
      }
    },
    findAllLivros() {
      livroService.findAllNotPaged().then((res) => {
        this.livros = res.data;
      });
    },
    findAllUsuarios() {
      usuarioService.findAllNotPaged().then((res) => {
        this.usuarios = res.data;
      });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    getStatus(aluguel) {
      if (
        moment(aluguel.dataPrevisao, "DD-MM-YYYY").isBefore(
          moment(aluguel.dataDevolucao, "DD-MM-YYYY")
        )
      ) {
        return "Atrasado";
      }
      if (
        moment(aluguel.dataPrevisao, "DD-MM-YYYY").isSameOrAfter(
          moment(aluguel.dataDevolucao, "DD-MM-YYYY")
        )
      ) {
        return "No prazo";
      }
      if (aluguel.dataPrevisao) {
        return "Pendente";
      }
    },
    getColor(status) {
      if (status == "No prazo") return "green";
      else if (status == "Pendente") return "orange";
      else return "red";
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>