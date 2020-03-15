const http = require('http')

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' })
  res.write('ハロー' + req.url)
  res.end()
})
server.listen(8001)
