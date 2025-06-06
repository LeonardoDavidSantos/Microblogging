class Publicacao {
  constructor(id_usuario, conteudo, data_publicacao = new Date().toISOString()) {
    this.id_usuario = id_usuario;
    this.conteudo = conteudo;
    this.data_publicacao = data_publicacao;
  }

  validarCampos() {
    if (!this.id_usuario || !this.conteudo) {
      throw new Error("Os campos são obrigatórios");
    }
  }

  async salvar() {
    try {
      this.validarCampos();
      const { db, client } = await connect();
      const result = await db.collection("publicacoes").insertOne({
        id_usuario: this.id_usuario,
        conteudo: this.conteudo,
        data_publicacao: this.data_publicacao,
      });
      console.log("Publicação cadastrada:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }

   async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const publicacoes = await db.collection("publicacoes").find(filtro).toArray();
      console.log("Publicações encontradas:", publicacoes);
      client.close();
      return publicacoes;
    } catch (error) {
      Logger.log("Erro ao buscar publicações: " + error.message);
      throw error;
    }
  }

   async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("publicacoes").deleteMany(filtro);
      console.log("Publicações deletadas:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro: " + error.message);
      throw error;
    }
  }
}
module.exports = Publicacao;
