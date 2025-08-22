import { checkUser } from './auth.js';
import { getUser, saveUser } from './user.js';
import { renderHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!checkUser()) return;

  const header = document.getElementById('header');
  header.innerHTML = renderHeader();

  const root = document.documentElement;
  root.style.setProperty('--main-bg-image', 'url(../assets/images/backgrounds/nebula_showdown_bg.webp)');

  const checkboxes = document.querySelectorAll('.zone__selection');
  const maxDefence = 2;
  // const maxAttack = 1;

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedDefence = document.querySelectorAll('input[name="defence-zone"]:checked');
      // const checkedAttack = document.querySelectorAll('input[name="attack-zone"]:checked');

      if (checkedDefence.length > maxDefence) checkbox.checked = false;
      // if (checkedAttack.length > maxAttack) checkbox.checked = false;
    });
  });
});