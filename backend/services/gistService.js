const axios = require('axios')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

class gistService {

  async get(gistId) {
    const { data } = await this.gistAxiosInstance().get(gistId)
    return data
  }

  async getFileInGist(gistId, filename) {
    const gist = await this.get(gistId)
    const content = gist.files[filename].content
    return JSON.parse(content)
  }

  async updateFileInGist(content, gistId, filename) {
    const gistData = JSON.stringify({ files: { [`${filename}`]: { content: JSON.stringify(content) } } });
    const { data } = await this.gistAxiosInstance().patch(gistId, gistData);
    return data
  }

  gistAxiosInstance() {
    return axios.create({
      baseURL: 'https://api.github.com/gists/',
      timeout: 5000,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  }

}

module.exports = new gistService();