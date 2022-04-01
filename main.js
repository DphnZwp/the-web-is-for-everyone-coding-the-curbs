const express = require('express')
const app = express()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Serve public files
app.use(express.static('public'))

// Hook up a template engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/assets', express.static('assets'))
app.use('/assets/icons', express.static('icons'))

app.get('/', (req, res) => {
  // res.send('Hallo wereld!')
  fetchJson('https://codingthecurbs.api.fdnd.nl/v1/smartzone').then(function (jsonData) {
    res.render('index', {
      title: 'Smart Zones',
      smartzones: jsonData.data,
    })
  })
})

app.get('/smartzone/:smartzoneId', (request, response) => {
  // response.send('Hallo wereld!')
  fetchJson(`https://codingthecurbs.api.fdnd.nl/v1/smartzone/${request.params.smartzoneId}`).then(function (
    jsonData
  ) {
    response.render('smartzone', {
      title: 'Dit is een enkele smartzone',
      smartzone: jsonData.data[0],
    })
  })
})

const port = process.env.PORT || 9000

const server = app.listen(port, () => {
  console.log(`Application started on port: ${port}`)
})

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}