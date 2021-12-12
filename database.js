const sqlite3 = require('sqlite3').verbose()

const DBFILE = 'db.sqlite'

let db = new sqlite3.Database(DBFILE, (err) => {
    if (err) {
        console.log(err.msg)
        throw err
    }
    console.log('Connected to the database.')

})

module.exports = db
