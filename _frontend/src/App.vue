<template>
  <div id="app">
    <div class="jumbotron">
      <div class="container">
        <h1>Descentralized Application Demo</h1>
        <p>This is a simple vueJs demo running one descentralized node.</p>

        <a
          @click="download"
          class="btn btn-primary btn-lg"
          href="#"
          role="button"
          >To be Node</a
        >
      </div>
    </div>

    <div class="container">
      <h2>Active Nodes</h2>
      <table class="table table-condensed">
        <thead>
          <tr>
            <th>Address</th>
            <th>Last Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(node, index) in nodes" :key="index">
            <td>{{ node.host }}</td>
            <td>{{ node.lastcheck }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      link: "",
      nodes: [],
    };
  },

  async beforeMount() {
    const { url } = await this.getTunnelInfo();
    this.link = url;

    const nodes = await this.getNodeList();
    this.nodes = nodes;
  },

  methods: {
    download() {
      window.location.href = `/download`;
    },

    getTunnelInfo() {
      return new Promise((resolve, reject) => {
        fetch(`/stats`)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.json());
            } else {
              reject(response);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getNodeList() {
      return new Promise((resolve, reject) => {
        fetch(`${this.link}/nodes`)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.json());
            } else {
              reject(response);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>

<style>

</style>
