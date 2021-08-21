const { SlashCommandBuilder } = require('@discordjs/builders');
const {randBetween} = require('../helperFunctions');

const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll dice')
    .addIntegerOption(option => option.setName('amount').setDescription('How many dice?'))
    .addIntegerOption(option => option.setName('sides').setDescription('Number of sides'));

const execute = async (interaction) => {
    const amount = interaction.options.getInteger('amount');
    const sides = interaction.options.getInteger('sides');
    console.log(amount);
    console.log(sides);
    await interaction.reply(randBetween(1, sides));
}

module.exports = {
    data,
    execute,
};
