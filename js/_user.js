const USER_KEY = 'user';

export function getUser() {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Ошибка парсинга user из localStorage:", e);
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function createUser(username) {
  const user = {
    username: username,
    avatar: null,
    wins: 0,
    losses: 0
  };
  saveUser(user);
  return user;
}
