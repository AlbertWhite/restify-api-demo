var restify = require('restify')

function respondHttpGet(req, res, next) {
  res.send('hello')
  next()
}

function respondHttpPost(req, res, next) {
  console.log(req.params)
  res.send('hello')
  next()
}

var server = restify.createServer()
server.use(restify.plugins.bodyParser({ mapParams: true })) // in order to parse body, need to use plugin bodyParser

server.get('/hello', respondHttpGet)
server.post('/hello', respondHttpPost)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
