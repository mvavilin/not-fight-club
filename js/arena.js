import { AVATAR_PATH } from './data.js';
import { checkUser } from './auth.js';
import { renderHeader } from './header.js';
import { getGameState, hasGameState, updateGameState } from './game.js';
import { startBattle, updateHealth, printLog } from './battle.js';

export function saveGameState(attackLog) {
  const gameState = loadGameState();
  gameState.playerHealth.currentHealth = player.currentHealth;
  // gameState.enemy.currentHealth -= attackLog.damage;
  gameState.attacks.push(attackLog);
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;
  if (!hasGameState()) {
    window.location.href = './home.html';
    return;
  };

  const maxDefence = 2;
  const maxAttack = 1;
  const attackButton = document.getElementById('attack-button');

  function restoreGameState(gameState) {
    if (gameState) {
      const player = gameState.player;
      const enemy = gameState.enemy;
      document.getElementById('username').textContent = player.name;
      document.getElementById('enemy').textContent = enemy.name;
      document.getElementById("total-player-hitpoints").innerText = player.totalHealth;
      document.getElementById("total-enemy-hitpoints").innerText = enemy.totalHealth;
      const root = document.documentElement;
      root.style.setProperty('--enemy-avatar', `url(${AVATAR_PATH + enemy.avatar})`);
      updateHealth('player', player.currentHealth, player.totalHealth);
      updateHealth('enemy', enemy.currentHealth, enemy.totalHealth);
      gameState.attacks.forEach(attack => printLog(attack));
      const checkboxesDefence = document.querySelectorAll('input[name="defence-zone"]');
      const checkboxesAttack = document.querySelectorAll('input[name="attack-zone"]');
      checkboxesDefence.forEach(checkbox => {
        if (player.blockedZones.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
      checkboxesAttack.forEach(checkbox => {
        if (player.attackedZones.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
      player.blockedZones.length === maxDefence && player.attackedZones.length === maxAttack ? attackButton.disabled = false : attackButton.disabled = true;
    }
  }

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/nebula_showdown_bg.webp)');

  const gameState = getGameState();
  restoreGameState(gameState);

  let player = gameState.player;

  const checkboxes = document.querySelectorAll('.zone__selection');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedDefence = document.querySelectorAll('input[name="defence-zone"]:checked');
      const checkedAttack = document.querySelectorAll('input[name="attack-zone"]:checked');
      checkedDefence.length === maxDefence && checkedAttack.length === maxAttack ? attackButton.disabled = false : attackButton.disabled = true;
      player.blockedZones = Array.from(checkedDefence).map(input => input.value);
      player.attackedZones = Array.from(checkedAttack).map(input => input.value);
      updateGameState(gameState);
      if (checkedDefence.length > maxDefence) checkbox.checked = false;
    });
  });

  attackButton.addEventListener('click', () => {
    const checkedDefence = document.querySelectorAll('input[name="defence-zone"]:checked');
    const checkedAttack = document.querySelectorAll('input[name="attack-zone"]:checked');
    startBattle(checkedDefence, checkedAttack);
  });
});