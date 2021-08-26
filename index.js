const { DiscordTogether } = require('discord-together');
const { Client, Intents, Message, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

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
		await command.execute({ client, interaction });
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    console.log('I finally figured this out!!!');
    // console.log(interaction);
    const channel = JSON.parse(interaction.values[0]);
    console.log(channel);
    if (interaction.customId === 'selectVoiceChannel') {
        const invite = await client.discordTogether.createTogetherCode(channel.id, 'youtube');
        // await interaction.update();
        // interaction.update({ content: `You selected ${channel.name}` });
        interaction.reply(`Beep boop. Started a youtube watch activity in ${channel.name}\n${invite.code}`);
        // interaction.update({ content: `${invite.code}`, components: [], ephemeral: false });
    }
})

// TODO: use message code later for profanity filter
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    // have profanity filter first
    if (content.includes('good bot') || content.includes('bad bot')) {
        // check to see if the bot sent the message before the one that just got sent in
        const previousMessages = await message.channel.messages.fetch({ limit: 2 });
        if (previousMessages.last()?.author.bot) {
            if (content.includes('good')) message.channel.send(':D');
            else message.channel.send('D:');;
        }
    }
});

client.discordTogether = new DiscordTogether(client);

// login to discord with your app's token
client.login(token)
module.exports = client;