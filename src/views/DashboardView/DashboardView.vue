<template>
  <v-container class="justify-center">
    <div class="d-flex flex-column align-center">
      <v-card class="justify-center" height="400" elevation="6">
        <v-card-title class="indigo lighten-3 white--text justify-center"
          >Estado de Alugueis</v-card-title
        >
        <div id="chart" class="justify-center">
          <apexchart
            v-if="!show"
            type="bar"
            class="justify-center"
            width="500"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import aluguelService from "@/service/AluguelService";
import editoraService from "@/service/EditoraService";
import usuarioService from "@/service/UsuarioService";
import livroService from "@/service/LivroService";
import moment from "moment";
export default {
  data: () => ({
    series: [
      {
        data: [0, 0, 0],
      },
    ],
    chartOptions: {
      chart: {
        position: "justify-center",
        width: 2000,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      colors: ["#689F38", "#FF3D00", "#FFD740"],
      labels: ["No prazo", "Atrasado", "Pendente"],
      tooltip: {
        enabled: true,
        fillSeriesCollor: true,
        theme: "light",
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
          distributed: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 500,
            },
            legend: {
              position: "bottom center",
            },
          },
        },
      ],
    },
    alugueis: [],
    show: true,
    lastAluguel: {},
    lastEditora: {},
    lastLivro: {},
    lastUsuario: {},
    lastShow: true,
    arraysLength: [],
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      aluguelService.findAllNotPaged().then((res) => {
        this.alugueis = res.data;
        this.show = !this.show;
        this.setSeries(this.alugueis);
      });
      this.setLastEditora();
      this.setLastUsuario();
      this.setLastLivro();
      this.setLastAluguel();
    },
    setSeries(alugueis) {
      alugueis.forEach((aluguel) => {
        if (
          moment(aluguel.dataDevolucao, "DD-MM-YYYY").isSameOrBefore(
            moment(aluguel.dataPrevisao, "DD-MM-YYYY")
          )
        ) {
          this.series[0].data[2]++;
        } else if (
          moment(aluguel.dataDevolucao, "DD-MM-YYYY").isAfter(
            moment(aluguel.dataPrevisao, "DD-MM-YYYY")
          )
        ) {
          this.series[0].data[1]++;
        } else {
          this.series[0].data[0]++;
        }
      });
    },
    setLastEditora() {
      editoraService.findAllNotPaged().then((res) => {
        this.lastEditora = res.data[res.data.length - 1];
        this.arraysLength[0] = res.data.length;
      });
    },
    setLastUsuario() {
      usuarioService.findAllNotPaged().then((res) => {
        this.lastUsuario = res.data[res.data.length - 1];
        this.arraysLength[1] = res.data.length;
      });
    },
    setLastLivro() {
      livroService.findAllNotPaged().then((res) => {
        this.lastLivro = res.data[res.data.length - 1];
        this.arraysLength[2] = res.data.length;
      });
    },
    setLastAluguel() {
      aluguelService.findAllNotPaged().then((res) => {
        this.lastAluguel = res.data[res.data.length - 1];
        this.arraysLength[3] = res.data.length;
      });
    },
    formatName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
};
</script>
