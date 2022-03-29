const express = require('express')
const { readFile } = require("fs")
const app = express()
const port = 9000

app.get('/', (request, response) => {
    readFile('./index.html', 'utf-8', (err, html)=> {
        if(err){
            response.status(500)
        }
        response.send(html)
    })
})

app.listen(port, () => {
    console.log('Server is working')
})

// Vanilla Node js
// const http = require('http')
// // File system
// const fs = require('fs')

// http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/html' })
//     fs.readFile('index.html',function (error, data){
//         if(error) {
//             response.writeHead(404)
//             response.write('file not found')
//         }
//         else {
//             response.write(data)
//         }
//         response.end()
//     })
// }).listen(4050)