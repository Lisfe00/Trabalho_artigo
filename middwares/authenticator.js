function isAuthenticated(req, res, next) {
    //verifique se o usuario está autenticado
    if (req.session && req.session.author_user) {
      //se estiver autenticado, permita o acesso a rota
      next();
    } else {
      //se nao estiver autenticado, redirecione para a pagina de login
      res.redirect("/login");
    }
  }
  
function isadmin(req, res, next) {
    //verifique se o usuario está autenticado
    if (req.session.author_level === "admin") {
      next();
    } else {
      res.redirect("/users/home");
    }
  }
    // addd todas as funções aqui
module.exports = {
    isAuthenticated,
    isadmin
}