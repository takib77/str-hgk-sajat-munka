const express = require('express');
const router = express.Router();

const peopleService = require('../service/people.service');

/* GET users */
router.get('/', async (req, res) => {
    const data = await peopleService.read();
    res.json(data);
});

/* GET count */
router.get('/count', async (req, res) => {
    const data = await peopleService.read();
    const count = data.filter(p => p.vaccine !== 'none').length;
    res.json(count);
});

/* GET vaccinated */
router.get('/vaccinated', async (req, res) => {
    const data = await peopleService.read();
    const vaccinated = data.filter(p => p.vaccine !== 'none').map(d => `${d.firstName} ${d.lastName}`);
    res.json(vaccinated);
});

/* GET vaccinated vaccine name/false */
router.get('/:id/vaccinated', async (req, res) => {
    const { id } = req.params;
    const data = await peopleService.read();
    const person = data.find(p => p.id === parseInt(id, 10))
    if (!person) {
        res.sendStatus(404);
    }
    const result = person.vaccine === 'none' ? false : person.vaccine;
    res.json(result);
});

module.exports = router;