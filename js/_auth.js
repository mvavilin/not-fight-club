import { getUser } from './_user.js';

export function checkUser() {
  if (getUser()) {
    return true;
  }
  window.location.href = './index.html';
  return false;
}