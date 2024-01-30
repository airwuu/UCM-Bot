import { Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType  } from 'discord.js';
import {event,Events} from '../utils/index.js'
import fetch from 'node-fetch';

export default event(Events.MessageCreate, ({log}, msg) => {
    if (msg.content == 'temp') {
      return null;
    }
})
