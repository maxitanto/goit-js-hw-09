const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

refs.btnStart.addEventListener('click', onClickBtnStart);
refs.btnStop.addEventListener('click', onClickBtnStop);
refs.btnStop.disabled = true;

function onClickBtnStart() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function onClickBtnStop() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
