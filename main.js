const express = require('express')
const app = express()
const port = process.env.PORT || 9000
// Fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://codingthecurbs.api.fdnd.nl/v1/smartzone'
// POST
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

// Serve public files
app.use(express.static('public'))

// Hook up a template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (request, response) => {
  fetchJson(url).then(function (jsonData) {
    response.render('index', {
      title: 'Smart Zones',
      smartzones: jsonData.data,
    })
  })
})

// POST form
app.post('/toevoegen', urlencodedParser, (request,response) =>{
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

app.get('/toevoegen', (request, response) => {
    response.render('add', {
      title: 'Smart zone toevoegen',
    })
})

// PUT form
app.post('/bewerken', urlencodedParser, (request,response) =>{
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

app.get('/bewerken', (request, response) => {
    response.render('edit', {
      title: 'Smart zone bewerken',
    })
})

// DELETE form
app.post('/verwijderen', urlencodedParser, (request,response) =>{
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

app.get('/verwijderen', (request, response) => {
    response.render('remove', {
      title: 'Smart zone verwijderen',
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
app.get('/smartzones/naam/:smartzoneId', (request, response) => {
  fetchJson(`${url}/${request.params.smartzoneId}`).then(function (
    jsonData
  ) {
    response.render('filtering/name', {
      title: 'Smart zone van',
      name: jsonData.data[0],
    })
  })
})

// Filter functions
// Deelmobiliteit
app.get('/smartzones/functie/deelmobiliteit', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/deelmobiliteit', {
      title: 'Smart zones van deelmobiliteit',
      smartzones: jsonData.data,
    })
  })
})

// Laden en lossen
app.get('/smartzones/functie/ladenenlossen', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/laden', {
      title: 'Smart zones van laden en lossen',
      smartzones: jsonData.data,
    })
  })
})

// Parkeren
app.get('/smartzones/functie/parkeren', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/parkeren', {
      title: 'Smart zones van parkeren',
      smartzones: jsonData.data,
    })
  })
})

// Recreatie
app.get('/smartzones/functie/recreatie', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/recreatie', {
      title: 'Smart zones van recreatie',
      smartzones: jsonData.data,
    })
  })
})

// Filter towns
// Amsterdam
app.get('/smartzones/stad/amsterdam', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/amsterdam', {
      title: 'Smart zones van Amsterdam',
      smartzones: jsonData.data,
    })
  })
})

// Rotterdam
app.get('/smartzones/stad/rotterdam', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/rotterdam', {
      title: 'Smart zones van Rotterdam',
      smartzones: jsonData.data,
    })
  })
})

// Schiedam
app.get('/smartzones/stad/schiedam', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/schiedam', {
      title: 'Smart zones van Schiedam',
      smartzones: jsonData.data,
    })
  })
})

// Utrecht
app.get('/smartzones/stad/utrecht', (request, response) => {
  fetchJson(url).then(function (
    jsonData
  ) {
    response.render('filtering/utrecht', {
      title: 'Smart zones van Utrecht',
      smartzones: jsonData.data,
    })
  })
})

// Filter locations
app.get('/smartzones/location/:smartzoneId', (request, response) => {
  fetchJson(`${url}/${request.params.smartzoneId}`).then(function (
    jsonData
  ) {
    response.render('filtering/location', {
      title: 'Smart zone van',
      location: jsonData.data[0],
    })
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