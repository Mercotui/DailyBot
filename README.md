# DailyBot

A bot for our Discord server

The bot resides in `dailybot.js`, andthe configuration is placed in `config.json`.

If hosted on a linux server,
using the systemd service `dailybot.service` the bot is automatically restarted if it crashes.
The systemd service also logs the number of crashes in `crashed.json` using `crashed.js`.
YOU NEED TO CONFIGURE THE SERVICE PATHS BY HAND!
