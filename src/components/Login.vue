<template>
  <div class="container w-25 mt-5">
    <!-- Error alert -->
    <div v-if="error" class="alert alert-danger mx-auto" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Login form -->
    <h1 class="h3 mb-3 fw-normal">Please login</h1>
    <form>
      <div class="form-floating mb-3">
        <input v-model="email" type="email" class="form-control" id="input-email" placeholder="example">
        <label for="input-email">Email address</label>
      </div>

      <div class="form-floating  mb-3">
        <input v-model="password" type="password" class="form-control" id="input-password" placeholder="example">
        <label for="input-password">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button :disabled="isLoading" class="w-100 btn btn-md btn-primary" v-on:click="login">Login</button>    
    </form>
  </div>
</template>

<script> 
  export default {

    data () {
      return {
        data: null,
        isLoading: false,
        email: "",
        password: "",
        error: false,
        errorMessage: null,
        apiLogin: "https://cod-warzone-guns-api.pawedrabik.repl.co/login"
      }
    },

    methods: {
      login (e) {
        e.preventDefault();
        this.error = false;
        this.errorMessage = null;
        this.isLoading = true;

        let requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password })
        };

        fetch(this.apiLogin, requestOptions)
        .then(response => {
            if(response.ok){
                return response.json()    
            } else {
                this.error = true;
                this.errorMessage = "Invalid credentials!"
            }                
        })
        .then(response => {
          if (typeof(response) != "undefined")
          {
            this.data = response;

            let authData = {
              "access_token" : response.access_token,
              "refresh_token" : response.refresh_token
            };

            localStorage.setItem("auth_data", JSON.stringify(authData));

            this.$store.commit('checkIsAuthenticated');
            this.$store.commit('getUserDetails');

            // Redirect to home
            this.$router.push("/");

          }

          this.isLoading = false;
        })
        .catch(err => {
            this.isLoading = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API!";

            this.email = "";
            this.password = "";

            console.log(err);
        });
      }
    }
  }

</script>
