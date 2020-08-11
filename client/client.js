const Request = require('./Request.js')

void async function(){
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['x-foo']: 'custom',
        },
        body: {
            name: 'hanson'
        }
    })

    let response = await request.send();

    console.log(response);
}();