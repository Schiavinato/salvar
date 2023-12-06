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

// Rota para redirecionar para a página 'index' quando acessado o localhost:3000
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/medicoConsultas', (req, res) => {
  const idDoMedico = 1;
  const consultasDoMedicoQuery = 'SELECT * FROM consultas WHERE id_medico = ?';
  
  db.query(consultasDoMedicoQuery, [idDoMedico], (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor ao obter consultas do médico');
    } else {
      res.render('medicoConsultas', { consultas: results });
    }
  });
});

app.get('/consultas', (req, res) => {
  res.render('consultas'); 
});

app.post('/consultas', (req, res) => {
  const { nome_paciente, data_consulta, hora_consulta, especialista, observacoes, criado_em } = req.body;
  
  if (!nome_paciente) {
    res.status(400).send('O campo nome_paciente não pode ser nulo ou vazio');
    return;
  }

  const cadastroQuery = 'INSERT INTO consultas (nome_paciente, data_consulta, hora_consulta, especialista, observacoes, criado_em) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(cadastroQuery, [nome_paciente, data_consulta, hora_consulta, especialista, observacoes, criado_em], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar consulta: ' + err.stack);
      res.status(500).send('Erro no servidor ao cadastrar');
    } else {
      console.log('Consulta cadastrada com sucesso. ID: ' + result.insertId);
      res.send('Consulta cadastrada com sucesso');
    }
  });
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/cadastro', (req, res) => {
  const { username, password, cpf, telefone, email, sexo, CEP } = req.body;
  const userType = 'user';

  const verificaUsuarioQuery = 'SELECT * FROM cadastro WHERE username = ? OR email = ?';
  
  db.query(verificaUsuarioQuery, [username, email], (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor ao verificar usuário');
    } else if (results.length > 0) {
      res.send('Usuário ou email já cadastrado');
    } else {
      const cadastroQuery = 'INSERT INTO cadastro (username, password, cpf, telefone, email, sexo, CEP, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      
      db.query(cadastroQuery, [username, password, cpf, telefone, email, sexo, CEP, userType], (err, result) => {
        if (err) {
          res.status(500).send('Erro no servidor ao cadastrar');
        } else {
          const user_id = result.insertId;
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
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/adminPage', (req, res) => {
  res.render('adminPage');
});

app.get('/userPage', (req, res) => {
  res.render('userPage');
});

app.get('/medicoPage', (req, res) => {
  res.render('medicoPage');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const loginQuery = 'SELECT user_id, user_type FROM cadastro WHERE username = ? AND password = ?';
  db.query(loginQuery, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor ao fazer login');
    } else if (result.length > 0) {
      const user_id = result[0].user_id;
      const user_type = result[0].user_type;

      const userInfoQuery = 'SELECT * FROM login WHERE user_id = ?';
      db.query(userInfoQuery, [user_id], (err, result) => {
        if (err) {
          res.status(500).send('Erro no servidor ao buscar informações de login');
        } else {
          if (user_type === 'admin') {
            res.redirect('/adminPage');
          } else if (user_type === 'user') {
            res.redirect('/userPage');
          } else if (user_type === 'medico') {
            // Redireciona o médico diretamente para a página de consultas dele
            res.redirect('/medicoPage');
          } else {
            res.send('Tipo de usuário desconhecido');
          }
        }
      });
    } else {
      res.send('Nome de usuário ou senha incorretos ou usuário não cadastrado');
    }
  });
});

app.listen(4000, () => {
  console.log('Servidor rodando na porta ');
  });
  
  // READ
  app.get('/medicoPage', (req, res) => {
    db.query('SELECT * FROM consultas', (err, result) => {
      if (err) throw err;
      res.render('medicoPage', { consultas: result });
    });
  });

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/Images'));


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
