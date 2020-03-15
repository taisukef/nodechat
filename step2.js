const http = require('http')
const fs = require('fs')
const simplewebserver = require('./simplewebserver.js')

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  simplewebserver.serve(res, req.url)
  res.end()
})
server.listen(8001)
