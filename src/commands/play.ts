import { SlashCommandBuilder } from '@discordjs/builders';
import {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} from '@discordjs/voice';
import { CommandInteraction } from 'discord.js';
import { Command } from '../common/interfaces';

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a Soundcloud link')
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
        // const player = createAudioPlayer({
        //     behaviors: {
        //         noSubscriber: NoSubscriberBehavior.Stop,
        //     },
        // });
        // const resource = createAudioResource('../../test.mp3');
        // player.play(resource);
        // channel.sub
    }
};

export const command: Command = { data, execute };
