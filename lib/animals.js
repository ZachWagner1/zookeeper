const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;

    if (query.personalityTraits) {
         // save personalityTraits as a dedicated array
         // if personalityTraits is a string , place it into a new array and save
         if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
         } else {
            personalityTraitsArray = query.personalityTraits;
         }

         // loop through each train in the personalityTraits array
         // Check the trait against each animal in the filteredResults array.
         // Remember, it is initially a copy of the animalsArray,
         // but here we're updating it for each trait in the .forEach() loop.
         // For each trait being targeted by the filter, the filteredResults
         // array will then contain only the entries that contain the trait,
         // so at the end we'll have an array of animals that have every one 
         // of the traits when the .forEach() loop is finished.
         personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
         });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }

    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }

    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }

    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }

    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};