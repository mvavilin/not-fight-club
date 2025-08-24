import { checkUser } from './auth.js';
import { renderHeader } from './header.js';
import { player, enemies } from './data.js';
import { createGameState, hasGameState } from './game.js';

function chooseRandomEnemy() {
  const randomIndex = Math.floor(Math.random() * enemies.length);
  return enemies[randomIndex];
}

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;
  if (hasGameState()) {
    window.location.href = './arena.html';
    return;
  };

  // fetch('_header.html')
  //   .then(response => response.text())
  //   .then(data => {
  //     header.innerHTML = data;
  //   });

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/nebula_showdown_bg.webp)');

  const startFightButton = document.getElementById('start-fight-button');
  startFightButton.addEventListener('click', () => {
    const enemy = chooseRandomEnemy();
    createGameState(player, enemy);
    window.location.href = './arena.html';
  });
});