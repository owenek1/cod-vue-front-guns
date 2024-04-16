<template>
    <div class="ms-5 me-5 mt-5">
        <!-- Data loading progress bar -->
        <Loading :isLoading="isLoading"/>
        
        <div v-if="!isLoading">
            <!-- Title -->
            <div class="row border-bottom mb-3">
                <div class="col-12">
                    <h1 class="float-start">Weapon builds list</h1>
                </div>
            </div>

            <!-- Filters -->
            <div class="row">
                <div class="col">
                <select id="filter-type" v-on:change="filterTypeChange" class="form-select" aria-label="Default select example">
                    <option value="empty" selected>Filter types</option>
                    <option v-for="weaponType in weaponTypes" v-bind:value="weaponType.name_lower" :key="weaponType._id">{{weaponType.name}}</option>
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

            <!-- Table -->
            <div id="results-table" style="position: relative;">
                <div v-if="isReloading" class="d-flex overlay justify-content-center">
                    <div class="spinner-border" style="margin-top: 12rem; width: 5rem; height: 5rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
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
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <!-- Display results -->
                    <tbody v-if="!isDataEmpty">
                    <tr v-for="(weapon, index) in weapons" :key="weapon._id">

                        <!-- Weapon name column -->
                        <td v-if="elementToUpdate == null"><router-link :to="{ name: 'weapon', params: { name: weapon.name_lower }}">{{ weapon.name }}</router-link></td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input type="text" class="form-control" v-model="elementToUpdate.name">
                        </td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">
                            <router-link :to="{ name: 'weapon', params: { name: weapon.name_lower }}">{{ weapon.name }}</router-link>
                        </td>

                        <!-- Weapon type -->
                        <td v-if="elementToUpdate == null">{{ weapon.type.name }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <select class="form-select" v-model="elementToUpdate.type_id" >
                                <option v-for="weaponType in weaponTypes" :key="weaponType._id" :selected="elementToUpdate.type_id == weaponType._id" :value="weaponType._id">{{ weaponType.name }}</option>
                            </select>
                        </td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">
                            {{ weapon.type.name }}
                        </td>
                        
                        <!-- Statistics accuracy -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.accuracy }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.accuracy }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.accuracy">
                        </td>

                        <!-- Statistics control -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.control }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.control }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.control">
                        </td>

                        <!-- Statistics damage -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.damage }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.damage }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.damage">
                        </td>

                        <!-- Statistics fire rate -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.fireRate }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.fireRate }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.fireRate">
                        </td>

                        <!-- Statistics mobility -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.mobility }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.mobility }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.mobility">
                        </td>

                        <!-- Statistics range -->
                        <td v-if="elementToUpdate == null">{{ weapon.statistics.range }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id != weapon._id">{{ weapon.statistics.range }}</td>
                        <td v-if="elementToUpdate != null && elementToUpdate._id == weapon._id">
                            <input style="width: 80px;" type="number" class="form-control" v-model="elementToUpdate.statistics.range">
                        </td>

                        <!-- Actions -->
                        <td> 
                            <button v-if="elementToUpdate == null" class="btn btn-primary btn-sm me-1" v-on:click="prepareToUpdate(weapon)">Update</button>
                            <button v-if="elementToUpdate == null" class="btn btn-danger btn-sm" v-on:click="deleteAction(weapon)">Delete</button>
                            
                            <button v-if="elementToUpdate != null && elementToUpdate._id == weapon._id" class="btn btn-success btn-sm me-1" v-on:click="updateAction(index)">Save</button>
                            <button v-if="elementToUpdate != null && elementToUpdate._id == weapon._id" class="btn btn-danger btn-sm" v-on:click="cancelUpdate()">Cancel</button>
                        </td>
                    </tr>
                    </tbody>

                    <!-- Data empty body -->
                    <tbody v-if="isDataEmpty">
                        <tr class="no-data">
                            <td colspan="8">
                            No data to display
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Limint and Pagination -->
            <div v-if="!isLoading && !isDataEmpty" class="row">
                <!-- <div class="col">
                    <select v-on:change="limitChange" class="form-select limit-elements" aria-label="Default select example">
                        <option value="10" :selected="currentLimit == 10">10</option>
                        <option value="20" :selected="currentLimit == 20">20</option>
                        <option value="50" :selected="currentLimit == 50">50</option>
                        <option value="100" :selected="currentLimit == 100">100</option>
                    </select>
                </div> -->
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
    /* Add an overlay to the entire page blocking any further presses to buttons or other elements. */
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(126, 126, 126, 0.5);
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
