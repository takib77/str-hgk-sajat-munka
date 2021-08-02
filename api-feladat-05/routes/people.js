const express = require('express');
const router = express.Router();
const createError = require("http-errors");

const People = require('../models/people.model');

/* GET users */
router.get('/', async (req, res, next) => {
    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };

    res.json(data);
});

/* GET count */
router.get('/count', async (req, res, next) => {
    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };
    const count = data.filter(p => p.vaccine !== 'none').length;

    res.json(count);
});

/* GET vaccinated */
router.get('/vaccinated', async (req, res, next) => {
    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };

    const vaccinated = data.filter(p => p.vaccine !== 'none').map(d => `${d.firstName} ${d.lastName}`);
    if (!vaccinated) {
        return next(new createError.NotFound("Vaccine is not found!"));
    };

    res.json(vaccinated);
});

/* GET vaccinated vaccine name/false */
router.get('/:id/vaccinated', async (req, res, next) => {
    const { id } = req.params;
    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };

    const person = data.find(p => p.id === parseInt(id, 10))
    if (!person) {
        res.sendStatus(404);
        return next(new createError.NotFound("Person is not found!"));
    }

    const result = person.vaccine === 'none' ? false : person.vaccine;
    res.json(result);
});

/* Create a new People item */
router.post('/', async (req, res, next) => {
    const { firstName, lastName, vaccine } = req.body;
    if (!firstName || !lastName || !vaccine) {
        return next(new createError.BadRequest("Missing properties!"));
    }

    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };

    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson);
});


/* Update a person item vaccine */
router.put('/:id/:vaccine', async (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    if (!id || !vaccine) {
        return next(new createError.BadRequest("Missing properties!"));
    }

    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };
    const index = data.findIndex(p => p.id === parseInt(id));

    data[index].id = id;
    data[index].vaccine = vaccine;

    res.json(data[index]);
});


/* Delete a People item by vaccine type */
router.delete('/:vaccine', async (req, res, next) => {
    const vaccine = req.params.vaccine;
    if (!vaccine) {
        return next(new createError.NotFound("Vaccine not found!"));
    }
    const data = await People.find();
    if (!data) {
        return next(new createError.NotFound("Database is not found!"));
    };
    data.forEach((people, index) => {
        if (people.vaccine === vaccine) {
            data.splice(index, 1);
        }
    });

    res.json({});
});

module.exports = router;
