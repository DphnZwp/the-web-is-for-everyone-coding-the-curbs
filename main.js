const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
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
  fetchJson('https://codingthecurbs.api.fdnd.nl/v1/smartzone').then(function (jsonData) {
    response.render('index', {
      title: 'Smart Zones',
      smartzones: jsonData.data,
    })
  })
})

app.get('/smartzones', (request, response) => {
  fetchJson('https://codingthecurbs.api.fdnd.nl/v1/smartzone').then(function (
    jsonData
  ) {
    response.render('smartzones', {
      title: 'Alle smartzones',
      smartzones: jsonData.data,
    })
  })
})

app.get('/name/:smartzoneId', (request, response) => {
  fetchJson(`https://codingthecurbs.api.fdnd.nl/v1/smartzone/${request.params.smartzoneId}`).then(function (
    jsonData
  ) {
    response.render('name', {
      title: 'Smart zone van',
      name: jsonData.data[0],
    })
  })
})

app.get('/toevoegen', (request, response) => {
  fetchJson('https://codingthecurbs.api.fdnd.nl/v1/smartzone').then(function (
    jsonData
  ) {
    response.render('toevoegen', {
      title: 'Alle smartzones',
      smartzones: jsonData.data,
    })
  })
})

// POST form
app.post('/toevoegen', urlencodedParser, (request,response) =>{
  // Prepare output in JSON format
  response = {
      smartzonesId:req.body.smartzonesId,
      name:req.body.name,
      town:req.body.town,
      location:req.body.location,
      function:req.body.function,
      time: req.body.time,
      size:req.body.size,
      utilization:req.body.utilization,
      description:req.body.description,
      image:req.body.image
  }
  response.end(JSON.stringify(response))
})

const server = app.listen(port, () => {
  console.log(`Application started on port: ${port}`)
})

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}