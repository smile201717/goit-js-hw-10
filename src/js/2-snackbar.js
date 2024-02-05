import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = parseInt(formData.get('delay'));
  const isFulfilled = formData.get('state') === 'fulfilled';

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(handlePromiseFulfilled)
    .catch(handlePromiseRejected);
});

function handlePromiseFulfilled(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    backgroundColor: '#59A10D',
    messageColor: '#fff',
    position: 'topRight',
  });
}

function handlePromiseRejected(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    position: 'topRight',
  });
}