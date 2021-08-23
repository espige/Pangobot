import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, Interaction, MessageComponentInteraction } from "discord.js";
import { randBetween } from "../common/helperFunctions";
import { Command } from "../common/interfaces";

const data = new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin');

const execute = async (interaction: BaseCommandInteraction): Promise<void> => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    await interaction.reply(res);
}

const command: Command = { data, execute };
module.exports = { ...command };