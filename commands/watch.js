const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {randBetween} = require('../helperFunctions');

const data = new SlashCommandBuilder()
    .setName('watch')
    .setDescription('watch')
    .addChannelOption(option =>
        option.setName('voice-channel')
        .setDescription('Which voice channel to use')
        .setRequired(true)
    );

const execute = async (interaction) => {
    const channel = interaction.options.getChannel('channel');
    if (channel.type !== 'GUILD_VOICE') {
        await interaction.reply({
            content: 'Beep boop. You must choose a voice channel.',
            ephemeral: true,
        });
    } else {
        console.log(channel);
        // await interaction.reply('channel');

        const invite = await interaction.client.discordTogether.createTogetherCode(channel.id, 'youtube');
        interaction.reply(`Beep boop. Started a youtube watch activity in ${channel.name}\n${invite.code}`);
    }
}

module.exports = {
    data,
    execute,
};
