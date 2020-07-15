const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app
    .use(express.static(__dirname + '/public'))
    // .use('images', express.static(__dirname + '/assets/images'))
    // .set('views', path.join(__dirname, 'views'))
    .get('/', (req, res) => {
        // res.sendFile(path.join(__dirname, 'index.html'));
        // res.sendFile('index.html');
        res.render('index')
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));