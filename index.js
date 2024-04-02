// Importando modutos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const handlebars = require('express-handlebars');
const Post = require('./DAO/Post');

// Template de engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');

// Middleware para fazer o parsing do corpo da requisição HTTP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public')); 

// Rotas
    // Rota para ir para a lista de agendamentos
    app.get('/consulta', (req, res) => {
        Post.findAll().then((posts) => {
            res.render('listagem', {posts: posts});
        })           
    }); 

    // Rota para ir para a tela de cadastro
    app.get('/cadastro', (req, res) => {
        res.render('formulario');
    });

    // Rota para ir para a pagina inicial
    app.get('/inicial', (req, res) => {
        res.render('inicial'); 
    });

    // Rota para delatar os agendamentos da tela de cadastro
    app.get('/deletar/:pk_agenda', (req, res) => {
        Post.destroy({where: {'pk_agenda': req.params.pk_agenda}}).then(() => {
            res.send('Agendamento excluído com sucesso! ');
        }).catch((error) => {
            res.send('Este agendamento não existe! ');
        })
    });

    // Rota para salvar um novo agendamento
    app.post('/tbl_agenda', (req, res) => { 
        Post.create ({
            nome_cliente: req.body.nomeCli,
            nome_pet: req.body.nomePet,
            tipo_servico_cliente: req.body.rdServico,
            email_cliente: req.body.email,
            tel_cliente: req.body.telefone,
            data_agenda: req.body.data,
            hora_agenda: req.body.comboBoxHora
        }).then(() => { 
            // Exibir mensagem de aletar ao cadastrar novo agendamento
            const mensagem = 'Agendamento cadastrado com sucesso! ';
            res.send(`
            <script>
                alert('${mensagem}');
                window.location.href = '/inicial'; // Redirecionar para a página inicial ou outra página desejada
            </script>
        `);

        }).catch((error) => {
            console.send('Erro ao inserir agendamento no banco de dados: ' + error);
        })
        
    }) 

// Abrindo uma requisição com o servidor
app.listen(port, () => {
    console.info(`Servidor rodando em http://localhost:${port}/inicial` || process.env.PORT); 
}); 
 