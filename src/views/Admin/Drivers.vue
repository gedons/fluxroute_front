<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">Drivers</h1>
                <router-link
                :to="{name: 'DriverCreate'}"
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
                
                    Create Driver
                </router-link>
              </div>              
            </div>
          </header>

          <main class="bg-gray-50">
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    
              <div v-if="drivers.loading" class="flex justify-center">
                <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div v-else>
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    <div v-for="(driver, ind) in drivers.data" :key="driver.id" class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h[470px] opacity-0 animate-fade-in-down" :style="{animationDelay: `${ind * 0.1}s`}">
                      <!-- <img :src="shipment.image_url" alt="img" class="w-full h-48 object-cover"/> -->
                      <h4 class="mt-4 text-lg font-bold">{{driver.name}}</h4>
                      <div v-html="driver.email" class="overflow-hidden flex-1"></div>
    
                      <div class="flex justify-between items-center mt-3">
                        <router-link :to="{name: 'DriverView', params: {id: driver.id} }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>                  
                          Edit
                        </router-link>
                        <div class="flex items-center">
                           <!-- <TButton :href="project.url" circle link target="_blank">
                            <LinkIcon class="w-5 h-5" />
                          </TButton>  -->
                          <button v-if="driver.id" type="button" @click="deleteDriver(driver)" class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-1 inline-block">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="notification.show"
                      class="fixed w-[300px] right-4 bottom-4 py-2 px-4 text-white rounded-full animate-fade-in-down"
                      :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
                      >
                        {{ notification.message }}
                    </div> 
                </div>
                  <div class="flex justify-center mt-5"> 
                  <nav
                  class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  
                  <a
                    v-for="(link, i) of drivers.links"
                    :key="i"
                    :disabled="!link.url"
                    href="#"
                    @click="getForPage($event, link)"
                    aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                    :class="[
                      link.active
                        ? 'z-10 bg-indigo-50 border-gray-800 text-gray-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
                      i === drivers.links.length - 1 ? 'rounded-r-md' : '',
                    ]"
                    v-html="link.label"
                  >
                  </a>
                </nav> 
                </div> 
              </div>
               
            </div>
          </main>
    </div>
</template>

<script setup>
    import store from "../../store";    
    import { computed } from "vue";
    import { LinkIcon } from '@heroicons/vue/24/outline';

    const drivers = computed(() => store.state.drivers);
    
    //get notifications 
    const notification = computed(() => store.state.notification);

    // Get shipment loading state, which only changes when we fetch shipment from backend
    const driverLoading = computed(() => store.state.currentDriver.loading);

    store.dispatch("getDrivers");

    store.commit("notify", {
      type: "success",
      message: "All Drivers"
    });

    function deleteDriver(driver) {
        if (confirm(`Are you sure you want to delete this driver? Operation can't be undone!!`)
        ) 
        {
          store.dispatch("deleteDriver", driver.id).then(() => {
            store.dispatch("getDrivers");
            store.commit("notify", {
            type: "danger",
            message: "Driver Was Deleted",
          });  
          });
        }
      }

</script>