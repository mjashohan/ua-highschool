import { v4 as uuidv4 } from 'uuid'
const mysql = require('mysql')
const config = require('./config/config')

// MySQL
const pool = mysql.createPool({
    multipleStatements: true,
    connectionLimit : 10,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

let users = []

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
