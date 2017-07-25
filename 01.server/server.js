const http = require('http')
const url = require('url')
const querystring = require('querystring')
const server = http.createServer()

server.listen(8081)

let users = []

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    if(parsedUrl.path.indexOf('/user') === -1) {
        res.statusCode = 403
        res.end(`${res.statusCode} not allowd`)
        return
    }

    switch(req.method) {
        case 'GET':
        if(parsedUrl.path.indexOf('/user/') > -1) {
            let username = parsedUrl.path.substring(6, parsedUrl.path.length)
            let user = users.find(u => u.name === username)
            res.statusCode = 200
            res.end(JSON.stringify(user))
        }
        let query = parsedUrl.query
        if(query.adress) {
            let found = users.filter(u => u.adress === query.adress)
        } else {
            res.statusCode = 200
            res.end(JSON.stringify(user))
        }
        break

        case 'POST':
        let user = ''
        req.on('data', (buffer) => {
            const userStr = buffer.toString()
            let Content_Type = req.headers['content-type']
            if(Content_Type = 'application/json') {
                user = JSON.parse(userStr)
                user.push(user)
            }

            req.on('end', () => {
                res.statusCode = 201
                res.end('Great! User created')
            })
        })
        break

        case 'PATCH':
        let username = parsedUrl.path.substring(6, parsedUrl.path.length)
        req.on('data', (buffer) => {
            const userStr = buffer.toString()
            let Content_Type = req.headers['content-type']
            if(Content_Type === 'application/json') {
                let update = JSON.parse(userStr)
                let user = user.find(u => u.name === username)
                user.adress = update.adress
            }
        })
        req.on('end', () => {
            res.statusCode = 200
            res.end('Great! User created!')
        })
        break

        case 'DELETE':
        if(parsedUrl.path.indexOf('/user/') > -1) {
            let username = parsedUrl.path.substring(6,parsedUrl.path.length)
            let index = users.findIndex(u => u.name === username)
            user.splice(index, 1)
            res.statusCode = 200
            res.end(JSON.stringify(users))
        }
        break

    } 
})

