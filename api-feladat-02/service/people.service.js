const fsp = require('fs').promises;
const { join } = require('path');

const jsonPath = join('.', 'database', 'people.json');

const read = async () => {
    const jsonData = await fsp.readFile(jsonPath, 'utf8');
    return JSON.parse(jsonData);
}

const save = async (list) => {
    const newList = JSON.stringify(list);
    await fsp.writeFile(jsonPath, newList);
}

module.exports = { read, save };