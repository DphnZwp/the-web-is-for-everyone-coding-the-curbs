const express = require('express')
const app = express()

// Serve public files
app.use(express.static('public'))

// Hook up a template engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  // res.send('Hallo wereld!')
  res.render('index', {
    title: 'Smart Zones',
  })
})


app.set('port', process.env.PORT || 9000)

const server = app.listen(app.get('port'), () => {
  console.log(`Application started on port: ${app.get('port')}`)
})