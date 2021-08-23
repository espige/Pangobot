import { Client, Collection, Intents, Interaction } from "discord.js";
import { Command } from "./common/interfaces";
import fs from 'fs';

const { token } = require('../config.json');

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
];

// create a discord client
const client = new Client({ intents });

const commands = new Collection();
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file: string) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`) as Command;
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    commands.set(command.data?.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
})

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName) as Command;

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// TODO: use message code later for profanity filter

// const prefix = '!';
// client.on('messageCreate', async (msg) => {
//     // console.log(msg.content);
//     if (!msg.content.startsWith(prefix) || msg.author.bot) return;

//     const args = msg.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'ping') {
//         // await msg.channel.send('Pong!');
//         await msg.reply('Pong!');
//     } else if (command === 'beep') {
//         // await msg.channel.send('Boop!');
//         await msg.reply('Boop!');
//     } else if (command === 'server') {
//         // await msg.channel.send(`This server's name is ${msg.guild.name}`);
//         await msg.reply(`This server's name is ${msg.guild.name} and id is ${msg.guild.id}`);
//     }
// });

// login to discord with your app's token
client.login(token)