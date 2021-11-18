<template>
  <v-toolbar color="indigo accent-1" dark>
    <v-toolbar-title>Wda Livraria</v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text rounded to="/"
        ><v-icon size="20px"> mdi-home </v-icon> Inicio
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text rounded to="/editoras"
        ><v-icon size="20px"> mdi-bookshelf </v-icon> Editora
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text rounded to="/usuarios"
        ><v-icon size="20px"> mdi-account-edit</v-icon> Usuario
      </v-btn>

      <v-divider vertical></v-divider>
      <v-btn text rounded to="/livros"
        ><v-icon size="20px">mdi-book-plus </v-icon> Livro
      </v-btn>

      <v-divider vertical></v-divider>
      <v-btn text rounded to="/alugueis"
        ><v-icon size="20px">mdi-book-account </v-icon> Aluguel
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "app-navigation",
  data: () => ({
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
      { title: "Editora", icon: "mdi-bookshelf", to: "/editoras" },
      { title: "Livro", icon: " mdi-book-plus", to: "/livros" },
      { title: "Usuário", icon: "mdi-account-edit", to: "/usuarios" },
      { title: "Aluguel", icon: "mdi-book-account", to: "/alugueis" },
    ],
  }),
};
</script>

<style scoped></style>