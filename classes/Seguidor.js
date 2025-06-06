class Seguidor {
  constructor(id_usuario, id_seguidor) {
    this.id_usuario = id_usuario;
    this.id_seguidor = id_seguidor;
  }

  validarCampos() {
    if (!this.id_usuario || !this.id_seguidor) {
      throw new Error("Todos os campos são obrigatórios");
    }
  }

  async seguir() {
    try {
      this.validarCampos();
      const { db, client } = await connect();
      const result = await db.collection("seguidores").insertOne({
        id_usuario: this.id_usuario,
        id_seguidor: this.id_seguidor,
      });
      console.log("Seguidor cadastrado:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

   async listarSeguidores(filtro = {}) {
    try {
      const { db, client } = await connect();
      const seguidores = await db.collection("seguidores").find(filtro).toArray();
      console.log("Seguidores cadastrado:", seguidores);
      client.close();
      return seguidores;
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

  async deletar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("seguidores").deleteMany(filtro);
      console.log("Seguidores deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

}

module.exports = Seguidor;
