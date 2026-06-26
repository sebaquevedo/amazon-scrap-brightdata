# Amazon Scraper — NestJS + BrightData

Scraper de productos de Amazon usando **NestJS**, **Puppeteer** y el **Scraping Browser** de **BrightData**.

## Requisitos

- Node.js >= 18
- pnpm (`npm install -g pnpm`)

## Setup

```bash
# Instalar dependencias
pnpm install
```

## Configuración

Copiá el archivo `.env` y completalo:

```env
SBR_WS_ENDPOINT='wss://...'
```

### ¿Dónde consigo el endpoint de BrightData?

1. Andá a [brightdata.com](https://brightdata.com) y creá una cuenta o iniciá sesión
2. Entrá al dashboard y buscá **"Scraping Browser"** (o directamente en [BrightData Scraping Browser](https://brightdata.com/products/scraping-browser))
3. Creá un nuevo proxy/endpoint
4. Te va a generar una URL tipo `wss://...` con usuario y contraseña incluidos
5. Pegá esa URL en la variable `SBR_WS_ENDPOINT` del `.env`

> ⚠️ **Importante**: no subas el `.env` al repo (ya está en `.gitignore`). Siempre copiá el `.env.example` o el template de arriba.

## Correr el proyecto

```bash
# development — recarga automática
pnpm run start:dev

# sin watch
pnpm run start
```

## Endpoints

| Método | Ruta                    | Query Param | Descripción                  |
| ------ | ----------------------- | ----------- | ---------------------------- |
| `GET`  | `/amazon/products`      | `product`   | Busca productos en Amazon    |

**Ejemplo:**

```bash
curl "http://localhost:3000/amazon/products?product=laptop"
```

## Tests

```bash
# tests unitarios
pnpm run test

# tests e2e
pnpm run test:e2e
```

## Stack

- NestJS 11 + TypeScript
- Puppeteer Core
- BrightData Scraping Browser (SBR WebSocket)
- ConfigModule (`@nestjs/config`)
- pnpm
