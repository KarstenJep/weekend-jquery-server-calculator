const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

//Initialize array


// GET
app.get( '/guesses', (req, res)  => {
    console.log(`Request for guesses serverside ...  guesses`);
    res.send( guesses );
  });

// POST
app.post('/guesses', (req, res) => {
  let newInputs = req.body;
  // console.log('Checking format of newInputs', newInputs);
  guesses.push(newInputs);
  editGuesses();
  res.sendStatus(201);
  console.log('got a new Guess, serverside ... ', newInputs);
})

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })