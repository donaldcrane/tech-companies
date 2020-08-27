const express =require('express');
const app = express();


const apicontroller = require('./controllers/apicontroller');
const htmlcontroller = require('./controllers/htmlcontroller');
const port= process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

apicontroller(app);
htmlcontroller(app);

app.listen(port);
console.log(`app running on port , ${port}`); 