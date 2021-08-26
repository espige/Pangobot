const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {randBetween} = require('../helperFunctions');

const data = new SlashCommandBuilder()
    .setName('watch2')
    .setDescription('watch2')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('Which voice channel this will be run in')
        .setRequired(true)
    );
    // .addStringOption(option =>
    //     option.setName('dice')
    //         .setDescription('List what dice you want rolled ex. d20 or 4d6')
    //         .setRequired(true)
    // );

const execute = async ({ interaction }) => {
    const channel = interaction.options.getChannel('channel');
    if (channel.type !== 'GUILD_VOICE') {
        await interaction.reply({
            content: 'Beep boop. You must select a voice channel for this.',
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
