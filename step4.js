const http = require('http')
const fs = require('fs')
const url = require('url')

let data = []

function serveAPI(fn, query) {
  if (fn.endsWith('/add')) {
    data.push(query)
    return data
  } else if (fn.endsWith('/list')) {
    return data
  } else if (fn.endsWith('/get')) {
    return data[query.idx]
  } else if (fn.endsWith('/clear')) {
    data = []
    return data
  } else if (fn.endsWith('/remove')) {
    data.splice(query.idx, 1)
    return data
  }
  return { res: "OK" }
}

const server = http.createServer()
server.on('request', function(req, res) {
  console.log(req.url)
  if (req.url.startsWith('/api/')) {
    const urlp = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8' })
    const resjson = serveAPI(urlp.pathname, urlp.query)
    res.write(JSON.stringify(resjson))
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
