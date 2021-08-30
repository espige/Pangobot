import { Client, Intents, Message, Collection, Interaction } from "discord.js";
import fs from 'fs';
import Filter from 'bad-words';
const { tokenDev, tokenProd } = require('../config.json');
import { bannedWords } from "./common/bannedWords";
import { userMention } from "@discordjs/builders";
import dayjs from 'dayjs';
import * as yargs from 'yargs';
import { Command } from "./common/interfaces";

const logFile = fs.createWriteStream('./logs.txt', { flags: 'a+' });

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
];

// create a discord client
const client = new Client({ intents });

const commands = new Collection<string, Command>();
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
for (const file of commandFiles) {
    const { command }: { command: Command } = require(`${__dirname}/commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    commands.set(command.data.name, command);
}

// create a profanity filter
const filter = new Filter({ emptyList: true });
filter.addWords(...bannedWords);

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = <Command>(commands.get(interaction.commandName));

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// TODO: use message code later for profanity filter
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    // check for profanity and delete the post if it matches
    if (filter.isProfane(content)) {
        const logString = `Deleted Post:
${dayjs().toString()}
id: ${message.author.id}
tag: ${message.author.tag}
${content}
---------------------------`;
        console.log(logString);
        logFile.write(logString + '\r\n');
        message.channel.send(`${userMention(message.author.id)} Your post has been deleted because it contained one or more words that are banned on this server.`);
        await message.delete();
    }
    // respond to someone saying good bot or bad bot immediately after the bot posts
    if (content.includes('good bot') || content.includes('bad bot')) {
        // check to see if the bot sent the message before the one that just got sent in
        const previousMessages = await message.channel.messages.fetch({ limit: 2 });
        if (previousMessages.last()?.author.bot) {
            if (content.includes('good')) message.channel.send(':D');
            else message.channel.send('D:');;
        }
    }
});

let token;
const argv = yargs.option({ env: { type: 'string' } }).parseSync();
if (argv.env === 'DEV') {
    token = tokenDev;
} else if (argv.env === 'PROD') {
    token = tokenProd;
} else {
    throw new Error('Argument must be a valid environment');
}

// login to discord with your app's token
client.login(token)