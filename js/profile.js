import { checkUser } from './_auth.js';
import { getUser } from './_user.js';

document.addEventListener("DOMContentLoaded", () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  const winsCount = document.getElementById('wins-count');
  const lossesCount = document.getElementById('losses-count');

  fetch("_header.html")
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    });

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', "url('../assets/images/backgrounds/data_stream_core_bg.webp')");

  const user = getUser();

  if (winsCount) winsCount.textContent = user.wins || 0;
  if (lossesCount) lossesCount.textContent = user.losses || 0;
});