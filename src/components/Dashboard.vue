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
            <router-link class="btn btn-toggle align-items-center rounded" to="/admin/dashboard/users/list" aria-expanded="true">
              Users
            </router-link>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/users/new">New</router-link></li>
                <li><router-link class="link-dark rounded" to="/admin/dashboard/users/list">List</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
           <li class="mb-1">
            <router-link class="btn btn-toggle align-items-center rounded" to="/admin/dashboard/nightbots/list" aria-expanded="true">
              Nightbots
            </router-link>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/nightbots/list">List</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <router-link class="btn btn-toggle align-items-center rounded" to="/admin/dashboard/weapons/list" aria-expanded="false">
              Weapons
            </router-link>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/weapons/new">New</router-link></li>
                <li><router-link class="link-dark rounded" to="/admin/dashboard/weapons/list">List</router-link></li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <router-link class="btn btn-toggle align-items-center rounded" to="/admin/dashboard/weaponbuilds/list" aria-expanded="false">
              Weapon Builds
            </router-link>
            <div class="collapse show">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1">
                <li><router-link class="link-dark rounded" to="/admin/dashboard/weaponbuilds/list">List</router-link></li>
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

