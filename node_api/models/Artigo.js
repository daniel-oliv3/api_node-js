const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    conteudo: { 
        type: String,
    }

},
{
    timestamps: true,    
});

mongoose.model('artigo', Artigo);