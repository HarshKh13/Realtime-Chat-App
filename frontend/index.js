const express = require('express');
const app = express();
const path = '/templates/index.html';

app.listen(4000);

app.use(express.static('templates'));
app.get('/',(req,resp)=>{
    resp.sendFile(__dirname+path);
});
