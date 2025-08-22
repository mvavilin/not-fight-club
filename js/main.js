import { getUser, createUser } from './user.js';

document.addEventListener('DOMContentLoaded', () => {
  if (getUser()) {
    window.location.href = './home.html';
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

    if (createUser(username)) {
      window.location.href = './home.html';
      return;
    }
  });
});