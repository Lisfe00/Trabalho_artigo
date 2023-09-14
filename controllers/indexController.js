const express = require("express");
const articles = require("../data/articles.json");
const fs = require("fs");
const path = require('path');

const index = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
}


function login(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
}


// addd todas as funções aqui
module.exports = {
    index,
    login
}