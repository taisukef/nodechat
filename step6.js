const http = require('http')
const fs = require('fs')
const url = require('url')

let data = []
const PATH_DATA = 'data/data.json'
function save() {
  fs.writeFileSync(PATH_DATA, JSON.stringify(data))
}
function load() {
  data = JSON.parse(fs.readFileSync(PATH_DATA))
}
load()

function serveAPI(fn, query) {
  if (fn.endsWith('/add')) {
    data.push(query)
    save()
    return data
  } else if (fn.endsWith('/list')) {
    return data
  } else if (fn.endsWith('/get')) {
    return data[query.idx]
  } else if (fn.endsWith('/clear')) {
    data = []
    save()
    return data
  } else if (fn.endsWith('/remove')) {
    data.splice(query.idx, 1)
    save()
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

const CONTENT_TYPE = {
  'html' : 'text/html; charset=utf-8',
  'png' : 'image/png',
  'gif' : 'image/gif',
  'jpg' : 'image/jpeg',
  'txt' : 'text/plain',
  'js' : 'text/javascript',
  'json' : 'application/json',
  'csv' : 'text/csv',
  'css' : 'text/css',
  'pdf' : 'application/pdf',
  'ico' : 'image/vnd.microsoft.icon',
}

function serveStatic(res, fn) {
  fn = 'static' + fn
  if (fn.indexOf('..') >= 0) {
    return
  }
  if (fn.endsWith('/'))
    fn += "index.html"
  
  const ext = fn.substring(fn.lastIndexOf('.') + 1)
  let type = CONTENT_TYPE[ext]
  if (!type)
    type = 'text/plain'
  try {
    const b = fs.readFileSync(fn)
    res.writeHead(200, { 'Content-Type' : type })
    res.write(b)
  } catch (e) {
    res.writeHead(404)
  }
}
