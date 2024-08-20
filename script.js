// client.js
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Login form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { user } = await response.json();
      // Store the user's session token in a cookie
      document.cookie = `sessionToken=${user.sessionToken}; path=/;`;
      // Redirect the user to the main page
      window.location.href = 'http://127.0.0.1:5501/main.html';
    } else {
      const { error } = await response.json();
      alert(error);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

// Registration form submission
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const { user } = await response.json();
      // Store the user's session token in a cookie
      document.cookie = `sessionToken=${user.sessionToken}; path=/;`;
      // Redirect the user to the main page
      window.location.href = 'http://127.0.0.1:5501/main.html';
    } else {
      const { error } = await response.json();
      alert(error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});