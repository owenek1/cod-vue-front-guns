<template>
  <div class="container mt-5">
    <div class="d-grid gap-3" style="grid-template-columns: 0.5fr 3fr;">
      <div class="bg-light border rounded-1">
        <ul class="list-unstyled ps-0">
          <li class="mt-3 mb-1">
            <button class="btn btn-toggle align-items-center rounded" aria-expanded="true">
              Home
            </button>
            <div class="collapse show" id="home-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/">Overview</router-link></li>
                <li><router-link class="link-dark rounded" to="/admin/dashboard/reports">Reports</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded" aria-expanded="true">
              Users
            </button>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><a href="#" class="link-dark rounded">New user</a></li>
                <li><a href="#" class="link-dark rounded">List</a></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
           <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded" aria-expanded="true">
              Nightbots
            </button>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/nightbots/list">List</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded" aria-expanded="false">
              Weapons
            </button>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/weapons/list">List</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded" aria-expanded="false">
              Weapon Builds
            </button>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><a href="#" class="link-dark rounded">List</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="bg-light border rounded-3">
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>

