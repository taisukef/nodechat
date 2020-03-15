const http = require('http')
const fs = require('fs')

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  serveStatic(res, req.url)
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
