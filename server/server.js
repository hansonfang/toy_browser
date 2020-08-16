const http = require('http');
const fs = require('fs');
const path = require('path');


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
        const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
        res.end(html);
    });
}).listen(8088, ()=>{
    console.log('server started');
});
