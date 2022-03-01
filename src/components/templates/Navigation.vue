<template>
  <v-toolbar color="indigo accent-1" dark>
    <v-toolbar-title>Wda Livraria</v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text rounded to="/"
        ><v-icon size="20px"> mdi-home </v-icon> Inicio
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text rounded to="/publisher"
        ><v-icon size="20px"> mdi-bookshelf </v-icon> Editora
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text rounded to="/user"
        ><v-icon size="20px"> mdi-account-edit</v-icon> Usuario
      </v-btn>

      <v-divider vertical></v-divider>
      <v-btn text rounded to="/book"
        ><v-icon size="20px">mdi-book-plus </v-icon> Livro
      </v-btn>

      <v-divider vertical></v-divider>
      <v-btn text rounded to="/rent"
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
      { title: "Editora", icon: "mdi-bookshelf", to: "/publisher" },
      { title: "Livro", icon: " mdi-book-plus", to: "/book" },
      { title: "Usuário", icon: "mdi-account-edit", to: "/user" },
      { title: "Aluguel", icon: "mdi-book-account", to: "/rent" },
    ],
  }),
};
</script>

<style scoped></style>
