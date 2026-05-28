const fs = require('fs');
const readData = (filePath) => { try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (err) { console.error('Ошибка чтения:', err); return []; } };
const writeData = (filePath, data) => { try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8'); } catch (err) { console.error('Ошибка записи:', err); } };
module.exports = { readData, writeData };
