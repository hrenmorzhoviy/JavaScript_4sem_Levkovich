const applicantsService = require('../services/applicantsService');

const getAllApplicants = (req, res) => {
    const { specialty, minScore, fullName } = req.query;
    const applicants = applicantsService.findAll(specialty, minScore, fullName);
    res.json(applicants);
};

const getApplicantById = (req, res) => {
    const id = parseInt(req.params.id);
    const applicant = applicantsService.findOne(id);
    if (!applicant) {
        return res.status(404).json({ error: 'Абитуриент не найден' });
    }
    res.json(applicant);
};

const createApplicant = (req, res) => {
    const { fullName, specialty, examScores, status } = req.body;
    if (!fullName || !specialty || !examScores) {
        return res.status(400).json({ error: 'Обязательные поля: fullName, specialty, examScores' });
    }
    if (!examScores.math || !examScores.physics || !examScores.russian) {
        return res.status(400).json({ error: 'examScores должен содержать math, physics, russian' });
    }
    const newApplicant = applicantsService.create({ fullName, specialty, examScores, status });
    res.status(201).json(newApplicant);
};

const updateApplicant = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = applicantsService.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ error: 'Абитуриент не найден' });
    }
    res.json(updated);
};

const deleteApplicant = (req, res) => {
    const id = parseInt(req.params.id);
    const success = applicantsService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Абитуриент не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllApplicants,
    getApplicantById,
    createApplicant,
    updateApplicant,
    deleteApplicant
};
