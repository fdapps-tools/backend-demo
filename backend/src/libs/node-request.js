const { default: axios } = require("axios")

const instance = () => {
  return axios.create({
    timeout: 5000,
    headers: {
      'Bypass-Tunnel-Reminder': 'true',
      'Content-Type': 'application/json',
      'hash-code': ''
    }
  })
}

module.exports = {
  instance: instance,

  post(url, data) {
    return instance().post(url, data)
  },

  get(url, data) {
    return instance().get(url, data)
  }
  
}