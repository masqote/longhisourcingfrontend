<style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
<template>
  <div class="tes">
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="login.email" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" v-model="login.password" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>
<script>
  export default {
      data() {
        return {
          login:{},
        }
      },
      created() {
      let uri = `http://192.168.10.60:8000/api/alluser`;
      this.axios.get(uri).then(response => {
        this.posts = response.data.user
        console.log(this.posts)
      })
    },
    methods: {
      addPost(){
         let uri = 'http://192.168.10.60:8000/api/login';
         
           this.axios.post(uri, this.login).then((response) => {
            var token = response.data.token; // get token untuk nanti di store kedalam localStorage
            var email = this.login.email;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
           this.$router.push({name: 'posts'});
        console.log(localStorage);
        });
      }
    }
   
  }
</script>