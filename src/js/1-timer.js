import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const daysOfTimer = document.querySelector('span[data-days]');
const hoursOfTimer = document.querySelector('span[data-hours]');
const minutesOfTimer = document.querySelector('span[data-minutes]');
const secondsOfTimer = document.querySelector('span[data-seconds]');

let timerInterval;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    getUserDate(userSelectedDate);
  },
};

flatpickr('#datetime-picker', options);

start.addEventListener('click', addTimer);

function getUserDate(date) {
  const currentDate = new Date();

  if (date <= currentDate) {
    start.setAttribute('disabled', true);
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      backgroundColor: '#EF4040',
      titleColor: '#fff',
      messageColor: '#fff',
    });
  } else {
    start.removeAttribute('disabled');
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addTimer() {
  start.setAttribute('disabled', true);
  input.setAttribute('disabled', true);

  clearInterval(timerInterval);

  const currentTime = new Date();
  let deltaTime = userSelectedDate.getTime() - currentTime.getTime();

  timerInterval = setInterval(() => {
    deltaTime -= 1000;

    if (deltaTime < 0) {
      clearInterval(timerInterval);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      start.removeAttribute('disabled');
      input.removeAttribute('disabled');
      return;
    }

    updateTimerInterface(convertMs(deltaTime));
  }, 1000);
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysOfTimer.textContent = addLeadingZero(days);
  hoursOfTimer.textContent = addLeadingZero(hours);
  minutesOfTimer.textContent = addLeadingZero(minutes);
  secondsOfTimer.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}