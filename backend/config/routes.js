const express = require("express");
const routes = express.Router();


let db = [
  { '1': { nome: 'nome 1', idade: '20' } },
  { '2': { nome: 'nome 2', idade: '30' } },
  { '3': { nome: 'nome 3', idade: '40' } },
]

routes.get("/", (req, res) => {
  res.json(db);
});

routes.post("/registro", (req, res) => {
  const body = req.body;
  if (!body)
    return res.status(400).end();

  db.push(body);
  return res.json(body);
});

routes.delete("/:id", (req, res) => {
  const id = req.params.id;

  let newDB = db.filter(item => {
    if (!item[id])
      return item;
  })

  db = newDB;
  res.send(newDB);
});


module.exports = routes;