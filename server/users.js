const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('./lib/db.js')
const config = require('./config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

const router = express.Router()

router.get('/', (req, res) => {

    db.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(`SELECT userID, username, fname, lname, role FROM user`, (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

router.post('/login', (req, res) => {
//    let username = '' 
//    let password  = ''
   var user = req.body.username
   var pass = req.body.password
    db.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT username, password, fname, role FROM user WHERE username = ?', [user], (err, rows) => {
            connection.release()
            //username = rows[0]['username']
            //password = rows[0]['password']
             if(!err) {
                var isUsernameValid = user === rows[0]['username']
                if(!isUsernameValid) {
                    return res.status(403).send({
                        error: 'Kireh, bhul korso'
                    })
                }
                var isPasswordValid = pass === rows[0]['password']
                if(!isPasswordValid) {
                    return res.status(403).send({
                        error: 'Password was incorrect'
                    })
                }
                console.log(rows)
                return res.status(200).send({
                    msg: 'Logged in!',
                    user: rows[0]
                })
                jwtSignUser(rows[0])
                
                    } else {
                        console.log(err)
                    }
        })  
    })
})

router.post('/newUser', (req, res) => {
    const values = req.body
    db.getConnection((err, connection) => {
        if(err) throw err

        connection.query('INSERT INTO user SET ?', values, (err, rows) => {
            if(!err) {
                return res.status(200).send({
                    msg: `Successfully inserted record of ${rows[0]['fname']}!`,
                    det: rows[0]
                })
            }
            else{
                console.log(err)
            }
        })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    const foundUser = users.find((user) => user.id === id)


    res.send(foundUser)
})

router.get('secret-route', (req, res, next) => {
    res.send("Welcome to your dashboard!")
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    users = users.filter((user) => user.id !== id) 

    res.send(`User with the ID: ${id} is deleted from the database`)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const { firstName, lastName, age } = req.body
    
    const user = users.find((user) => user.id === id)

    if(firstName) user.firstName = firstName

    if(lastName) user.lastName = lastName

    if(age) user.age = age

    res.send(`User with the ID: ${id} has been updated`)
})

module.exports = router