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
  async beforeMount() {
    const { ip } = await this.getIpPublic()
    const port = 61635
    
    // @todo: service to get IP and nodes
    this.link = `http://${ip}:${port}`
    this.nodes = [
      {
        address: `http://${ip}:${port}`,
        lastcheck: new Date("2018-01-01T00:00:00.000Z").toLocaleDateString(),
      },
    ];
  },
  methods: {
    // @todo: link to download can be changed to backend link
    download() {
      window.location.href = `${this.link}/download`;
    },
    // @todo: quais serão as formas de conseguir o IP publico? Talvez no Backend seja melhor
    getIpPublic() {
      return new Promise((resolve, reject) => {
        fetch("https://api.ipify.org?format=json")
          .then(response => {
            if (response.status === 200) {
              resolve(response.json());
            } else {
              reject(response);
            }
          })
          .catch(err => {
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
