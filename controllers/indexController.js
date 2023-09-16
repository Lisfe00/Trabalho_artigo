const express = require("express");
const articles = require("../data/articles.json");
const fs = require("fs");
const path = require('path');

const index = (req, res) => {
    res.render('../views/index');

}


function login(req, res) {
    res.render('../views/login');
}


// addd todas as funções aqui
module.exports = {
    index,
    login
}