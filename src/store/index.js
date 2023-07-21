import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state:{
        user:{
            data:{},
            token: sessionStorage.getItem("TOKEN"),
        }, 
        notification: {
            show: false,
            type: null,
            message: null
        },     
        shipments: {
          loading: false,
          links: [],
          data: []
        },
        currentShipment: {
          data: {},
          loading: false,
        },
        //admin driver
        currentDriver: {
          data: {},
          loading: false,
        },
        drivers: {
          loading: false,
          links: [],
          data: []
        },
        //end admin driver
    },
    getters:{
        isLoggedIn: (state) => !!state.user.token,
        getUserRole: (state) => state.user.data.role,
    },
    actions:{
        CreateAccount({commit}, user) {
            return axiosClient.post('/CreateAccount', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
          },  

          login({commit}, user) {
            return axiosClient.post('/login', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
          },

          savePackage({ commit, dispatch }, shipment) {
            delete shipment.image_url;
       
             let response;
             if (shipment.id) {
               response = axiosClient
                 .put(`/shipment/${shipment.id}`, shipment)
                 .then((res) => {
                   commit('setCurrentShipment', res.data)
                   return res;
                 });
             } else {
               response = axiosClient.post("/shipment", shipment).then((res) => {
                 commit('setCurrentShipment', res.data)
                 return res;
               });
             }
       
             return response;
           },
           getPackage({ commit }, id) {
            commit("setCurrentShipmentLoading", true);
            return axiosClient
              .get(`/shipment/${id}`)
              .then((res) => {
                commit("setCurrentShipment", res.data);
                commit("setCurrentShipmentLoading", false);
                return res;
              })
              .catch((err) => {
                commit("setCurrentShipmentLoading", false);
                throw err;
              });
          },
          getPackages({ commit },  {url = null} = {}) {
            commit('setShipmentsLoading', true)
            url = url || "/shipment";
            return axiosClient.get(url).then((res) => {
              commit('setShipmentsLoading', false)
              commit("setShipments", res.data);
              return res;
            });
          },
          deletePackage({ dispatch }, id) {
            return axiosClient.delete(`/shipment/${id}`)
            .then((res) => {
              dispatch('getPackages')
              return res;
            });
          },

          //admin driver actions
          saveDriver({ commit, dispatch }, driver) {
       
             let response;
             if (driver.id) {
               response = axiosClient
                 .put(`/driver/${driver.id}`, driver)
                 .then((res) => {
                   commit('setCurrentDriver', res.data)
                   return res;
                 });
             } else {
               response = axiosClient.post("/driver", driver).then((res) => {
                 commit('setCurrentDriver', res.data)
                 return res;
               });
             }
       
             return response;
           },

          getDriver({ commit }, id) {
            commit("setCurrentDriverLoading", true);
            return axiosClient
              .get(`/driver/${id}`)
              .then((res) => {
                commit("setCurrentDriver", res.data);
                commit("setCurrentDriverLoading", false);
                return res;
              })
              .catch((err) => {
                commit("setCurrentDriverLoading", false);
                throw err;
              });
          },
          getDrivers({ commit },  {url = null} = {}) {
            commit('setDriversLoading', true)
            url = url || "/driver";
            return axiosClient.get(url).then((res) => {
              commit('setDriversLoading', false)
              commit("setDrivers", res.data);
              return res;
            });
          },
          deleteDriver({ dispatch }, id) {
            return axiosClient.delete(`/driver/${id}`)
            .then((res) => {
              dispatch('getDrivers')
              return res;
            });
          },
          //end admin driver
    },
    mutations:{
        setUser: (state, user) => {
            state.user.data = user;
          },
          setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
          notify:(state, {message, type}) =>{
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
              state.notification.show = false;
            }, 3000)
          },
          setCurrentShipment: (state, shipment) => {
            state.currentShipment.data = shipment.data;
          },
          setCurrentShipmentLoading: (state, loading) => {
            state.currentShipment.loading = loading;
          },
          setShipments: (state, shipments) => {
            state.shipments.links = shipments.meta.links;
            state.shipments.data = shipments.data;
          },
          setShipmentsLoading: (state, loading) => {
            state.shipments.loading = loading;
          },
          //admin driver mutations
          setCurrentDriver: (state, driver) => {
            state.currentDriver.data = driver.data;
          },
          setCurrentDriverLoading: (state, loading) => {
            state.currentDriver.loading = loading;
          },
          setDrivers: (state, drivers) => {
            state.drivers.links = drivers.meta.links;
            state.drivers.data = drivers.data;
          },
          setDriversLoading: (state, loading) => {
            state.drivers.loading = loading;
          },
          //end admin driver
    },
    modules:{}
});

export default store