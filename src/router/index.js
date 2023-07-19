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
        meta: { requiresAuth: true, requiredRole: "user" },
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
           
        ]
    },

    {
        path: "/",
        redirect: "/driver/dashboard",
        component: DriverLayout,
        meta: { requiresAuth: true, requiredRole: "driver" },
        children: [
            { path: "/driver/dashboard", name: "Driver", component: Driver },
           
        ]
    },

    {
        path: "/",
        redirect: "/admin/dashboard",
        component: AdminLayout,
        meta: { requiresAuth: true, requiredRole: "admin" },
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
        const requiresAuth = to.meta.requiresAuth;

        if (requiresAuth && !store.getters.isLoggedIn) {
            // If the route requires authentication but the user is not logged in,
            // redirect them to the login page
            next({ name: "Login" });
          } else if (requiresAuth) {
                // If the route requires authentication and the user is logged in,
                // check if the user has the required role to access the route
                const requiredRole = to.meta.requiredRole;

                if (requiredRole && store.getters.getUserRole !== requiredRole) {
                // If the user does not have the required role, redirect them to an error page or a fallback route
                next({ name: "Login" });
                } else {
                // If the user has the required role or the route does not specify a required role, allow access
                next();
                }
            } else if (store.getters.isLoggedIn && to.name === "Login") {
                // If the user is already authenticated and tries to access the login page,
                // redirect them to their respective dashboard based on their role
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
              } else {
                // For public routes that do not require authentication, allow access
                next();
              }
    });



export default router;