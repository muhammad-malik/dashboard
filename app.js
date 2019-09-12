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
    let programme1 = [];
    let programme2 = [];
    let messages = "";

    // getting all images
    const rootDir = path.dirname(process.mainModule.filename);
    let tempPath = path.join(rootDir, "public", "images");
    let images = fs.readdirSync(tempPath);
    let lastImage = images.pop();

    // reading the messages
    fs.readFile("data/messages.txt", "utf8", (err, data) => {
        if (err) throw err;
        messagesList = data.trim().split(/\r\n|\n/);
        messagesList.reverse().forEach(msg => {
            messages += msg + " *** ";
        });

        // reading the programme
        fs.readFile("data/programme.txt", "utf8", (err, data2) => {
            if (err) throw err; 
            let programme = data2.trim().split(/\r\n|\n/);
            for (prog of programme) {
                programme1.push(prog.split(":-")[0]);
                programme2.push(prog.split(":-")[1]);
            }
            
            return res.render('index', {
                pageTitle: 'Home',
                lastImage: lastImage,
                images: images,
                lastImage: lastImage,
                messages: messages,
                programme1: programme1,
                programme2: programme2, 
                path: '/',
                time: time
            });
        }); 
    });
});



app.listen(serverPort);
