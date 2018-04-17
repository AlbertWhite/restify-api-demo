var restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')

var httpGetResponse = {
  email: {
    'validationRules': [
      {
        'errorMessage': 'Vous devez renseigner votre adresse e-mail.',
        'validationType': 'required'
      },
      {
        'errorMessage': 'Le format de votre adresse email n\'est pas valide.',
        'validationParameters': {
          'pattern': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        'validationType': 'regex'
      }
    ],

  },
  'password': {
    'validationRules': [
      {
        'errorMessage': 'Vous devez renseigner votre mot de passe.',
        'validationType': 'required'
      },
      {
        'errorMessage': '8 caractères minimum dont au moins 1 chiffre et 1 lettre',
        'validationParameters': {
          'pattern': '(?=^.{8,}$)(?=.*[a-zA-Z0-9]+)(?=.*\\d)(?=.*[a-zA-Z])[^ ]*$'
        },
        'validationType': 'regex'
      }
    ]
  }
}

function respondHttpGet(req, res, next) {
  res.send(200, httpGetResponse)
  next()
}

function respondHttpPost(req, res, next) {
  console.log(req.params)
  res.send(200, 'ok')
  next()
}

var server = restify.createServer()
server.use(restify.plugins.bodyParser({ mapParams: true })) // in order to parse body, need to use plugin bodyParser

var cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.get('/signup', respondHttpGet)
server.post('/signup', respondHttpPost)

server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url)
})
