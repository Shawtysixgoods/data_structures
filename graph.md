
#### Что такое графы и для чего они нужны

Граф — это математическая структура, состоящая из вершин (узлов) и рёбер (связей между ними). Графы позволяют моделировать отношения между объектами: от маршрутов дорог, социальных сетей, до структуры файловой системы, связей в Интернет или логистических сетях.

В программировании графы применяют для:

- поиска маршрутов и путей,
- анализа связности и зависимости,
- моделирования любых сетей (коммуникаций, транспорта, организации данных и др.).


#### Представление графа в коде (включая ООП)

Наиболее распространённые способы представления графа:

- Матрица смежности: двумерный массив, где строки и столбцы — вершины, а значения — наличие рёбер.
- Список смежности: у каждой вершины есть свой список соседей.
- Объектно-ориентированное представление: создаётся класс Graph с методами добавления вершин и рёбер.


#### Базовые методы работы с графом

- Добавление/удаление вершины или ребра
- Получение списка соседей вершины
- Проверка существования ребра
- Алгоритмы обхода: поиск в ширину (BFS) и в глубину (DFS).


#### BFS (поиск в ширину)

- Исследует все вершины текущего уровня, затем следующий уровень.
- Использует очередь для хранения вершин.
- Применяется для поиска кратчайшего пути в невзвешенном графе.


#### DFS (поиск в глубину)

- Глубоко "ныряет" по одному пути, пока возможно, затем возвращается назад.
- Использует стек (явный или рекурсию).
- Применяется для поиска пути, проверки цикличности, компонент связности.

***

### Код: JavaScript

#### Представление графа (ООП)

```javascript
// Класс Graph для ориентированного графа
class Graph {
    constructor() {
        // Храним смежность с помощью объекта: ключ - вершина, значение - массив соседей
        this.adjacencyList = {};
    }
    // Добавление вершины
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    // Добавление ребра
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
    }
}
```


#### BFS (поиск в ширину)

```javascript
// Поиск в ширину от указанной вершины
function bfs(graph, start) {
    const queue = [start];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex); // Обрабатываем вершину

        for (let neighbor of graph.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```


#### DFS (поиск в глубину)

```javascript
// Рекурсивный обход в глубину
function dfs(graph, vertex, visited = new Set()) {
    console.log(vertex);
    visited.add(vertex);
    for (let neighbor of graph.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```


***

### Код: C++

#### Представление графа (ООП)

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

class Graph {
    int V; // Количество вершин
    list<int> *adj; // Массив списков смежности
public:
    Graph(int V) {
        this->V = V;
        adj = new list<int>[V];
    }
    // Добавить ребро
    void addEdge(int v, int w) {
        adj[v].push_back(w);
    }
    // Доступ к спискам смежности (для обхода)
    list<int>* getAdj() { return adj; }
};
```


#### BFS (поиск в ширину)

```cpp
void bfs(Graph& g, int s) {
    vector<bool> visited(g.V, false);
    list<int> queue;
    visited[s] = true;
    queue.push_back(s);

    while(!queue.empty()) {
        s = queue.front();
        cout << s << " ";
        queue.pop_front();

        for(auto adjVertex : g.getAdj()[s]) {
            if(!visited[adjVertex]) {
                visited[adjVertex] = true;
                queue.push_back(adjVertex);
            }
        }
    }
}
```


#### DFS (поиск в глубину)

```cpp
void dfsUtil(Graph& g, int v, vector<bool> &visited) {
    visited[v] = true;
    cout << v << " ";

    for(auto neighbor : g.getAdj()[v]) {
        if(!visited[neighbor]) {
            dfsUtil(g, neighbor, visited);
        }
    }
}

// Обёртка для DFS
void dfs(Graph& g, int start) {
    vector<bool> visited(g.V, false);
    dfsUtil(g, start, visited);
}
```


***

### главное

- Граф — универсальный способ хранить структуру "объекты + связи" (например, кто с кем дружит, куда можно уехать из города и др.).
- Использование: любые задачи, где нужны связи или поиск пути.
- Программно граф удобно задавать списками соседей или классами.
- BFS нужен чтобы искать пути от одной точки ко всем другим "волнами".
- DFS нужен чтобы "погружаться" по святым, пока не закончится путь, — глубоко исследовать структуры и искать, например, циклы.

***
