<template>
  <div class="container w-25 mt-5">

    <!-- Error alert -->
    <div v-if="error" class="alert alert-danger mx-auto" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Success alert -->
    <div v-if="success" class="alert alert-success mx-auto" role="alert">
      {{ successMessage }}
    </div>

    <h1 class="h3 mb-3 fw-normal">Create new account</h1>
    <form>
      <div class="form-floating mb-3">
        <input v-model="email" type="email" class="form-control" id="input-email" placeholder="example">
        <label for="input-email">Email address</label>
      </div>

      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control" id="input-password" placeholder="example">
        <label for="input-password">Password</label>
      </div>

      <div class="form-floating mb-3">
        <input v-model="passwordRepeat" type="password" class="form-control" id="input-password-repeat" placeholder="example">
        <label for="input-password-repeat">Repeat password</label>
      </div>

      <button :disabled="isLoading" class="w-100 btn btn-md btn-primary" v-on:click="register">Register</button>
      
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
        passwordRepeat: "",
        error: false,
        errorMessage: null,
        success: false,
        successMessage: null,
        apiRegister: "https://cod-warzone-guns-api.pawedrabik.repl.co/register"
      }
    },

    methods: {
      register (e) {
        e.preventDefault();
        this.error = false;
        this.errorMessage = null;
        this.isLoading = true;

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password })
        };

        fetch(this.apiRegister, requestOptions)
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else {
                this.error = true;
                this.errorMessage = "Invalid credentials"
            }                
        })
        .then(response => {
            this.data = response;
            this.isLoading = false;

            let status = response.status

            if (status == "error")
            {
              this.error = true;
              this.errorMessage = response.message
              
            } else {
              this.success = true; 
              this.successMessage = "You have been successfully registered"
            }

            this.email = ""
            this.password = ""
            this.passwordRepeat = ""
        })
        .catch(err => {
            this.isLoading = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API server!";

            this.email = "";
            this.password = "";
            this.passwordRepeat = "";

            console.log(err);
        });
      }
    }
  }
</script>
