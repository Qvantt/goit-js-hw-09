const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
const emailInput = form.elements['email'];
const messageInput = form.elements['message'];
const STORAGE_KEY = 'feedback-form-state';
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function onInput(event) {
  formData[event.target.name] = event.target.value;
  saveToLocalStorage();
}
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}
function onSubmit(event) {
  event.preventDefault();
  formData.email = formData.email.trim();
  formData.message = formData.message.trim();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log('Submitted form data:', formData);
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', populateForm);
