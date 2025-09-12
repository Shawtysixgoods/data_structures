# Структуры данных: односвязные и двусвязные списки, массивы и матрицы, стек, очереди и приоритетные очереди

## Односвязные списки (Singly Linked List)

**Что это:** Односвязный список — это линейная структура данных, состоящая из узлов (nodes), каждый из которых содержит данные и указатель на следующий узел в последовательности. В отличие от массивов, элементы односвязного списка не хранятся в смежных областях памяти, что делает их более гибкими для динамического управления данными.

**Где используются и зачем нужны:**

- Реализация других структур данных (стеки, очереди)
- Таблицы символов в компиляторах и интерпретаторах
- Операции отмены (undo) в текстовых редакторах
- Управление задачами в операционных системах
- Реализация музыкальных плейлистов

**Как строятся:** Односвязный список строится из узлов, где каждый узел содержит поле данных и указатель `next` на следующий узел. Первый узел называется головой (head), а последний узел указывает на `nullptr`.

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

// Структура узла односвязного списка
struct Node {
    int data;           // Данные узла
    Node* next;         // Указатель на следующий узел
};

// Глобальный указатель на начало списка
Node* head = nullptr;

// Вставка элемента в начало списка
void insertAtBeginning(int value) {
    Node* newNode = new Node;       // Создаем новый узел
    newNode->data = value;          // Записываем данные
    newNode->next = head;           // Новый узел указывает на старую голову
    head = newNode;                 // Обновляем голову списка
}

// Вставка элемента в конец списка
void insertAtEnd(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = nullptr;
    
    if (head == nullptr) {          // Если список пуст
        head = newNode;
        return;
    }
    
    // Находим последний узел
    Node* temp = head;
    while (temp->next != nullptr) {
        temp = temp->next;
    }
    
    temp->next = newNode;           // Присоединяем новый узел к концу
}

// Поиск элемента в списке
bool search(int value) {
    Node* temp = head;
    while (temp != nullptr) {
        if (temp->data == value) {
            return true;            // Элемент найден
        }
        temp = temp->next;
    }
    return false;                   // Элемент не найден
}

// Удаление первого элемента
void deleteFirst() {
    if (head == nullptr) {
        cout << "Список пуст!" << endl;
        return;
    }
    
    Node* temp = head;              // Сохраняем указатель на первый узел
    head = head->next;              // Сдвигаем голову на следующий узел
    delete temp;                    // Освобождаем память
}

// Вывод всех элементов списка
void printList() {
    Node* temp = head;
    cout << "Список: ";
    while (temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}

// Демонстрация работы односвязного списка
int main() {
    // Добавляем элементы
    insertAtBeginning(10);
    insertAtBeginning(20);
    insertAtEnd(30);
    insertAtEnd(40);
    
    printList();                    // Вывод: 20 -> 10 -> 30 -> 40 -> NULL
    
    // Поиск элементов
    cout << "Поиск 30: " << (search(30) ? "найден" : "не найден") << endl;
    cout << "Поиск 50: " << (search(50) ? "найден" : "не найден") << endl;
    
    // Удаление первого элемента
    deleteFirst();
    printList();                    // Вывод: 10 -> 30 -> 40 -> NULL
    
    return 0;
}
```


## Двусвязные списки (Doubly Linked List)

**Что это:** Двусвязный список — это тип связанного списка, где каждый узел имеет два указателя: один на следующий узел в последовательности, а другой на предыдущий узел. Эта двунаправленная связь позволяет обходить список как в прямом, так и в обратном направлении.

**Где используются и зачем нужны:**

- Текстовые редакторы для реализации операций отмены и повтора
- История браузера для навигации назад и вперед
- Музыкальные плееры для навигации по плейлисту
- Планировщик задач в операционных системах
- Системы управления базами данных для индексов
- Алгоритмы кеширования (LRU, LFU)

**Как строятся:** Двусвязный список состоит из узлов, каждый из которых содержит три поля: данные, указатель на следующий узел (`next`) и указатель на предыдущий узел (`prev`). У первого узла поле `prev` равно `nullptr`, а у последнего узла поле `next` равно `nullptr`.

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

// Структура узла двусвязного списка
struct Node {
    int data;           // Данные узла
    Node* next;         // Указатель на следующий узел
    Node* prev;         // Указатель на предыдущий узел
};

// Глобальные указатели на начало и конец списка
Node* head = nullptr;
Node* tail = nullptr;

// Вставка элемента в начало списка
void insertAtBeginning(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = head;
    newNode->prev = nullptr;
    
    if (head == nullptr) {          // Если список пуст
        head = tail = newNode;
    } else {
        head->prev = newNode;       // Старая голова указывает назад на новый узел
        head = newNode;             // Обновляем голову
    }
}

// Вставка элемента в конец списка
void insertAtEnd(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = nullptr;
    newNode->prev = tail;
    
    if (tail == nullptr) {          // Если список пуст
        head = tail = newNode;
    } else {
        tail->next = newNode;       // Старый хвост указывает на новый узел
        tail = newNode;             // Обновляем хвост
    }
}

// Удаление элемента с начала
void deleteFirst() {
    if (head == nullptr) {
        cout << "Список пуст!" << endl;
        return;
    }
    
    Node* temp = head;
    
    if (head == tail) {             // Единственный элемент в списке
        head = tail = nullptr;
    } else {
        head = head->next;
        head->prev = nullptr;
    }
    
    delete temp;
}

// Удаление элемента с конца
void deleteLast() {
    if (tail == nullptr) {
        cout << "Список пуст!" << endl;
        return;
    }
    
    Node* temp = tail;
    
    if (head == tail) {             // Единственный элемент в списке
        head = tail = nullptr;
    } else {
        tail = tail->prev;
        tail->next = nullptr;
    }
    
    delete temp;
}

// Вывод списка в прямом направлении
void printForward() {
    Node* temp = head;
    cout << "Прямой обход: ";
    while (temp != nullptr) {
        cout << temp->data << " <-> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}

// Вывод списка в обратном направлении
void printBackward() {
    Node* temp = tail;
    cout << "Обратный обход: ";
    while (temp != nullptr) {
        cout << temp->data << " <-> ";
        temp = temp->prev;
    }
    cout << "NULL" << endl;
}

// Демонстрация работы двусвязного списка
int main() {
    // Добавляем элементы
    insertAtEnd(10);
    insertAtEnd(20);
    insertAtBeginning(5);
    insertAtEnd(30);
    
    // Выводим список в обоих направлениях
    printForward();                 // Вывод: 5 <-> 10 <-> 20 <-> 30 <-> NULL
    printBackward();                // Вывод: 30 <-> 20 <-> 10 <-> 5 <-> NULL
    
    // Удаляем элементы
    deleteFirst();
    deleteLast();
    
    cout << "\nПосле удалений:" << endl;
    printForward();                 // Вывод: 10 <-> 20 <-> NULL
    
    return 0;
}
```


## Операции с массивами и матрицами

**Что это:** Массивы — это структуры данных, которые хранят элементы одного типа в последовательных ячейках памяти. Матрицы — это двумерные массивы, представляющие математические матрицы и используемые в различных вычислительных приложениях.

**Где используются и зачем нужны:**

- Линейная алгебра и математические вычисления
- Компьютерная графика и обработка изображений
- Физические симуляции
- Машинное обучение и нейронные сети
- Системы управления базами данных
- Научные вычисления

**Как строятся:** Массивы создаются путем объявления переменной с указанием типа данных и размера. Матрицы представляются как двумерные массивы, где первый индекс указывает на строку, а второй — на столбец.

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

const int MAX_SIZE = 10;

// Ввод матрицы
void inputMatrix(int matrix[][MAX_SIZE], int rows, int cols) {
    cout << "Введите элементы матрицы " << rows << "x" << cols << ":" << endl;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << "Элемент [" << i << "][" << j << "]: ";
            cin >> matrix[i][j];
        }
    }
}

// Вывод матрицы
void printMatrix(int matrix[][MAX_SIZE], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << "\t";       // Выводим с табуляцией для красоты
        }
        cout << endl;
    }
}

// Сложение матриц
void addMatrices(int mat1[][MAX_SIZE], int mat2[][MAX_SIZE], 
                 int result[][MAX_SIZE], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = mat1[i][j] + mat2[i][j];
        }
    }
}

// Умножение матриц
void multiplyMatrices(int mat1[][MAX_SIZE], int mat2[][MAX_SIZE], 
                     int result[][MAX_SIZE], int rows1, int cols1, int cols2) {
    // Инициализируем результат нулями
    for (int i = 0; i < rows1; i++) {
        for (int j = 0; j < cols2; j++) {
            result[i][j] = 0;
        }
    }
    
    // Умножение матриц
    for (int i = 0; i < rows1; i++) {
        for (int j = 0; j < cols2; j++) {
            for (int k = 0; k < cols1; k++) {
                // Произведение i-й строки на j-й столбец
                result[i][j] += mat1[i][k] * mat2[k][j];
            }
        }
    }
}

// Транспонирование матрицы
void transposeMatrix(int matrix[][MAX_SIZE], int transposed[][MAX_SIZE], 
                    int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];    // Меняем индексы местами
        }
    }
}

// Поиск максимального элемента в матрице
int findMaxElement(int matrix[][MAX_SIZE], int rows, int cols) {
    int maxVal = matrix[^0];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] > maxVal) {
                maxVal = matrix[i][j];
            }
        }
    }
    return maxVal;
}

// Демонстрация работы с матрицами
int main() {
    int mat1[MAX_SIZE][MAX_SIZE];
    int mat2[MAX_SIZE][MAX_SIZE];
    int result[MAX_SIZE][MAX_SIZE];
    int transposed[MAX_SIZE][MAX_SIZE];
    
    int rows = 2, cols = 2;
    
    cout << "=== Первая матрица ===" << endl;
    inputMatrix(mat1, rows, cols);
    
    cout << "\n=== Вторая матрица ===" << endl;
    inputMatrix(mat2, rows, cols);
    
    cout << "\n=== Первая матрица ===" << endl;
    printMatrix(mat1, rows, cols);
    
    cout << "\n=== Вторая матрица ===" << endl;
    printMatrix(mat2, rows, cols);
    
    // Сложение матриц
    cout << "\n=== Сумма матриц ===" << endl;
    addMatrices(mat1, mat2, result, rows, cols);
    printMatrix(result, rows, cols);
    
    // Умножение матриц
    cout << "\n=== Произведение матриц ===" << endl;
    multiplyMatrices(mat1, mat2, result, rows, cols, cols);
    printMatrix(result, rows, cols);
    
    // Транспонирование первой матрицы
    cout << "\n=== Транспонированная первая матрица ===" << endl;
    transposeMatrix(mat1, transposed, rows, cols);
    printMatrix(transposed, cols, rows);
    
    // Поиск максимального элемента
    cout << "\nМаксимальный элемент первой матрицы: " 
         << findMaxElement(mat1, rows, cols) << endl;
    
    return 0;
}
```


## Реализация и использование стека (LIFO)

**Что это:** Стек — это структура данных, которая хранит множественные элементы в определенном порядке, называемом LIFO (Last In, First Out — «последний вошел, первый вышел»). Это означает, что элемент, добавленный последним, будет удален первым.

**Где используются и зачем нужны:**

- Управление вызовами функций в программах
- Операции отмены (undo) в редакторах
- Вычисление арифметических выражений
- Обход деревьев в глубину (DFS)
- Проверка сбалансированности скобок
- Реализация рекурсии

**Как строятся:** Стек может быть реализован с помощью массива или связанного списка. В обоих случаях операции добавления (push) и удаления (pop) выполняются с одного конца — вершины стека.

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

const int MAX_SIZE = 100;

// Реализация стека с помощью массива
struct Stack {
    int data[MAX_SIZE];     // Массив для хранения элементов
    int top;                // Индекс вершины стека
};

// Инициализация стека
void initStack(Stack& s) {
    s.top = -1;             // Пустой стек
}

// Проверка, пуст ли стек
bool isEmpty(const Stack& s) {
    return s.top == -1;
}

// Проверка, заполнен ли стек
bool isFull(const Stack& s) {
    return s.top == MAX_SIZE - 1;
}

// Добавление элемента на вершину стека
void push(Stack& s, int item) {
    if (isFull(s)) {
        cout << "Стек переполнен!" << endl;
        return;
    }
    
    s.top++;                // Увеличиваем индекс вершины
    s.data[s.top] = item;   // Добавляем элемент
}

// Удаление элемента с вершины стека
void pop(Stack& s) {
    if (isEmpty(s)) {
        cout << "Стек пуст!" << endl;
        return;
    }
    
    s.top--;                // Уменьшаем индекс вершины
}

// Получение элемента с вершины стека без удаления
int peek(const Stack& s) {
    if (isEmpty(s)) {
        cout << "Стек пуст!" << endl;
        return -1;
    }
    
    return s.data[s.top];
}

// Вывод всех элементов стека
void printStack(const Stack& s) {
    cout << "Стек (сверху вниз): ";
    for (int i = s.top; i >= 0; i--) {
        cout << s.data[i] << " ";
    }
    cout << endl;
}

// Проверка сбалансированности скобок
bool isBalanced(const char* expression) {
    Stack s;
    initStack(s);
    
    for (int i = 0; expression[i] != '\0'; i++) {
        char ch = expression[i];
        
        // Если открывающая скобка - добавляем в стек
        if (ch == '(' || ch == '[' || ch == '{') {
            push(s, ch);
        }
        // Если закрывающая скобка - проверяем соответствие
        else if (ch == ')' || ch == ']' || ch == '}') {
            if (isEmpty(s)) {
                return false;       // Нет соответствующей открывающей скобки
            }
            
            char top = peek(s);
            pop(s);
            
            // Проверяем соответствие типов скобок
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) {
                return false;
            }
        }
    }
    
    return isEmpty(s);              // Все скобки должны быть закрыты
}

// Демонстрация работы стека
int main() {
    Stack stack;
    initStack(stack);
    
    cout << "=== Демонстрация стека ===" << endl;
    
    // Добавляем элементы в стек
    push(stack, 10);
    push(stack, 20);
    push(stack, 30);
    push(stack, 40);
    
    printStack(stack);              // Вывод: 40 30 20 10
    cout << "Вершина стека: " << peek(stack) << endl;
    
    // Удаляем элементы
    pop(stack);
    pop(stack);
    printStack(stack);              // Вывод: 20 10
    
    cout << "\n=== Проверка сбалансированности скобок ===" << endl;
    const char* expressions[] = {
        "((()))",                   // Сбалансированное
        "({[]})",                   // Сбалансированное
        "((())",                    // Не сбалансированное
        "([)]"                      // Не сбалансированное
    };
    
    for (int i = 0; i < 4; i++) {
        cout << "Выражение \"" << expressions[i] << "\": " 
             << (isBalanced(expressions[i]) ? "сбалансированное" : "не сбалансированное") << endl;
    }
    
    return 0;
}
```


## Простая очередь (FIFO)

**Что это:** Очередь — это структура данных, которая хранит множественные элементы в определенном порядке, называемом FIFO (First In, First Out — «первый вошел, первый вышел»). Элемент, который был добавлен первым, будет удален первым.

**Где используются и зачем нужны:**

- Планирование процессов в операционных системах
- Буферизация данных в сетевых протоколах
- Обход деревьев в ширину (BFS)
- Управление задачами в системах печати
- Обработка запросов в веб-серверах
- Системы обслуживания клиентов

**Как строятся:** Очередь может быть реализована с помощью массива или связанного списка. Элементы добавляются в конец очереди (rear/back) и удаляются с начала очереди (front).

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

const int MAX_SIZE = 100;

// Реализация очереди с помощью массива
struct Queue {
    int data[MAX_SIZE];     // Массив для хранения элементов
    int front;              // Индекс начала очереди
    int rear;               // Индекс конца очереди
    int size;               // Текущий размер очереди
};

// Инициализация очереди
void initQueue(Queue& q) {
    q.front = 0;
    q.rear = -1;
    q.size = 0;
}

// Проверка, пуста ли очередь
bool isEmpty(const Queue& q) {
    return q.size == 0;
}

// Проверка, заполнена ли очередь
bool isFull(const Queue& q) {
    return q.size == MAX_SIZE;
}

// Добавление элемента в конец очереди
void enqueue(Queue& q, int item) {
    if (isFull(q)) {
        cout << "Очередь переполнена!" << endl;
        return;
    }
    
    q.rear = (q.rear + 1) % MAX_SIZE;   // Циклический индекс
    q.data[q.rear] = item;
    q.size++;
}

// Удаление элемента с начала очереди
void dequeue(Queue& q) {
    if (isEmpty(q)) {
        cout << "Очередь пуста!" << endl;
        return;
    }
    
    q.front = (q.front + 1) % MAX_SIZE; // Циклический индекс
    q.size--;
}

// Получение первого элемента очереди без удаления
int getFront(const Queue& q) {
    if (isEmpty(q)) {
        cout << "Очередь пуста!" << endl;
        return -1;
    }
    
    return q.data[q.front];
}

// Получение последнего элемента очереди без удаления
int getRear(const Queue& q) {
    if (isEmpty(q)) {
        cout << "Очередь пуста!" << endl;
        return -1;
    }
    
    return q.data[q.rear];
}

// Получение размера очереди
int getSize(const Queue& q) {
    return q.size;
}

// Вывод всех элементов очереди
void printQueue(const Queue& q) {
    if (isEmpty(q)) {
        cout << "Очередь пуста" << endl;
        return;
    }
    
    cout << "Очередь (спереди назад): ";
    int index = q.front;
    for (int i = 0; i < q.size; i++) {
        cout << q.data[index] << " ";
        index = (index + 1) % MAX_SIZE;
    }
    cout << endl;
}

// Демонстрация работы очереди
int main() {
    Queue queue;
    initQueue(queue);
    
    cout << "=== Демонстрация очереди ===" << endl;
    
    // Добавляем элементы в очередь
    enqueue(queue, 10);
    enqueue(queue, 20);
    enqueue(queue, 30);
    enqueue(queue, 40);
    
    printQueue(queue);              // Вывод: 10 20 30 40
    cout << "Размер очереди: " << getSize(queue) << endl;
    cout << "Первый элемент: " << getFront(queue) << endl;
    cout << "Последний элемент: " << getRear(queue) << endl;
    
    // Удаляем элементы
    dequeue(queue);
    dequeue(queue);
    printQueue(queue);              // Вывод: 30 40
    
    // Добавляем новые элементы (демонстрация циклической очереди)
    enqueue(queue, 50);
    enqueue(queue, 60);
    printQueue(queue);              // Вывод: 30 40 50 60
    
    cout << "\n=== Симуляция обслуживания клиентов ===" << endl;
    
    // Очищаем очередь для новой демонстрации
    initQueue(queue);
    
    // Имитируем номера клиентов
    enqueue(queue, 1);  // Клиент 1
    enqueue(queue, 2);  // Клиент 2  
    enqueue(queue, 3);  // Клиент 3
    enqueue(queue, 4);  // Клиент 4
    
    cout << "Клиенты в очереди:" << endl;
    printQueue(queue);
    
    // Обслуживаем клиентов
    while (!isEmpty(queue)) {
        cout << "Обслуживаем клиента: " << getFront(queue) << endl;
        dequeue(queue);
        cout << "Остались в очереди: ";
        printQueue(queue);
    }
    
    return 0;
}
```


## Приоритетные очереди (heap)

**Что это:** Приоритетная очередь — это абстрактная структура данных, которая позволяет эффективно получать доступ к элементу с наивысшим (или наименьшим) приоритетом. Обычно реализуется с помощью двоичной кучи (binary heap), которая представляет собой полное двоичное дерево, удовлетворяющее свойству кучи.

**Где используются и зачем нужны:**

- Алгоритм Дейкстры для поиска кратчайшего пути
- Алгоритм сжатия данных Хаффмана
- Планирование задач в операционных системах
- Сортировка кучей (heap sort)
- Алгоритм Прима для минимального остовного дерева
- Балансировка нагрузки и обработка прерываний

**Как строятся:** Приоритетная очередь строится на основе двоичной кучи — полного двоичного дерева, где каждый родительский узел имеет приоритет выше (max-heap) или ниже (min-heap) своих дочерних узлов. Куча обычно реализуется с помощью массива для эффективного доступа к элементам.

**Пример кода на C++:**

```cpp
#include <iostream>
using namespace std;

const int MAX_SIZE = 100;

// Структура для приоритетной очереди (max-heap)
struct PriorityQueue {
    int data[MAX_SIZE];     // Массив для хранения элементов кучи
    int size;               // Текущий размер кучи
};

// Инициализация приоритетной очереди
void initPriorityQueue(PriorityQueue& pq) {
    pq.size = 0;
}

// Получение индекса родителя
int parent(int index) {
    return (index - 1) / 2;
}

// Получение индекса левого потомка
int leftChild(int index) {
    return 2 * index + 1;
}

// Получение индекса правого потомка
int rightChild(int index) {
    return 2 * index + 2;
}

// Восстановление свойства кучи вверх (после вставки)
void heapifyUp(PriorityQueue& pq, int index) {
    while (index > 0 && pq.data[parent(index)] < pq.data[index]) {
        // Меняем местами с родителем
        int temp = pq.data[index];
        pq.data[index] = pq.data[parent(index)];
        pq.data[parent(index)] = temp;
        
        index = parent(index);
    }
}

// Восстановление свойства кучи вниз (после удаления)
void heapifyDown(PriorityQueue& pq, int index) {
    int largest = index;
    int left = leftChild(index);
    int right = rightChild(index);
    
    // Находим наибольший элемент среди узла и его потомков
    if (left < pq.size && pq.data[left] > pq.data[largest]) {
        largest = left;
    }
    
    if (right < pq.size && pq.data[right] > pq.data[largest]) {
        largest = right;
    }
    
    // Если наибольший элемент не корень, меняем местами и продолжаем
    if (largest != index) {
        int temp = pq.data[index];
        pq.data[index] = pq.data[largest];
        pq.data[largest] = temp;
        
        heapifyDown(pq, largest);
    }
}

// Вставка элемента в приоритетную очередь
void insert(PriorityQueue& pq, int item) {
    if (pq.size >= MAX_SIZE) {
        cout << "Приоритетная очередь переполнена!" << endl;
        return;
    }
    
    // Добавляем элемент в конец массива
    pq.data[pq.size] = item;
    pq.size++;
    
    // Восстанавливаем свойство кучи
    heapifyUp(pq, pq.size - 1);
}

// Извлечение элемента с наивысшим приоритетом
int extractMax(PriorityQueue& pq) {
    if (pq.size == 0) {
        cout << "Приоритетная очередь пуста!" << endl;
        return -1;
    }
    
    int maxValue = pq.data;      // Максимальный элемент - корень
    
    // Перемещаем последний элемент на место корня
    pq.data = pq.data[pq.size - 1];
    pq.size--;
    
    // Восстанавливаем свойство кучи
    if (pq.size > 0) {
        heapifyDown(pq, 0);
    }
    
    return maxValue;
}

// Получение элемента с наивысшим приоритетом без удаления
int getMax(const PriorityQueue& pq) {
    if (pq.size == 0) {
        cout << "Приоритетная очередь пуста!" << endl;
        return -1;
    }
    
    return pq.data;
}

// Проверка, пуста ли очередь
bool isEmpty(const PriorityQueue& pq) {
    return pq.size == 0;
}

// Получение размера очереди
int getSize(const PriorityQueue& pq) {
    return pq.size;
}

// Вывод всех элементов кучи
void printHeap(const PriorityQueue& pq) {
    cout << "Куча: ";
    for (int i = 0; i < pq.size; i++) {
        cout << pq.data[i] << " ";
    }
    cout << endl;
}

// Демонстрация работы приоритетной очереди
int main() {
    PriorityQueue pq;
    initPriorityQueue(pq);
    
    cout << "=== Демонстрация приоритетной очереди (max-heap) ===" << endl;
    
    // Добавляем элементы
    insert(pq, 10);
    insert(pq, 30);
    insert(pq, 20);
    insert(pq, 5);
    insert(pq, 1);
    insert(pq, 40);
    
    cout << "После добавления элементов:" << endl;
    printHeap(pq);
    cout << "Элемент с наивысшим приоритетом: " << getMax(pq) << endl;
    cout << "Размер очереди: " << getSize(pq) << endl;
    
    // Извлекаем элементы по приоритету
    cout << "\nИзвлечение элементов по приоритету:" << endl;
    while (!isEmpty(pq)) {
        cout << "Извлекаем: " << extractMax(pq) << endl;
        if (!isEmpty(pq)) {
            printHeap(pq);
        }
    }
    
    cout << "\n=== Демонстрация планировщика задач ===" << endl;
    
    // Имитируем планировщик задач с приоритетами
    initPriorityQueue(pq);
    
    // Добавляем задачи с разными приоритетами (больше число = выше приоритет)
    cout << "Добавляем задачи:" << endl;
    insert(pq, 2);  cout << "Проверить почту (приоритет 2)" << endl;
    insert(pq, 9);  cout << "Критическая ошибка (приоритет 9)" << endl;
    insert(pq, 3);  cout << "Обновить документацию (приоритет 3)" << endl;
    insert(pq, 1);  cout << "Резервное копирование (приоритет 1)" << endl;
    insert(pq, 8);  cout << "Безопасность системы (приоритет 8)" << endl;
    
    cout << "\nЗадачи в очереди:" << endl;
    printHeap(pq);
    
    cout << "\nВыполнение задач по приоритету:" << endl;
    const char* tasks[] = {
        "Критическая ошибка",
        "Безопасность системы", 
        "Обновить документацию",
        "Проверить почту",
        "Резервное копирование"
    };
    
    int taskIndex = 0;
    while (!isEmpty(pq)) {
        int priority = extractMax(pq);
        cout << "Выполняем: " << tasks[taskIndex] << " (приоритет " << priority << ")" << endl;
        taskIndex++;
    }
    
    return 0;
}
```
