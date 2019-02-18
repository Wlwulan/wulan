const express = require('express')
const app = express()

app.get('/', (req, res) => res.send({
    data:"基于IOC的Nodejs实践"
}))

app.listen(4000, () => console.log('Example app listening on port 4000!'))