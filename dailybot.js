// Load up the discord.js library
const Discord = require("discord.js");
const _ = require("lodash");

process.on('unhandledRejection', error => { throw error })
const client = new Discord.Client();
const config = require("./config.json");
const crashcount = require("./crashed.json")

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Crashed ${crashcount.crashcount} Times!`);
});

client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.startsWith(config.prefix)) {
    throttled_parse_command(message);
  }
});

var throttled_parse_command = _.throttle(parse_command, wait=1000);

async function  parse_command(message) {
  console.log(`Message received!`);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "help") {
    message.channel.send("Commands are: help ping video source");
  } else if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  } else if(command === "video") {
    if(message.guild) {
      var video_url = "https://discordapp.com/channels/"+message.guild.id+"/"+config.video_channel_id;
      message.channel.send('Join the channel and click this link:\n<' + video_url + '>');
    }
  } else if(command === "source") {
    if(message.guild) {
      message.channel.send('Poke around inside me at <https://github.com/mercotui/DailyBot>');
    }
  } else {
    message.channel.send("Hi :L");
  }
}

client.login(config.token);
