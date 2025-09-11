import app from "./app/app";
import sequelize from "./config/database";
import { seedDatabase } from "./seeders/customer.seeder";

async function startServer() {
  try {
    // Testa a conexão com o banco
    await sequelize.authenticate();
    console.log("Conectado ao banco de dados");

    // Sincroniza todos os models (cria/atualiza tabelas)
    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas");

    app.listen(3000, () => {
      console.log(`Server rodando na porta 3000`);
    });

    // Popula dados do JSON se ainda não existirem
    await seedDatabase();
    console.log("Dados iniciais inseridos (seed) com sucesso");

    // Inicia o servidor **somente se estiver local**
    if (process.env.MODE === "development") {
      const port = process.env.DEV_SERVER_PORT || 3000;
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    } else {
      console.log("Rodando em serverless, app.listen não é chamado");
    }
  } catch (err) {
    console.error("Erro ao iniciar a aplicação:", err);
  }
}

startServer();

export default app;
