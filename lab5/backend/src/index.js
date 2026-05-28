const express = require('express');
const cors = require('cors');
const path = require('path');
const applicantsRouter = require('./routes/applicants');
const applicantsService = require('./services/applicantsService');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data/applicants.json');

applicantsService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/applicants', applicantsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер приемной комиссии запущен на http://localhost:${PORT}`);
});
