
const axios = require('axios')

class gistService {

  async get(gistId) {
    const { data } = await axios.get('https://api.github.com/gists/' + gistId)

    return data
  }

  async getFileInGist(gistId, filename) {
    const gist = await this.get(gistId)

    const content = gist.files[filename].content

    return JSON.parse(content)
  }

  async updateFileInGist(content, gistId, filename) {

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN

    const gistData = JSON.stringify({ files: { [`${filename}`]: { content: JSON.stringify(content) } } });

    const instance = axios.create({
      baseURL: 'https://api.github.com/gists/',
      timeout: 5000,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const { data } = await instance.patch(gistId, gistData);

    return data
  }

}

module.exports = new gistService();