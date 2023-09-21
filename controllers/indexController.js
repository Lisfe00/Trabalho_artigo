const express = require("express");
const articles = require("../data/articles.json");
const users = require("../data/users.json");
const fs = require("fs");
const path = require('path');

const index = (req, res) => {
    try{
        let jsonArticles = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
        let datasArticles = JSON.parse(jsonArticles);

        let jsonUsers = fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf-8');
        let datasUsers = JSON.parse(jsonUsers);

        datasArticles.forEach((element) => {
            datasUsers.forEach((user) => {
                if(element.kb_author_email === user.author_email){
                    element.author_name = user.author_name;
                }else{
                    element.author_name = element.kb_author_email;
                }
            });
        });


        res.render('../views/index', { datasArticles: datasArticles});
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }

}


function login(req, res) {
    res.render('../views/login', {error: req.error});
}


// addd todas as funções aqui
module.exports = {
    index,
    login
}