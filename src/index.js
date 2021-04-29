const express = require("express");
const axios = require("axios")
const app = express();
app.use(express.json());

const palavraChave = "importante";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave) ?
            "importante" :
            "comum";
        axios.post('http://192.168.200.100:10000/eventos', {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        }).catch((err) => {
            console.log("err", err);
        });
    },
};

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({
        msg: "ok"
    });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));

/*const express = require("express");
const axios = require("axios")
const app = express();
app.use(express.json());

const palavraChave = "importante";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave) ?
            // (observacao.idade >= palavraChave) ?
            "importante" :
            "comum";
        axios.post('http://192.168.200.100:10000/eventos', {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    },
};

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));*/