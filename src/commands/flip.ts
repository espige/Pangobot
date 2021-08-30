import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { randBetween } from "../common/helperFunctions";
import { Command } from "../common/interfaces";

const data = new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    const embed = new MessageEmbed()
        .setTitle('Flipped a coin')
        .setDescription(res);
    await interaction.reply({ embeds: [embed] });
}

export const command: Command = { data, execute };
