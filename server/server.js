// bring express into your project
// you will need to `npm init` and `npm install express` first


// create your express app
const express = require('express'); //import express module
const trains = require('./modules/trains'); //import trains module
console.log(trains); 

const app = express(); //create an express server and store in 'app'
const router = express.Router();
const port = 5000; //create variable for listening port

// This is your array of trains
// Moved to server/modules/trains.js

app.use(express.static('./server/public')); //source in public files
app.use('/', router); //tell 'app' to use router for root level requests
// -------- BASE -----//

// Create your `/train` route here
// when a user visits localhost:5000/train
// this route should return the array of trains
router.get('/train', (req, res)=>{
    console.log('trains GET');
    res.send(trains);
});


// Create your `/first-train` route here
// when a user visits localhost:5000/first-train
// this route should return the first train in the array
router.get('/first-train', (req, res)=>{
    console.log('first-train GET');
    res.send(trains[0]);
});


// Create your `/last-train` route here
// when a user visits localhost:5000/last-train
// this route should return the last train in the array
router.get('/last-train', (req, res)=>{
    console.log('last-train GET');
    res.send(trains[trains.length-1]);
});


// -------- STRETCH -----//

// Create your `/count` route here
// when a user visits localhost:5000/count
// this route should return the number of trains in the array
// NOTE: express doesn't like it when you return numbers
// instead, return an object like { totalCount: 4 }
router.get('/count', (req, res) =>{
    console.log('count GET');
    res.send({'Total number of trains': trains.length});
});

// Create your `/random` route here
// when a user visits localhost:5000/random
// this route should return a single train at random
router.get('/random', (req, res)=>{
    console.log('random GET');
    res.send(randomTrain());
});

function randomTrain() {
    //Math.random() generates a random number between 0-1
    //multiply that number by the length of the trains array
    //use Math.floor to round the random number so that it is always a whole number and therefore a usable index
    let randTrainIdx = Math.floor(Math.random()*trains.length); 
    return {'Random train': trains[randTrainIdx]}; //use the randomly generated index to select a train from the trains array
}

//Moment is a common javascript module used for time. npm install moment and use it to show the time of the next train. 
//Trains run every ten minutes starting at the top of the hour. 
//So visiting localhost:5000/next at 2:35pm should should 2:40pm as the result.
const moment = require('moment'); //import moment module

router.get('/next', (req, res)=>{
    console.log('next GET');
    res.send(`The next train arrives at ${nextTrain()}`);
});

function nextTrain() {
    let thisMoment = {
        hour: moment().hour(), //get the current hour
        minute: moment().minute() //get the current minute
    };
    //divide thisMoment.minute by 10 to move the decimal one to the left (e.g. 12 will return 1.2) 
    //Math.ceil rounds up to the nearest integer (e.g. 1.2 will return 2)
    //multiply by 10 to move the decimal one to the right (e.g. 2 will return 20)
    let returnMinute = Math.ceil(thisMoment.minute/10)*10;
    return moment(`${thisMoment.hour}:${returnMinute}`, "hh:mm").format('hh:mma');
}

//-----------Alt Solution-----------//

router.get('/next2', (req, res)=>{
    console.log('next GET');
    res.send(`The next train arrives at ${nextTrain2()}`);
});

function nextTrain2() {
    let stringMinutes = (moment().get('minute')).toString(); //Get current minute and conver it to a string
    let minutesUntilNextTrain = 10-Number(stringMinutes[stringMinutes.length-1]); //convert the last character in stringMinutes to a number and subtract it from 10
    return moment().add(minutesUntilNextTrain, 'minutes').format('hh:mma'); //add minutesUntillNextTrain to the current moment's minutes and then format it as "hour(12)":"minute" AM/PM
}

// -------- BASE -----//

// Don't forget to start your app by running `.listen()`
app.listen(port, ()=>{
    console.log('server up on:', port);
});