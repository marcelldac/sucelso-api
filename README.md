# [Front-end Repo](https://github.com/marcelldac/client_learn_more_system)

## Rodar o servidor

```bash
npm i
```

```bash
npm run dev
```

## Credenciais do db

- Crie um arquivo '.env' na pasta root

- Adicione:

```prisma
mysql://<user>:<password>@<host>:<port>/<db>
```

### Iniciar o prisma

## Forma mais rápida: Apagar as migrations e rodar o comando abaixo

```bash
npx prisma migrate dev
```
