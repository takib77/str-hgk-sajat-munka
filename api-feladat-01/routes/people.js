const express = require('express');
const router = express.Router();

const peopleService = require('../service/people.service');

/* GET users */
router.get('/', async (req, res, next) => {
    const data = await peopleService.read();
    res.json(data);
});

/* GET count */
router.get('/count', async (req, res, next) => {
    const data = await peopleService.read();
    const count = data.filter(p => p.vaccine !== 'none').length;
    res.json(count);
    // res.json(`Oltottak száma: ${count}`);
});

/* GET vaccinated */
router.get('/vaccinated', async (req, res, next) => {
    const data = await peopleService.read();
    const vaccinated = data.filter(p => p.vaccine !== 'none').map(d => `${d.firstName} ${d.lastName}`);
    res.json(vaccinated);
});

module.exports = router;
