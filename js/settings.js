import { checkUser } from './auth.js';
import { getUser, saveUser } from './user.js';
import { renderHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const root = document.documentElement;
  const user = getUser();
  const usernameEl = document.getElementById('username');
  const usernameElNav = document.getElementById('username-nav');
  const changeButton = document.getElementById('сhange-button');
  const usernameInput = document.getElementById('сhange-username');

  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/data_stream_core_bg.webp)');
  if (user.avatar) root.style.setProperty('--avatar', `url(${user.avatar})`);
  if (usernameEl) usernameEl.textContent = user.username || 'Username';

  changeButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (!username) {
      alert('Please enter a username');
      return;
    }

    usernameEl.textContent = username;
    usernameElNav.textContent = username;
    user.username = username;
    saveUser(user);
  });

});