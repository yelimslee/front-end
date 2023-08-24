const batteryPercentElement = document.getElementById('batteryPercent');
const clockElement = document.getElementById('clock');
const alarmTimeInput = document.getElementById('alarmTime');
const addAlarmButton = document.getElementById('addAlarm');
const alarmList = document.getElementById('alarmList');
const animationContainer = document.getElementById('animationContainer');

let batteryPercent = 100;
let clockInterval;
let alarms = [];

function updatebatteryPercent() {
    batteryPercent -= 1;
    batteryPercent = Math.max(batteryPercent, 0);
    batteryPercentElement.textContent = `${batteryPercent}%`;

    if (batteryPercent === 0) {
        clearInterval(clockInterval);
        clockElement.style.color = 'black';
        clockElement.textContent = '배터리 없음';
        startAnimation();
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function addAlarm() {
    if (alarms.length >= 3) {
        return;
    }

    const alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        alarms.push(alarmTime);
        renderAlarms();
        alarmTimeInput.value = '';
    }
}

function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.className = 'alarm-item';
        li.textContent = `알람 ${index + 1}시: ${alarm}분`;
        alarmList.appendChild(li);
    });
}

function startAnimation() {
    animationContainer.style.display = 'block';
    animationContainer.innerHTML = '<img src="hellokitty.gif" alt="Hello Kitty">';

    
    animationContainer.classList.add('animate'); 
}

updateClock();
clockInterval = setInterval(updateClock, 1000);
setInterval(updatebatteryPercent, 1000);

addAlarmButton.addEventListener('click', addAlarm);
