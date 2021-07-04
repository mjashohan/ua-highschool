const uuidv4 = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../lib/db.js')

let users = []

export const signup = (req, res, next) => {
    db.query(
        `SELECT * FROM admin WHERE LOWER(username) = LOWER(${db.escape(req.body.username)})`,
        (err, result) => {
            if(result.length) {
                return res.status(409).send({
                    msg: 'This username is already taken!'
                })
            } else {
                
            }
        }
    )
}

export const login = (req, res, next) => {
    db.query(
        `SELECT * FROM admin WHERE username = ${db.escape(req.body.username)}`,
        (err, result) => {
            //user does not exist
            if(err) {
                throw err
                return res.status(400).send({
                    msg: err
                })
            }
            if (!result.length) {
                return res.status(401).send({
                  msg: 'Username or password is incorrect!'
                })
              }
              // check password
                bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                // wrong password
                if (bErr) {
                    throw bErr;
                    return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                    })
          }

          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            )

        }

        return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]
          });
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          })
        }
      )
     }
    )
}

export const secretRoute = (req, res, next) => {
    res.send("Welcome to your dashboard!")
}

export const getUsers = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(`SELECT * from ${req.body}`, (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
}

export const createUser = (req, res) => {
    const user = req.body

    users.push({ ...user, id: uuidv4() })
    res.send(`User with the name ${user.firstName} added to the database!`)
}

export const getUser = (req, res) => {
    const { id } = req.params

    const foundUser = users.find((user) => user.id === id)


    res.send(foundUser)
}

export const deleteUser = (req, res) => {
    const { id } = req.params

    users = users.filter((user) => user.id !== id) 

    res.send(`User with the ID: ${id} is deleted from the database`)
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { firstName, lastName, age } = req.body
    
    const user = users.find((user) => user.id === id)

    if(firstName) user.firstName = firstName

    if(lastName) user.lastName = lastName

    if(age) user.age = age

    res.send(`User with the ID: ${id} has been updated`)
}
