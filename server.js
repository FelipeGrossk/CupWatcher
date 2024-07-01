// Importando módulos
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2/promise');

// Importando arquivo .env
require('dotenv').config();

// Middleware para interpretar corpos de requisição JSON
app.use(express.json());
// Ou para interpretar corpos de requisição urlencoded
app.use(express.urlencoded({ extended: true }));

// Enviar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Constantes com informações para conexão com o BD
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const db = process.env.DB

// Criando conexão com o BD
const pool = mysql.createPool({
    host: 'localhost',
    user: dbUser,
    password: dbPass,
    database: db,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

// Listas itens
app.get('/', (req, res) => {

    res.status(200).sendFile(__dirname + '/public/HTML/index.html')

})

// API Consulta de todos os usuários
app.get('/apiUsuarios', async(req, res) =>{

  const [rows, filds] = await pool.execute('SELECT * FROM usuario;')

  res.status(200).json(rows)

})


// Cadastro de usuários
app.get('/tela_de_cadastro', (req, res) => {

  res.status(200).sendFile(__dirname + '/public/HTML/telaDeCadastro.html')

})

app.post('/cadastro_usuario', (req, res) => {

  const userData = req.body

  pool.execute('INSERT INTO usuario (nome, email, cpf) VALUES (?, ?, ?)', [userData.nome, userData.email, userData.cpf])

  res.status(200).redirect('/')

})

// Cadastro de assinaturas
app.get('/assinaturas', (req, res) => {

  res.status(200).sendFile(__dirname + '/public/HTML/assinaturas.html')

})

app.post('/cadastro_assinatura', (req, res) => {

  const keyData = req.body

  pool.execute('INSERT INTO assinatura (descricao, nome) VALUES (?, ?)', [keyData.descricao, keyData.nome])

  res.status(200).redirect('/')

})

// Testando conexão com o BD
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL!');
    connection.release();
  });

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;