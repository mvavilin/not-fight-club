import { getUser } from './_user.js';
import { checkUser } from './_auth.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  fetch('_header.html')
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    });

  const header = document.getElementById('header');
  const startFightButton = document.getElementById('start-fight-button');
  const root = document.documentElement;
  const user = getUser();

  startFightButton.addEventListener('click', () => {
    window.location.href = 'arena.html';
  });

  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/nebula_showdown_bg.webp)');
  if (user.avatar) root.style.setProperty('--avatar', `url(${user.avatar})`);
});