

//imports express
const express = require('express');


// const app with anything it needs
const app = express();

app.get('/', (req, res) => res.send('<h1>Express con html Testing</h1>'))
app.listen(8100, () => {
    console.log('Server is running on port 8100');
    });


