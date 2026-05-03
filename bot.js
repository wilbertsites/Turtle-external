/* 
   TURTLE RAIDS v5.1 - ROBUST BURST
   Fix: Direct Channel Targeting
*/

const { Client, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('TURTLE_V5_1: ONLINE'));
app.listen(process.env.PORT || 3000);

const CLIENT_ID = '1500501859436068954'; 
const TURTLE_INVITE = "https://discord.gg/54y9kRze8R";
const ARABIC_FLOOD = "تمت مداهمته بواسطة السلحفاة ".repeat(80);

const client = new Client({
    intents: [1, 512, 32768],
    presence: { status: 'invisible' }
});

const commands = [
    new SlashCommandBuilder().setName('spam').setDescription('Turtle Arabic Burst'),
    new SlashCommandBuilder().setName('flood').setDescription('Turtle invite spam'),
    new SlashCommandBuilder().setName('fast-flood').setDescription('Ultra-Rapid Turtle Burst'),
    new SlashCommandBuilder().setName('say').setDescription('Turtle speak').addStringOption(opt => opt.setName('text').setRequired(true).setDescription('Content'))
].map(command => command.toJSON());

client.once('ready', async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`Turtle v5.1 Ready.`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Use interaction.channel instead of just 'channel'
    const targetChannel = interaction.channel;

    if (!targetChannel) {
        return interaction.reply({ content: "Error: No channel detected.", ephemeral: true });
    }

    // Acknowledge the command immediately
    await interaction.reply({ content: "Turtle Protocol Engaged...", ephemeral: true });

    const sendBurst = async (content, count) => {
        for (let i = 0; i < count; i++) {
            // No await here so it fires as fast as possible
            targetChannel.send(content).catch(err => console.log("Send Error:", err.message));
        }
    };

    if (interaction.commandName === 'spam') {
        await sendBurst(ARABIC_FLOOD, 15);
    }

    if (interaction.commandName === 'flood') {
        await sendBurst(`TURTLE RAIDS: ${TURTLE_INVITE}`, 20);
    }

    if (interaction.commandName === 'fast-flood') {
        await sendBurst(`TURTLE RAIDS ON TOP: ${TURTLE_INVITE}`, 40);
    }

    if (interaction.commandName === 'say') {
        const text = interaction.options.getString('text');
        await targetChannel.send(text);
    }
});

client.login(process.env.TOKEN);
