'use strict';

function change(event) {
  if (event.target.tagName == 'TD') {
    if (activeField) {
      activeField.classList.remove('editing');
      let text = activeField.querySelector('.text');
      let textField = activeField.querySelector('.text-field');
      text.textContent = textField.value;
    }

    activeField = event.target;

    let text = activeField.querySelector('.text');
    let textField = activeField.querySelector('.text-field');

    textField.value = text.textContent;
    activeField.classList.add('editing');
  }

  if (event.target.tagName !== 'TD') {
    if (activeField) {
      if (event.target.tagName === 'INPUT') return;
      if (event.target.tagName === 'LABEL') return;

      activeField.classList.remove('editing');
      let text = activeField.querySelector('.text');
      let textField = activeField.querySelector('.text-field');
      text.textContent = textField.value;
    }
  }

}

function CreateTable(fields, rows, meta) {
  var column = fields.split(', ');
  var row = rows;
  var colorBg = meta.split(', ');
  var num = 0;

  this.show = function() {
    table.innerHTML = '';

    for (let i = 0; i < row; i++) {
      table.appendChild(this.addRow(i));
    }

    if (colorBg[0] === '1') {
      let firstRow = table.getElementsByTagName('tr')[0];
      firstRow.classList.add('first-row');
    }

    let arrayRow = table.getElementsByTagName("tr");

    if (colorBg[1] === '1') {
      for (let i = 0; i <= arrayRow.length; i++) {
        if (i % 2 == 1) {
          arrayRow[i].classList.add('even-row');
        }
      }
    }

    if (colorBg[2] === '1') {
      for (let j = 0; j <= arrayRow.length; j++) {
        if (j % 2 == 0) {
          arrayRow[j].classList.add('odd-row');
        }
      }
    }

    return this;
  };

  this.addRow = function(n) {
    var tr = document.createElement('tr');
    for (let i = 0; i < column.length; i++) {
      tr.appendChild(this.addColumn(i));
      num++;
    }
    return tr;
  };

  this.addColumn = function(n) {
    var td = document.createElement('td');
    var label = document.createElement('label');
    label.className = 'text';
    var input = document.createElement('input');
    input.className = 'text-field';

    if (num < column.length) {
      label.textContent = column[n];
    } else {
      label.textContent = '...';
    }

    td.appendChild(label);
    td.appendChild(input);

    return td;
  };

  this.insert_row = function(index) {
    table.insertRow(index).insertCell(0).innerHTML = 'новая строка';
  };

  this.add_row = function() {
    var tr = document.createElement('tr');
    table.appendChild(tr).insertCell(0).innerHTML = 'новая строка';
  };

  this.get_data = function() {
    var objectData = {};
    var textColumn = table.getElementsByTagName("label");

    for (let i = 0; i < textColumn.length; i++) {
      objectData[textColumn[i].innerHTML] = i;
    }

    var jsonData = JSON.stringify(objectData, function(key, value) {
      if (key == '...') return undefined;
      return value;
    });

    console.log(jsonData);
  };

  this.clean_table = function() {
    var textColumn = table.getElementsByTagName("label");

    for (let i = 0; i < textColumn.length; i++) {
      textColumn[i].innerHTML = "";
    }
  };
}

function addElement(event) {
  event.preventDefault();

  var arrayTitle = addTitle.value;
  var addNumRow = document.getElementById('add-row').value;
  var addBgRow = document.getElementById('add-bg-row').value;

  if (arrayTitle === '' && addNumRow === '') {
    alert('error');
  }

  if (addBgRow === '') {
    addBgRow = '0, 0, 0';
  }

  this.result = new CreateTable(arrayTitle, addNumRow, addBgRow).show();
}

function getDataJson(event) {
  event.preventDefault();

  var valueDataJson = inputDataJson.value;
  var arrayData = [];
  var arrayKeyColumn = ['firstColumn', 'secondColumn', 'thirdColumn', 'fourthColumn', 'fifthColumn', 'sixthColumn', 'seventhColumn', 'eighthColumn', 'ninthColumn', 'tenthColumn']
  // var objectData = {};
  var tableRow = table.getElementsByTagName("tr");
  var textColumn = table.getElementsByTagName("label");
  // var lengthColumn = document.getElementsByTagName("tr")[0].getElementsByTagName("label");


  // console.log(lengthColumn);
  // console.log(textColumn);
  // console.log(tableRow);



  for (let i = 0; i < tableRow.length; i++) {
    let lengthColumn = document.getElementsByTagName("tr")[i].getElementsByTagName("label");
    var objectData = {};

    for (let j = 0; j < lengthColumn.length; j++) {
      objectData[arrayKeyColumn[j]] = lengthColumn[j].innerHTML;
    }

    arrayData.push(objectData);
  }

  // for (let i = 0; i < textColumn.length; i++) {
  //   objectData[arrayKeyColumn[i]] = textColumn[i].innerHTML;
  // }

  var jsonData = JSON.stringify(arrayData, function(key, value) {
    if (value == '...') return undefined;
    return value;
  });

  inputDataJson.value = jsonData;

}

var main = document.getElementById('main');
var table = document.getElementById('table');
var td = document.getElementsByTagName('td');
var form = document.getElementById('form');
var add = document.getElementById('add');
var addTitle = document.getElementById('add-title');
var inputDataJson = document.getElementById('json-data');
var btnDataJson = document.getElementById('get-json');
var activeField;
// var lengthColumn = document.getElementsByTagName("tr")[0].getElementsByTagName("label");


form.addEventListener('submit', addElement);
main.addEventListener('click', change);
btnDataJson.addEventListener('click', getDataJson);
