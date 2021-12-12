const db = require('../models/database')
const express = require('express')

let router = express.Router()

router.get('/logout', (req, res, next) => {
    req.session.student = null
    return res.redirect('/')
})

router.post('', (req, res, next) => {
    // HEADERS
    res.setHeader('Conent-Type', 'application/x-www-form-urlencoded')
    res.status(200)

    if (!req.body.studentID || !req.body.studentName){
        //res.json({err:'Student ID or name are not specified'})
        return res.redirect('/')
    }
    let studentID = parseInt(req.body.studentID)
    let studentName = req.body.studentName
    let select_query = `SELECT * FROM users WHERE student_id = (?)`
    let insert_query = `INSERT INTO users (student_id, name) VALUES (?, ?)`
    let session = req.session
    db.get(select_query, studentID, (err, response) => {
        if (err || !response){
            return db.run(insert_query, [parseInt(studentID), studentName], (err) => {
                if (err){
                    res.status(400)
                    db.run('CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER UNIQUE, name TEXT)', (err) => console.log('Users table has been created.'))
                }
                session.student = studentName
                next()

            })
        }
        session.student = response['name']
        next()
    })

}, function (req, res, next) {
    return res.redirect('/')
})

module.exports = router
