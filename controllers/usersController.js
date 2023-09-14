const fs = require("fs");
const path = require('path');

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
            console.log(element);
            if (
                element.author_user === user &&
                element.author_pwd === password
            ) {
                userFound = true;
                //guarda user para sessao
                req.session.author_user = element.author_user;
                req.session.author_id = element.author_id;
                req.session.author_level = element.author_level;
                console.log("ID user: " + req.session.author_id);
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

// addd todas as funções aqui
module.exports = {
    index,
    getAll,
    login,
    logout
}