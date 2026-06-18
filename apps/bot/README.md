# Warning: Bot in development vs deployment environment

- In the `deploy-commands.js` script, you must change line 43 depending where you are planning to use
  the bot. If you plan to use it in a deployment environment NOW, the line that contains the Rest.put
  command needs to look like this ():
  ```js
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
  ```
- Otherwise, it needs to look like this:
  ```js
  		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
  ```

# Warning: NodeJS version

The nodejs version being used in v18.19.1
