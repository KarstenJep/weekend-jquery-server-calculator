const express = require('express');
// bodyParser gives us req.body, it would be undefined without
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

// localhost:5000 looks for files in server/public
app.use(express.static('server/public'));

// Initialize array
let calculations = [];

// GET
app.get( '/calc', (req, res)  => {
    console.log(`Request for calc serverside ...`, calculations);
    res.send( calculations );
});

// POST
app.post('/calc', (req, res) => {
  let newCalc = req.body;
  console.log('Checking format of newCalc', newCalc);
  calculations.push(newCalc);
  calculate();
  res.sendStatus(201);
});

// PORT 
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
});

// takes in new object and runs math logic
function calculate() {
    let calc = calculations[calculations.length - 1];
    console.log('in calculate', calc);
    if (calc.operator === '+') { 
        console.log('in add calculator', calc.value1, calc.operator, calc.value2);
        calc.answer = Number(calc.value1) + Number(calc.value2);

    } else if (calc.operator === '-') {
        console.log('in minus calculator', calc.value1, calc.operator, calc.value2);
        calc.answer = Number(calc.value1) - Number(calc.value2);

    } else if (calc.operator === '*') {
        console.log('in multiply calculator', calc.value1, calc.operator, calc.value2);
        calc.answer = Number(calc.value1) * Number(calc.value2);

    } else if(calc.operator === '/') {
        console.log('in divide calculator', calc.value1, calc.operator, calc.value2);
        calc.answer = Number(calc.value1) / Number(calc.value2);
    }
};

