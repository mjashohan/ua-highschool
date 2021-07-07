import Api from '@/services/Api.js'
import axios from 'axios'

const url = 'http://localhost:5000/users'

export default{
  async login (credentials) {
    console.log('Recieved credentials')
    console.log(credentials)
    const respn = await axios.post(url + '/login', credentials)
    console.log(respn)
    return respn
  },
  async getUsers () {
    const details = await axios.get(url + '/')
    return details
  },
  async postNewUser (details) {
    const insert = await axios.post(url + '/newUser', details)
    return insert
  }
}

