const Request = require('./Request.js');
const parser = require('./HTMLParser.js');

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
    });

    let response = await request.send();
    let dom = parser.parseHTML(response.body);
    
    // console.log(response);
}();