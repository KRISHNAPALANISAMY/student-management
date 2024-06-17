const pool = require('../../db');
const path = require('path');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Username and password are required' });
  }

  const isNumeric = /^\d+$/.test(password);
  if (!isNumeric) {
    return res.render('login', { error: 'Password must contain only numbers' });
  }

  const query = 'SELECT * FROM admin WHERE username = $1 AND password = $2';
  const values = [username, password];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query', error.stack);
      return res.status(500).send('Server error');
    }

    if (results.rows.length > 0) {
      return res.redirect('/interface');
    } else {
      return res.render('login', { error: 'Invalid username or password' });
    }
  });
};

module.exports = {
  login,
};
