export function createGameState(player, enemy) {
  const gameState = {
    player: player,
    enemy: enemy,
    attacks: [],
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function getGameState() {
  const gameState = localStorage.getItem('gameState');
  return gameState ? JSON.parse(gameState) : null;
}

export function updateGameState(updatedValues) {
  const gameState = getGameState();
  if (gameState) {

    if (updatedValues.player) {
      gameState.player = updatedValues.player;
    }
    if (updatedValues.enemy) {
      gameState.enemy = updatedValues.enemy;
    }
    if (updatedValues.attacks) {
      gameState.attacks = updatedValues.attacks;
    }
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }
}

export function deleteGameState() {
  localStorage.removeItem('gameState');
}

export function hasGameState() {
  return localStorage.getItem('gameState') !== null;
}
