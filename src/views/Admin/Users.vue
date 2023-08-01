<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">All Users</h1>
                
              </div>              
            </div>
          </header>

          <main class="bg-gray-50">
            <div v-if="allusers.loading"  class="flex justify-center">
                <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            <div v-else class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="relative flex items-center text-gray-900 focus-within:text-gray-900">
                        <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                        <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                            <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                        </svg>
                        </span>
                        <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" class="w-80 pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-900 focus:border-gray-900 transition">
                    </div>
                    <table class="w-full text-sm text-left">
                        <thead class="font-semibold  text-gray-900">
                            <tr>
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                       S/N
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Packages
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(alluser, ind) in allusers.data" :key="alluser.id" class="bg-white border-b hover:bg-gray-100 animate-fade-in-down" :style="{animationDelay: `${ind * 0.1}s`}">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        {{ ind + 1 }}
                                    </div>
                                </td>
                                <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                   {{alluser.name}}
                                </th>
                                <td class="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                    {{alluser.email}}
                                </td>
                                <td class="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                    {{alluser.country}}
                                </td>
                                <td class="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                    {{alluser.total_packages}}
                                </td>
                                <td class="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                    <router-link :to="{name: 'UserView', params: {id: alluser.id} }" class=" py-2
                                    px-3
                                    font-semibold
                                    focus:outline-none
                                    leading-6 
                                    rounded
                                    border
                                    text-gray-200
                                    hover:text-white
                                    bg-gray-800">View</router-link>
                                </td>
                            </tr>
    
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import store from "../../store";    
    import { ref, computed } from "vue";
    import { LinkIcon } from '@heroicons/vue/24/outline';

    const allusers = computed(() => store.state.allusers);
    
    //get notifications 
    const notification = computed(() => store.state.notification);

    // Get shipment loading state, which only changes when we fetch shipment from backend
    const userLoading = computed(() => store.state.currentAlluser.loading);    
  

    
    store.dispatch("getAllusers");

    store.commit("notify", {
      type: "success",
      message: "All Users"
    });

   
</script>