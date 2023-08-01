<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{route.params.id ? model.name : "New Driver"}}</h1>
                <router-link
                :to="{name: 'AdminDrivers'}"
                  class="
                    py-2
                    px-3
                    font-semibold
                    focus:outline-none
                    leading-6 
                    rounded
                    border
                    text-gray-200
                    hover:text-white
                    bg-gray-800
                  
                  "
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-4 -mt-1 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                
                    Back
                </router-link>
              </div>              
            </div>
          </header>
        
          <main class="bg-gray-100">
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            
              <div v-if="driverLoading"  class="flex justify-center">
                <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <form v-else @submit.prevent="saveDriver" class="animate-fade-in-down">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                          <!-- Driver fields -->
                          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            
                            <!-- name -->
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700"
                                >Name</label
                                >
                                <input
                                type="text"
                                name="name"
                                id="name"
                                v-model="model.name"
                                autocomplete="name"
                                class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Driver Name"
                                />
                            </div>
                            <!-- /name -->
      
                              <!-- email -->
                              <div>
                                <label for="email" class="block text-sm font-medium text-gray-700"
                                  >Email</label
                                >
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  v-model="model.email"
                                  autocomplete="email"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Driver Email"
                                />
                              </div>
                              <!-- /email -->

                               <!-- password -->
                               <div>
                                <label for="password" class="block text-sm font-medium text-gray-700"
                                  >Password</label
                                >
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  v-model="model.password"
                                  autocomplete="password"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Driver Password"
                                />
                              </div>
                              <!-- /password -->

                               <!-- confirm -->
                               <div>
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-700"
                                  >Confirm Password</label
                                >
                                <input
                                  type="password"
                                  name="password_confirmation"
                                  id="password_confirmation"
                                  v-model="model.password_confirmation"
                                  autocomplete="password_confirmation"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Confirm Password"
                                />
                              </div>
                              <!-- /confirm -->

                                <!-- Role -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Role</label>
                                    <select v-model="model.role"
                                    class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    <option value="driver">Driver</option>
                                    <option value="user">User</option>                                
                                    </select>
                                </div>
                            <!-- /Role -->

                               <!-- country -->
                               <div>
                                <label for="country" class="block text-sm font-medium text-gray-700"
                                  >Country</label
                                >
                                <input
                                  type="text"
                                  name="country"
                                  id="country"
                                  v-model="model.country"
                                  autocomplete="country"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Driver Country"
                                />
                              </div>
                              <!-- /country -->

                            <!-- state -->
                            <div>
                                <label for="state" class="block text-sm font-medium text-gray-700"
                                    >State</label
                                >
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    v-model="model.state"
                                    autocomplete="state"
                                    class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Driver State"
                                />
                            </div>
                                <!-- /state -->
      
                              <!-- address -->
                              <div>
                                <label for="address" class="block text-sm font-medium text-gray-700"
                                    >Address</label
                                >
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    v-model="model.address"
                                    autocomplete="address"
                                    class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Driver Address"
                                />
                            </div>
                              <!-- /address -->
      
                              <!-- zip code -->
                              <div>
                                <label for="zipcode" class="block text-sm font-medium text-gray-700"
                                    >Zip code</label
                                >
                                <input
                                    type="text"
                                    name="zipcode"
                                    id="zipcode"
                                    v-model="model.zipcode"
                                    autocomplete="zipcode"
                                    class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Driver Zipcode"
                                />
                            </div>
                              <!-- /zip code -->

                                <!-- Number -->
                                <div>
                                    <label for="contact_number" class="block text-sm font-medium text-gray-700"
                                        >Contact Number</label
                                    >
                                    <input
                                        type="text"
                                        name="contact_number"
                                        id="contact_number"
                                        v-model="model.contact_number"
                                        autocomplete="contact_number"
                                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Driver Contact Number"
                                    />
                                </div>
                                  <!-- /Number -->

                                   <!-- Lincence Number -->
                                <div>
                                    <label for="driver_license_number" class="block text-sm font-medium text-gray-700"
                                        >Licence Number</label
                                    >
                                    <input
                                        type="text"
                                        name="driver_license_number"
                                        id="driver_license_number"
                                        v-model="model.driver_license_number"
                                        autocomplete="driver_license_number"
                                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Driver Lincense Number"
                                    />
                                </div>
                                  <!-- /Lincence Number -->

                                    <!-- Vechile Info -->
                                <div>
                                    <label for="driver_license_number" class="block text-sm font-medium text-gray-700"
                                        >Vehicle Info</label
                                    >
                                    <input
                                        type="text"
                                        name="vehicle_info"
                                        id="vehicle_info"
                                        v-model="model.vehicle_info"
                                        autocomplete="vehicle_info"
                                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Driver Vehicle Information"
                                    />
                                </div>
                                  <!-- /Vechile Info -->
                              
                              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-gray-200 hover:text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">                                                                   
                                    {{route.params.id ? "Update" : "Save"}}
                                </button>
                              </div>
                          </div>
                  </div>
              </form>
              <div
                v-if="notification.show"
                class="fixed w-[300px] right-4 bottom-4 py-2 px-4 text-white rounded-full animate-fade-in-down"
                :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
                >
                {{ notification.message }}
            </div> 
            </div>
          </main>

    </div>
</template>

<script setup>
    import store from "../../store";
    import { computed, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();
    const route = useRoute();

    const drivers = computed(() => store.state.drivers.data);

    //get notifications 
    const notification = computed(() => store.state.notification);

    // Get shipment loading state, which only changes when we fetch driver from backend
    const driverLoading = computed(() => store.state.currentDriver.loading);
   

    // declare driver variables 
    let model = ref({
        name: "",
        email: "",
        password: "",
        country: "",
        state: "",
        address: "",
        zipcode: "",
        contact_number: "",
        role: "",
        driver_license_number: "",
        vehicle_info: "",
        
    });

    // Watch current project  data change and when this happens we update local model
    watch(
    () => store.state.currentDriver.data,
    (newVal, oldVal) => {
        model.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: !!newVal.status,
        };
    }
    );
    
     if (route.params.id) {
        store.dispatch("getDriver", route.params.id);
    }

    function saveDriver() {
    let action = "Created!!!";
    if (model.value.id) {
        action = "Updated!!!";
    }
    store.dispatch("saveDriver", { ...model.value }).then(({ data }) => {
        store.commit("notify", {
        type: "success",
        message: "Driver " + action,
        });
        router.push({
        name: "DriverView",
        params: { id: data.data.id },
        });
    });
    }


</script>