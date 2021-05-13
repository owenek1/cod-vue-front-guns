<template>
  <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    <li><router-link class="nav-link px-2" active-class="" exact-active-class="text-secondary" to='/'>Home</router-link></li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Weapon Builds</a>
      <ul class="dropdown-menu" aria-labelledby="dropdown03">
        <li><router-link class="dropdown-item" to='/builds'>List</router-link></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="/weapons" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">CoD Weapons</a>
      <ul class="dropdown-menu" aria-labelledby="dropdown03">
        <li><router-link class="dropdown-item" to='/weapons'>List</router-link></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
  a.nav-link {
    color: white;
  }
</style>