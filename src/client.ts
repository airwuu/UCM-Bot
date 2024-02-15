import dotenv from 'dotenv'
dotenv.config()
import { Client,GatewayIntentBits,} from 'discord.js';
import { registerEvents } from './utils/index.js';
import { registerCommands } from './register-commands.js';
import { replyMenu } from './events/menu.js';
import Events from './events/index.js'
import Keys from './keys.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

registerEvents(client,Events);
registerCommands();

// client.on('interactionCreate', (interaction) => {
//     if(interaction.isChatInputCommand()){
//         return;
//     }
//     if(interaction.)
    
// });
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	}
    if (interaction.commandName === 'menu') {
		await replyMenu(interaction);
	}
});



client.login(Keys.clientToken)
.catch((err) => {
    console.error('[Login Error]', err);
    process.exit(1);
});

