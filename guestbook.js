
//Express server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('gsite/'));

//Route for index.html
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/gsite/index.html');
}); 

//Data from file and parsing
app.get('/list', function (req, res) {

//Parsing
var data = require('./data.json');

var results = '<table border="4"> ';

for (var i=0; i < data.length; i++){
    results +=
    '<tr>'+
    '<td>'+data[i].Name+'</td>'+
    '<td>'+data[i].Email+'</td>'+
    '<td>'+data[i].Company+'</td>'+
    '</tr>';

    
}

res.send(results);
});



//newmessage
app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + '/gsite/newmessage.html');
});

app.post('/newmessage', function (req, res) {
    var data = require('./data.json');

    data.push({
        "Name": req.body.Name,
        "Company": req.body.Company,
        "Email": req.body.Email,
        "Date": new Date()
    });

//Convert json to string
var jsonStr = JSON.stringify(data);

//Write data to a file
fs.writeFile('data.json', jsonStr, (err) => {
    if (err) throw err;
    console.log('Saved');
});
res.send("Data has submitted to a file!");


});

//404 Route
app.get('*', function (req, res) {
    res.status(404).send('Cant find requested page!!!');
});



//localhost8081

/* app.listen(8081, function() {
    console.log('Listening port 8081!');
}); */

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));