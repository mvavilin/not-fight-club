import { checkUser } from './_auth.js';
import { getUser, saveUser } from './_user.js';
import { AVATAR_PATH, avatars } from './_data.js';

export function setupPopup() {
  const avatarsWrapper = document.getElementById('avatars-wrapper');

  avatars.forEach(avatarData => {
    const avatarEl = document.createElement('div');
    const img = document.createElement('img');
    const avatarOverlay = document.createElement('div');
    const iconWrapper = document.createElement('div');
    const icon = document.createElement('div');

    avatarEl.classList.add('avatar');
    avatarEl.setAttribute('data-avatar-id', avatarData.id);
    img.classList.add('avatar__img');
    img.src = AVATAR_PATH + avatarData.name + avatarData.ext;
    img.alt = avatarData.name;
    avatarOverlay.classList.add('avatar__overlay');
    iconWrapper.classList.add('icon', 'icon__wrapper', 'avatar__icon');
    icon.classList.add('icon--mask', 'avatar__icon--mouse-pointer-click');

    avatarEl.appendChild(img);
    avatarEl.appendChild(avatarOverlay);
    avatarEl.appendChild(iconWrapper);
    iconWrapper.appendChild(icon);
    avatarsWrapper.appendChild(avatarEl);

    avatarEl.addEventListener('click', () => {
      const root = document.documentElement;
      const avatarId = Number(avatarEl.getAttribute('data-avatar-id'));
      const selectedAvatar = avatars.find(a => a.id === avatarId);
      let user = getUser();

      user.avatar = AVATAR_PATH + selectedAvatar.name + selectedAvatar.ext;

      saveUser(user);

      root.style.setProperty('--avatar', `url(${user.avatar})`);

      popup.classList.add('popup--close');
      overlay.classList.add('overlay--close');
    });

    popup.addEventListener('click', (e) => {
      const popup = document.getElementById('popup');
      const overlay = document.getElementById('overlay');

      if (e.target === popup) {
        popup.classList.add('popup--close');
        overlay.classList.add('overlay--close');
      }
    });
  });
}
