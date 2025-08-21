import { checkUser } from './_auth.js';
import { getUser, saveUser } from './_user.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');

  fetch('_header.html')
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    });

  const root = document.documentElement;
  const user = getUser();
  const usernameEl = document.getElementById('username');
  const сhangeButton = document.getElementById('сhange-button');
  const usernameInput = document.getElementById('сhange-username');

  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/data_stream_core_bg.webp)');
  if (user.avatar) root.style.setProperty('--avatar', `url(${user.avatar})`);
  if (usernameEl) usernameEl.textContent = user.username || 'Username';

  сhangeButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (!username) {
      alert('Please enter a username');
      return;
    }

    usernameEl.textContent = username;
    user.username = username;
    saveUser(user);
  });

});