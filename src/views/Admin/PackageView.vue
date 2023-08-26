<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900">Package Details</h1>
                <router-link :to="{ name: 'AdminPackages' }" class="
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
                
                ">
                    Back
                </router-link>
            </div>
        </div>
    </header>

    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div v-if="ShipmentLoading"  class="flex justify-center">
            <svg  class="animate-spin text-center  h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <div v-else>{{products}}</div>

        <!-- <div v-else class="px-6 pt-6 2xl:container animate-fade-in-down" :style="{animationDelay: `${1 * 0.1}s`}">
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div class="md:col-span-2 lg:col-span-1">
                    <div class="h-full py-6 px-6 rounded-xl border border-gray-400 bg-white">
                        <h5 class="text-xl text-gray-700">Details</h5>
                        <div class="my-8">
                            <h1 class="text-3xl font-bold text-gray-800">{{model.name}}</h1>
                            <span class="text-gray-500">{{model.email}}</span>
                        </div>
                        
                        <table class="mt-6 -mb-2 w-full text-gray-600">
                            <tbody>
                                <tr>
                                    <td class="py-2 font-semibold">Account Created</td>
                                    <td class="text-gray-500">{{formatDate(model.created_at)}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">Country</td>
                                    <td class="text-gray-500">{{model.country}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">State</td>
                                    <td class="text-gray-500">{{model.state}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">Zipcode</td>
                                    <td class="text-gray-500">{{model.zipcode}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">Contact</td>
                                    <td class="text-gray-500">{{model.contact_number}}</td>                                   
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="h-full py-6 px-6 rounded-xl border border-gray-400 bg-white">
                        <h5 class="text-xl text-gray-700">Latest Package</h5>                      
                        <div class="my-8" v-if="model.latest_package">
                            <h1 class="text-3xl font-bold text-gray-800">{{model.latest_package.title}}</h1>
                            <span class="text-gray-500">{{model.latest_package.delivery_status}}</span>
                        </div>
                        
                        <table class="mt-6 -mb-2 w-full text-gray-600">
                            <tbody v-if="model.latest_package">
                                <tr>
                                    <td class="py-2 font-semibold">Driver Assigned</td>
                                    <td class="text-gray-500">Olom Kriskvo</td>                                   
                                </tr>                               
                                <tr>
                                    <td class="py-2 font-semibold">Package Created</td>
                                    <td class="text-gray-500">{{formatDate(model.latest_package.created_at)}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">Tracking Number</td>
                                    <td class="text-gray-500">{{model.latest_package.tracking_number}}</td>                                   
                                </tr>
                                <tr>
                                    <td class="py-2 font-semibold">Address</td>
                                    <td class="text-gray-500">{{model.latest_package.delivery_address}}</td>                                   
                                </tr>

                                <tr>
                                    <td class="py-2 font-semibold">Instruction</td>
                                    <td class="text-gray-500">{{model.latest_package.special_instructions}}</td>                                   
                                </tr>
                                
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td class="py-2 font-semibold">No Package For This User</td>                                                                    
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-400 bg-white">
                        <h5 class="text-xl text-gray-700">Actions</h5>
                        <div class="my-8">
                           <button @click="deleteAlluser()" class="
                                py-2
                                px-3
                                font-semibold
                                focus:outline-none
                                leading-6 
                                rounded
                                border
                                text-gray-200
                                hover:text-white
                                bg-red-900
                            
                            ">
                                Delete
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
        </div> -->
    </div>
</template>

<script setup>
import store from "../../store";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from 'moment';

const router = useRouter();
const route = useRoute();

//get notifications 
const notification = computed(() => store.state.notification);

// Get  loading state, which only changes when we fetch users from backend
const ShipmentLoading = computed(() => store.state.currentAdminProduct.loading);

const products = computed(() => store.state.currentAdminProduct.data);

// declare driver variables 
let model = ref({
        title: "",
        image_url: null,
        tracking_number: "",
        delivery_address: "",        
        special_instructions: "",
        driver_name: "",
        user: ""
});

// Watch current project  data change and when this happens we update local model
watch(
    () => store.state.currentAdminProduct.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: !!newVal.status,
        };
    }
);

if (route.params.id) {
    store.dispatch("getAdminpackage", route.params.id);
}

function formatDate(date) {
    return moment(date).fromNow();
  }

//   function deleteAlluser() {
//         if (confirm(`Are you sure you want to delete this driver? Operation can't be undone!!`)
//         ) 
//         {
//           store.dispatch("deleteAlluser", model.value.id).then(() => {            
//             store.commit("notify", {
//             type: "danger",
//             message: "User Was Deleted",
//           });  
//             router.push({
//                 name: "AdminUsers"               
//             });
//           });
//         }
//       }

</script>