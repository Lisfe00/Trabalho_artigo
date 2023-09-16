const express = require("express");
const articles = require("../data/articles.json");
const fs = require("fs");
const path = require('path');

const index = (req, res) => {
    try{
        let jsonArticles = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
        let datasArticles = JSON.parse(jsonArticles);

        res.render('../views/index', { datasArticles: datasArticles});
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }

}


function login(req, res) {
    res.render('../views/login');
}


// addd todas as funções aqui
module.exports = {
    index,
    login
}