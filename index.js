const express = require('express');
const app = express();
const port = 3000;

const message = require('./message');
const hotelHelper = require('./hotel');
 
//for demo purpose, lets use GET method
app.get('/', (req, res) => {
    const requiredQuery = [
        'noOfAdult',
        'noOfChild',
        'noOfInfant'
    ];

    //simple validation, of course we can use the library
    //just for demo purpose, lets do this way at the moment :)
    //of course we need to check more, like the input is the integer?
    requiredQuery.forEach( type => {
        if(!req.query[type]){
            res.send(
                message.getErrorObj('validation_error',`${type} is required in querystring`)
            );
        }
    })
    
    //lets assume all input from querystrings are integer for now
    res.send(
        hotelHelper.assign(
            parseInt(req.query.noOfAdult),
            parseInt(req.query.noOfChild),
            parseInt(req.query.noOfInfant)
        )
    );
});

app.listen(port, () => console.log(`server is up => http://localhost:${port}`));