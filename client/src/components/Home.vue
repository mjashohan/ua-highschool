<template>
  <div>
    <h1>Hi {{ username }}</h1>
    <h1>Please wait while you are being redirected to your dashboard!</h1>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      username: this.$store.getters.getUser.username,
      role: this.$store.getters.getUser.role
    }
  },
  // async created() {
  //   if (!this.$store.getters.isLoggedIn) {
  //     this.$router.push('/login');
  //   }
   //   else {
      
    // }
  
  methods: {
    redirection () {
    if(this.role === 'teacher') {
      this.$router.push({
        name: 'Teacher'
      })
    }else if(this.role === 'pupil') {
      this.$router.push({
        name: 'Pupil'
      })
    }
    else {
      this.$router.push({
        name: 'Admin'
      })
    }
  }
},
   mounted() {
     this.redirection()
   }
}
</script>