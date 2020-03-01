const DAO = require('../dao');
const PetModel = require('../petModel');
const dao = new DAO();
const petModel = new PetModel(dao);

test('should return all pets', async () => {
  const pets = await petModel.getAll();
  expect(pets.length).toBe(3);
});

test('should add new Pet ', async () => {
  const newData = ['Puggy', 'pug', 'dog', 'ottawa', 45.2487862, -76.3606792];

  const pets = await petModel.getAll();
  const oldSize = pets.length;

  const newPet = await petModel.create(...newData);
  const newList = await petModel.getAll();

  expect(newList.length).toBe(oldSize + 1);

  await petModel.delete(newPet.id);
});

test('Get with Id Should work', async () => {
  const newData = ['Puggy', 'pug', 'dog', 'ottawa', 45.2487862, -76.3606792];
  const newPet = await petModel.create(...newData);
  const foundPet = await petModel.getWithId(newPet.id);

  expect(foundPet.name).toBe('Puggy');

  await petModel.delete(newPet.id);
});
