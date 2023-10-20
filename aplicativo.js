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

app.get('/cadastro', (req, res) => {
  res.render('cadastro'); // Certifique-se de que você tenha um arquivo de modelo 'cadastro.ejs' definido
});

app.post('/cadastro', (req, res) => {
  const { username, password, cpf, telefone, email, sexo, CEP } = req.body;

  // Consulta para inserir na tabela de cadastro
  const cadastroQuery = 'INSERT INTO cadastro (username, password, cpf, telefone, email, sexo, CEP) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(cadastroQuery, [username, password, cpf, telefone, email, sexo, CEP], (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor ao cadastrar');
    } else {
      const user_id = result.insertId; // Obtém o ID do usuário inserido

      // Consulta para inserir na tabela de login relacionada ao ID do usuário
      const loginQuery = 'INSERT INTO login (user_id, last_login) VALUES (?, NOW())';
      db.query(loginQuery, [user_id], (err, result) => {
        if (err) {
          res.status(500).send('Erro no servidor ao criar login');
        } else {
          res.send('Cadastro e login realizados com sucesso');
        }
      });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login'); // Certifique-se de que você tenha um arquivo de modelo 'login.ejs' definido
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta para buscar o ID do usuário com base no nome de usuário e senha
  const loginQuery = 'SELECT user_id FROM cadastro WHERE username = ? AND password = ?';
  db.query(loginQuery, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor ao fazer login');
    } else if (result.length > 0) {
      const user_id = result[0].user_id;

      // Consulta para obter informações de login com base no ID do usuário
      const userInfoQuery = 'SELECT * FROM login WHERE user_id = ?';
      db.query(userInfoQuery, [user_id], (err, result) => {
        if (err) {
          res.status(500).send('Erro no servidor ao buscar informações de login');
        } else {
          // Você pode acessar os dados de login como result[0].last_login
          res.send('Login bem-sucedido');
        }
      });
    } else {
      res.send('Nome de usuário ou senha incorretos');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
