var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var router = {
  '/getnumber': function(req, res){
      var pathObj = url.parse(req.url, true)

      var page = pathObj.query.page
      var result

      if(page == 1){
       result = [1,2,3]
      }
      if(page == 2){
        result = [4,5,6]
      }
      
      res.write(JSON.stringify(result))
      res.end()    
  },
  '/getage': function(req, res){
    res.end('I am 18 ')
  },
  '/getname': function(req, res){
    res.end('xiaoming')
  }
}

var server = http.createServer(function(req, res){
  var staticPath = path.join(__dirname, 'www')
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  try{
    var fileContent = fs.readFileSync(filePath,'binary')
    res.write(fileContent, 'binary')
    res.end()
  }catch(e){

    if(router[pathObj.pathname]){
      router[pathObj.pathname](req, res)
    }else{
      res.writeHead(404, 'not found')
      res.end('not found try other one')      
    }
  }

})

server.listen(8080)
