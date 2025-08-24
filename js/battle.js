import { zones } from './data.js';
import { getUser, saveUser } from './user.js';
import { getGameState, updateGameState, deleteGameState } from './game.js';

const root = document.documentElement;
let logCounter = 1;

const getRandomDefenceZones = numZones => getRandomZones(zones, numZones);
const getRandomAttackZone = numZones => getRandomZones(zones, numZones);

function getRandomZones(zones, numZones) {
  const shuffled = zones.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numZones);
}

function createItem(content, ...classes) {
  if (!content) return null;
  const item = document.createElement('span');
  if (classes.length > 0) item.classList.add(...classes);
  item.textContent = content;
  return item.outerHTML;
}

function checkWin(health, winner, loser) {
  if (health <= 0) {
    const attackButton = document.getElementById('attack-button');
    attackButton.disabled = true;
    printLog({ type: 'result', character: winner, minor: loser });
    deleteGameState();
    printLog({ type: 'exit' });
    return true;
  }

  return false;
}

export function printLog({ type, character = null, minor = null, attackZone = null, damage = null }) {
  const logList = document.getElementById("battle-log-list");
  const logItem = document.createElement('li');

  const characterItem = createItem(character, 'battle-log__item', 'battle-log__item--character');
  const minorItem = createItem(minor, 'battle-log__item', 'battle-log__item--minor');
  const attackZoneItem = createItem(attackZone, 'battle-log__item', 'battle-log__item--attack-zone');
  const damageItem = createItem(`${damage} damage`, 'battle-log__item', 'battle-log__item--damage');

  let log = '';

  switch (type) {
    case 'blocked':
      // 
      const defenceZoneItem = createItem(attackZone, 'battle-log__item', 'battle-log__item--defence-zone');
      log = `${characterItem} attacked ${defenceZoneItem}, but it was blocked by ${minorItem}.`;
      break;
    case 'critical':
      const criticalHitItem = createItem('critical hit', 'battle-log__item', 'battle-log__item--critical-hit');
      log = `${characterItem} delivered a ${criticalHitItem} of ${damageItem} in ${minorItem}'s ${attackZoneItem}!`
      break;
    case 'attack':
      log = `${characterItem} attacked ${minorItem}'s ${attackZoneItem} for ${damageItem}.`
      break;
    case 'result':
      log = `${characterItem} turned out to be stronger than ${minorItem}!`
      logItem.innerHTML = `${log}`;
      logList.appendChild(logItem);
      return;
    case 'exit':
      let seconds = 5;

      const timer = setInterval(() => {
        log = `Arena will close in ${seconds}...`
        seconds--;

        if (seconds === 0) {
          clearInterval(timer);
          log = 'Arena is now closed!';
          window.location.href = './home.html';
        }

        logItem.innerHTML = `${log}`;
        logList.appendChild(logItem);
      }, 1000);

      return;
  }

  logItem.innerHTML = `${logCounter} ${log}`;
  logList.appendChild(logItem);

  logCounter++;
}

function resolveAttack(defenceZones, attackZone, attacker, defender) {
  let type = '';
  let damage = 0;
  let logData = {};
  const isCritical = Math.random() < attacker.critChance;
  const attackBlocked = defenceZones.includes(...attackZone);

  if (attackBlocked && !isCritical) {
    type = 'blocked';
  } else {
    damage = attacker.attackPower;
    if (isCritical) {
      damage = Math.floor(damage * attacker.critMultiplier);
      type = 'critical';
    } else {
      type = 'attack';
    }
  }

  logData = {
    type,
    character: attacker.name,
    minor: defender.name,
    attackZone: attackZone,
    damage
  };
  printLog(logData);

  return logData;
}

export function updateHealth(character, currentHealth, totalHealth, damage = 0) {
  const currentHealthEl = document.getElementById(`current-${character}-hitpoints`);
  let newCurrentHealth = currentHealth - damage;

  if (newCurrentHealth < 0) {
    currentHealthEl.innerText = 0;
    root.style.setProperty(`--current-${character}-hitpoints`, `100%`);
  } else {
    currentHealthEl.innerText = newCurrentHealth;
    root.style.setProperty(`--current-${character}-hitpoints`, `${(totalHealth - newCurrentHealth) * 100 / totalHealth}%`);
  }

  return newCurrentHealth;
}

export function startBattle(checkedDefence, checkedAttack) {
  const updateGameStateData = () => {
    gameState = getGameState();
    player = gameState.player;
    enemy = gameState.enemy;
    attacks = gameState.attacks;
  }
  let gameState = getGameState();
  let player = gameState.player;
  let enemy = gameState.enemy;
  let attacks = gameState.attacks;

  player.blockedZones = Array.from(checkedDefence).map(input => input.value);
  player.attackedZones = Array.from(checkedAttack).map(input => input.value);

  enemy.blockedZones = getRandomDefenceZones(enemy.defenceZones);
  enemy.attackedZones = getRandomAttackZone(enemy.attackZone);

  const playerAttack = resolveAttack(enemy.blockedZones, player.attackedZones, player, enemy);
  enemy.currentHealth = updateHealth('enemy', enemy.currentHealth, enemy.totalHealth, playerAttack.damage);
  attacks.push(playerAttack);
  updateGameState(gameState);
  updateGameStateData();
  if (checkWin(enemy.currentHealth, player.name, enemy.name)) {
    const user = getUser();
    user.wins += 1;
    saveUser(user);
    return;
  };


  enemy.attackedZones.some(enemyAttackedZone => {
    const enemyAttack = resolveAttack(player.blockedZones, enemyAttackedZone, enemy, player);
    player.currentHealth = updateHealth('player', player.currentHealth, player.totalHealth, enemyAttack.damage);
    gameState.attacks.push(enemyAttack);
    updateGameState(gameState);
    updateGameStateData();
    if (checkWin(player.currentHealth, enemy.name, player.name)) {
      const user = getUser();
      user.losses += 1;
      saveUser(user);
      return true;
    };
    return false;
  });
}
