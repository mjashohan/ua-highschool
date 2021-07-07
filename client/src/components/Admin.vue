<template>
  <div>
    <h3>Hi {{ fname }} ({{ username }}),</h3><br><br>
    
    <form v-on:submit.prevent="dataIn">
        <table id="thistable">
          <tr>
            <td><label for="userID">User ID:</label></td>
            <td><input type="text" name="userID" id="userID" v-model="form.userID"></td>
          </tr>
          <tr>
            <td><label for="uname">Username: </label></td>
            <td><input type="text" name="uname" id="uname" v-model="form.username"></td>
          </tr>
          <tr>
            <td><label for="password">Password: </label></td>
            <td><input type="password" name="password" id="password" v-model="form.password"></td>
          </tr>
          <tr>
            <td><label for="firstname">First name: </label></td>
            <td><input type="text" name="firstname" id="firstname" v-model="form.fname"></td>
          </tr>
          <tr>
            <td><label for="lname">Last name: </label></td>
            <td><input type="text" name="lname" id="lname" v-model="form.lname"></td>
          </tr>
          <tr>
            <td><label for="role">Role: </label></td>
            <td>
                <select name="role" id="role" v-model="form.role">
                    <option value="teacher">teacher</option>
                    <option value="pupil">pupil</option>
                </select>
            </td>
          </tr>
          <tr>
          </tr><br><br>
          <input type="submit" value="Insert" @click="pageReload" />
        </table>
    </form><br><br><br>
    <div id="displayvalues">
        <table id="disptable">
            <tr class="fancy">
                <th>User ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
            </tr>
            <tr class="fancy" v-for="user in users" :key="user.id">
                <td>{{ user.userID }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.fname }}</td>
                <td>{{ user.lname }}</td>
                <td>{{ user.role }}</td>
            </tr>
        </table>
    </div>
    <br><br><br>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'Admin',
  data () {
    return {
      username: this.$store.getters.getUser.username,
      fname: this.$store.getters.getUser.fname,
      form: {
          userID: '',
          username: '',
          password: '',
          fname: '',
          lname: '',
          role: ''
      },
      resultname: '',
      users: []
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    },
    async dataIn() {
        let inserted = await AuthenticationService.postNewUser(this.form)
        this.resultname = inserted.data.fname
    },
    pageReload() {
        alert(`Values for ${resultname} has been inserted!`)
    },
    async showUsers() {
        let results = await AuthenticationService.getUsers()
        this.users = results.data
    }
  },
  mounted() {
      this.showUsers()
  }
}
</script>
<style scoped>
    #thistable {
        margin-left: 40%;
        margin-right: 40%;
        display: block;
    }
    tr {
        margin-left: 30%;
        color: skyblue;
        font-size: 18px;
        width: 30%;
    }
    input, select {
        border-radius: 5px;
        border: 1px solid skyblue;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
    }
    input [type=submit]{
        width: 10em;
        height: 3em;
        border-radius: 0px;
        margin-left: 42.5%;
        margin-right: auto;
        display: block;
        font-size: 14px;
    }
    #disptable {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width:100%;
    }
    .fancy {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        text-align: center;
    }
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        text-align: center;
    }
    tr:nth-child(even) {
        background-color: #dddddd;
    }
    #displayvalues {
        margin-left: 30%;
        margin-right: 30%;
        display: block;
    }

</style>