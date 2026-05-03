const { Client, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('TURTLE_V6_1: ONLINE'));
app.listen(process.env.PORT || 3000);

const CLIENT_ID = '1500501859436068954';
const TOKEN = process.env.TOKEN;
const DC_LINK = "https://discord.gg/pkvG7BGKEZ";
const BLAME_LINK = "discord.gg/mydckink";
const BIS_CHAR = "﷽";
const LAG_CHAR = "\u2028";

const client = new Client({
    intents: [1, 512, 32768],
    presence: { status: 'invisible', activities: [] }
});

const commands = [
    new SlashCommandBuilder().setName('spam').setDescription('Turtle Arabic Burst')
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('say').setDescription('Turtle Voice')
        .addStringOption(opt => opt.setName('message').setDescription('Content').setRequired(true))
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('blame').setDescription('Turtle Frame')
        .addUserOption(opt => opt.setName('user').setDescription('Target').setRequired(true))
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('flood').setDescription('Turtle Link Flood')
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('custom-spam').setDescription('Custom Turtle Flood')
        .addStringOption(opt => opt.setName('text').setDescription('Content').setRequired(true))
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('fast-flood').setDescription('Ultra-Rapid Turtle Flood')
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2]),
    new SlashCommandBuilder().setName('l-spam').setDescription('Turtle Lag Flood')
        .setIntegrationTypes([0, 1]).setContexts([0, 1, 2])
].map(command => command.toJSON());

client.once('ready', async () => {
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`Turtle V6.1 | Pure Response Mode | ID: ${CLIENT_ID}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    // Direct burst using followUp—bypasses channel fetch requirements
    const executeBurst = async (content) => {
        for (let i = 0; i < 100; i++) {
            interaction.followUp({ content: content }).catch(() => {});
        }
    };

    if (commandName === 'spam') {
        await interaction.reply({ content: "spam", ephemeral: true });
        const content = `${DC_LINK}\n${BIS_CHAR.repeat(1900)} @everyone @here`;
        executeBurst(content);
    }

    if (commandName === 'say') {
        const msg = options.getString('message');
        await interaction.reply({ content: "Sent!", ephemeral: true });
        await interaction.followUp({ content: msg });
    }

    if (commandName === 'blame') {
        const user = options.getUser('user');
        const embed = new EmbedBuilder()
            .setTitle("RAID")
            .setDescription(`${user} thank you for raiding with ${BLAME_LINK}`)
            .setColor(0xFF0000)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: BLAME_LINK });
        await interaction.reply({ content: "Sent!", ephemeral: true });
        await interaction.followUp({ content: `${user}`, embeds: [embed] });
    }

    if (commandName === 'flood' || commandName === 'fast-flood') {
        await interaction.reply({ content: "spam", ephemeral: true });
        executeBurst(DC_LINK);
    }

    if (commandName === 'custom-spam') {
        const text = options.getString('text');
        await interaction.reply({ content: `Spamming: ${text}`, ephemeral: true });
        executeBurst(text);
    }

    if (commandName === 'l-spam') {
        await interaction.reply({ content: "Lag spam...", ephemeral: true });
        const content = `${DC_LINK}\n${LAG_CHAR.repeat(1900)} @everyone @here`;
        executeBurst(content);
    }
});

client.login(TOKEN);
