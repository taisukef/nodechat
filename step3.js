const http = require('http')
const fs = require('fs')
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
    serveStatic(res, req.url)
  }
  res.end()
})
server.listen(8001)

function serveStatic(res, fn) {
  fn = 'static' + fn
  if (fn.indexOf('..') >= 0) {
    return
  }
  if (fn.endsWith('/'))
    fn += "index.html"
  if (fn.endsWith('.html')) {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' })
    res.write(fs.readFileSync(fn))
  } else if (fn.endsWith('.png')) {
    res.writeHead(200, { 'Content-Type' : 'image/png' })
    res.write(fs.readFileSync(fn))
  }
}
