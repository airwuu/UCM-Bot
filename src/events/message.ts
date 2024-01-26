import {event,Events} from '../utils/index.js'
import fetch from 'node-fetch';
let jsonData: any;
let pavilion = "61df4a34d5507a00103ee41e";
let dc = "628672b52903a50010fa751e"
let location = pavilion;
let idLocation: Array<string>;
let idCategoryPav: Array<string>;
let idCategoryDC: Array<string>;
let idDay: Array<string>;
idLocation = [ // location
  "61df4a34d5507a00103ee41e", // pav
  "628672b52903a50010fa751e"  // dc
];
idCategoryPav = [ // category
  '61bd80d68b34640010e194b8', // Breakfast
  '61bd80d05f2f930010bb6a81', // Lunch
  '61bd80cc5f2f930010bb6a80'  // Dinner
];
idCategoryDC = [ // category
  '64b6fe23e615eb39f2b65a5e', // Lunch
  '64b6fe4de615eb39f2b65e9f', // Dinner
  '63320eb6007b6b0010480cad'  // Late Night
];
idDay = [ // also known as menu group
  '61bd808b5f2f930010bb6a7a', // sun
  '61bd80908b34640010e194b3', // mon
  '61bd80ab5f2f930010bb6a7d', // tues
  '61bd80b08b34640010e194b4', // wed
  '61bd80b55f2f930010bb6a7e', // thur
  '61bd80ba5f2f930010bb6a7f', // fri
  '61bd80bf8b34640010e194b6'  // sat
];
function fetchMenu(categoryNum: number = 0, dayNum: number = 0, locationNum: number = 1) {
  return new Promise((resolve, reject) => {
    let day = idDay[dayNum];
    let category = (locationNum == 1) ? idCategoryPav[categoryNum] : idCategoryDC[categoryNum];
    console.log(category);
    fetch(`https://widget.api.eagle.bigzpoon.com/menuitems?categoryId=61bd80d68b34640010e194b8&isPreview=false&locationId=${location}&menuGroupId=61bd808b5f2f930010bb6a7a&userPreferences=%7B%22allergies%22:%5B%5D,%22lifestyleChoices%22:%5B%5D,%22medicalGoals%22:%5B%7B%22id%22:%225e74c7e19888990010db39e3%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8019888990010db39e5%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c82c9888990010db39e8%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8399888990010db39e9%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8599888990010db39ea%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c86a9888990010db39eb%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8759888990010db39ec%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c87f9888990010db39ed%22,%22value%22:%220%22%7D%5D,%22preferenceApplyStatus%22:false,%22crossContactStatus%22:true%7D`, {
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
    //console.log(itemsNames); 
    //console.log(itemsDesc); 
  } else {
    console.warn('"menuItems" object not found in the JSON data.');
  }
}
async function fetchDataAndProcess() {
  try {
    await fetchMenu();
    //console.log(JSON.stringify(jsonData, null, 2)); // jsonData is loaded, you can use it here
    extractMenuItems();
  } catch (error) {
    console.error('Error:', error);
  }
}

export default event(Events.MessageCreate, ({log}, msg) => {
    if (msg.content == 'menu') {
      fetchDataAndProcess();
      //console.log(JSON.stringify(jsonData, null, 2));
      return msg.reply('okay');
      
    }
})