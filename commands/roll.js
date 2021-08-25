const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {randBetween} = require('../helperFunctions');

const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll dice')
    .addStringOption(option =>
        option.setName('dice')
            .setDescription('List what dice you want rolled ex. d20 or 4d6')
            .setRequired(true)
    );

const execute = async ({ interaction }) => {
    const diceString = interaction.options.getString('dice');
    const regex = new RegExp('^(\\d)*(d|D){1}(\\d)+$');
    const isMatch = regex.test(diceString);

    if (isMatch) {
        let [numDice, numSides] = diceString.split('d');
        numDice = numDice === '' ? 1 : parseInt(numDice);
        numSides = parseInt(numSides);
        if (numDice < 1 || numSides < 2) {
            await interaction.reply({
                content: 'Beep boop. Please enter a valid number of dice or sides', 
                ephemeral: true,
            });
        } else {
            let rolls = '';
            let total = 0;
            for (let i = 0; i < numDice; i++) {
                const roll = randBetween(1, numSides);
                rolls += `${roll}, `;
                total += roll;
            }
            const results = new MessageEmbed()
                .setTitle(`Rolled ${numDice}d${numSides}`)
                .addField('Results', rolls.substring(0, rolls.length - 2));
            if (numDice > 1) results.addField('Total', `${total}`);
            await interaction.reply({ embeds: [results] });
        }
    } else {
        await interaction.reply({
            content: 'Beep boop. Please use the correct format ex. d20 or 4d6',
            ephemeral: true,
        });
    }
}

module.exports = {
    data,
    execute,
};
