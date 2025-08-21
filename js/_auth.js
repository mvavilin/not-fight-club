import { getUser } from './_user.js';

export function checkUser() {
  if (!getUser()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}