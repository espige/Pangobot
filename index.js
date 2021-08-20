const { token } = require('./config.json');
const { Client, Intents, Message } = require('discord.js');

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
];

// create a discord client
const client = new Client({ intents });

const prefix = '!';

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
})

client.on('messageCreate', async (msg) => {
    // console.log(msg.content);
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        // await msg.channel.send('Pong!');
        await msg.reply('Pong!');
    } else if (command === 'beep') {
        // await msg.channel.send('Boop!');
        await msg.reply('Boop!');
    } else if (command === 'server') {
        // await msg.channel.send(`This server's name is ${msg.guild.name}`);
        await msg.reply(`This server's name is ${msg.guild.name}`);
    }
});

// login to discord with your app's token
client.login(token)