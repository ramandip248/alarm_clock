let selectMenu = document.getElementsByClassName('select-time');
let clock = document.getElementById('clock');
let alarmButton = document.getElementById('set-alarm');
let stopAlarmButton = document.getElementById('stop-alarm');
let selectContainer = document.querySelector('.select-container');
let alarmList = document.getElementById('alarm-list');

let alarms=[];
let ringtone = new Audio("alarm.mp3");
let isAlarmRinging = false;


// Setting up the select dropdowns
// The code generates the options for the hour, minute, and AM/PM select dropdowns using three loops.
for(let i=12;i>0;i--){
    i= i<10?"0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i= i<10?"0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    let timeIndication = i==1?"AM":"PM";
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
  alarms.forEach((alarm,index)=>{
    if(alarm.time == `${hour}:${minute} ${timeIndication}`&& !alarm.ringing){
        console.log("ringing");
        alarms[index].ringing = true;
        ringtone.play();
        ringtone.loop = true;
        isAlarmRinging = true;
        stopAlarmButton.style.display = "block";
       }
    
    })},1000)

function addAlarm(time){
    let isAlarmExist=alarms.some((alarm,index)=>{
        return alarm.time==time;
    })
    if(isAlarmExist){
          alert(`Alarm for ${time} is already set`);
    }else{
        alarms.push({
            time: time,
            ringing: false
        });
    }
   
    renderAlarms();
}

function deleteAlarm(index){
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms(){
    alarmList.innerHTML = "";
    alarms.forEach((alarm, index) => {
        const listItem = document.createElement("li");
        const alarmTime = document.createElement("p");
        const deleteButton = document.createElement("button");

        alarmTime.innerText = alarm.time;
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteAlarm(index);
        });

        listItem.appendChild(alarmTime);
        listItem.appendChild(deleteButton);
        alarmList.appendChild(listItem);
    });
}

// This function is called when the stopAlarm button is clicked.
function stopAlarm(){
    
    if(isAlarmRinging){
        isAlarmRinging=false;
        alarms.forEach((alarm) => {
            ringtone.pause();
        });
    }
    stopAlarmButton.style.display = "none";
   
}
// This function is called when the alarm button is clicked.
function setAlarm(){
  
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert('Please, select a valid time');
    }
   
    addAlarm(time);
}

// Setting up an event listener for triggering the setAlarm function when the button is clicked.
alarmButton.addEventListener('click',()=>{setAlarm()});
stopAlarmButton.addEventListener('click',()=>{stopAlarm()});




