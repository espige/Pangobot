import { SlashCommandBuilder, italic } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { randBetween } from '../common/helperFunctions';
import { Command } from '../common/interfaces';

const pangoFacts = [
    `The scientific name for pangolin is ${italic('manidae')}.`,
    'The size of a pangolin can range from 45 inches to 4.5 feet long.',
    "Pangolins are believed to be the world's most trafficked non-human mammal. D:",
    `The name "pangolin" comes from the Malay word ${italic(
        'pengguling'
    )}, which means "one who rolls up". `,
    'Pangolins curl into a ball when they are threatened.',
    'Pangolin scales are made of keratin, which is the same material as human fingernails.',
    "A pangolin's diet mostly consists of ants and termites.",
    'Pangolins can emit a noxious-smelling chemical, similar to the spray of a skunk.',
    'Large pangolins can extend their tongues as much as 40cm (16 in).',
    'Most pangolins are noctournal.',
    'Some pangolins live in hollow trees, while others dig tunnels to a depth of 11 ft.',
    'Pangolins have poor vision, so they rely heavily on smell and hearing.',
    'Pangolins lack teeth, so instead of chewing they ingest small stones to grind up food in their stomachs.',
    'Pangolins are solitary and only meet up to mate.',
    'In 1876 King Edward VII, then the Prince of Whales, had a coat of pangolin armor presented to him during his tour of India.',
    'Taiwan has the highest population density of pangolins in the world.',
];

const data = new SlashCommandBuilder()
    .setName('pangofact')
    .setDescription('Get a fandom fact about pangolins!');

const execute = async (interaction: CommandInteraction): Promise<void> => {
    const idx = randBetween(0, pangoFacts.length - 1);
    await interaction.reply(`Beep boop. ${pangoFacts[idx]}`);
};

export const command: Command = { data, execute };
