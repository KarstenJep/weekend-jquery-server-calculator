$(document).ready(handleReady);

let newCalc = {
    value1: 0,
    operator: '',
    value2: 0,
    answer: 0,
}

function handleReady() {
    console.log('jQ is loaded yo');
    $('#add').on('click', function (event) {
        newCalc.operator = 'add';
    });
    $('#minus').on('click', function (event) {
       newCalc.operator = 'minus';
    });
    $('#multiply').on('click', function (event) {
        newCalc.operator = 'multiply';
    });
    $('#divide').on('click', function (event) {
        newCalc.operator = 'divide';
    });
    $('#submit').on('click', function (event) {
        console.log('clicked submit');
        postCalc();
    });
    $('#clear').on('click', function (event) {
        console.log('clicked clear');
        clearInput();
    });
}

function postCalc() {
    newCalc.value1 = $('#value1').val(),
    newCalc.value2 = $('#value2').val(),
    Number(newCalc.value1);
    Number(newCalc.value2);
    console.log('in postCalc', newCalc);
    
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: newCalc,
    })
        .then(function (response) {
          console.log('added calc');
          getCalc();
        })
        .catch( function (error) {
          console.log('error from server', error);
          alert('sorry, could not get guesses. Try again later.');
        })  
}

function getCalc() {
    $.ajax({
      method: 'GET',
      url: '/calc'
    })
      .then(function (response) {
          console.log('response from server', response);
          render(response);
      })
      .catch( function (error) {
          console.log('error from server', error);
          alert('sorry, could not get calc. Try again later.');
      })
      console.log('After making server request...');
  }
  
function render(calc) {
    console.log('in render', calc);
    $('#answer').empty().append(`${calc.answer}`);
}

function clearInput() {
    $('#value1').val('');
    $('#value2').val('');
}

