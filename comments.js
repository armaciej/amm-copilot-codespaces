// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const comments = [];

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);
    if (pathname === '/') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('Not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const comment = qs.parse(body).comment;
                comments.push(comment);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('success');
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(comments));
        }
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('Not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    }
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
