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

    <!-- User email -->
    <div class="row">
      <div class="col-12">
        <h2 class="text-start">Email</h2>
        <form>
          <div class="form-floating mb-3">
            <input disabled type="email" class="form-control" id="input-email" placeholder="example" :value="user.email">
            <label for="input-email">Email</label>
          </div>
        </form>
      </div>
    </div>

    <!-- User role -->
    <div class="row">
      <div class="col-12">
        <h2 class="text-start">Role</h2>
        <form>
          <div class="form-floating mb-3">
            <input disabled type="text" class="form-control" id="input-role" placeholder="example" :value="user.role">
            <label for="input-role">Role</label>
          </div>
        </form>
      </div>
    </div>

    <!-- User details -->
    <div class="row">
      <div class="col-12">
        <h2 class="text-start">Change password</h2>

        <form>
          <div class="form-floating mb-3">
            <input v-model="currentPassword" type="password" class="form-control" id="input-current-password" placeholder="example">
            <label for="input-current-password">Current password</label>
          </div>

          <div class="form-floating mb-3">
            <input v-model="newPassword" type="email" class="form-control" id="input-new-password" placeholder="example">
            <label for="input-new-password">New password</label>
          </div>

          <div class="form-floating  mb-3">
            <input v-model="newPasswordRepeat" type="password" class="form-control" id="input-new-password-repeat" placeholder="example">
            <label for="input-new-password-repeat">Repeat new password</label>
          </div>

          <button :disabled="isLoading" class="w-100 btn btn-md btn-primary" v-on:click="changePassword">Change password</button>    
        </form>
      </div>
    </div>

    <!-- Nightbot -->
    <div class="row">
      <div class="col-12">
        <h2 class="text-start">Nightbot</h2>
      </div>
    </div>
  </div>  

</template>

<script>
  import apiHelper from "../helpers/api-helper.js";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        isLoading: false,
        apiUserProfile: apiHelper.base + "/user/profile",
        error: false,
        errorMessage: null,
        success: false,
        successMessage: null
      }
    },
    methods: {
      changePassword (e) {
        e.preventDefault();
        console.log("change password");
      }
    }
  }
  
</script>
