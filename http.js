const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

  //lodash

  const num = _.random(0, 20);
  console.log(num);
// if i want to allow a function run once

const greet = _.once(() => {
  console.log('hello')
})

greet()
greet()

  res.setHeader('Content-type', 'text/html')
  let path = './views/';

  switch(req.url) {
    case '/' :
      path += 'index.html';
      res.statusCode += 200;
      break;

     case '/about' :
      path += 'about.html';
      res.statusCode = 200;
      break;

      case '/about-us' :
        res.statusCode = 301;
        res.setHeader('Location', '/about')
        res.end();
        break;
      
     default:
      path += '404.html'
      res.statusCode = 404;
      break; 
  }



  fs.readFile(path, (err, data) => {
    if(err){
      console.log(err)
      res.end();
    }else {
      res.write(data);
      res.end();
    }
  })

})

server.listen(3000, 'localhost', () => {
  console.log('listening to request on port 3000')
})