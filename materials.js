const express = require('express');
const db = require('../models/database')
const fs = require('fs')
const path = require('path')
const textract = require('textract')
const router = express.Router();


router.get('/:filename', function (req, res, next) {
    console.log(path.join(__dirname,'../public/materials/',`${req.params.filename}.pdf`))
    return res.sendFile(path.join(__dirname,'../public/materials/',`${req.params.filename}.pdf`))
})

router.post('', function(req, res, next) {


    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        let fstream = fs.createWriteStream('./public/materials/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            fs.readdir('./public/materials/', (err, files) => {
                files.forEach(f => {
                    let insert_query = `INSERT INTO materials (name,chapter,type) VALUES(V1,V2,\'document\')`
                    let select_query = `SELECT * FROM materials WHERE name=N1`
                    let names = f.split('.')
                    select_query = select_query.replace('N1', '\'' + names[1] + '\'')
                    insert_query = insert_query.replace('V1', '\'' + names[1] + '\'')
                    insert_query = insert_query.replace('V2', '\'' + names[0] + '\'')
                    db.get(select_query, (err, response) => {
                        if (err) {
                            console.log(err)
                        }
                        if (!response){
                            db.run(insert_query, (err) => {
                                if (err) {
                                    console.log(err)
                                }else{
                                    console.log('Updated materials datatable')
                                }
                            })
                        } else {
                            console.log('No new materials uploaded')
                        }
                    })

                })
            })
            res.redirect('/');           //where to go next
        });
    });

});



module.exports = router;
