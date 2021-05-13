<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <Menu />

        <div v-if="!isAuthenticated" class="text-end">
          <button type="button" v-on:click='loginAction' class="btn btn-outline-light me-2">Login</button>
          <button type="button" v-on:click='registerAction' class="btn btn-warning">Register</button>
        </div>

        <div v-else class="dropdown text-end"> 
          <a href="#" class="d-block link-light text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="42" height="42" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
            <li><a class="dropdown-item" href="#">New weapon build...</a></li>
            <li><a class="dropdown-item" href="#">My weapon builds...</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/user/profile">Profile</router-link></li>
            <li v-if="user.role == 'admin'"><router-link class="dropdown-item" to="/admin/dashboard">Dashboard</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" v-on:click='logoutAction' href="#">Logout</a></li>
          </ul>
          </div>

      </div>
    </div>
  </header>
</template>

<script>
  import Menu from './header/Menu.vue'

  export default {
    name: 'App',
    components: {
      Menu
    },
    created () {
      if (this.$store.state.isAuthenticated)
      {
        this.$store.commit('getUserDetails');
      }
    },
    computed: {
      isAuthenticated () {
        return this.$store.state.isAuthenticated
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      loginAction() {
        let router = this.$router; 
        router.replace('/login');
      },
      registerAction() {
        let router = this.$router; 
        router.replace('/register');
      },
      logoutAction(e) {
        e.preventDefault();
        localStorage.removeItem("auth_data");
        this.$store.commit('checkIsAuthenticated');
        this.$router.push("/login");
      }
    }
  }

</script>

<style scoped>
  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
  }
  .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .text-small {
    font-size: 85%;
  }

  .dropdown-toggle {
    outline: 0;
  }
</style>