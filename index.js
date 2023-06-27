let selectMenu = document.getElementsByClassName('select-time');
let clock = document.getElementById('clock');
let alarmButton = document.getElementById('set-alarm');
let selectContainer = document.querySelector('.select-container');

let alarmTime;
let isSetAlarm = false;
let ringtone = new Audio("alarm.mp3");

// Setting up the select dropdowns
// The code generates the options for the hour, minute, and AM/PM select dropdowns using three loops.
for(let i=12;i>0;i--){
    i= i<10?"0"+i : i;
    console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i= i<10?"0"+i : i;
    console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    let timeIndication = i==1?"AM":"PM";
    console.log(i);
    let option = `<option value="${timeIndication}">${timeIndication}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

// The code uses setInterval to update the clock element with the current time every second.
setInterval(()=>{
   let date = new Date();
   let hour = date.getHours();
   let minute = date.getMinutes();
   let second = date.getSeconds();
   let timeIndication = "AM";
// The code converts the hour to a 12-hour format and determines the time indication (AM or PM).
   if(hour>=12){
    hour = hour - 12;
    timeIndication = "PM";
   }
   hour = hour == 0? hour=12:hour;
   hour=hour<10?"0"+hour:hour;
   minute=minute<10?"0"+minute:minute;
   second=second<10?"0"+second:second;
   clock.innerText = `${hour}:${minute}:${second} ${timeIndication}`;

// If the current time matches the alarm time, the ringtone audio is played in a loop.
   if(alarmTime == `${hour}:${minute} ${timeIndication}`){
    ringtone.play();
    ringtone.loop = true;
   }

},1000)

// This function is called when the alarm button is clicked.
function setAlarm(){
    if(isSetAlarm){
        alarmTime = "";
        ringtone.pause();
        selectContainer.classList.remove("disable");
        alarmButton.innerText = "Set Alarm";
        return isSetAlarm = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert('Please, select a valid time');
    }
    isSetAlarm = true;
    alarmTime = time;
   selectContainer.classList.add("disable");
   alarmButton.innerText = "Clear Alarm";
}

// Setting up an event listener for triggering the setAlarm function when the button is clicked.
alarmButton.addEventListener('click',setAlarm);




