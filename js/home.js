import { checkUser } from './auth.js';
import { renderHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  // fetch('_header.html')
  //   .then(response => response.text())
  //   .then(data => {
  //     header.innerHTML = data;
  //   });

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const startFightButton = document.getElementById('start-fight-button');
  const root = document.documentElement;

  startFightButton.addEventListener('click', () => {
    window.location.href = './arena.html';
  });

  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/nebula_showdown_bg.webp)');
});