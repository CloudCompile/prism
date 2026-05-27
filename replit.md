# Selenite

An unblocked games site with 150+ games, built with Node.js + Express serving static files.

## Project Structure

- `index.js` — Express server (port 5000, host 0.0.0.0)
- `index.html` — Homepage
- `style.css` / `themes.css` — Styling
- `games.json` — Game catalog data
- `js/` — Client-side JavaScript (main.js, games.js, themes.js, etc.)
- `img/` — Site images and icons
- `<game-name>/` — Individual game directories (HTML/JS/assets)

## Running

```
node index.js
```

Serves on port 5000. Game subdirectories are served as static files.

## Notes

- Original GitHub repo was taken down for excessive bandwidth usage
- Source fetched from `https://github.com/selenite-cc/selenite-old/`
- Game asset directories (~150 games) are not included in this repo clone due to the 2GB+ size; only the site shell files are present
