const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function showCreate(req, res) {
    res.render('../views/articles_create');
}

function create(req, res){
    let id = uuidv4();
    let title = req.query.title;
    let body = req.query.body;
    let permalink = req.query.permalink;
    let keywords = req.query.keywords;
    let published = (req.query.published)? "on" : "off";
    let suggestion = (req.query.suggestion)? "on" : "off";
    let featured = (req.query.featured)? "on" : "off";

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '-' + mes + '-' + ano;

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson);

        jsonDatas.push({
            kb_id: id,
            kb_title: title,
            kb_body: body,
            kb_permalink: permalink,
            kb_keywords: keywords,
            kb_liked_count: 0,
            kb_published: published,
            kb_suggestion: suggestion,
            kb_featured: featured,
            kb_author_email: req.session.author_email,
            kb_published_date: dataAtual,
        });

        fs.writeFileSync(path.join(__dirname, '../data', 'articles.json'), JSON.stringify(jsonDatas));

        res.redirect("/users/home");
}

function showUpdate(req, res){
    const articleId = req.params.id;

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson);

    let article;

    jsonDatas.forEach((element) => {
        if(element.kb_id === articleId){
            article = element;
        }
    });

    res.render('../views/articles_edit', { article: article });
}

function update(req, res){
    let id = req.query.id;
    let title = req.query.title;
    let body = req.query.body;
    let permalink = req.query.permalink;
    let keywords = req.query.keywords;
    let published = (req.query.published)? "on" : "off";
    let suggestion = (req.query.suggestion)? "on" : "off";
    let featured = (req.query.featured)? "on" : "off";

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson)


    jsonDatas.forEach((element) => {
        if(element.kb_id === id){
            element.kb_title = title,
            element.kb_body = body,
            element.kb_permalink = permalink,
            element.kb_keywords = keywords,
            element.kb_published = published,
            element.kb_suggestion = suggestion,
            element.kb_featured = featured
        }
    });

        fs.writeFileSync(path.join(__dirname, '../data', 'articles.json'), JSON.stringify(jsonDatas));

        res.redirect("/users/home");
}

function deleteArticle(req, res){

    const articleId = req.params.id;

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson);

    jsonDatas = jsonDatas.filter((element) => element.kb_id !== articleId);

    fs.writeFileSync(path.join(__dirname, '../data', 'articles.json'), JSON.stringify(jsonDatas));

    res.redirect("/users/home");
}

function like(req, res){
    const articleId = req.params.id;

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'articles.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson)


    jsonDatas.forEach((element) => {
        if(element.kb_id === articleId){
            element.kb_liked_count++; 
        }
    });

        fs.writeFileSync(path.join(__dirname, '../data', 'articles.json'), JSON.stringify(jsonDatas));

    res.redirect("/");
}

// addd todas as funções aqui
module.exports = {
    showCreate,
    create,
    showUpdate,
    update,
    deleteArticle,
    like
}