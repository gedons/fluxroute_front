import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state:{
        user:{
            data:{},
            token: sessionStorage.getItem("TOKEN"),
        },      
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
    },
    mutations:{
        setUser: (state, user) => {
            state.user.data = user;
          },
          setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
    },
    modules:{}
});

export default store