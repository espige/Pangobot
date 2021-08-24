import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { randBetween } from "../common/helperFunctions";
import { Command } from "../common/interfaces";

const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll dice')
    .addStringOption((option: SlashCommandStringOption) =>
        option.setName('dice')
            .setDescription('List what dice you want rolled ex. d20 or 4d6')
            .setRequired(true)
    );

const execute = async (interaction: CommandInteraction): Promise<void> => {
    const diceString = interaction.options.getString('dice') as string;
    const regex = new RegExp('^(\\d)*(d|D){1}(\\d)+$');
    const isMatch = regex.test(diceString);

    if (isMatch) {
        const [numDiceString, numSidesString] = diceString.split('d');
        const numDice = numDiceString === '' ? 1 : parseInt(numDiceString);
        const numSides = parseInt(numSidesString);
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

export const command: Command = { data, execute };