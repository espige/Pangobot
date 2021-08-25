const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordTogether } = require('discord-together');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
// const { client } = require('../index');

const data = new SlashCommandBuilder()
    .setName('watch')
    .setDescription('Watch a youtube video together in a voice channel');

const execute = async ({ client, interaction }) => {
    // console.log(client.discordTogether);
    // console.log(interaction.member.voice.channel);
    // console.log(interaction.guild);
    const channels = await interaction.guild.channels.fetch();
    // channels.forEach(element => {
    //     console.log(element.type);
    // });
    // console.log('🔥');
    const voiceChannels = channels.filter((channel) => channel.type === 'GUILD_VOICE');
    // console.log(`there are ${voiceChannels.size} voice channels`);
    // console.log(voiceChannels);
    const options = [];
    voiceChannels.forEach(channel => {
        const { name, id } = channel;
        options.push({
            label: name,
            value: JSON.stringify({ name, id }),
        })
    });
    // console.log(channels);
    // const invite = await client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube');
    // interaction.channel.send(`${invite.code}`);

    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('selectVoiceChannel')
					.setPlaceholder('Choose a voice channel')
					.addOptions(options),
			);

        await interaction.reply({
            content: 'Beep boop. Please select a voice channel.',
            components: [row],
            ephemeral: true
        });
}

module.exports = {
    data,
    execute,
};
