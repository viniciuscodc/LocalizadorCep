const express = require("express")
const cors = require("cors")
const https = require('https');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.post("/", function(request,response) {
    let cep = request.body.cep //data recieved from client

    let url = 'https://viacep.com.br/ws/' + String(cep) + '/json/'

    https.get(url, (resp) => { //api call
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => { //sent data to client
        response.send(JSON.parse(data))
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

app.listen(3000, function(){
    console.log("Server running on http://localhost:3000")
})

