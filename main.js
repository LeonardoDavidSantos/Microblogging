global.connect = require('./database/db');

const Usuario = require('./classes/Usuario');
const Seguidor = require('./classes/Seguidor');
const Publicacao = require('./classes/Publicacao');

global.Logger = console;

(async () => {
  try {
    const usuario = new Usuario();   
    const seguidor = new Seguidor();   
    const publicacao = new Publicacao(); 

    const novoUsuario = new Usuario("joao", "123456", "joao@email.com");
    await novoUsuario.inserir();
    console.log('-----------------------------------------------');

    const usuarios = await usuario.buscar({ usuario: "joao" });
    console.log('-----------------------------------------------');

    const id_usuario = usuarios[0]._id;
    const novaPublicacao = new Publicacao(id_usuario, "Teste!");
    await novaPublicacao.salvar();
    console.log('-----------------------------------------------');

    const novoUsuario2 = new Usuario("maria", "teste2121", "maria@email.com");
    await novoUsuario2.inserir();
    console.log('-----------------------------------------------');

    const usuariosBusca = await usuario.buscar({ usuario: "maria" });
    console.log('-----------------------------------------------');

    const id_seguidor = usuariosBusca[0]._id;
    const novoSeguidor = new Seguidor(id_usuario, id_seguidor);
    await novoSeguidor.seguir();
    console.log('-----------------------------------------------');

    await publicacao.buscar({ id_usuario: id_usuario });
    console.log('-----------------------------------------------');

    await seguidor.listarSeguidores({ id_usuario: id_usuario });
    console.log('-----------------------------------------------');

    await publicacao.deletar({ id_usuario });
    await seguidor.deletar({ id_usuario });
    await usuario.deletar({ usuario: "joao" });
    await usuario.deletar({ usuario: "maria" });

    console.log("Todos os dados foram deletados");

  } catch (error) {
    console.error("Erro:", error.message);
  }
})();
