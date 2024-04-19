## WMovies Project [![Netlify Status](https://api.netlify.com/api/v1/badges/c441f429-64e5-4f85-af49-1a7e6b3886ce/deploy-status)](https://app.netlify.com/sites/w-movies/deploys)

### by [@GeorgeCht](https://github.com/GeorgeCht)

A fun little project, utilizing the latest NextJs. Browse and stream thousands of movies and series!

[Check it live here](https://w-movies.netlify.app/)

## Tech stack

- NextJS v14 App router
- TanStack Query
- Next-Intl (i18n)
- TailwindCSS
- NextUI
- Shadcn/ui
- Framer Motion
- Zustand State Management

## Techniques utilized

- Internationalization
- Advanced routing
- Intercepting Modals
- Data Fetching
- Custom Caching

## Development

Pretty standard plug 'n play stuff. Get node.js, clone the project and run

```bash
npm run dev
```

Only thing you'll need is a .env at the project root declaring your [themoviedb.org](https://developer.themoviedb.org/reference/intro/getting-started) api key.

```js
NEXT_PUBLIC_TMDB_API_KEY = xxxx
```

## Data sources

- Data API via [themoviedb.org](https://developer.themoviedb.org/reference/intro/getting-started)
- Video streaming via [vidsrc.to](https://vidsrc.to/#api)

## Feedback & Issues

Got feedback or wanna report an issue? You know [where to go](https://github.com/GeorgeCht/wmovies/issues).

## License

[MIT License](https://opensource.org/licenses/MIT)
