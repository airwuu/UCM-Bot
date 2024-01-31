import { Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ComponentType  } from 'discord.js';
import {event,Events} from '../utils/index.js'
import fetch from 'node-fetch';

function pavMenuGroupTime() {
  let m :string;
  let w = new Date();
  w.setHours(0,0,0,0);
  let i = Math.floor(w.getTime() / 1000) // current day
  //i+=25200;//7am
  //i+=37800; // The Pavilion will close (10:30). The Dining Center will open (10:30);
  //i+=39600; // 11am
  //i+=54000; //3pm
  //i+=57600 // 4pm
  //i+=75600 //9pm
  let dateTime = new Date();
  let day = dateTime.getDay();
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  if(day >= 1 && day <= 5){ // on weekdays
    if (hour < 7){
      i+=25200;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if ((hour < 10) || (hour <= 10 && minute < 30)){
      i+=37800;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else if (hour < 11){
      i+=39600;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if (hour < 15){
      i+=54000;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else if (hour < 16){
      i+=57600;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if (hour < 21){
      i+=75600;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else {
      m = (`Pavilion is closed`);
    }
  }
  else {
    if (hour < 9){
      i+=32400;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if (hour <= 10 && minute < 30){
      i+=37800;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else if (hour < 11){
      i+=39600;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if (hour < 15){
      i+=54000;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else if (hour < 16){
      i+=57600;
      m = (`Pavilion will open <t:${i}:R>`);
    }
    else if (hour < 21){
      i+=75600;
      m = (`Pavilion will close <t:${i}:R>`);
    }
    else {
      m = (`Pavilion is closed`);
    }
  }
  return m;
}
function dcMenuGroupTime() {
  let m : string;
  let w = new Date();
  w.setHours(0,0,0,0);
  let i = Math.floor(w.getTime() / 1000) // current day at time 0
  let dateTime = new Date();
  let day = dateTime.getDay();
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  // 10:30 to 2pm, 3pm to 8pm, 9pm to 12am
  if(day >= 1 && day <= 5){
    if ((hour < 10) || (hour <= 10 && minute < 30)){
      i+=37800;
      m = (`Dining Center will open <t:${i}:R>`);
    }
    else if (hour < 14){
      i+=50400;
      m = (`Dining Center will close <t:${i}:R>`);
    }
    else if (hour < 15){
      i+=54000;
      m = (`Dining Center will open <t:${i}:R>`);
    }
    else if (hour < 20){
      i+=72000;
      m = (`Dining Center will close <t:${i}:R>`);
    }
    else if (hour < 21){
      i+=75600;
      m = (`Dining Center will open <t:${i}:R>`);
    }
    else if (hour < 24){
      i+=86400;
      m = (`Dining Center will close <t:${i}:R>`);
    }
    else{
      m = (`Dining Center is closed`);
    }
  }
  else{
    m = "Dining Center is closed on weekends";
  }
  return m;
}

export default event(Events.MessageCreate, ({log}, msg) => {
    if (msg.content == 'temp') {
      //msg.reply(pavMenuGroupTime());
      msg.reply(dcMenuGroupTime());
      return null;
    }
})
