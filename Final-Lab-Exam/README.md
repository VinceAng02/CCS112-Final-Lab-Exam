# Hotel PMS

React/Vite frontend and Laravel API, with Docker support for local development and hosted containers.

## Run with Docker Compose

Requirements: Docker Desktop or Docker Engine with the Compose plugin.

1. Copy `.env.docker.example` to `.env` and set `APP_KEY` and `DB_PASSWORD`. Generate a key with `docker run --rm php:8.3-cli-alpine php -r "echo 'base64:'.base64_encode(random_bytes(32)).PHP_EOL;"` and paste the output as `APP_KEY`.
2. Start the stack with `docker compose up --build`.
3. Open [http://localhost:8080](http://localhost:8080). The frontend container serves the Vite build and proxies `/api/*` to Laravel. PostgreSQL data persists in the `postgres_data` volume.

The API is available inside the Compose network at `http://backend:8000`; migrations run when the backend container starts. To stop the services, run `docker compose down`. `docker compose down -v` also deletes the local database volume.

## Deploy with Render and Supabase

Create two Render services from this repository:

### API web service

- Runtime: Docker; Dockerfile path: `Backend/Dockerfile`; Docker build context: `Backend`.
- Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY` to a generated Laravel key, and `APP_URL` to the API's public URL.
- Connect it to your Supabase Postgres database with `DB_CONNECTION=pgsql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_SSLMODE=require`. Use the host and credentials shown by Supabase's connection settings. Keep credentials in Render environment variables.
- The container migrates the database before serving requests. Check Render logs for migration errors after deployment.

### Frontend web service

- Runtime: Docker; Dockerfile path: `Dockerfile`; Docker build context: repository root.
- Set `API_UPSTREAM` to the API's public origin, for example `https://your-api.onrender.com` (no path suffix). The Nginx server proxies `/api/*` to it.
- The default `VITE_API_BASE_URL=/api/v1` works with this proxy. If you change it, rebuild the frontend image with the matching value.

For Vercel frontend hosting instead, use the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory. Set `VITE_API_BASE_URL` to `https://your-api.onrender.com/api/v1`. Configure a Vercel rewrite for `/api/(.*)` to the API origin, or enable CORS on the Laravel API for the exact Vercel origin. Do not expose database credentials or Supabase service-role keys in frontend variables.

## Important before public launch

The current sign-in component checks a fixed username and password in browser code and stores a flag in `localStorage`; it does not authenticate against Laravel. Anyone can bypass it and the credentials are visible in the built frontend. Replace it with server-side authentication and protect write endpoints before using the app with real users or data.

