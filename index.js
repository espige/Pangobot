const { DiscordTogether } = require('discord-together');
const { Client, Intents, Message, Collection } = require('discord.js');
const fs = require('fs');
const Filter = require('bad-words');
const { token } = require('./config.json');
const bannedWords = require('./common/bannedWords');
const { userMention } = require('@discordjs/builders');
const dayjs = require('dayjs');

const logFile = fs.createWriteStream('./logs.txt', { flags: 'a+' });

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
];

// create a discord client
const client = new Client({ intents });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
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

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// TODO: use message code later for profanity filter
client.on('messageCreate', async (message) => {
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

// instantiate DiscordTogether
client.discordTogether = new DiscordTogether(client);

// login to discord with your app's token
client.login(token)
