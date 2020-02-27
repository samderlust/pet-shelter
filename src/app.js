const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const DAO = require('./dao');
const PetModel = require('./petModel');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const dao = new DAO();
const petModel = new PetModel(dao);
petModel.createTable();

app.use(cors());
app.get('/api/pets', async (req, res, next) => {
  try {
    const pets = await petModel.getAll();
    res.status(200).json(pets);
  } catch (error) {
    next({
      status: 400,
      message: err
    });
  }
});

app.post('/api/pet', async (req, res, next) => {
  const { name, breed, type, location, latitude, longitude } = req.body;

  try {
    const existPet = await petModel.checkExist(name, breed);
    if (existPet) {
      return next({
        status: 400,
        message: `This name already exists for this breed`
      });
    }
    if (location === '' || latitude === '' || longitude === '') {
      return next({
        status: 400,
        message: `Location informationo is invalid`
      });
    }
    const pet = await petModel.create(
      name,
      breed,
      type,
      location,
      latitude,
      longitude
    );
    res.status(201).json(pet);
  } catch (error) {
    next({
      status: 400,
      message: error
    });
  }
});

app.get('/api/pet/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const pet = await petModel.getWithId(id);
    if (pet) res.json(pet);
    else {
      next({
        status: 404,
        message: 'The Pet that you are looking for is not available'
      });
    }
  } catch (error) {
    next({
      status: 400,
      message: err
    });
  }
});

const errorHandler = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Opp! Something went wrong..'
    }
  });
};

app.use(errorHandler);

app.listen(port, () => console.log('Pet Shelter is running on ' + port));
