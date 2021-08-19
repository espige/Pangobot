const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');

// create a discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!')
})

client.on('interactionCreate', interaction => {
	console.log(interaction);
});

// login to discord with your app's token
client.login(token)