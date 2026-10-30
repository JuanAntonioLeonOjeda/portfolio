# Portfolio

Web personal de Juan Antonio León Ojeda, desarrollador full-stack: proyectos, trayectoria,
stack y contacto, en español e inglés, con tema claro y oscuro.

- Una sola página estática publicada en **GitHub Pages** desde `main` (ADR-0001).
- Sin cookies ni analítica. Sin teléfono ni repositorios privados enlazados.
- Los datos salen del CV y de los repositorios de cada proyecto (`src/content/`), y los tests
  comprueban que están en los dos idiomas.

## MAIN DEPENDENCIES

![Node JS](https://img.shields.io/badge/NODE.JS-22.22+-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/REACT-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/VITE-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Lucide](https://img.shields.io/badge/LUCIDE%20REACT-1.61.0-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![Fontsource](https://img.shields.io/badge/FONTSOURCE-5.3.0-1B1F24?style=for-the-badge&logo=googlefonts&logoColor=white)
![Geist](https://img.shields.io/badge/GEIST-5.3.0-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Simple Icons](https://img.shields.io/badge/SIMPLE%20ICONS-16.36.0-111111?style=for-the-badge&logo=simpleicons&logoColor=white)
![Vitest](https://img.shields.io/badge/VITEST-5.0.5-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/TESTING%20LIBRARY-16.3.3-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLINT-9.39.5-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/PRETTIER-3.9.10-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![pnpm](https://img.shields.io/badge/PNPM-12.11.2-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GITHUB%20PAGES-DEPLOY%20PAGES%20V5-222222?style=for-the-badge&logo=githubpages&logoColor=white)
![Docker](https://img.shields.io/badge/DOCKER-NGINX%201.31.2-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Arrancar

```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm test           # Vitest
pnpm lint
pnpm typecheck
pnpm build
```

Para ver el build real tal y como lo sirve un servidor estático:

```bash
docker compose up -d --build      # http://localhost:3200  (cambia el puerto con PORTFOLIO_PORT)
```

## Publicar

1. Crea el repositorio en GitHub y súbelo (`main` y `develop`).
2. En **Settings → Pages**, elige **GitHub Actions** como origen.
3. Cada push a `main` pasa las comprobaciones y despliega
   (`.github/workflows/deploy.yml`). Si el repositorio se llama `portfolio`, la web queda en
   `https://juanantonioleonojeda.github.io/portfolio/`; si se llama
   `JuanAntonioLeonOjeda.github.io`, en la raíz. La ruta base se calcula sola.

## Cómo está hecho

- Contenido en `src/content/` (cada fichero dice de dónde salen sus datos), textos de la
  interfaz en `src/i18n/`. Decisiones en [`docs/adr/`](docs/adr/README.md).
- Desarrollado con ayuda de Claude Code; la configuración de agentes está en `AGENTS.md` y
  `.claude/`.
