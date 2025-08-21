import { checkUser } from './_auth.js';

document.addEventListener("DOMContentLoaded", () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  const startFightButton = document.getElementById('start-fight-button');

  fetch("_header.html")
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    });

  startFightButton.addEventListener('click', () => {
    window.location.href = 'arena.html';
  });

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', "url('../assets/images/backgrounds/nebula_showdown_bg.webp')");
});