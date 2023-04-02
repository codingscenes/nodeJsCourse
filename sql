
function getPerson() {
    sqlDb
  .execute("SELECT * FROM person")
  .then(([rows, fileData]) => {
    console.log(rows, fileData);
  })
  .catch((err) => {
    console.log(err);
  });

}
// getPerson()
function insert() {
  sqlDb
    .execute("INSERT INTO person (name, age, city) VALUES (?, ?, ?)", [
      "Raju",
      33,
      "Noida",
    ])
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function findById(id) {
    sqlDb.execute("SELECT * FROM person WHERE person.id = ?", [id]) .then(([result]) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
}
