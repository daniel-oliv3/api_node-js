const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/banco_d', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Conexão com o MongoDB realizada com sucesso!");
}).catch((erro) =>{
    console.log("Erro: Conexão com o MongoDB não foi realizada!");
});

app.get("/", (req, res) => {
    return res.json({titulo: "Como criar API"});
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) =>{
    if(err) return res.status(400).json({
        error: true,
        message: "Erro: Artigo não foi cadastrado!"
    })

    return res.status(400).json({
        error: true,
        message: "Artigo cadastrado com sucesso!"
    })
});
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});