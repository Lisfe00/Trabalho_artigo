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
                if(element.kb_author_email == user.author_email){
                    element.author_name = user.author_name;
                }
            });
        });

        datasArticles = datasArticles.filter((element) => element.kb_published == "on");

        destaques = datasArticles.filter((element) => element.kb_featured == "on");
        
        datasArticles.sort(function(a, b) {
           return b.kb_liked_count - a.kb_liked_count;
          });

        res.render('../views/index', { datasArticles: datasArticles, destaques: destaques});
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