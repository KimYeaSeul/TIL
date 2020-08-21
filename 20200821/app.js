const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const indexRoute = require("./routes/index");

app.set('views', __dirname + '/views');
app.set('view engine'. 'ejs');
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoute);

// app.get('/', function (req, res){
//     res.send('Hello World!');
// });

// app.get('bye', function (req, res){
//     res.send('Bye World!');
// });

app.listen(PORT, function(){
    console.log('Example app lostenling on port', PORT);
});