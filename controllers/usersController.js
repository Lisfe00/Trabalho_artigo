const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//função puxa a home para admins e autores
function index(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'admin.html'));
}

//puxa todos os usuários
function getAll(req, res) {
    try{
        let data = fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf-8');
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }
}

//função de login
function login(req, res) {
    let user = req.query.user;
    let password = req.query.password;
    console.log(user, password);

    try{
        let data = fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf-8');
        let users = JSON.parse(data);


        let userFound = false;

        users.forEach((element) => {
            if (
                element.author_user === user &&
                element.author_pwd === password &&
                element.author_status === 'on'
            ) {
                userFound = true;
                //guarda user para sessao
                req.session.author_user = element.author_user;
                req.session.author_id = element.author_id;
                req.session.author_level = element.author_level;
            }   
        });

        if (userFound) {
            // Login bem sucedido
            res.redirect("/users/home");
          } else {
            // Login falhou
            res.redirect("/login");
          }
        
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }
}

//puxa todos os usuários
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.send("Erro ao fazer logout");
        } else {
          res.redirect("/login");
        }
      });
}

function showCreate(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'users_create.html'));
}

async function create(req, res) {
    let id = uuidv4();
    let name = req.query.name;
    let email = req.query.email;
    let user = req.query.user;
    let password = req.query.password;
    let acess = req.query.acess;
    let status = req.query.status;

    if(status){
        status = "on"
    }else{
        status = "off"
    }

    data = {
        author_id: id,
        author_name: name,
        author_email: email,
        author_user: user,
        author_pwd: password,
        author_level: acess,
        author_status: status,
    }

    let json = JSON.stringify(data);

    let oldjson = fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf-8');
    let jsonDatas = JSON.parse(oldjson);

    jsonDatas.novo = data;


        fs.writeFileSync(path.join(__dirname, '../data', 'users.json'), JSON.stringify(jsonDatas));

    }

// addd todas as funções aqui
module.exports = {
    index,
    getAll,
    login,
    logout,
    showCreate,
    create
}