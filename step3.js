const http = require('http')
const fs = require('fs')
const simplewebserver = require('./simplewebserver.js')
const url = require('url')

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  if (req.url.startsWith('/api/')) {
    const urlp = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8' })
    console.log(urlp.query)
    res.write(JSON.stringify(urlp.query))
  } else {
    simplewebserver.serve(res, req.url)
  }
  res.end()
})
server.listen(8001)
