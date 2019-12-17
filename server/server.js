// bring express into your project
// you will need to `npm init` and `npm install express` first


// create your express app

// This is your array of trains
const trains = [
    { name: 'Thomas', color: 'Blue' },
    { name: 'Gordon', color: 'Blue' },
    { name: 'Henry', color: 'Green' },
    { name: 'James', color: 'Red' }
];

// -------- BASE -----//

// Create your `/train` route here
// when a user visits localhost:5000/train
// this route should return the array of trains


// Create your `/first-train` route here
// when a user visits localhost:5000/first-train
// this route should return the first train in the array


// Create your `/last-train` route here
// when a user visits localhost:5000/last-train
// this route should return the last train in the array



// -------- STRETCH -----//

// Create your `/count` route here
// when a user visits localhost:5000/count
// this route should return the number of trains in the array
// NOTE: express doesn't like it when you return numbers
// instead, return an object like { totalCount: 4 }


// Create your `/random` route here
// when a user visits localhost:5000/random
// this route should return a single train at random


// -------- BASE -----//

// Don't forget to start your app by running `.listen()`