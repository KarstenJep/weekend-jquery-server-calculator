$(document).ready(handleReady);

let newCalc = {
    value1: 0,
    operator: '',
    value2: 0,
    answer: 0,
    history: '',
}

function handleReady() {
    console.log('jQ is loaded yo');
    $('#add').on('click', function (event) {
        newCalc.operator = '+';
    });
    $('#minus').on('click', function (event) {
       newCalc.operator = '-';
    });
    $('#multiply').on('click', function (event) {
        newCalc.operator = '*';
    });
    $('#divide').on('click', function (event) {
        newCalc.operator = '/';
    });
    $('#submit').on('click', function (event) {
        console.log('clicked submit');
        postCalc();
    });
    $('#clear').on('click', function (event) {
        console.log('clicked clear');
        clearInput();
    });
    getCalc();
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
          alert('sorry, could not get calc. Try again later.');
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
    $('#history').empty();
    for (let item of calc) {
        $('#answer').empty();
        $('#answer').append(`${item.answer}`);
        $('#history').append(`<p>${item.value1} ${item.operator} ${item.value2} = ${item.answer}</p>`)   
    }
}


function clearInput() {
    $('#value1').val('');
    $('#value2').val('');
    $('#answer').empty();
    $('#answer').append(0);
}

