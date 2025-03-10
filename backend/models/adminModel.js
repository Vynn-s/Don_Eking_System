const db = require('../db');

class Admin {
  constructor({ firstname, lastname, email, password }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  async save() {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO admins (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [this.firstname, this.lastname, this.email, this.password], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admins WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = Admin;