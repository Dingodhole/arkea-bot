//Requirements
import Discord from 'discord.js';
import responses from './responses.json';

import path from 'path';
import morgan from 'morgan';
import express from 'express';

// Needed for async to work
require("babel-core/register");
require("babel-polyfill");

const app = express();

// setup the logger
app.use(morgan('tiny'));

// Priority serve static files.
app.use(express.static(path.join(__dirname, '../front-end/build')));

// For everything return React so react can do extra routing
app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../front-end/build', 'index.html'));
});

app.listen(3000, () => console.log('<<<<Starting and listening on port 3000!>>>>'))
