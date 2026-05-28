# Лабораторная работа №1. Calculator. HTML/CSS

**Цель работы:** знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS.
В ходе выполнения работы предстоит ознакомиться с кодом реализации простого калькулятора и выполнить задания по варианту.

## Задание

1. **HTML-разметка**
   - Создать файл `calculator.html`.
   - Реализовать структуру калькулятора: экран и кнопки (цифры, операции, очистка и т.д.), используя приведённый в методичке код.
   - Присвоить каждому элементу уникальный `id` для последующей работы с JavaScript.

2. **CSS**
   - Создать файл `style.css`.
   - Подключить его к HTML-документу.
   - Оформить кнопки и экран калькулятора в соответствии с примером (круглые кнопки, цвета, отступы).
   - Использовать классы для группировки стилей: `.my-btn`, `.primary`, `.secondary`, `.execute`, `.result`.

3. **Проверка**
   - Внешний вид калькулятора должен соответствовать образцу (как на скриншотах в методичке).
   - Убедиться, что все элементы отображаются корректно.

*Примечание: логика работы кнопок будет добавлена во второй лабораторной работе.*

# Лабораторная работа №2. Calculator. JavaScript

**Цель работы:** знакомство с JavaScript на примере добавления логики к калькулятору.
Необходимо реализовать функционал кнопок, чтобы калькулятор выполнял арифметические операции.

## Задание

1. **Подключение JavaScript**
   - Создать файл `script.js` и подключить его к HTML-документу.

2. **Доступ к элементам**
   - Получить ссылки на экран калькулятора (`#result`) и на все кнопки.

3. **Реализация логики**
   - Написать обработчики событий для цифровых кнопок, чтобы формировать числа `a` и `b`.
   - Добавить обработчики для кнопок операций (`+`, `-`, `x`, `/`), сохраняя выбранное действие.
   - Реализовать кнопку очистки `C`, обнуляющую все данные.
   - Реализовать кнопку `=`, которая выполняет выбранную операцию и выводит результат на экран.
   - Учесть возможность ввода десятичной точки (`.`).

4. **Запуск**
   - Использовать расширение **Live Server** в VS Code для проверки работы калькулятора в браузере.

*Все переменные, функции и обработчики должны быть описаны в файле `script.js` согласно методичке.*

# Лабораторная работа №3. Moon Reports Frontend. JavaScript

## Цель работы
Изучение модульной структуры frontend-приложения на JavaScript, построение интерфейса из страниц и компонентов, работа с карточками и переходами между страницами.

## Задание
Разработать клиентское приложение по теме «Отчёты по добыче ресурсов на Луне».

Необходимо реализовать:
- главную страницу со списком карточек;
- отдельную страницу просмотра выбранной карточки;
- модульную структуру проекта с разделением на pages и components;
- стилизацию интерфейса;
- переход между страницами без перезагрузки браузера.

## Реализованный функционал
- создана главная страница со списком отчётов;
- реализована страница просмотра конкретного отчёта;
- добавлена кнопка возврата назад;
- проект разделён на pages и components;
- реализовано тематическое оформление в космическом стиле;
- добавлены 3D-модели по теме отчётов.

## Запуск
Для запуска используется расширение Live Server в VS Code.

Порядок запуска:
1. открыть папку `labs/lab_3` в VS Code;
2. открыть файл `index.html`;
3. нажать `Go Live`.

## Структура проекта
- `index.html` — корневой HTML-файл;
- `main.js` — точка входа;
- `styles.css` — стили;
- `pages` — страницы приложения;
- `components` — переиспользуемые компоненты;
- `three` — логика 3D-сцен.

# Лабораторная работа №4. Moon Reports API. Node.js + Express

## Цель работы
Изучение основ backend-разработки на Node.js и Express, создание собственного REST API с хранением данных в JSON-файле.

## Задание
Разработать веб-сервис для работы с сущностью «Отчёты по добыче ресурсов на Луне».

Данные должны храниться в JSON-файле.
Необходимо реализовать 5 методов API:
- получение списка записей с фильтрацией;
- получение одной записи по id;
- добавление новой записи;
- редактирование записи;
- удаление записи.

Тестирование выполняется через Postman.

## Реализованный функционал
- создан Express-сервер;
- реализованы маршруты API;
- данные хранятся в `reports.json`;
- выполнено разделение на routes, controllers и services;
- реализована фильтрация списка по query-параметрам;
- предусмотрены коды состояния 200, 201, 204, 400, 404, 500.

## Методы API
- `GET /reports` — получить список отчётов;
- `GET /reports/:id` — получить отчёт по id;
- `POST /reports` — добавить отчёт;
- `PATCH /reports/:id` — изменить отчёт;
- `DELETE /reports/:id` — удалить отчёт.

## Запуск
1. открыть папку `labs/lab_4` в терминале;
2. выполнить `npm install`;
3. выполнить `npm run dev`.

Сервер запускается по адресу `http://localhost:3000`.

## Структура проекта
- `src/index.js` — точка входа сервера;
- `src/routes` — маршруты;
- `src/controllers` — обработчики запросов;
- `src/services` — бизнес-логика и работа с JSON;
- `src/data/reports.json` — хранилище данных.

# Лабораторная работа №5. Moon Reports Frontend with XHR and CORS. JavaScript

## Цель работы
Изучение AJAX-взаимодействия frontend-приложения с backend API с использованием XMLHttpRequest, а также знакомство с проблемой CORS.

## Задание
Продолжить лабораторную работу №3:
- подключить frontend к backend API, созданному в лабораторной работе №4;
- использовать XMLHttpRequest для получения данных;
- реализовать фильтрацию карточек по названию;
- добавить страницу просмотра карточки по id;
- добавить страницу добавления и редактирования карточки;
- подготовить поля ввода для формы добавления/редактирования.

В данной лабораторной кнопка сохранения отсутствует, она будет добавлена в лабораторной работе №6.

## Реализованный функционал
- frontend подключён к API из 4-й лабораторной;
- реализована загрузка списка отчётов через XHR;
- реализована фильтрация по названию через query-параметр;
- реализована страница просмотра отчёта;
- реализована страница добавления отчёта;
- реализована страница редактирования с заполнением существующих данных;
- показана проблема CORS и её обход через CORS Unblock.

## Особенности демонстрации
Для показа лабораторной необходимо:
- запустить backend 4-й лабораторной;
- запустить frontend через Live Server;
- открыть DevTools → Network → XHR;
- показать ошибку при выключенном CORS Unblock;
- включить CORS Unblock и повторить запрос.

## Запуск
1. запустить backend из лабораторной работы №4;
2. открыть папку `labs/lab_5` в VS Code;
3. открыть `index.html`;
4. нажать `Go Live`.

## Структура проекта
- `pages` — страницы приложения;
- `components` — переиспользуемые элементы интерфейса;
- `modules/ajax.js` — XHR-запросы;
- `modules/reportUrls.js` — адреса API;
- `modules/reportApi.js` — методы работы с API.


# Лабораторная работа №6. Moon Reports Frontend (fetch + async/await + Bundler)

## Оглавление
1. [Цель лабораторной работы](#1-цель-лабораторной-работы)
2. [Часть 1. Замена XHR на fetch](#2-часть-1-замена-xhr-на-fetch)
3. [Часть 2. Сборка фронтенда через Vite](#3-часть-2-сборка-фронтенда-через-vite)
4. [Часть 3. Раздача статики через бэкенд](#4-часть-3-раздача-статики-через-бэкенд)
5. [Скриншоты работающего приложения](#5-скриншоты-работающего-приложения)
6. [Важные части кода](#6-важные-части-кода)
7. [Структура проекта](#7-структура-проекта)
8. [Вывод](#8-вывод)

---

## 1. Цель лабораторной работы
- Переписать фронтенд с XHR на fetch + async/await.
- Использовать Promise для асинхронной работы.
- Добавить кнопку «Сохранить» для добавления новых лунных отчётов.
- Собрать фронтенд через bundler (Vite).
- Раздача фронтенда через бэкенд для устранения проблем с CORS.

---

## 2. Часть 1. Замена XHR на fetch

### main.js
```javascript
import { getReports } from './modules/reportApi.js';

async function loadReports() {
  const reports = await getReports();
  const container = document.getElementById('reportsContainer');
  container.innerHTML = '';
  reports.forEach(r => {
    const div = document.createElement('div');
    div.className = 'report-card';
    div.innerHTML = `<strong>${r.title}</strong><br>${r.description}<br>${r.category}`;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', loadReports);
````

### modules/reportApi.js

```javascript
import { API_BASE_URL } from './reportUrls.js';

export async function getReports(query = '') {
  try {
    const res = await fetch(`${API_BASE_URL}?title=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error('Ошибка получения отчётов:', err);
    return [];
  }
}

export async function addReport(reportData) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reportData)
    });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error('Ошибка добавления отчёта:', err);
  }
}
```

### pages/add.html

```html
<form id="addReportForm">
  <input id="titleInput" placeholder="Название" required>
  <textarea id="descriptionInput" placeholder="Описание"></textarea>
  <input id="categoryInput" placeholder="Категория">
  <button type="submit" id="saveButton">Сохранить</button>
</form>

<script type="module">
import { addReport } from '../modules/reportApi.js';

document.getElementById('saveButton').addEventListener('click', async (e) => {
  e.preventDefault();
  const newReport = {
    title: document.getElementById('titleInput').value,
    description: document.getElementById('descriptionInput').value,
    category: document.getElementById('categoryInput').value,
    status: 'Черновик'
  };
  const result = await addReport(newReport);
  if (result) alert(`Добавлен отчёт с ID: ${result.id}`);
});
</script>
```

---

## 3. Часть 2. Сборка фронтенда через Vite

**vite.config.js**

```javascript
export default {
  build: {
    outDir: './public',
    emptyOutDir: true
  }
};
```

**package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Команды:**

* `npm run dev` – запуск dev сервера
* `npm run build` – сборка bundle
* `npm run preview` – просмотр собранного проекта

---

## 4. Часть 3. Раздача статики через бэкенд

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

**Процесс сборки и раздачи:**

```bash
cd lab_6
npm run build
cp -r public/* ../lab_4_bundle/public/
cd ../lab_4_bundle
npm run dev
```

---


## 5. Важные части кода

* main.js – загрузка списка карточек через fetch
* modules/reportApi.js – методы getReports и addReport
* add.html – форма добавления с кнопкой «Сохранить»

---

## 6. Структура проекта

```
lab_6/
├── index.html
├── main.js
├── modules/
│   ├── reportApi.js
│   └── reportUrls.js
├── pages/
│   ├── add.html
│   ├── list.html
│   └── view.html
├── components/
│   └── reportCard.js
├── styles.css
└── screenshots/
    ├── home.png
    ├── add.png
    └── list.png
```

---

## 7. Вывод

* XHR заменён на fetch с async/await.
* Кнопка «Сохранить» добавляет отчёты на backend.
* Фронтенд собран через Vite в bundle.
* Раздача фронтенда через бэкенд устранила проблему CORS.

---
