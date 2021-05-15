<template>
  <div class="container mt-5">

    <!-- Data loading progress bar -->
    <Loading :isLoading="isLoadingWeapons && isLoadingWeponTypes" />

    <!-- Error alert -->
    <div v-if="error" class="alert alert-danger mx-auto" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Display data -->
    <div v-if="weaponsData">
      <div class="row">
        <div class="col">
          <select id="filter-type" v-on:change="filterTypeChange" class="form-select" aria-label="Default select example">
            <option value="empty" selected>Filter types</option>
            <option v-for="type in weaponTypesData" v-bind:value="type.name_lower" :key="type._id">{{type.name}}</option>
          </select>
        </div>
        <div class="col">
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <input type="text" v-debounce:1s.lock="searchChange"  class="form-control" placeholder="Search weapon" aria-label="search" v-model="searchValue">
          </div>
        </div>
      </div>
      <br />
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Accuracy</th>
            <th scope="col">Control</th>
            <th scope="col">Damage</th>
            <th scope="col">Fire Rate</th>
            <th scope="col">Mobility</th>
            <th scope="col">Range</th>
          </tr>
        </thead>

        <!-- Display results -->
        <tbody v-if="!isLoadingWeapons && !isDataEmpty">
          <tr v-for="weapon in weaponsData" :key="weapon._id">
            <td><router-link :to="{ name: 'weapon', params: { name: weapon.name_lower }}">{{ weapon.name }}</router-link></td>
            <td>{{ weapon.type.name }}</td>
            <td>{{ weapon.statistics.accuracy }}</td>
            <td>{{ weapon.statistics.control }}</td>
            <td>{{ weapon.statistics.damage }}</td>
            <td>{{ weapon.statistics.fireRate }}</td>
            <td>{{ weapon.statistics.mobility }}</td>
            <td>{{ weapon.statistics.range }}</td>
          </tr>
        </tbody>

        <tbody v-if="!isLoadingWeapons && isDataEmpty">
          <tr class="no-data">
            <td colspan="8">
              No data to display
            </td>
          </tr>
        </tbody>

        <!-- Reloading weapon results -->
        <tbody v-if="isLoadingWeapons">
          <tr class="no-data">
            <td colspan="8">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" style="margin-top: 1rem; margin-bottom: 1rem; width: 5rem; height: 5rem;" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <!-- Limint and Pagination -->
      <div v-if="!isLoadingWeapons && !isDataEmpty" class="row">
        <div class="col">
          <select v-on:change="limitChange" class="form-select limit-elements" aria-label="Default select example">
            <option value="10" :selected="currentLimit == 10">10</option>
            <option value="20" :selected="currentLimit == 20">20</option>
            <option value="50" :selected="currentLimit == 50">50</option>
            <option value="100" :selected="currentLimit == 100">100</option>
          </select>
        </div>
        <div class="col">
          <nav class="float-end">
            <ul class="pagination">
              <li v-if="!isFirstPage" class="page-item"><a class="page-link" href="#" v-on:click='previousPage'>Previous</a></li>
              <li :class="{ 'page-item active': currentPage == n, 'page-item': currentPage != n }" v-for="n in totalPages" :key="n">
                <a class="page-link" v-on:click='updatePage($event, n)' href="#" >{{n}}</a>
              </li>
              <li v-if="!isLastPage" class="page-item"><a class="page-link" href="#" v-on:click='nextPage'>Next</a></li>
            </ul>
          </nav>
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>
  .limit-elements 
  {
    width: 20%;
  }
</style>

<script> 
  import Loading from './Loading.vue'

  export default {
    components: {
      Loading
    },
    data () {
      return {
        isLoadingWeapons: false,
        isLoadingWeponTypes: false,
        weaponsData: null,
        weaponTypesData: null,
        error: false,
        errorMessage: null,
        totalPages: 0,
        totalElements: 0,
        currentPage: 1,
        currentLimit: 10,
        filterType: null, 
        apiWeapons: "https://cod-warzone-guns-api.pawedrabik.repl.co/weapons",
        apiWeaponTypes: "https://cod-warzone-guns-api.pawedrabik.repl.co/weaponTypes",
        queryParams: { page: 1, limit: 10},
        searchQuery: null,
        searchValue: "",
        isDataEmpty: false,
        isLastPage: false,
        isFirstPage: false,
      }
    },
    watch: {
      // call again the method if the route changes
      'currentPage': function () {
        this.fetchWeaponsData(false);
      },
      'currentLimit': function() {
        this.fetchWeaponsData(false);
      },
      'filterType': function () {
        this.fetchWeaponsData(false);
      },
      'searchQuery': function() {
        this.fetchWeaponsData(false);
      }
    },
    created () {
      // Fetch weapons data
      this.fetchWeaponsData(true)

      // Fetch weapon types
      this.fetchWeaponTypes()
    },
    methods: {
      limitChange (e) {
        this.queryParams['limit'] = e.target.value;
        this.queryParams['page'] = 1;
        this.currentLimit = e.target.value;
      },
      filterTypeChange (e) {
        if (e.target.value == "empty")
        {
          this.filterType = null;
        }
        else
        {
          this.filterType = e.target.value;
        }

        this.queryParams['page'] = 1;
      },
      searchChange () {
        if (this.searchValue.length == 0)
        {
          this.searchQuery = null
          this.queryParams['name'] = ""
        }
        else {
          this.searchQuery = this.searchValue
          this.queryParams['name'] = this.searchValue
        }
      },
      updatePage (e, page) {
        e.preventDefault();
        this.queryParams['page'] = page;
        this.currentPage = page;
      },
      previousPage (e) {
        e.preventDefault();
        if (this.queryParams['page'] > 1)
        {
          this.queryParams['page']--;
          this.currentPage = this.queryParams['page'];
        }
      },
      nextPage (e) {
        e.preventDefault();
        if (this.queryParams['page'] < this.totalPages)
        {
          this.queryParams['page']++;
          this.currentPage = this.queryParams['page'];
        }
      },
      fetchWeaponsData (initial=false) {
        this.error = false;
        this.isLoadingWeapons = true;
        
        let queryParamsRoute = this.$route.query;
        if(initial && typeof(queryParamsRoute) != 'undefined')
        {
          if('page' in Object.keys(queryParamsRoute))
          {
            this.queryParams['page'] = queryParamsRoute['page'];
          }
          
          if('limit' in Object.keys(queryParamsRoute))
          {
            this.queryParams['limit'] = queryParamsRoute['limit'];
          }

          if('search' in Object.keys(queryParamsRoute))
          {
            this.queryParams['name'] = queryParamsRoute['search']
          }
        }

        // Set query parameters
        this.$router.replace({name: "weapons", query: { page: this.queryParams['page'], limit:  this.queryParams['limit'], search: this.queryParams['name'] }})

        // isFirstPage
        this.isFirstPage = (this.queryParams['page'] == 1);

        // isLastPage 
        this.isLastPage = (this.queryParams['page'] == this.totalPages);
        
        // Build query params string for API
        let queryString = "?page=" + this.queryParams['page'] + '&limit=' + this.queryParams['limit']

        // Filter on weapon type
        if(this.filterType != null)
        {
          queryString += "&type=" + this.filterType 
        }

        // Filter on search text 
        if(this.searchQuery != null)
        {
          queryString += "&search=\"" + this.searchQuery + "\""
        }

        // Call fetch API function
        fetch(this.apiWeapons + queryString, {
          "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                this.error = true;
                this.errorMessage = response.message
            }                
        })
        .then(response => {
            this.weaponsData = response.data;

            this.isLoadingWeapons = false;

            this.totalPages = response.totalPages
            this.totalElements = response.totalElements

            this.isDataEmpty = (this.totalElements == 0);
      
            this.isDataEmpty = false;
        })
        .catch(err => {
            this.isLoadingWeapons = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API server!";
            console.log(err);
        });
      },
      fetchWeaponTypes () {
        this.error = false;
        this.isLoadingWeponTypes = true;

        fetch(this.apiWeaponTypes, {
          "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                this.error = true;
                this.errorMessage = response.message
            }                
        })
        .then(response => {
            this.weaponTypesData = response.data;
            this.isLoadingWeponTypes = false;
        })
        .catch(err => {
            this.isLoadingWeponTypes = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API server!";
            console.log(err);
        });
      }
    }
  }
</script>