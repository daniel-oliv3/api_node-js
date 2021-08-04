const express = require("express");
const mongoose = require("mongoose");

require("./models/Artigo");
const Artigo = mongoose.model("artigo");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/banco_d", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB realizada com sucesso!");
  })
  .catch((erro) => {
    console.log("Erro: Conexão com o MongoDB não foi realizada!");
  });

app.get("/", (req, res) => {
  Artigo.find({})
    .then((artigo) => {
      return res.json(artigo);
    })
    .catch((erro) => {
      return res.status(400).jason({
        erro: true,
        menssage: "Nenhum artigo encontrado!"
      });
    });
});

app.get("/artigo/:id", (req, res) => {
  Artigo.findOne({ _id: req.params.id })
    .then((artigo) => {
      return res.json(artigo);
    })
    .catch((erro) => {
      return res.status(400).jason({
        erro: true,
        menssage: "Nenhum artigo encontrado!"
      });
    });
});

app.post("/artigo", (req, res) => {
  const artigo = Artigo.create(req.body, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Erro: Artigo não foi cadastrado!"
      });

    return res.status(400).json({
      error: false,
      message: "Artigo cadastrado com sucesso!"
    });
  });
});

app.put("/artigo/:id", (req, res) => {
  const artigo = Artigo.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (err) return res.status(400).json({
        error: true,
        message: "Erro: Artigo não foi editado!"
      });

    return res.json({
        error: false,
        message: "Artigo editado com sucesso!"
    });
  });
});

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({ _id: req.params.id }, req.body, (err) => {
      if (err) return res.status(400).json({
          error: true,
          message: "Erro: Artigo não foi apagado!"
        });
  
      return res.json({
          error: false,
          message: "Artigo apagado com sucesso!"
      });
    });
  });

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});
