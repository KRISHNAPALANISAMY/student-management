const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/auth/routes');
const crudRoutes = require('./postgrud');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 1073;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/', crudRoutes);

app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
