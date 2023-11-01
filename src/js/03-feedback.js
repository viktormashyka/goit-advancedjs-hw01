import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('form.feedback-form');
const localStorageKey = 'feedback-form-state';
const persistedState = JSON.parse(localStorage.getItem(localStorageKey));
console.log('persistedState.email: ', persistedState?.email);

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
  //   console.log('input evt: ', evt);
  const form = evt.currentTarget;
  const email = form?.elements?.email?.value;
  const message = form?.elements?.message?.value;

  const state = {
    email,
    message,
  };

  //   console.log('state: ', state);

  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function handleSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (email === '' || message === '') {
    return console.log('Please fill in all the fields!');
  }

  console.log(`Email: ${email}, Message: ${message}`);
  form.reset();
  localStorage.removeItem(localStorageKey);
}
