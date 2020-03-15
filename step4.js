const http = require('http')
const fs = require('fs')
const simplewebserver = require('./simplewebserver.js')
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
    simplewebserver.serve(res, req.url)
  }
  res.end()
})
server.listen(8001)
