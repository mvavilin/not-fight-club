import { checkUser } from './auth.js';
import { getUser } from './user.js';
import { setupPopup } from './popup.js';
import { renderHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const avatar = document.getElementById('avatar');
  const username = document.getElementById('username');
  const winsCount = document.getElementById('wins-count');
  const lossesCount = document.getElementById('losses-count');
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/data_stream_core_bg.webp)');

  const user = getUser();

  if (username) username.textContent = user.username || 'Username';
  if (winsCount) winsCount.textContent = user.wins || 0;
  if (lossesCount) lossesCount.textContent = user.losses || 0;

  setupPopup();

  avatar.addEventListener('click', () => {
    popup.classList.remove('popup--close');
    overlay.classList.remove('overlay--close');
  });
});