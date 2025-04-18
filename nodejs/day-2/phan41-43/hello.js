import http from 'http'

const port = 3000;

const server = http.createServer( (req, res) =>  {
    if(req.url === '/hello' && req.method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }   
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})