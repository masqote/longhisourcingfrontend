<template>
<div id="app">
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
         <li class="nav-item">
         <router-link to="/login" class="nav-link" style="color:white; text-align:right;">Login</router-link>
         </li>
      </ul>
     
    </nav><br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
  </div>
</template>

<script>
  export default {
    //   data() {
    //     return {
    //       name:null,
    //       email:null
    //     }
    //   },
    //   created() {
    //   let uri = `http://192.168.10.60:8000/api/user`;
    //   this.axios.get(uri, 
    //   {
    //     headers: {
    //       'Content-type': 'application/json',
    //       'Authorization': 'bearer ' + localStorage.getItem('token')
    //     }
    //   }).then(response => {
    //     this.name = response.data.user
    //     this.name = this.name.name
    //     this.email = response.data.user
    //     this.email = this.email.email
    //     // console.log(this.email)
    //   })
    // },  
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
