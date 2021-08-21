const { SlashCommandBuilder } = require('@discordjs/builders');
const {randBetween} = require('../helperFunctions');

const data = new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin');

const execute = async (interaction) => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    await interaction.reply(res);
}

module.exports = {
    data,
    execute,
};
