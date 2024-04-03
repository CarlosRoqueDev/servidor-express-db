// Importando modulos
const conexao = require('./conexao');

const Post = conexao.sequelize.define("tbl_agenda", {
    pk_agenda: {
        type: conexao.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_cliente: {
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    nome_pet: {
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    tipo_servico_cliente: {
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    email_cliente: {
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    tel_cliente: {
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    data_agenda: {
        type: conexao.Sequelize.DATE,
        allowNull: false
    },
    hora_agenda: {
        type: conexao.Sequelize.TIME,
        allowNull: false
    }
    
}, { freezeTableName: true });

//Post.sync({force: true});

module.exports = Post;

