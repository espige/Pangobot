import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, Interaction } from "discord.js";

export interface Command {
    data: SlashCommandBuilder,
    execute(interaction: BaseCommandInteraction): Promise<void>,
}