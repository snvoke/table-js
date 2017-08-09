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

  var row = rows;
  var column = cols;

  this.show = function() {
    for (let i = 0; i < row; i++) {
      table.appendChild(this.addRow(i));
    }
    return this;
  }

  this.addRow = function(n) {
    var tr = document.createElement('tr');
    for (let i = 0; i < column; i++) {
      tr.appendChild(this.addColumn(i));
    }
    return tr;
  }

  this.addColumn = function(n) {
    var td = document.createElement('td');

    var label = document.createElement('label');
    label.className = 'text';
    label.textContent = n;

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

  // var array = arrayTitle.split(', ');

  var result = new CreateTable(addNumRow, 3).show();
}


var table = document.getElementById('table');
var form = document.getElementById('form');
var add = document.getElementById('add');
var addTitle = document.getElementById('add-title');
var activeField;

form.addEventListener('submit', addElement);
table.addEventListener('click', change);
