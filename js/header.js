import { getUser } from './user.js';

export function renderHeader() {
  const user = getUser();
  const root = document.documentElement;
  if (user.avatar) root.style.setProperty('--avatar', `url(${user.avatar})`);

  return `
    <div class="container container--header">
  <a class="header__logo logo" href="./home.html">
    <span class="icon icon--ui logo__icon"></span>
    <span class="title title--main logo__title">Cosmo Bots</span>
  </a>
  <nav class="header__nav nav">
    <ul class="nav__list">
      <li class="nav__item"><a href="./arena.html" class="nav__link"><span class="icon icon__wrapper"><span
              class="icon--mask nav__icon nav__icon--arena"></span></span><span
            class="title title--item">Arena</span></a>
      </li>
      <li class="nav__item"><a href="./profile.html" class="nav__link"><span
            class="icon icon--ui nav__icon nav__icon--profile"></span><span class="title title--item" id="username-nav">${user.username ? user.username : 'Profile'}</span></a>
      </li>
      <li class="nav__item"><a href="./settings.html" class="nav__link"><span class="icon icon__wrapper"><span
              class="icon--mask nav__icon nav__icon--settings"></span></span><span
            class="title title--item">Settings</span></a>
      </li>
    </ul>
  </nav>
</div>
  `;
}