[Front-end Repo](https://github.com/marcelldac/client_learn_more_system)

# Rodar o servidor:

```bash
npm i
```

```bash
npm run dev
```

# Credenciais do db:

- Crie um arquivo '.env' na pasta root

- Adicione:

```prisma
DATABASE_URL="postgresql://<user>:<pass>@<server>:<port>/<db_name>?schema=<shema>"
```
ex: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/learnmore?schema=public"

# Iniciar o prisma:

```bash
npx prisma init
```
