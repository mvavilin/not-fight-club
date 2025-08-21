import { checkUser } from './_auth.js';
import { getUser } from './_user.js';
import { setupPopup } from './_popup.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  const avatar = document.getElementById('avatar');
  const username = document.getElementById('username');
  const winsCount = document.getElementById('wins-count');
  const lossesCount = document.getElementById('losses-count');
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');

  fetch('_header.html')
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    });

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/data_stream_core_bg.webp)');

  const user = getUser();

  if (user.avatar) root.style.setProperty('--avatar', `url(${user.avatar})`);
  if (username) username.textContent = user.username || 'Username';
  if (winsCount) winsCount.textContent = user.wins || 0;
  if (lossesCount) lossesCount.textContent = user.losses || 0;

  setupPopup();

  avatar.addEventListener('click', () => {
    popup.classList.remove('popup--close');
    overlay.classList.remove('overlay--close');
  });
});