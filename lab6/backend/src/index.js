const express = require('express');
const cors = require('cors');
const path = require('path');
const applicantsRouter = require('./routes/applicants');
const applicantsService = require('./services/applicantsService');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data', 'applicants.json');

applicantsService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());

// Раздача статических файлов из папки public (на уровень выше)
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API маршруты
app.use('/applicants', applicantsRouter);

// Все остальные запросы отдаём index.html
app.use((req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер приемной комиссии запущен на http://localhost:${PORT}`);
});
