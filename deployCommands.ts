// https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands

import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import fs from 'fs';
import * as yargs from 'yargs';
import path from 'path';
import { Command } from './src/common/interfaces';
const config = require('./config.json');

const commands: {
    name: string;
    description: string;
    options: APIApplicationCommandOption[];
}[] = [];
const commandFiles = fs
    .readdirSync(path.join(__dirname, 'src', 'commands'))
    .filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
    const { command }: { command: Command } = require(path.join(
        __dirname,
        'src',
        'commands',
        file
    ));
    commands.push(command.data.toJSON());
}

let token: string;
let clientId: string;
let guildId: string;
const argv = yargs.option({ env: { type: 'string' } }).parseSync();
if (argv.env === 'DEV') {
    token = config.tokenDev;
    clientId = config.clientIdDev;
    guildId = config.guildIdBotTestServer;
} else if (argv.env === 'PROD') {
    token = config.tokenProd;
    clientId = config.clientIdProd;
    guildId = config.guildIdSocialPangolin;
} else {
    throw new Error('Argument must be a valid environment');
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
