// dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const serverPort = 3000;
const fs = require('fs');

let time = "";


// setting up the application. Using EJS as the web 
// rendering engine.
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {

    let messagesList = [];
    let programme = [];
    let messages = "";

    // getting all images
    const rootDir = path.dirname(process.mainModule.filename);
    let tempPath = path.join(rootDir, "public", "images");
    let images = fs.readdirSync(tempPath);
    let lastImage = images.pop();

    // reading the messages
    fs.readFile("data/messages.txt", "utf8", (err, data) => {
        if (err) throw err;
        messagesList = data.split(/\r\n|\n/);
        messagesList.reverse().forEach(msg => {
            messages += msg + " | ";
        });

        // reading the programme
        fs.readFile("data/programme.txt", "utf8", (err, data2) => {
            if (err) throw err; 
            programme = data2.split(/\r\n|\n/);
  
            return res.render('index', {
                pageTitle: 'Home',
                lastImage: lastImage,
                images: images.reverse(),
                lastImage: lastImage,
                messages: messages,
                programme: programme, 
                path: '/',
                time: time
            });
        }); 
    });
});



app.listen(serverPort);
