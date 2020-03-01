class PetModel {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS petShelters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      type VARCHAR(20) NOT NULL,
      breed VARCHAR(100) NOT NULL,
      location VARCHAR(100) NOT NULL,
      latitude NUMERIC NOT NULL,
      longitude NUMERIC NOT NULL)
      `;
    return this.dao.run(sql);
  }

  create(name, breed, type, location, latitude, longitude) {
    const sql =
      'INSERT INTO petShelters (name, breed, type, location, latitude, longitude) VALUES (?, ?,?, ?, ?, ? );';
    return this.dao.run(sql, [
      name,
      breed,
      type,
      location,
      latitude,
      longitude
    ]);
  }

  getAll() {
    return this.dao.all(
      'SELECT id, name, type, breed,longitude, latitude FROM petShelters;'
    );
  }

  getWithId(id) {
    return this.dao.get('SELECT * FROM petShelters WHERE id = ?;', [id]);
  }

  checkExist(name, breed) {
    return this.dao.get(
      'SELECT * FROM petShelters WHERE name =? AND breed = ?',
      [name, breed]
    );
  }

  delete(id) {
    return this.dao.get('DELETE FROM petShelters WHERE id = ?', [id]);
  }
}
module.exports = PetModel;
