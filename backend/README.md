# Backend Setup

## Install dependencies

```bash
cd backend
npm install
```

## Configure environment

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Available scripts

```bash
npm run dev
```

Starts the server with `nodemon` for development.

```bash
npm start
```

Starts the backend in production mode.

## Notes

- Do not commit `.env`.
- `uploads/` is already ignored and should not be pushed.
- Make sure your MongoDB connection string is valid before starting the server.
