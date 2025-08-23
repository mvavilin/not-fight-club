import { AVATAR_PATH, player, enemies, zones } from './data.js';

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
  const attackBlocked = defenceZones.includes(attackZone);

  if (attackBlocked) {
    battleLog.push(`${attacker.name} attacked ${attackZone}, but it was blocked by ${defending.name}.`);
  } else {
    damage = attacker.attackPower;
    if (isCritical) {
      damage *= attacker.critMultiplier;
      battleLog.push(`${attacker.name} delivered a CRITICAL HIT of ${damage} damage in ${defending.name}'s ${attackZone}!`);
    } else {
      battleLog.push(`${attacker.name} attacked ${defending.name}'s ${attackZone} for ${damage} damage.`);
    }
  }

  return damage;
}

export function startBattle(checkedDefence, checkedAttack) {
  const playerDefenceZones = Array.from(checkedDefence).map(input => input.value);
  const playerAttackZone = Array.from(checkedAttack).map(input => input.value);

  const enemy = chooseRandomEnemy();
  const enemyDefenceZones = getRandomDefenceZones(enemy.defenceZones);
  const enemyAttackZone = getRandomAttackZone(enemy.attackZone);

  document.getElementById('enemy').textContent = enemy.name;
  const root = document.documentElement;
  root.style.setProperty('--enemy-avatar', `url(${AVATAR_PATH + enemy.avatar})`);

  const battleLog = [];
  const playerAttack = resolveAttack(enemyDefenceZones, playerAttackZone, player, enemy, battleLog);
  const enemyAttack = resolveAttack(playerDefenceZones, enemyAttackZone, enemy, player, battleLog);

  console.log(playerAttack);
  console.log(enemyAttack);
}
