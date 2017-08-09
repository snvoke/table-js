![alt text](images/img.jpg)

Методы доступны, через создание конструктора в консоли или в самом коде.
Пример,
var result = new CreateTable('lorem, lorem1, lorem2', 6, '0, 0, 0').show();
result.cleanTable();

доступны следующие методы:
- insert_row(row_after_index) - добавляет строку после указанной в параметре строки.
- add_row() - добавляет строку в конец таблицы.
- get_data() - получает JSON объект данных из таблицы.
- clean_table() - очищает таблицу от данных

![alt text](images/img1.jpg)

[Демо](http://snvoke.github.io/table/)
