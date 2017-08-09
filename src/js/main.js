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

function CreateTable(rows, cols) {
  // var array = arrayTitle;
  var row = rows;
  var column = cols.split(', ');
  var num = 0;

  this.show = function() {
    for (let i = 0; i < row; i++) {
      table.appendChild(this.addRow(i));
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
      label.textContent = 'empty';
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

  if (arrayTitle === '' && addNumRow === '') {
    alert('error');
  }



  var result = new CreateTable(addNumRow, arrayTitle).show();
}


var table = document.getElementById('table');
var form = document.getElementById('form');
var add = document.getElementById('add');
var addTitle = document.getElementById('add-title');
var activeField;

form.addEventListener('submit', addElement);
table.addEventListener('click', change);
