const express = require("express");
const routes_index = require('./routes/index');
const routes_users = require('./routes/users');
const session = require("express-session");
const app = express();
const PORTA = 8069;

app.use(
    session({
      secret: "7a6cc1282c5f6ec0235acd2bfa780145aa2a67fd",
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(express.json());
app.use("/", routes_index);
app.use("/users", routes_users);


app.listen(PORTA, () => {
    console.log(`iniciado na porta ${PORTA}`);
})