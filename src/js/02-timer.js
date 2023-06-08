import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const remainingDays = document.querySelector('[data-days]');
const remainingHours = document.querySelector('[data-hours]');
const remainingMinutes = document.querySelector('[data-minutes]');
const remainingSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const convertedSelectedDates = selectedDates[0].getTime();

    if (convertedSelectedDates < Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    btnStart.disabled = false;

    btnStart.addEventListener('click', onClick);

    function onClick() {
      setIntervalID = setInterval(() => {
        const remainingTimes = convertedSelectedDates - Date.now();
        let time = convertMs(addLeadingZero(remainingTimes));

        updateClockface(time);

        if (remainingTimes < 1000) {
          clearInterval(setIntervalID);
        }
      }, 1000);
    }
  },
});

function updateClockface({ days, hours, minutes, seconds }) {
  remainingDays.textContent = `${days}`;
  remainingHours.textContent = `${hours}`;
  remainingMinutes.textContent = `${minutes}`;
  remainingSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
