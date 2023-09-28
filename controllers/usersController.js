const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

//função puxa a home para admins e autores
function index(req, res) {
  try {
    let json = fs.readFileSync(
      path.join(__dirname, "../data", "users.json"),
      "utf-8"
    );
    let datas = JSON.parse(json);

    let jsonArticles = fs.readFileSync(
      path.join(__dirname, "../data", "articles.json"),
      "utf-8"
    );
    let datasArticles = JSON.parse(jsonArticles);

    if (req.session.author_level == "autor") {
      datasArticles = datasArticles.filter(
        (element) => element.kb_author_email == req.session.author_email
      );
    }

    datasArticles.forEach((element) => {
      datas.forEach((user) => {
        if (element.kb_author_email === user.author_email) {
          element.author_name = user.author_name;
        } else {
          element.author_name = element.kb_author_email;
        }
      });
    });

    res.render("../views/admin", {
      datas: datas,
      datasArticles: datasArticles,
      authUser: req.session.author_level,
      authName: req.session.author_user,
    });
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
  }
}

//função de login
function login(req, res) {
  let user = req.body.user;
  let password = req.body.password;

  password = crypto.createHash("sha256").update(password).digest("hex");

  try {
    let data = fs.readFileSync(
      path.join(__dirname, "../data", "users.json"),
      "utf-8"
    );
    let users = JSON.parse(data);

    let userFound = false;

    users.forEach((element) => {
      if (
        element.author_user === user &&
        element.author_pwd === password &&
        element.author_status === "on"
      ) {
        userFound = true;
        //guarda user para sessao
        req.session.author_user = element.author_user;
        req.session.author_id = element.author_id;
        req.session.author_level = element.author_level;
        req.session.author_email = element.author_email;
      }
    });

    if (userFound) {
      // Login bem sucedido
      res.redirect("/users/home");
    } else {
      // Login falhou
      res.render("../views/login", { error: true });
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
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
  res.render("../views/users_create", { errormessage: false });
}

function create(req, res) {
  let id = uuidv4();
  let name = req.query.name;
  let email = req.query.email;
  let user = req.query.user;
  let password = req.query.password;
  let acess = req.query.acess;
  let status = req.query.status ? "on" : "off";

  password = crypto.createHash("sha256").update(password).digest("hex");

  let oldjson = fs.readFileSync(
    path.join(__dirname, "../data", "users.json"),
    "utf-8"
  );
  let jsonDatas = JSON.parse(oldjson);

  let userRepet = false;
  let emailRepet = false;

  jsonDatas.forEach((element) => {
    if (element.author_user === user) {
      userRepet = true;
    }
    if (element.author_email === email) {
      emailRepet = true;
    }
  });

  if (userRepet) {
    let errormessage = "Usuário já existe";
    res.render("../views/users_create", { errormessage: errormessage });
  } else if (emailRepet) {
    let errormessage = "Email já existe";
    res.render("../views/users_create", { errormessage: errormessage });
  } else {
    jsonDatas.push({
      author_id: id,
      author_name: name,
      author_email: email,
      author_user: user,
      author_pwd: password,
      author_level: acess,
      author_status: status,
    });

    fs.writeFileSync(
      path.join(__dirname, "../data", "users.json"),
      JSON.stringify(jsonDatas)
    );

    res.redirect("/users/home");
  }
}

function showUpdate(req, res) {
  const userId = req.params.id;

  let oldjson = fs.readFileSync(
    path.join(__dirname, "../data", "users.json"),
    "utf-8"
  );
  let jsonDatas = JSON.parse(oldjson);

  let user;

  jsonDatas.forEach((element) => {
    if (element.author_id === userId) {
      user = element;
    }
  });

  res.render("../views/users_edit", { user: user });
}

function update(req, res) {
  let id = req.query.id;
  let name = req.query.name;
  let email = req.query.email;
  let user = req.query.user;
  let password = req.query.password;
  let acess = req.query.acess;
  let status = req.query.status ? "on" : "off";

  let oldjson = fs.readFileSync(
    path.join(__dirname, "../data", "users.json"),
    "utf-8"
  );
  let jsonDatas = JSON.parse(oldjson);

  jsonDatas.forEach((element) => {
    if (element.author_id === id) {
      element.author_name = name;
      element.author_email = email;
      element.author_user = user;
      element.author_pwd = password;
      element.author_level = acess;
      element.author_status = status;
    }
  });

  fs.writeFileSync(
    path.join(__dirname, "../data", "users.json"),
    JSON.stringify(jsonDatas)
  );

  res.redirect("/users/home");
}

function deleteUser(req, res) {
  const userId = req.params.id;

  let oldjson = fs.readFileSync(
    path.join(__dirname, "../data", "users.json"),
    "utf-8"
  );
  let jsonDatas = JSON.parse(oldjson);

  jsonDatas = jsonDatas.filter((element) => element.author_id !== userId);

  fs.writeFileSync(
    path.join(__dirname, "../data", "users.json"),
    JSON.stringify(jsonDatas)
  );

  res.redirect("/users/home");
}

// addd todas as funções aqui
module.exports = {
  index,
  login,
  logout,
  showCreate,
  create,
  showUpdate,
  update,
  deleteUser,
};
