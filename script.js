// client.js
function func(){}
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
// server.js
const express = require('express');
const app = express();
const port = 3000;

// In-memory storage for user accounts
let users = [];

// Parse JSON request bodies
app.use(express.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((u) => u.email === email);

  // If the user is found and the password matches, log the user in
  if (user && user.password === password) {
    // Generate a session token and store it in the server-side storage
    const sessionToken = generateSessionToken();
    user.sessionToken = sessionToken;
    res.cookie('sessionToken', sessionToken, { httpOnly: true });
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
  }
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ success: false, error: 'Email already registered' });
  }

  // Create a new user and add it to the in-memory storage
  const newUser = { username, email, password, sessionToken: null };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper function to generate a session token
function generateSessionToken() {
  // Implement your token generation logic here
  return `session-token-${Date.now()}`;
}