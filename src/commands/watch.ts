import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { discordTogether } from '../index';
import { Command } from '../common/interfaces';

const data = new SlashCommandBuilder()
    .setName('watch')
    .setDescription('Watch youtube videos together')
    .addChannelOption((option) =>
        option
            .setName('voice-channel')
            .setDescription('Which voice channel to use')
            .setRequired(true)
    );

const execute = async (interaction: CommandInteraction): Promise<void> => {
    const channel = interaction.options.getChannel('voice-channel');
    if (channel?.type !== 'GUILD_VOICE') {
        await interaction.reply({
            content: 'Beep boop. You must choose a voice channel.',
            ephemeral: true,
        });
    } else {
        const invite = await discordTogether.createTogetherCode(
            channel.id,
            'youtube'
        );
        interaction.reply(
            `Beep boop. Started a youtube watch activity in ${channel.name}\n${invite.code}`
        );
    }
};

export const command: Command = { data, execute };
