import app from "./app/app";

app.listen(process.env.DEV_DB_PORT, () => {
  console.log(`Server rodando na porta ${process.env.DEV_DB_PORT}`);
});