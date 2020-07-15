const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app
    // .use(express.static('public'))
    .get('/', (req, res) => {
        // res.sendFile(path.join(__dirname, 'public', 'index.html'));
        res.sendFile('index.html');
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));