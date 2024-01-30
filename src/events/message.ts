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
function formatTimePAV(){
  let m = [0,0]; // day, category
  let dateTime = new Date();
  //let today = dateTime.toLocaleDateString('en-US',{weekday: 'long'});
  let day = dateTime.getDay();
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  if(day >= 1 && day <= 5){ // on weekdays
    if ((hour < 21) && (hour >= 16)){ // Dinner before 9pm and  after 4pm
      m = [day,2]
    }
    else if ((hour < 15) && (hour >= 11)){ // Lunch before 3pm and after 11am
      m = [day,1]
    }
    else if ((hour < 10 && minute < 30) && (hour >= 7)){ // Breakfast before 10:30am and after 7am
      m = [day,0]
    }
    else{ // closed
      m = [0,0,0]
    }
  }
  else{
    if ((hour < 21) && (hour >= 16)){ // Dinner before 9pm and  after 4pm
      m = [day,2]
    }
    else if ((hour < 15) && (hour >= 11)){ // Lunch before 3pm and after 11am
      m = [day,1]
    }
    else if ((hour < 10 && minute < 30) && (hour >= 9)){ // Breakfast before 10:30am and after 7am
      m = [day,0]
    }
    else{ // closed\
      //console.log("pav is closed rn")
      m = [0,0,0]
    }
  }
  return m;
}
function formatTimeDC(){
  let m = [0,0]; // day, category
  let dateTime = new Date();
  //let today = dateTime.toLocaleDateString('en-US',{weekday: 'long'});
  let day = dateTime.getDay();
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  if(day >= 1 && day <= 5){ // on weekdays
    if ((hour <= 23) && (hour >= 21)){ // late night before 0am and  after 9pm
      m = [day,2]
    }
    else if ((hour < 20) && (hour >= 15)){ // dinner before 8pm and after 3pm
      m = [day,1]
    }
    else if ((hour < 14) && (hour >= 10 && minute >= 30)){ // Lunch after 10:30am and before 2pm
      m = [day,0]
    }
  }
  else{//closed
    m = [0,0]
  }
  return m;
}

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
      itemsDesc.push(item.description.replace(/ *\([^)]*\) */g, "").replace(": ",":\n- ").replace(", ","\n- "));
    });
    //console.log(itemsNames.join(", ")); 
    //make item fields
    let itemsField = [];
    for(let i =0; i<itemsNames.length; i++){
      itemsField.push({name : ("*"+itemsNames[i]+"*"), value: ("```" +(itemsDesc[i])+"```")});
    }
    return itemsField;
  } else {
    console.warn('"menuItems" object not found in the JSON data.');
    return [];
  }
}
function buildEmbed(location: string = "Pavilion", day: number = 0,category: number = 1){
  const fields = extractMenuItems();
  let dateTime = new Date();
  let today = dateTime.toLocaleDateString('en-US',{weekday: 'long'});
  const embed = new EmbedBuilder()
	.setColor(0xC6EBF4)
	.setTitle(`Menu at ${location}`)
	.setURL('https://uc-merced-the-pavilion.widget.eagle.bigzpoon.com/menus')
	.setAuthor({ name: 'Some cool bot name', iconURL: 'https://i.pinimg.com/736x/5c/b6/aa/5cb6aa8b2d9352b40b0cef5e1177e7a5.jpg'})
	.setDescription((fields.length == 0)?'This location is closed right now':` `)//removed string
	.setThumbnail(location == "Pavilion" ? 'https://dining.ucmerced.edu/sites/dining.ucmerced.edu/files/documents/pavilion_180806-2.jpeg':'https://dining.ucmerced.edu/sites/dining.ucmerced.edu/files/page/images/ucmerced_yablokoff_wallace.jpg')
	.addFields(
		fields
	)
	//.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	//.setFooter({ text: 'response was generated ' });
  return embed;
}

async function buildComponents(msg: Message<boolean>){
  const selectLocation = new StringSelectMenuBuilder()
			.setCustomId('location')
			.setPlaceholder('Choose location!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Pavilion')
					.setDescription('The big orange building with more options.')
					.setValue('Pavilion'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Dining Center')
					.setDescription('The vibey place that has ice.')
					.setValue('Dining Center'),
			);
  const menu = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(selectLocation);

  //add initial call for pav
  let initialMenuParameters = formatTimePAV();
  if(initialMenuParameters.length <= 2){
    await fetchMenu(0,initialMenuParameters[0],initialMenuParameters[1]);
  }
  const menuEmbed = buildEmbed(); // default parameters

  const sendMessage = await msg.channel.send({ content: "hello, heres pav menu for now", components: [menu], embeds: [menuEmbed] })
  const collector = sendMessage.createMessageComponentCollector({
    componentType: ComponentType.StringSelect, 
    time: 120_000,
  });
  collector.on("collect", async(collected) => {
    //console.log(collected.values[0])
     if(collected.values[0] == "Dining Center"){
      let menuParameters = formatTimeDC();
      await fetchMenu(1,menuParameters[0],menuParameters[1]);
      collected.update({embeds: [buildEmbed("Dining Center")]})
      return;
     }
     if(collected.values[0] == "Pavilion"){
      let menuParameters = formatTimePAV();
      if(menuParameters.length <= 2){
        await fetchMenu(0,menuParameters[0],menuParameters[1]);
      }
      collected.update({ embeds: [buildEmbed("Pavilion")]})
      return;
     }
  });
  const removeOptions = new StringSelectMenuBuilder()
			.setCustomId('removeOptions')
			.setPlaceholder('Menu timed out')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('so nothing works')
					.setDescription('why are you trying')
					.setValue('a'),
				new StringSelectMenuOptionBuilder()
					.setLabel('this one wont either')
					.setDescription('dont try it')
					.setValue('b'),
			);
  const rOptions = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(removeOptions);
  collector.on('end', async(collected) => {
    sendMessage.edit({components: [rOptions]});
  })
}

async function fetchDataAndProcess(msg: Message<boolean>) {
  try {
    let menuParameters = formatTimePAV();
    await fetchMenu(1,menuParameters[0],menuParameters[1]);
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
