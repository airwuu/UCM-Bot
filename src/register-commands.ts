import dotenv from 'dotenv'
dotenv.config()
import { REST, Routes } from 'discord.js';
import Keys from './keys.js';
const commands = [
  {
    name: 'menu',
    description: 'Responds with DC/PAV menu!',
  },
  {
    name: 'ping',
    description: 'Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(Keys.clientToken);

export async function registerCommands() {
    // console.log('im doing things')
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(
        Keys.clientID,
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};