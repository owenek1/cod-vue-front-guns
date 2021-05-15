<template>
    <div class="ms-5 me-5 mt-5">
        <!-- Data loading progress bar -->
        <Loading :isLoading="isLoading"/>
        
        <div v-if="!isLoading">
            <!-- Title -->
            <div class="row border-bottom mb-3">
                <div class="col-12">
                    <h1 class="float-start">Nightbots list</h1>
                </div>
            </div>
            <!-- Table -->
            <table class="table table-hover table-responsive">
                <thead>
                <tr>
                    <th scope="col">Provider</th>
                    <th scope="col">Provider Id</th>
                    <th scope="col">Registered on</th>
                    <th scope="col">User</th>
                    <th scope="col">Active</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>


                <!-- Display results -->
                <tbody v-if="!isDataEmpty">
                <tr v-for="(nightbot, index) in nightbots" :key="nightbot._id">
                    <td> {{ nightbot.provider }} </td>
                    <td> {{ nightbot.provider_id }} </td>
                    <td> {{ nightbot.registered_on }} </td>

                    <!-- User -->
                    <td v-if="elementToUpdate == null"> {{ nightbot.user.email }} </td>
                    <td v-if="elementToUpdate != null && elementToUpdate._id != nightbot._id"> 
                        {{ nightbot.user.email }} 
                    </td>
                    <td v-if="elementToUpdate != null && elementToUpdate._id == nightbot._id"> 
                        <select class="form-select" v-model="elementToUpdate.user_id" >
                            <option v-for="user in users" :key="user._id" :selected="elementToUpdate.user_id == user._id" :value="user._id">{{user.email}}</option>
                        </select>
                    </td>

                    <!-- Active -->
                    <td v-if="elementToUpdate == null"> 
                        <span v-if="nightbot.is_active" class="badge bg-success">Active</span>
                        <span v-if="!nightbot.is_active" class="badge bg-danger">Not active</span>  
                    </td>
                    <td v-if="elementToUpdate != null && elementToUpdate._id != nightbot._id"> 
                        <span v-if="nightbot.is_active" class="badge bg-success">Active</span>
                        <span v-if="!nightbot.is_active" class="badge bg-danger">Not active</span>  
                    </td>
                    <td v-if="elementToUpdate != null && elementToUpdate._id == nightbot._id">
                        <select class="form-select" v-model="elementToUpdate.is_active">
                            <option :value="true" :selected="elementToUpdate.is_active">True</option>
                            <option :value="false" :selected="!elementToUpdate.is_active">False</option>
                        </select>
                    </td>

                    <!-- Actions -->
                    <td> 
                        <button v-if="elementToUpdate == null" class="btn btn-primary btn-sm" v-on:click="prepareToUpdate(nightbot)">Update</button>
                        <button v-if="elementToUpdate != null && elementToUpdate._id == nightbot._id" class="btn btn-success btn-sm me-1" v-on:click="updateAction(index)">Save</button>
                        <button v-if="elementToUpdate != null && elementToUpdate._id == nightbot._id" class="btn btn-danger btn-sm" v-on:click="cancelUpdate()">Cancel</button>
                    </td>
                </tr>
                </tbody>

                <tbody v-if="isDataEmpty">
                <tr class="no-data">
                    <td colspan="8">
                    No data to display
                    </td>
                </tr>
                </tbody>

                <!-- Reloading results -->
                <tbody v-if="isReloading">
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
        </div>  
    </div>
</template>

<script>
    import Loading from '../Loading.vue';

    import apiHelper from "../../helpers/api-helper.js";
    import authHeader from "../../helpers/auth-header.js";

    export default {
        components: {
            Loading
        },
        data() {
            return {
                isLoading: true,
                isReloading: false,
                isDataEmpty: false,
                nightbots: null,
                apiNightbotsList: apiHelper.getEndpoint("admin/nightbots"),
                apiNightbot: apiHelper.getEndpoint("admin/nightbot"),
                apiUsersList: apiHelper.getEndpoint("admin/users"),
                totalPages: 0,
                totalElements: 0,
                isUpdating: false,
                elementToUpdate: null,
                users: null
            }
        }, 
        created () {
            this.fetchNightbots();

            this.fetchUsers();
        },
        methods: {
            prepareToUpdate(nightbot) {
                this.elementToUpdate = nightbot;
                this.isUpdating = true;
            },
            cancelUpdate() {
                this.isUpdating = false;
                this.elementToUpdate = null;
            },
            updateAction (index) {
                const nightbotId = this.elementToUpdate._id;

                let headers = authHeader.getAuthHeader();
                headers['Content-type'] = "application/json";

                const requestOptions = {
                    method : "PUT",
                    headers : headers,
                    body: JSON.stringify(this.elementToUpdate, apiHelper.jsonPayloadReplacer)
                };

                fetch(this.apiNightbot + "/" + nightbotId, requestOptions)
                .then(response => { 
                    if (response.ok) return response.json();
                    else this.handleResponseError(response);
                })
                .then(response => {
                    // this.handleResponseSuccess(response);
                    console.log(response.data);
                    let updated = response.data;

                    this.$set(this.nightbots, index, updated);
                   
                    this.isUpdating = false;
                    this.elementToUpdate = null;
                })
                .catch(err => {
                    this.error = true;
                    this.errorMessage = "Failed to fetch data from API server!";
                    this.isUpdating = false;
                    this.elementToUpdate = null;

                    console.log(err);
                });
            },
            fetchUsers () {
                const authorization = authHeader.getAuthHeader();
                const requestOptions = {
                    method : "GET",
                    headers : authorization
                };

                fetch(this.apiUsersList, requestOptions)
                .then(response => { 
                    if (response.ok) return response.json();
                    else this.handleResponseError(response);
                })
                .then(response => {
                    //this.handleResponseSuccess(response);

                    this.users = response.data;
                })
                .catch(err => {
                    this.isLoading = false;
                    this.error = true;
                    this.errorMessage = "Failed to fetch data from API server!";
                    console.log(err);
                });
            },
            fetchNightbots () {
                this.error = false;
                this.errorMessage = null;
                this.isLoading = true;

                const authorization = authHeader.getAuthHeader();
                const requestOptions = {
                    method : "GET",
                    headers : authorization
                };

                fetch(this.apiNightbotsList, requestOptions)
                .then(response => { 
                    if (response.ok) return response.json();
                    else this.handleResponseError(response);
                })
                .then(response => {
                    this.handleResponseSuccess(response);
                })
                .catch(err => {
                    this.isLoading = false;
                    this.error = true;
                    this.errorMessage = "Failed to fetch data from API server!";
                    console.log(err);
                });
            },
            handleResponseSuccess(response) {
                this.isLoading = false;
                this.nightbots = response.data;

                this.totalPages = response.totalPages;
                this.totalElements = response.totalElements;

                if (this.totalElements == 0)
                {
                    this.isDataEmpty = true;
                }
            },
            handleResponseError(response) {
                this.isLoading = false;
                this.error = true;
                this.errorMessage = response.message;
            }
        }
    }

</script>


