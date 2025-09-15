
function createNode(value, next = null) {
  return { value: value, next: next }; // Создает объект узла с полями value и next
}

function addFront(head, value) {
  return createNode(value, head); // Создает новый узел, указывая текущую голову как next, возвращает новый узел (новую голову)
}

function addEnd(head, value) {
  if (!head) { 
    return createNode(value); // Если список пуст, создаем и возвращаем новый узел как голову
  }
  let current = head;
  while (current.next) {
    current = current.next; // Идем по списку до последнего узла (где next == null)
  }
  current.next = createNode(value); // Создаем новый узел и присваиваем его next последнему узлу
  return head; // Возвращаем голову (начало списка), она не менялась
}

function remove(head, value) {
  if (!head) return null; // Если список пуст, возвращаем null
  if (head.value === value) {
    return head.next; // Если удаляемый элемент в голове, смещаем голову на следующий узел
  }
  let current = head;
  while (current.next && current.next.value !== value) {
    current = current.next; // Идем по списку, пока следующий узел не содержит нужного значения
  }
  if (current.next && current.next.value === value) {
    current.next = current.next.next; // Пропускаем (удаляем) узел со значением value
  }
  return head; // Возвращаем голову списка
}

function find(head, value) {
  let current = head;
  while (current) {
    if (current.value === value) {
      return current; // Возвращаем первый узел со значением value
    }
    current = current.next; // Переходим к следующему узлу
  }
  return null; // Если не найдено, возвращаем null
}

function toArray(head) {
  const arr = [];
  let current = head;
  while (current) {
    arr.push(current.value); // Добавляем value текущего узла в массив
    current = current.next;  // Переходим к следующему узлу
  }
  return arr; // Возвращаем сформированный массив значений списка
}

// Пример использования:
let head = null;           // Изначально список пустой
head = addFront(head, 3);  // Добавляем 3 в начало списка
head = addFront(head, 2);  // Добавляем 2 в начало списка
head = addFront(head, 1);  // Добавляем 1 в начало списка (теперь голова с value = 1)
head = addEnd(head, 4);    // Добавляем 4 в конец списка
head = addEnd(head, 5);    // Добавляем 5 в конец списка

console.log(toArray(head)); // Выводим весь список как массив: [1, 2, 3, 4, 5]

const foundNode = find(head, 3); 
console.log(foundNode);      // Выводим узел со значением 3

head = remove(head, 2);      // Удаляем узел со значением 2 из списка

console.log(toArray(head));  // Выводим обновленный список: [1, 3, 4, 5]
