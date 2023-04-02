const express = require('express');
const sqldb = require('./connection/database');

const app = express();

function getPerson() {
  sqldb.execute('SELECT * FROM person').then(([rows, fileData]) => {
    console.log(rows);
  });
}

// SQL INJECTION - ATTACK PATTERN
function insert() {
  // const query =
  //   'INSERT INTO person (full_name, age, city, gender) VALUES (?, ?, ? , ?)';
  // const values = ['Mohit', 22, 'Noida', 'Male'];
  sqldb
    .execute(
      'INSERT INTO person (full_name, age, city, gender) VALUES (?, ?, ? , ?)',
      ['Rahul', 43, 'Pune', 'Male']
    )
    .then((result) => {
      console.log(result);
    });
}

function findById(id) {
  sqldb
    .execute('SELECT * FROM person WHERE person.id = ?', [id])
    .then(([row, fileData]) => {
      console.log(row);
    })
    .catch((err) => console.log(err));
}

function deleteById(id) {
  sqldb
    .execute('DELETE FROM person WHERE person.id = ?', [id])
    .then(([row, fileData]) => {
      console.log(row);
    })
    .catch((err) => console.log(err));
}

// getPerson();
// insert();
// findById(3);
deleteById(3);

app.use((req, res, next) => {
  res.write('<h1>Hello guys!</h1>');
});

app.listen(3000);
