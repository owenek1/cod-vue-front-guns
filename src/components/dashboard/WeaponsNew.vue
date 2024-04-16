<template>
  <div class="ms-5 me-5 mt-5">
    <!-- Title -->
    <div class="row border-bottom mb-3">
        <div class="col-12">
            <h1 class="float-start">Add new weapon</h1>
        </div>
    </div>

    <!-- Error alert -->
    <div v-if="error" class="alert alert-danger mx-auto" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Add new weapon form -->
    <div class="row">
        <div class="col-6">
            <form>
                <div class="form-floating mb-3">
                    <input v-model="wName" type="text" class="form-control" id="input-name" placeholder="example">
                    <label for="input-name">Weapon name</label>
                </div>

                <div class="form-floating mb-3">
                    <select class="form-select" v-model="wType" >
                        <option v-for="weaponType in weaponTypes" :key="weaponType._id" :value="weaponType._id">{{ weaponType.name }}</option>
                    </select>
                    <label for="input-type">Weapon type</label>
                </div>

                <button :disabled="isSaving" class="w-20 btn btn-md btn-primary" v-on:click="saveAction">Save</button>
                <button :disabled="isSaving" class="w-20 btn btn-md btn-danger" v-on:click="resetForm">Reset</button>    
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import apiHelper from "../../helpers/api-helper.js";
import authHeader from "../../helpers/auth-header.js";

export default ({
    data() {
        return {
            error: false,
            errorMessage: null,
            wName: "",
            wType: "",
            isSaving: false,
            weaponTypes: null,
            apiWeaponTypes: apiHelper.getEndpoint("weaponTypes"),
            apiAdminWeapons: apiHelper.getEndpoint("admin/weapons"),
        }
    },
    created () {
        this.fetchWeaponTypes();
    },

    methods: {
        fetchWeaponTypes () {
            const authorization = authHeader.getAuthHeader();
            const requestOptions = {
                method : "GET",
                headers : authorization
            };

            fetch(this.apiWeaponTypes, requestOptions)
            .then(response => { 
                if (response.ok) return response.json();
                else this.handleResponseError(response);
            })
            .then(response => {
                //this.handleResponseSuccess(response);
                this.weaponTypes = response.data;
            })
            .catch(err => {
                this.error = true;
                this.errorMessage = "Failed to fetch data from API server!";
                console.log(err);
            });
        },
        handleResponseError(response) {
            this.error = true;
            this.errorMessage = response.message;
        },
        saveAction() {
            this.error = false;
            this.errorMessage = null;
            this.isSaving = true;

            let headers = authHeader.getAuthHeader();
            headers['Content-type'] = "application/json";

            const requestOptions = {
                method : "POST",
                headers : headers,
                body: JSON.stringify({ name: this.wName, type_id: this.wType }, apiHelper.jsonPayloadReplacer)
            };

            fetch(this.apiAdminWeapons, requestOptions)
            .then(response => { 
                if (response.ok) return response.json();
                else this.handleResponseError(response);
            })
            .then(response => {
                // this.handleResponseSuccess(response);
                console.log(response);
                
                this.isSaving = false;
            })
            .catch(err => {
                this.error = true;
                this.errorMessage = "Failed to fetch data from API server!";
                this.isSaving = false;

                console.log(err);
            });

        },
        resetForm() {
            console.log("OK");
        }
    }
})
</script>
