const fileService = require('./fileService');
let dataFilePath;
const init = (filePath) => { dataFilePath = filePath; };
const findAll = (specialty, minScore, fullName) => {
    let applicants = fileService.readData(dataFilePath);
    if (specialty) applicants = applicants.filter(a => a.specialty.toLowerCase().includes(specialty.toLowerCase()));
    if (minScore) { const min = parseInt(minScore); applicants = applicants.filter(a => { const avg = (a.examScores.math + a.examScores.physics + a.examScores.russian) / 3; return avg >= min; }); }
    if (fullName) applicants = applicants.filter(a => a.fullName.toLowerCase().includes(fullName.toLowerCase()));
    return applicants;
};
const findOne = (id) => { const applicants = fileService.readData(dataFilePath); return applicants.find(a => a.id === id); };
const create = (applicantData) => {
    const applicants = fileService.readData(dataFilePath);
    const newId = applicants.length > 0 ? Math.max(...applicants.map(a => a.id)) + 1 : 1;
    const newApplicant = { id: newId, ...applicantData, status: applicantData.status || "на рассмотрении" };
    applicants.push(newApplicant);
    fileService.writeData(dataFilePath, applicants);
    return newApplicant;
};
const update = (id, updateData) => {
    const applicants = fileService.readData(dataFilePath);
    const index = applicants.findIndex(a => a.id === id);
    if (index === -1) return null;
    applicants[index] = { ...applicants[index], ...updateData };
    fileService.writeData(dataFilePath, applicants);
    return applicants[index];
};
const remove = (id) => {
    const applicants = fileService.readData(dataFilePath);
    const filtered = applicants.filter(a => a.id !== id);
    if (filtered.length === applicants.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};
module.exports = { init, findAll, findOne, create, update, remove };
