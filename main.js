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

// All smartzones
app.get('/smartzones', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('smartzones', {
      title: 'Alle smart zones',
      smartzones: jsonData.data,
    })
  })
})

// Filter names
app.get('/smartzones/name/:smartzoneId', (request, response) => {
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
  fetchJson(url, postData).then(function () {
    response.render('add', {
      title: 'Smart zone toevoegen',
    })
  })
})

app.get('/add', (request, response) => {
    response.render('add', {
      title: 'Smart zone toevoegen',
    })
})

// PUT form
app.post('/edit', urlencodedParser, (request,response) =>{
  const postData = {
    method: 'put',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then(function () {
    response.render('edit', {
      title: 'Smart zone bewerken',
    })
  })
})

app.get('/edit', (request, response) => {
    response.render('edit', {
      title: 'Smart zone bewerken',
    })
})

// DELETE form
app.post('/remove', urlencodedParser, (request,response) =>{
  const postData = {
    method: 'delete',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then(function () {
    response.render('remove', {
      title: 'Smart zone verwijderen',
    })
  })
})

app.get('/remove', (request, response) => {
    response.render('remove', {
      title: 'Smart zone verwijderen',
    })
})

// Server port
const server = app.listen(port, () => {
  console.log(`Application started on port: ${port}`)
})

// Fetch
async function fetchJson(url, postData = {}) {
  return await fetch(url, postData)
    .then((response) => response.json())
    .catch((error) => error)
}