const express = require('express');
const app = express();

// app.use('*', express.static('src'));
app.use('/', express.static('src'));
app.use('/signIn', express.static('src'));
app.use('/signUp', express.static('src'));
app.use('/leaderBoard', express.static('src'));
app.use('/profile', express.static('src'));
app.use('/about', express.static('src'));
app.use('/singleplayer', express.static('src'));
app.use('/multiplayer', express.static('src'));

app.listen(process.env.PORT || 3000);
