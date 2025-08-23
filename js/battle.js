import { AVATAR_PATH, player, enemies, zones } from './data.js';

const root = document.documentElement;
let logCounter = 1;

function chooseRandomEnemy() {
  const randomIndex = Math.floor(Math.random() * enemies.length);
  return enemies[randomIndex];
}

const getRandomDefenceZones = numZones => getRandomZones(zones, numZones);
const getRandomAttackZone = numZones => getRandomZones(zones, numZones);

function getRandomZones(zones, numZones) {
  const shuffled = zones.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numZones);
}

function resolveAttack(defenceZones, attackZone, attacker, defending, battleLog) {
  let damage = 0;
  const isCritical = Math.random() < attacker.critChance;
  const attackBlocked = defenceZones.includes(...attackZone);

  // <span style="color:red">
  // </span>

  if (attackBlocked) {
    // U 1
    battleLog.push(`<span class="battle-log__item battle-log__item--attacker">${attacker.name}</span> attacked <span class="battle-log__item battle-log__item--defence-zone">${attackZone}</span>, but it was blocked by <span class="battle-log__item battle-log__item--defending">${defending.name}</span>.`);
  } else {
    damage = attacker.attackPower;
    if (isCritical) {
      damage = Math.floor(damage * attacker.critMultiplier);
      // U 1
      battleLog.push(`<span class="battle-log__item battle-log__item--attacker">${attacker.name}</span> delivered a <span class="battle-log__item battle-log__item--critical-hit">critical hit</span> of <span class="battle-log__item battle-log__item--damage">${damage} damage</span> in <span class="battle-log__item battle-log__item--defending">${defending.name}'s</span> <span class="battle-log__item battle-log__item--attack-zone">${attackZone}</span>!`);
    } else {
      // U 1
      battleLog.push(`<span class="battle-log__item battle-log__item--attacker">${attacker.name}</span>  attacked <span class="battle-log__item battle-log__item--defending">${defending.name}'s</span> <span class="battle-log__item battle-log__item--attack-zone">${attackZone}</span> for <span class="battle-log__item battle-log__item--damage">${damage} damage</span>.`);
    }
  }

  return damage;
}

function updateHealth(playerDamage, enemyDamage) {
  const playerHealth = document.getElementById("current-player-hitpoints");
  const enemyHealth = document.getElementById("current-enemy-hitpoints");

  let playerNewHealth = parseInt(playerHealth.innerText) - enemyDamage;
  let enemyNewHealth = parseInt(enemyHealth.innerText) - playerDamage;

  // U
  if (playerNewHealth < 0) {
    playerHealth.innerText = 0;
    root.style.setProperty('--current-player-hitpoints', `100%`);
  } else {
    playerHealth.innerText = playerNewHealth;
    root.style.setProperty('--current-player-hitpoints', `${(player.health - playerNewHealth) * 100 / player.health}%`);
  }

  // U
  if (enemyNewHealth < 0) {
    enemyHealth.innerText = 0;
    root.style.setProperty('--current-enemy-hitpoints', `100%`);
  } else {
    enemyHealth.innerText = enemyNewHealth;
    root.style.setProperty('--current-enemy-hitpoints', `${(enemy.health - enemyNewHealth) * 100 / enemy.health}%`);
  }
}

function updateBattleLog(battleLog) {
  const logList = document.getElementById("battle-log-list");
  // U 1
  battleLog.forEach(entry => {
    const logItem = document.createElement('li');

    logItem.innerHTML = `${logCounter} ${entry}`;
    logList.appendChild(logItem);

    logCounter++;
  });
}

const enemy = chooseRandomEnemy();
document.getElementById("current-player-hitpoints").innerText = player.health;
document.getElementById("current-enemy-hitpoints").innerText = enemy.health;
document.getElementById("total-player-hitpoints").innerText = player.health;
document.getElementById("total-enemy-hitpoints").innerText = enemy.health;
document.getElementById('enemy').textContent = enemy.name;
root.style.setProperty('--enemy-avatar', `url(${AVATAR_PATH + enemy.avatar})`);

export function startBattle(checkedDefence, checkedAttack) {
  const playerDefenceZones = Array.from(checkedDefence).map(input => input.value);
  const playerAttackZone = Array.from(checkedAttack).map(input => input.value);

  const enemyDefenceZones = getRandomDefenceZones(enemy.defenceZones);
  const enemyAttackZone = getRandomAttackZone(enemy.attackZone);

  // U 1
  const battleLog = [];
  const playerAttack = resolveAttack(enemyDefenceZones, playerAttackZone, player, enemy, battleLog);
  const enemyAttack = resolveAttack(playerDefenceZones, enemyAttackZone, enemy, player, battleLog);

  console.log(playerAttack);
  console.log(enemyAttack);

  updateHealth(playerAttack, enemyAttack);

  updateBattleLog(battleLog);
}
