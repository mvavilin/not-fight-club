document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById('register-button');
  const usernameInput = document.getElementById('register-username');

  const existingUser = localStorage.getItem('user');
  if (existingUser) {
    window.location.href = 'arena.html';
    return;
  }

  registerButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (!username) {
      alert('Please enter a username');
      return;
    }

    const user = {
      username: username,
      avatar: null
    };

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'arena.html';
  });
});