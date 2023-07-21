<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{route.params.id ? model.title : "New Package"}}</h1>
                <router-link
                :to="{name: 'Packages'}"
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
            
              <div v-if="packageLoading"  class="flex justify-center">
                <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <form v-else @submit.prevent="savePackage" class="animate-fade-in-down">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                          <!-- Package fields -->
                          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                              <!-- img -->
                              <div>
                                <label class="block text-sm font-medium text-gray-700">
                                  Image
                                </label>
                                <div class="mt-1 flex items-center">
                                  <img
                                    v-if="model.image_url"
                                    :src="model.image_url"
                                    :alt="model.title"
                                    class="w-64 h-48 object-cover"
                                  />
                                  <span
                                    v-else
                                    class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-[80%] w-[80%] text-gray-300"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  <button
                                    type="button"
                                    class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <input
                                      type="file"
                                      @change="onImageChoose"
                                      class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                    />
                                    Change
                                  </button>
                                </div>
                              </div>
                              <!--/ Image -->
                    
      
                              <!-- title -->
                              <div>
                                <label for="title" class="block text-sm font-medium text-gray-700"
                                  >Title</label
                                >
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  v-model="model.title"
                                  autocomplete="project_title"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Package Name"
                                />
                              </div>
                              <!-- /title -->
      
                              <!-- delivery_address -->
                              <div>
                                <label for="about" class="block text-sm font-medium text-gray-700">
                                  Package Description
                                </label>
                                <div class="mt-1">
                                  <textarea
                                    id="special_instructions"
                                    name="special_instructions"
                                    rows="3"
                                    v-model="model.special_instructions"
                                    autocomplete="special_instructions"
                                    class="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    placeholder="About the Package"
                                  />
                                </div>
                              </div>
                              <!-- /description -->
      
                              <!-- tracking number -->
                              <div>
                                <label for="tracking_number" class="block text-sm font-medium text-gray-700"
                                  >Tracking Number</label
                                >
                                <input
                                  type="text"
                                  name="tracking_number"
                                  id="tracking_number"
                                  v-model="model.tracking_number"
                                  autocomplete="tracking_number"
                                  class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Tracking Number"
                                />
                              </div>
                              <!-- /tracking number -->

                                <!-- delivery address -->
                                <div>
                                    <label for="delivery_address" class="block text-sm font-medium text-gray-700">
                                      Delivery Address
                                    </label>
                                    <div class="mt-1">
                                      <textarea
                                        id="delivery_address"
                                        name="delivery_address"
                                        rows="3"
                                        v-model="model.delivery_address"
                                        autocomplete="special_instructions"
                                        class="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Delivery Address"
                                      />
                                    </div>
                                  </div>
                                  <!-- /delivery address -->
                                  
                              
                              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button :disabled="packageLoading" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-gray-200 hover:text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                  <svg v-if="packageLoading" class="animate-spin -ml-1 mr-3  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                  fill="none" viewBox="0 0 24 24" :class="{
                                    'cursor-not-allowed': packageLoading,
                                    'hover:bg-gray-200': packageLoading,
                                  }">
                                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                  <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                  </path>
                                </svg>
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

    // Get package loading state, which only changes when we fetch package from backend
    const packageLoading = computed(() => store.state.currentShipment.loading);

    //get notifications 
    const notification = computed(() => store.state.notification);

    // declare package variables 
    let model = ref({
        title: "",
        image_url: null,
        tracking_number: "",
        delivery_address: "",        
        special_instructions: "",
        
    });

       // Watch current project  data change and when this happens we update local model
        watch(
        () => store.state.currentShipment.data,
        (newVal, oldVal) => {
            model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: !!newVal.status,
            };
        }
        );

        
        if (route.params.id) {
        store.dispatch("getPackage", route.params.id);
        }

    // input type file image choose function
        function onImageChoose(ev) {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            // The field to send on backend and apply validations
            model.value.image = reader.result;

            // The field to display here
            model.value.image_url = reader.result;
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
        }

            /**
     * Create or update project
     */
    function savePackage() {
    let action = "Created!!!";
    if (model.value.id) {
        action = "Updated!!!";
    }
    store.dispatch("savePackage", { ...model.value }).then(({ data }) => {
        store.commit("notify", {
        type: "success",
        message: "Shipment " + action,
        });
        router.push({
        name: "PackageView",
        params: { id: data.data.id },
        });
    });
    }
</script>