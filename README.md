# Core template

## Development

first you have to copy `.env.example` file to `.env` file in project and next step follow by command

#### 1. installing all dependencies

```
yarn install
```

#### 2. creating build dist pack

```
yarn run build
```

#### 3. open connection to create database

```
make services
```

#### 4. migration with migration file before run make services

```
yarn typeorm:run
```

#### 5. let's play with code enjoy !

```
yarn run start:dev
```

### Migration

```
# Generate a migration file
yarn typeorm:migrate src/migrations/<Migration Filename>

# Example
yarn run typeorm:migrate src/migrations/InitEntities


# Running pending migrations
yarn typeorm:run
```
