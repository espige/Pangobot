import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { randBetween } from "../common/helperFunctions";
import { Command } from "../common/interfaces";

const data = new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    await interaction.reply(res);
}

export const command: Command = { data, execute };