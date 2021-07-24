const fsp = require('fs').promises;
const { join } = require('path');

const read = async () => {
    const jsonData = await fsp.readFile(
        join('.', 'database', 'people.json'), 'utf8');

    return JSON.parse(jsonData);
}

module.exports = { read };