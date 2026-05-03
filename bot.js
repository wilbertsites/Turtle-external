/* 
   TURTLE RAIDS v4.1 - RECRUITMENT LOCK
   Home Server: 1500072304946970764
   Requirement: Must be in the Home Server or the command returns the invite link.
*/

const { Client, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('TURTLE_GATEKEEPER: ONLINE'));
app.listen(process.env.PORT || 3000);

const CLIENT_ID = '1500501859436068954'; 
const HOME_SERVER_ID = '1500072304946970764'; 
const TURTLE_INVITE = "https://discord.gg/54y9kRze8R"; // Your recruitment link
const ARABIC_FLOOD = "تمت مداهمته بواسطة السلحفاة ".repeat(80);
const LINE_SEP = "᲼\n".repeat(100);

const client = new Client({
    intents: [1, 512, 32768, 2], // 2 = GuildMembers to check membership
    presence: { status: 'invisible' }
});

const commands = [
    new SlashCommandBuilder().setName('spam').setDescription('Turtle Arabic Burst'),
    new SlashCommandBuilder().setName('say').setDescription('Turtle speak').addStringOption(opt => opt.setName('message').setDescription('Content').setRequired(true)),
    new SlashCommandBuilder().setName('blame').setDescription('Frame for Turtle').addUserOption(opt => opt.setName('user').setDescription('Target').setRequired(true)),
    new SlashCommandBuilder().setName('flood').setDescription('Turtle invite spam'),
    new SlashCommandBuilder().setName('custom-spam').setDescription('Custom Turtle burst').addStringOption(opt => opt.setName('text').setDescription('Content').setRequired(true)),
    new SlashCommandBuilder().setName('l-spam').setDescription('Turtle lag burst'),
    new SlashCommandBuilder().setName('fast-flood').setDescription('Ultra-Rapid Turtle Burst')
].map(command => command.toJSON());

client.once('ready', async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`Turtle Recruitment Lock active | Target ID: ${HOME_SERVER_ID}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // --- RECRUITMENT GATE ---
    try {
        const homeGuild = await client.guilds.fetch(HOME_SERVER_ID);
        const isMember = await homeGuild.members.fetch(interaction.user.id).catch(() => null);

        if (!isMember) {
            // This is the recruitment message you wanted
            return interaction.reply({ 
                content: `You must be in the Turtle server to use this. Join: ${TURTLE_INVITE}`, 
                ephemeral: true 
            });
        }
    } catch (e) {
        return interaction.reply({ content: "System busy. Join the main server for priority access.", ephemeral: true });
    }

    const { commandName, options, channel } = interaction;

    const confirm = async () => {
        if (!interaction.replied) await interaction.reply({ content: `Turtle Authority Verified.`, ephemeral: true });
    };

    if (commandName === 'say') {
        const msg = options.getString('message');
        await interaction.reply({ content: 'Deployed.', ephemeral: true });
        return interaction.followUp({ content: msg });
    }

    await confirm();

    const burst = async (content, count) => {
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(channel.send(content).catch(() => {}));
        }
        await Promise.all(promises);
    };

    if (commandName === 'spam') await burst(ARABIC_FLOOD, 12);

    if (commandName === 'blame') {
        const target = options.getUser('user');
        const embed = new EmbedBuilder()
            .setColor('#2ecc71')
            .setDescription(`${target} has been identified by Turtle Raids.`)
            .setAuthor({ name: target.username, iconURL: target.displayAvatarURL() });
        await channel.send({ embeds: [embed] });
    }

    if (commandName === 'flood') await burst(`TURTLE RAIDS: ${TURTLE_INVITE}`, 20);

    if (commandName === 'fast-flood') {
        await burst(`TURTLE RAIDS ON TOP: ${TURTLE_INVITE}`, 25);
        await burst(`OWNED BY TURTLE: ${TURTLE_INVITE}`, 25);
    }

    if (commandName === 'custom-spam') {
        const text = options.getString('text');
        await burst(text, 15);
    }

    if (commandName === 'l-spam') await burst(LINE_SEP, 8);
});

client.login(process.env.TOKEN);
