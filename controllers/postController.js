const db = require('../config/databaseConfig')
const multer = require('multer')
const {format} = require('date-fns')
const helpers = require('../utils/helpers')


const fs = require('fs');

const getPosts = () => {
    db.query('SELECT * FROM Posts', (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getUserPosts = () => {
    db.query(`SELECT * FROM Posts WHERE post_owner=${id}`, (err, result) => {
        if(err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result )
        }
    })
}

const uploadPost = () => {
    const username = req.query.username
    ;
///upload file
const post = {
    location: req.file.path,
    owner: req.body.owner,
    date_created: helpers.dateToDb()
  };

///Create post in db
db.query(`INSERT post_content, post_created_date, post_owner INTO Posts VALUES '${post_content}', '${post_created_date}', '${post_owner}'`)


    post_content
    post_created_date
    post_owner



 db.query()

} 


module.exports = {
    getPosts,
    getUserPosts,
    uploadPost,

}