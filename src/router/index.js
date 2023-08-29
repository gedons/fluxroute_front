import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
import PackageDetails from "../views/PackageDetails.vue";
import Dashboard from "../views/User/Dashboard.vue";
import Packages from "../views/User/Packages.vue";
import PackageView from "../views/User/PackageView.vue";
import Payments from "../views/User/Payments.vue";

import Driver from "../views/Driver/Dashboard.vue";

import Admin from "../views/Admin/Dashboard.vue";
import AdminUsers from "../views/Admin/Users.vue";
import UserView from "../views/Admin/UserView.vue";
import AdminDrivers from "../views/Admin/Drivers.vue";
import DriverView from "../views/Admin/DriverView.vue";
import AdminPackages from "../views/Admin/Packages.vue";
import AdminPackageView from "../views/Admin/PackageView.vue";


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
        path: "/PackageDetails/:trackingNumber",
        name: 'PackageDetails',
        component: PackageDetails
    },

    {
        path: "/",
        redirect: "/dashboard",
        component: UserLayout,
        meta: { requiresAuth: true, requiredRole: "user" },
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/dashboard/packages", name: "Packages", component: Packages },
            { path: "/dashboard/package/create", name: "PackageCreate", component: PackageView },
            { path: "/dashboard/package/:id", name: "PackageView", component: PackageView },
            { path: "/dashboard/payments", name: "Payments", component: Payments },
           
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

            { path: "/admin/users", name: "AdminUsers", component: AdminUsers },
            { path: "/admin/user/:id", name: "UserView", component: UserView },

            { path: "/admin/drivers", name: "AdminDrivers", component: AdminDrivers },
            { path: "/admin/drivers/create", name: "DriverCreate", component: DriverView },
            { path: "/admin/driver/:id", name: "DriverView", component: DriverView },

            { path: "/admin/packages", name: "AdminPackages", component: AdminPackages },
            { path: "/admin/package/:id", name: "PackageView", component: AdminPackageView },
           
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