class Usuario {
  constructor(usuario, senha, email) {
    this.usuario = usuario;
    this.senha = senha;
    this.email = email;
  }

  validarCampos() {
    if (!this.usuario || !this.senha || !this.email) {
      throw new Error("Todos os campos são obrigatórios");
    }
  }

  async inserir() {
    try {
      this.validarCampos();
      const { db, client } = await connect();
      const result = await db.collection("usuarios").insertOne({
        usuario: this.usuario,
        senha: this.senha,
        email: this.email,
      });
      console.log("Usuário cadastrado:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

   async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const usuarios = await db.collection("usuarios").find(filtro).toArray();
      console.log("Usuários:", usuarios);
      client.close();
      return usuarios;
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

   async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").deleteMany(filtro);
      console.log("Usuários deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro : " + error.message);
      throw error;
    }
  }
}

module.exports = Usuario;
