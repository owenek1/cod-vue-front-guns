<template>
  <div class="container mt-5">   

    <!-- Data loading progress bar -->
    <Loading :isLoading="isLoading"/>

    <!-- Error alert -->
    <div v-if="error" class="alert alert-danger mx-auto" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Display data -->
    <div v-if="!isLoading">
      <!-- Display message when data is empty -->
      <div v-if="isDataEmpty">
        <h3>{{dataEmptyMessage}}</h3>
        <router-link v-on-click="" class="" to="/weapons">Go back to weapons list</router-link>
      </div>
      <!-- Display data -->
      <div v-if="!isDataEmpty">
        <!-- Weapon title -->
        <div class="row border-bottom">
          <div class="col-12 ">
            <h1 class="float-start pb-2">{{weapon.name}}</h1> 
            <button class="btn btn-primary float-end">Create build using this weapon</button>
          </div>
        </div>
        <!-- Weapon image -->
        <div class="row mt-3 border-bottom">
          <div class="col-12">
            <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid pb-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="45%" y="45%" fill="#dee2e6" dy=".3em">Weapon image</text></svg>
          </div>
        </div>

        <!-- Weapon details -->
        <div class="row">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <td class="text-start fw-bold" style="width: 20%;">Class</td>
                  <td class="text-start">{{weapon.type.name}}</td>
                </tr>
                <tr>
                  <td class="text-start fw-bold" style="width: 20%;">Type</td>
                  <td class="text-start">Primary weapon</td>
                </tr>
                <tr>
                  <td class="text-start fw-bold" style="width: 20%;">Game</td>
                  <td class="text-start">Modern Warfare (2019)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Weapon stats -->
          <div class="row">
            <div class="col-12">
              <h2 class="text-start">{{weapon.name}} stats</h2>
              
              <table class="table table-dark">
                <tbody>
                  <tr>
                    <td style="width:20%;">Accuracy</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.accuracy" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td>
                      {{weapon.statistics.accuracy}}
                    </td>
                  </tr>

                  <tr>
                    <td style="width:20%;">Control</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.accuracy" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td style="width:20%;">
                      {{weapon.statistics.control}}
                    </td>
                  </tr>

                  <tr>
                    <td style="width:20%;">Damage</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.accuracy" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td style="width:20%;">
                      {{weapon.statistics.damage}}
                    </td>
                  </tr>

                  <tr>
                    <td style="width:20%;">Fire Rate</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.fireRate" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td style="width:20%;">
                      {{weapon.statistics.fireRate}}
                    </td>
                  </tr>

                  <tr>
                    <td style="width:20%;">Mobility</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.mobility" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td style="width:20%;">
                      {{weapon.statistics.mobility}}
                    </td>
                  </tr>

                  <tr>
                    <td style="width:20%;">Range</td>
                    <td style="width:60%;">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="weapon.statistics.range" aria-valuemin="0" aria-valuemax="100" style="width: 25%"></div>
                      </div>
                    </td>
                    <td style="width:20%;">
                      {{weapon.statistics.range}}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="text-end" colspan="2">
                      Overall score
                    </td>
                    <td>
                      70
                    </td>  
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Weapon attachments -->
          <div class="row">
            <div class="col-12">
              <h2 class="text-start">{{weapon.name}} attachments</h2>

              <h4 v-if="weapon.available_attachments == 0">No attachments found for this weapon!</h4>
              
              <table v-for="attachmentType in weapon.available_attachments" :key="attachmentType._id" class="table">
                <thead>
                  <th class="text-start">{{attachmentType.name}}</th>
                  <th>Level required</th>
                </thead>
                <tbody>
                  <tr v-for="attachment in weaponAttachments" :key="attachment._id">
                    <td class="text-start" v-if="attachment.type_id == attachmentType._id" style="width:70%;">{{attachment.name}}</td>
                    <td v-if="attachment.type_id == attachmentType._id" style="width:30%;">{{attachment.lvl_requirement}}</td>
                  </tr>
                </tbody>
              </table>              
            </div>
          </div>

          <!-- Weapon blueprints -->
          <div class="row">
            <div class="col-12">
              <h2 class="text-start">{{weapon.name}} blueprints</h2>

              <h4 v-if="weapon.available_blueprints == 0">No blueprints found for this weapon!</h4>
              
              <table v-for="blueprint in weapon.available_blueprints" :key="blueprint._id" class="table">
                <thead>
                  <th class="text-start">{{blueprint.name}}</th>
                  <th>Level required</th>
                </thead>
                <tbody>
                  <tr v-for="attachment in weaponAttachments" :key="attachment._id">
                    <td class="text-start" v-if="attachment.type_id == attachmentType._id" style="width:70%;">{{attachment.name}}</td>
                    <td v-if="attachment.type_id == attachmentType._id" style="width:30%;">{{attachment.lvl_requirement}}</td>
                  </tr>
                </tbody>
              </table>              
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script> 
  import Loading from './Loading.vue';
  import apiHelper from '../helpers/api-helper.js';

  export default {
    components: {
      Loading
    },
    data () {
      return {
        user: this.$store.state.user,
        weapon: null,
        weaponAttachments: null,
        isLoading: false,
        error: false,
        errorMessage: null,
        isDataEmpty: false,
        dataEmptyMessage: "",
        apiWeapons: apiHelper.base + "/weapons",
        apiWeaponAttachments: apiHelper.base + "/weaponAttachments"
      }
    },
    created () {
      this.fetchWeaponData()
    },
    watch: {
      weaponAttachments : function() {
        this.isLoading = false;
      } 
    },
    methods: {
      fetchWeaponData () {
        this.error = false;
        this.isLoading = true;

        // Weapon parameter from the route 
        let weaponNameParam = this.$route.params.name;

        fetch(this.apiWeapons + "?name=" + weaponNameParam, {
          "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                this.error = true;
                this.errorMessage = response.message;
            }                
        })
        .then(response => {
            this.weapon = response.data;

            // Data empty message
            if (this.weapon.length == 0) {
              this.isDataEmpty = true;
              this.dataEmptyMessage = "Weapon " + weaponNameParam + " has not been found!";
            } 
            else {
              this.weapon = response.data[0];

              // Fetch weapon attachments
              this.fetchWeaponAttachments(this.weapon._id);
            }
        })
        .catch(err => {
            this.isLoading = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API server!";
            console.log(err);
        });
      },
      fetchWeaponAttachments (weaponId) {
        fetch(this.apiWeaponAttachments + "?weapon_id=" + weaponId, {
          "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                this.error = true;
                this.errorMessage = response.message;
            }                
        })
        .then(response => {
            this.weaponAttachments = response.data;
        })
        .catch(err => {
            this.isLoading = false;
            this.error = true;
            this.errorMessage = "Failed to fetch data from API server!";
            console.log(err);
        });
      }
    }
  }
</script>