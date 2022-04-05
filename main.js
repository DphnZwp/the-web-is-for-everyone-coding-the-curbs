const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://codingthecurbs.api.fdnd.nl/v1/smartzone'
// POST
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

// Serve public files
app.use(express.static('public'))

// Hook up a template engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/assets', express.static('assets'))
app.use('/assets/icons', express.static('icons'))

app.get('/', (request, response) => {
  fetchJson(url).then(function (jsonData) {
    response.render('index', {
      title: 'Smart Zones',
      smartzones: jsonData.data,
    })
  })
})

app.get('/smartzones', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('smartzones', {
      title: 'Alle smartzones',
      smartzones: jsonData.data,
    })
  })
})

app.get('smartzones/name/:smartzoneId', (request, response) => {
  fetchJson(`${url}/${request.params.smartzoneId}`).then(function (
    jsonData
  ) {
    response.render('name', {
      title: 'Smart zone van',
      name: jsonData.data[0],
    })
  })
})

// POST form
app.post('/add', urlencodedParser, (request,response) =>{
  const postData = {
    method: 'post',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then(function (jsonData) {
    response.render('add', {
      title: 'Smartzone toevoegen',
    })
  })
})

app.get('/add', (request, response) => {
    response.render('add', {
      title: 'Smartzone toevoegen',
    })
})

const server = app.listen(port, () => {
  console.log(`Application started on port: ${port}`)
})

async function fetchJson(url, postData = {}) {
  return await fetch(url, postData)
    .then((response) => response.json())
    .catch((error) => error)
}