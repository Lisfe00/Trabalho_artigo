const express = require("express");
const session = require("express-session");
const routes = require('./routes/index');
const app = express();
const PORTA = 8069;

app.use(express.json());
app.use("/", routes);


app.listen(PORTA, () => {
    console.log(`iniciado na porta ${PORTA}`);
})