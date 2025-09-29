# Docker e PostgreSQL - ArcFit Backend

Este diretório contém a configuração Docker para o ambiente de desenvolvimento.

## 🐳 Iniciando o PostgreSQL

### Subir os containers:

```bash
docker-compose up -d
```

### Ver logs dos containers:

```bash
# Ver todos os logs
docker-compose logs -f

# Ver apenas logs do postgres
docker-compose logs -f postgres
```

### Parar os containers:

```bash
docker-compose down
```

### Parar e remover volumes (⚠️ Remove todos os dados):

```bash
docker-compose down -v
```

## 📊 Informações dos Serviços

### PostgreSQL

- **Host**: `localhost`
- **Porta**: `5432`
- **Usuário**: `arcfit`
- **Senha**: `arcfit123`
- **Database**: `arcfit_db`
- **URL Completa**: `postgresql://arcfit:arcfit123@localhost:5432/arcfit_db`

### PgAdmin (Interface Gráfica)

- **URL**: http://localhost:5050
- **Email**: `admin@arcfit.com`
- **Senha**: `admin123`

#### Conectar no PgAdmin:

1. Acesse http://localhost:5050
2. Faça login com as credenciais acima
3. Adicione um novo servidor:
   - **Host**: `postgres` (nome do container)
   - **Porta**: `5432`
   - **Database**: `arcfit_db`
   - **Usuário**: `arcfit`
   - **Senha**: `arcfit123`

## 🔧 Comandos Úteis

### Conectar diretamente ao PostgreSQL:

```bash
# Via docker exec
docker exec -it arcfit-postgres psql -U arcfit -d arcfit_db

# Via psql local (se tiver instalado)
psql -h localhost -U arcfit -d arcfit_db
```

### Backup do banco:

```bash
docker exec arcfit-postgres pg_dump -U arcfit -d arcfit_db > backup.sql
```

### Restaurar backup:

```bash
docker exec -i arcfit-postgres psql -U arcfit -d arcfit_db < backup.sql
```

## 📁 Estrutura

```
docker/
├── postgres/
│   └── init.sql          # Script de inicialização
└── docker-compose.yml    # Configuração dos containers
```
