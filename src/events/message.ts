import {event,Events} from '../utils/index.js'
import fetch from 'node-fetch';
let jsonData: any;
function fetchMenu() {
  fetch("https://widget.api.eagle.bigzpoon.com/menuitems?categoryId=61bd80d68b34640010e194b8&isPreview=false&locationId=61df4a34d5507a00103ee41e&menuGroupId=61bd808b5f2f930010bb6a7a&userPreferences=%7B%22allergies%22:%5B%5D,%22lifestyleChoices%22:%5B%5D,%22medicalGoals%22:%5B%7B%22id%22:%225e74c7e19888990010db39e3%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8019888990010db39e5%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c82c9888990010db39e8%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8399888990010db39e9%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8599888990010db39ea%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c86a9888990010db39eb%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c8759888990010db39ec%22,%22value%22:%220%22%7D,%7B%22id%22:%225e74c87f9888990010db39ed%22,%22value%22:%220%22%7D%5D,%22preferenceApplyStatus%22:false,%22crossContactStatus%22:true%7D", {
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
    //console.log(JSON.stringify(data, null, 2))
  })
  .catch(error => console.error('Error:', error));
}

function extractMenuItems() {
  // Ensure "menuItems" exists before accessing it
  fetchMenu();
  if (jsonData.data.menuItems) {
    const menuItems = jsonData.data.menuItems;
    //let items: string[] = [];
    // menuItems.forEach((element: { name: string; }) => {
      
    // });
    console.log(menuItems); 
  } else {
    console.warn('"menuItems" object not found in the JSON data.');
  }
}

export default event(Events.MessageCreate, ({log}, msg) => {
    if (msg.content == 'menu') {
      //extractMenuItems();
      //console.log(JSON.stringify(jsonData, null, 2));
      return msg.reply('okay');
    }
})