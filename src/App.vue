<template>
  <v-app>
    <app-navigation />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import Navigation from "./components/templates/Navigation";
import Footer from "./components/templates/Footer";
export default {
  name: "App",
  data: () => ({}),
  components: {
    "app-navigation": Navigation,
    "app-footer": Footer,
  },
};
</script>