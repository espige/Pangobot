import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, Interaction } from "discord.js";
import { randBetween } from "../common/helperFunctions";
import { Command } from "../common/interfaces";

const data = new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin');

const execute = async (interaction: Interaction): Promise<void> => {
    const res = randBetween(0, 1) === 1 ? 'Heads' : 'Tails';
    await (interaction as BaseCommandInteraction).reply(res);
}

const command: Command = { data, execute };
module.exports = { ...command };