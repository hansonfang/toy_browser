const net = require('net');
const ResponseParser = require('./ResponseParser');

module.exports = class Request{
    constructor(options){
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = Object.assign({
            'Content-Type': 'application/x-www-form-urlencoded',
        }, options.headers);

        if(this.headers['Content-Type'] === 'application/json'){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    send(connection){
        return new Promise((resolve, reject)=>{
            const parser = new ResponseParser();
            if(connection){
                connection.write(this.toString());
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, ()=>{
                    const reqbody = this.toString();
                    connection.write(reqbody);
                });
            }
            connection.on('data', (data) => {
                parser.receive(data.toString());
                if(parser.isFinished){
                    resolve(parser.response);
                    connection.end();
                }
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }

    toString(){
        const head = (Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`)).join('\r\n');
        return `${this.method} ${this.path} HTTP/1.1\r\n${head}\r\n\n${this.bodyText}`;
    }
};