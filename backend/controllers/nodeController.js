const nodeRepository = require('../repositories/nodeRepository')

class nodeController {

  async index(req, res) {

    try {
      
      const list = await nodeRepository.nodeList()
      // @todo: implementar um middlware para cors
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.json(list)

    } catch (error) {
      console.log('ERROR', error)
      return res.status(500).send({ error: 'Something failed!' })
    }

  }

  async store(req, res) {
    try {

      const node = { host: req.app.get('tunnel'), lastcheck: Date.now() }
      const inserted = await nodeRepository.insertNode(node)

      return res.json(inserted)

    } catch (error) {
      return res.status(500).send({ error: 'Something failed!' })
    }
  }

}

module.exports = new nodeController();