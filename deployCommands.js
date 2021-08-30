// https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const yargs = require('yargs');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

let token;
let clientId;
let guildId;
if (yargs.argv.env === 'DEV') {
	token = config.tokenDev;
	clientId = config.clientIdDev;
	guildId = config.guildIdBotTestServer;
} else if (yargs.argv.env === 'PROD') {
	token = config.tokenProd;
	clientId = config.clientIdProd;
	guildId = config.guildIdSocialPangolin;
} else {
	throw new Error('Argument must be a valid environment');
}

const rest = new REST({ version: '9' }).setToken(token);

console.log(JSON.stringify(commands));

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();