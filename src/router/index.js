import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Index from "../views/Index.vue";
// import Tasks from "../views/Tasks.vue";
// import TaskView from "../views/TaskView.vue";
// import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
// import MainLayout from "../components/MainLayout.vue";
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

    // {
    //     path: "/",
    //     redirect: "/dashboard",
    //     component: MainLayout,
    //     meta: { requiresAuth: true },
    //     children: [
    //         { path: "/dashboard", name: "Dashboard", component: Dashboard },
    //         { path: "/tasks", name: "Tasks", component: Tasks },
    //         { path: "/task/:id", name: "TaskView", component: TaskView },
    //     ]
    // },

];



const router = createRouter({
    history: createWebHistory(),
    routes,
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