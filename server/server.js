const http = require('http');

http.createServer((req, res)=>{
    let body = [];
    req.on('error', (e)=>{
        console.error(e);
    }).on('data', (chunk)=>{
        console.log('data');
        body.push(Buffer.from(chunk));
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        console.log('body', body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('hello world\n');
    })
}).listen(8088, ()=>{
    console.log('server started');
});
