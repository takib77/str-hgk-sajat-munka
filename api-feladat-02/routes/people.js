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
});

/* GET vaccinated */
router.get('/vaccinated', async (req, res, next) => {
    const data = await peopleService.read();
    const vaccinated = data.filter(p => p.vaccine !== 'none').map(d => `${d.firstName} ${d.lastName}`);
    res.json(vaccinated);
});

/* GET vaccinated vaccine name/false */
router.get('/:id/vaccinated', async (req, res, next) => {
    const { id } = req.params;
    const data = await peopleService.read();
    const person = data.find(p => p.id === parseInt(id, 10))
    if (!person) {
        res.sendStatus(404);
    }
    const result = person.vaccine === 'none' ? false : person.vaccine;
    res.json(result);
});

/* Create a new People item */
router.post('/', async (req, res, next) => {
    const { firstName, lastName, vaccine } = req.body;
    if (!firstName || !lastName || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties")
        );
    }

    const data = await peopleService.read();
    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);

    await peopleService.save(data);
    res.status(201);
    res.json(newPerson);
});


/* Update a person item vaccine */
router.put('/:id/:vaccine', async (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    if (!id || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const data = await peopleService.read();
    const index = data.findIndex(p => p.id === parseInt(id));

    data[index].id = id;
    data[index].vaccine = vaccine;

    await peopleService.save(data);
    res.json(data[index]);
});


/* Delete a People item by vaccine type */
router.delete('/:vaccine', async (req, res, next) => {
    const vaccine = req.params.vaccine;
    if (!vaccine) {
        return next(new createError.NotFound("Vaccine not found!"));
    }
    const data = await peopleService.read();
    data.forEach((people, index) => {
        if (people.vaccine === vaccine) {
            data.splice(index, 1);
        }
    });

    await peopleService.save(data);
    res.json({});
});

module.exports = router;
