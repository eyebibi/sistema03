# Warning: Bot in development vs deployment environment

- Use `node deploy-commands.js` to register commands to a specific guild (instant updates, for local dev).
  Requires `GUILD_ID` to be set in `.env`.
- Use `node deploy-commands.js --global` to register commands globally (takes up to 1 hour to propagate,
  for production deployment).

# Warning: NodeJS version

The nodejs version being used in v18.19.1
