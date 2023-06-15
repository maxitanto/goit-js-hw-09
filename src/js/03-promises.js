import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);
  let position = 0;

  for (let i = 1; i <= amount; i += 1) {
    position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
