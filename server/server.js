/**
 * Created by Arthur on 2/14/18.
 */

const express = require('express');
const app = express();

app.use('/', express.static('src'));
app.use('/signIn', express.static('src'));
app.use('/signUp', express.static('src'));

app.listen(process.env.PORT || 3000);