const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'CCWAmedicine',
});

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados: ' + err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

app.get('/consultas', (req, res) => {
  res.render('consultas'); // Certifique-se de que você tenha um arquivo de modelo 'consultas.ejs' definido
});

app.post('/consultas', (req, res) => {
  const { nome_paciente, data_consulta, hora_consulta, observacoes, criado_em } = req.body;

  // Consulta para inserir na tabela de cadastro
  const cadastroQuery = 'INSERT INTO consultas (nome_paciente, data_consulta, hora_consulta, observacoes, criado_em) VALUES (?, ?, ?, ?, ?)';
  db.query(cadastroQuery, [nome_paciente, data_consulta, hora_consulta, observacoes, criado_em], (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor ao cadastrar');
    } else {
      res.send('Consulta cadastrada com sucesso');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
