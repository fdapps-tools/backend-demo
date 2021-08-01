<template>
  <div id="app">
    <div class="share">
      Link to share: <input v-model="link" type="text" />
      <button title="Download to join as node" @click="download">
        Download Application
      </button>
    </div>

    <div class="nodes">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Last Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(node, index) in nodes" :key="index">
            <td>{{ node.address }}</td>
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
  beforeMount() {
    // @todo: service to get IP and nodes
    this.link = "";
    this.nodes = [
      {
        address: "http://localhost:3000",
        lastcheck: new Date("2018-01-01T00:00:00.000Z").toLocaleDateString(),
      },
    ];
  },
  methods: {
    // @todo: link to download can be changed to backend link
    download() {
      window.location.href = `${this.link}/download`;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.share {
  text-align: center;
  padding: 30px;
}
.share button {
  margin: 0 30px;
}
.node {
  text-align: center;
}
</style>
