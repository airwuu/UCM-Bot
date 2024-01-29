import { Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType  } from 'discord.js';
import {event,Events} from '../utils/index.js'
import fetch from 'node-fetch';
let botResponseMessage: string;

let jsonData: any;
let idLocation: Array<string>;
let idCategoryPav: Array<string>;
let idCategoryDC: Array<string>;
let idDay: Array<string>;
idLocation = [ // location
  "61df4a34d5507a00103ee41e", // pav 0 
  "628672b52903a50010fa751e"  // dc 1 
];
idCategoryPav = [ // category
  '61bd80d68b34640010e194b8', // Breakfast 0
  '61bd80d05f2f930010bb6a81', // Lunch 1
  '61bd80cc5f2f930010bb6a80'  // Dinner 2
];
idCategoryDC = [ // category
  '64b6fe23e615eb39f2b65a5e', // Lunch 0
  '64b6fe4de615eb39f2b65e9f', // Dinner 1 
  '63320eb6007b6b0010480cad'  // Late Night 2 
];
idDay = [ // also known as menu group
  '61bd808b5f2f930010bb6a7a', // sun 0
  '61bd80908b34640010e194b3', // mon 1
  '61bd80ab5f2f930010bb6a7d', // tues 2
  '61bd80b08b34640010e194b4', // wed 3
  '61bd80b55f2f930010bb6a7e', // thur 4
  '61bd80ba5f2f930010bb6a7f', // fri 5
  '61bd80bf8b34640010e194b6'  // sat 6
];

function fetchMenu(locationNum: number = 0, dayNum: number = 0, categoryNum: number = 0) {
  return new Promise((resolve, reject) => {
    let day = idDay[dayNum];
    let location = idLocation[locationNum];
    let category = (locationNum == 0) ? idCategoryPav[categoryNum] : idCategoryDC[categoryNum];
    //console.log(category);
    fetch(`https://widget.api.eagle.bigzpoon.com/menuitems?categoryId=${category}&isPreview=false&locationId=${location}&menuGroupId=${day}&userPreferences=%7B%22allergies%22:%5B%5D,%22lifestyleChoices%22:%5B%5D,%22medicalGoals%22:%5B%7B%22id%22:%225e74c7e19888990010db39e3%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8019888990010db39e5%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c82c9888990010db39e8%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8399888990010db39e9%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8599888990010db39ea%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c86a9888990010db39eb%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8759888990010db39ec%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c87f9888990010db39ed%22,%22value%22:%220%22%7D%5D,%22preferenceApplyStatus%22:false,%22crossContactStatus%22:true%7D`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "device-id": "ebde8ccc-da91-4169-a49e-632d9aaa8b39",
      "location-id": "61df4a34d5507a00103ee41e",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-comp-id": "61bd7ecd8c760e0011ac0fac",
      "Referer": "https://uc-merced-the-pavilion.widget.eagle.bigzpoon.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
    })
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      resolve(jsonData);
    })
    .catch(error => reject(error));
  });
}

function extractMenuItems() {
  // Ensure "menuItems" exists before accessing it
  if (jsonData.data.menuItems) {
    const menuItems = jsonData.data.menuItems;
    let itemsNames:string[] = [];
    menuItems.forEach((item: { name: string; }) => {
      itemsNames.push(item.name);
    });
    let itemsDesc:string[] = [];
    menuItems.forEach((item: { description: string; }) => {
      itemsDesc.push(item.description);
    });
    //console.log(itemsNames.join(", ")); 
    //make item fields
    let itemsField = [];
    for(let i =0; i<itemsNames.length; i++){
      itemsField.push({name : itemsNames[i], value: itemsDesc[i]});
    }
    return itemsField;
  } else {
    console.warn('"menuItems" object not found in the JSON data.');
    return [];
  }
}
function buildEmbed(location: string = "pav", day: number = 0,category: number = 1){
  console.log();
  const fields = extractMenuItems();
  const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(location)
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png'})
	.setDescription('Some description here')
	.setThumbnail(location == "pav" ? 'https://dining.ucmerced.edu/sites/dining.ucmerced.edu/files/documents/pavilion_180806-2.jpeg':'https://dining.ucmerced.edu/sites/dining.ucmerced.edu/files/page/images/ucmerced_yablokoff_wallace.jpg')
	.addFields(
		fields
	)
	//.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  return embed;
}

async function buildComponents(msg: Message<boolean>){
  const selectLocation = new StringSelectMenuBuilder()
			.setCustomId('location')
			.setPlaceholder('Choose location!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Pavilion')
					.setDescription('The big ugly building with more options.')
					.setValue('pav'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Dining Center')
					.setDescription('The vibey place that has ice.')
					.setValue('dc'),
			);
  const menu = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(selectLocation);

  //add embed here
  const menuEmbed = buildEmbed(); // default parameters

  const sendMessage = await msg.channel.send({ content: "hello", components: [menu], embeds: [menuEmbed] })
  const collector = sendMessage.createMessageComponentCollector({
    componentType: ComponentType.StringSelect, 
    time: 60_000,
  });
  collector.on("collect", async(collected) => {
    //console.log(collected.values[0])
     if(collected.values[0] == "dc"){
      await fetchMenu(1,4,1);
      sendMessage.edit({content:"dc selected", embeds: [buildEmbed("dc")]})
      return;
     }
     if(collected.values[0] == "pav"){
      await fetchMenu(0,4,1);
      sendMessage.edit({content:"pav selected", embeds: [buildEmbed("pav")]})
      return;
     }
     
  });
}


async function fetchDataAndProcess(msg: Message<boolean>) {
  try {
    await fetchMenu(1,4,1);
    //msg.channel.send("water");
    buildComponents(msg);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default event(Events.MessageCreate, ({log}, msg) => {
    if (msg.content == 'menu') {
      fetchDataAndProcess(msg);
      
      return null;
    }
})
