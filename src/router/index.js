import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import Dashboard from "../views/User/Dashboard.vue";
import Driver from "../views/Driver/Dashboard.vue";
import Admin from "../views/Admin/Dashboard.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
import UserLayout from "../components/UserLayout.vue";
import DriverLayout from "../components/DriverLayout.vue";
import AdminLayout from "../components/AdminLayout.vue";
// import NotFound from "../views/NotFound.vue";


const routes = [

    {
        path: "/",
        name: 'Index',        
        component: Index
    },

    {
        path: "/login",
        name: 'Login',       
        component: Login
    },

    {
        path: "/CreateAccount",
        name: 'CreateAccount',
        component: CreateAccount
    },

    {
        path: "/",
        redirect: "/dashboard",
        component: UserLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
           
        ]
    },

    {
        path: "/",
        redirect: "/driver/dashboard",
        component: DriverLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "/driver/dashboard", name: "Driver", component: Driver },
           
        ]
    },

    {
        path: "/",
        redirect: "/admin/dashboard",
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "/admin/dashboard", name: "Admin", component: Admin },
           
        ]
    },


];



    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    router.beforeEach((to, from, next) => {
        // If the user is already authenticated and tries to access the login page,
        // redirect them to their respective dashboard based on their role
        if (store.getters.isLoggedIn && to.name === "Login") {
        switch (store.getters.getUserRole) {
            case "user":
            next({ name: "Dashboard" });
            break;
            case "driver":
            next({ name: "Driver" });
            break;
            case "admin":
            next({ name: "Admin" });
            break;
            default:
            next();
        }
        } else if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
        // If the route requires authentication but the user is not logged in,
        // redirect them to the login page
        next({ name: "Login" });
        } else {
        next();
        }
    });

//   router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !store.state.user.token) {
//       next({ name: "Login" });
//     } else if (store.state.user.token && to.meta.isGuest) {
//       next({ name: "Dashboard" });
//     } else {
//       next();
//     }
//   });

export default router;