import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('form.feedback-form');
const localStorageKey = 'feedback-form-state';
const persistedState = JSON.parse(localStorage.getItem(localStorageKey));

if (persistedState) {
  feedbackForm.elements.email.value = persistedState.email;
  feedbackForm.elements.message.value = persistedState.message;
}

feedbackForm.addEventListener(
  'input',
  throttle(handleInput, 500, {
    leading: true,
    trailing: false,
  })
);
feedbackForm.addEventListener('submit', handleSubmit);

function handleInput(evt) {
  const form = evt.currentTarget;
  const email = form?.elements?.email?.value;
  const message = form?.elements?.message?.value;

  const state = {
    email,
    message,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function handleSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (email === '' || message === '') {
    return alert('Please fill in all the fields!');
  }

  const state = {
    email,
    message,
  };

  console.log('state: ', state);
  form.reset();
  localStorage.removeItem(localStorageKey);
}
