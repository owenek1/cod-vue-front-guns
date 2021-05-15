<template>
    <div class="container mt-5">
        <!-- Data loading progress bar -->
        <Loading :isLoading="isLoading"/>

        <!-- Error alert -->
        <div v-if="error" class="alert alert-danger mx-auto" role="alert">
            {{ errorMessage }}
        </div>

        <!-- Success alert -->
        <div v-if="success" class="alert alert-success mx-auto" role="alert">
            {{ successMessage }}
        </div>

        <!-- Display data -->
        <div v-if="!isLoading">
            <!-- Title -->
            <div class="row border-bottom">
                <div class="col-12 ">
                    <h1 class="float-start pb-2">Nightbot integration</h1>
                </div>
            </div>

            <!-- Nightbot integration information -->
            <div class="row mt-3">
                <!-- Nightbot integration active -->
                <div class="col-12">
                    <div v-if="!nightbot" class="card">
                        <div class="card-body">
                            <h5 class="card-title">Do you want to have access to Cod Weapons in your Twitch chat?</h5>
                            <p class="card-text">At the moment CoD API weapons can be integrated with Twtich chat bot <a href="https://nightbot.tv/" target="blank">Nightbot</a>.</p>
                            <p class="card-text">In order to enable Nightbot integration in your Twitch Nightobt, you need to first create customized command as presented below: </p>
                            <div class="d-flex justify-content-center">
                                <div class="input-group mb-3 w-50">
                                    <span class="input-group-text">Command</span>
                                    <input disabled style="background-color: white;" type="text" class="form-control" placeholder="City" aria-label="City" value="!cod-api-weapons-regsiter">
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="input-group w-50">
                                    <span class="input-group-text">Message</span>
                                    <textarea readonly style="resize: none; background-color: white; height: 100px;" class="form-control" aria-label="With textarea" v-model="command"></textarea>
                                </div>
                            </div>
                            <br>
                            <p class="card-text"> After the command has been successfully created you need to execute it in the Twitch chat:</p>
                            <img class="mb-3" :src="twitchImage" />
                            <p class="card-text"> As a return message you should see Nightbot successfully regsitered in CoD Weapons API!</p>
                        </div>
                    </div>
                    <table v-if="nightbot" class="table">
                        <tbody>
                            <tr>
                                <td class="text-start fw-bold" style="width: 20%;">Status</td>
                                <td class="text-start"><span v-if="nightbot" class="badge bg-success">Active</span></td> 
                            <tr v-if="nightbot">
                                <td class="text-start fw-bold" style="width: 20%;">Provider</td>
                                <td class="text-start">{{nightbot.provider}}</td>
                            </tr>
                            <tr v-if="nightbot">
                                <td class="text-start fw-bold" style="width: 20%;">Provider Id</td>
                                <td class="text-start">{{nightbot.provider_id}}</td>
                            </tr>
                            <tr v-if="nightbot">
                                <td class="text-start fw-bold" style="width: 20%;">Active since</td>
                                <td class="text-start">{{nightbot.registered_on}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
    import Loading from './Loading.vue';
    import apiHelper from "../helpers/api-helper.js";
    import authHeader from "../helpers/auth-header.js";
    import store from "../store.js";

    export default {
        components: {
            Loading
        },
        data () {
            return {
                user: null,
                nightbot: null, 
                isLoading: false,
                apiUserNightbot: apiHelper.getEndpoint("user/nightbot"),
                error: false,
                errorMessage: null,
                success: false,
                successMessage: null,
                command: null,
                twitchImage: '/img/nightbot_register_twitch.PNG',
            }
        },
        created() {
            // Fetch nightbot information from API
            this.fetchNightbot();

            // Set user data
            this.user = store.state.user;

            // Set register command
            this.command = "$(eval const response = $(urlfetch json https://cod-warzone-guns-api.pawedrabik.repl.co/nightbot/register/" + this.user.id + "); response.message)"
        },
        methods: {
            fetchNightbot () {
                this.error = false;
                this.errorMessage = null;
                this.isLoading = true;

                const authorization = authHeader.getAuthHeader();

                const requestOptions = {
                    method : "GET",
                    headers : authorization
                };

                fetch(this.apiUserNightbot, requestOptions)
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
                this.nightbot = response.data;
            },
            handleResponseError(response) {
                this.isLoading = false;
                this.error = true;
                this.errorMessage = response.message;
            }
        }
    }
</script>