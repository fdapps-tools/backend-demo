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

    const nodes = await this.getNodeList()
    this.nodes = nodes
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
    }
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
