import { checkUser } from './_auth.js';
import { createUser } from './_user.js';

document.addEventListener("DOMContentLoaded", () => {
  if (checkUser()) {
    window.location.href = 'home.html';
    return;
  }

  const registerButton = document.getElementById('register-button');
  const usernameInput = document.getElementById('register-username');

  registerButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (!username) {
      alert('Please enter a username');
      return;
    }

    if (createUser()) {
      window.location.href = 'home.html';
      return;
    }
  });
});