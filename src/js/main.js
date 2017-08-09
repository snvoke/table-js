function change(event) {
  activeField = event.target;

  var text = activeField.querySelector('.text');
  var textField = activeField.querySelector('.text-field');
  var isEditing = activeField.classList.contains('editing');

  if (activeField.tagName !== 'TD') return;

  if (isEditing) {
    text.textContent = textField.value;
  } else {
    textField.value = text.textContent;
  }

  activeField.classList.toggle('editing');
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
  }

  this.addRow = function(n) {
    var tr = document.createElement('tr');
    for (let i = 0; i < column.length; i++) {
      tr.appendChild(this.addColumn(i));
      num++;
    }
    return tr;
  }

  this.addColumn = function(n) {
    var td = document.createElement('td');

    var label = document.createElement('label');
    label.className = 'text';

    if (num < column.length) {
      label.textContent = column[n];
    } else {
      label.textContent = '...';
    }


    var input = document.createElement('input');
    input.className = 'text-field';

    td.appendChild(label);
    td.appendChild(input);

    return td;
  }
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

  var result = new CreateTable(arrayTitle, addNumRow, addBgRow).show();
}


var table = document.getElementById('table');
var form = document.getElementById('form');
var add = document.getElementById('add');
var addTitle = document.getElementById('add-title');
var activeField;

form.addEventListener('submit', addElement);
table.addEventListener('click', change);
