const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { randBetween } = require('../common/helperFunctions');

const data = new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin');

const execute = async (interaction) => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    const embed = new MessageEmbed()
        .setTitle('Flipped a coin')
        .setDescription(res);
    await interaction.reply({ embeds: [embed] });
}

module.exports = {
    data,
    execute,
};
