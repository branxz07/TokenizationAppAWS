

//imports express
const express = require('express');


// const app with anything it needs
const app = express();

app.get('/', (req, res) => res.send('Hello world con express'))
app.listen(8100, () => {
    console.log('Server is running on port 3000');
    });


