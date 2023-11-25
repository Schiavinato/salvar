const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'CCWAmedicine',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado como ID ' + connection.threadId);
});

app.set('view engine', 'ejs');

app.get('/planos', (req, res) => {
  connection.query('SELECT * FROM planos', (err, rows) => {
    if (err) throw err;
    res.render('planos', { planos: rows });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});






