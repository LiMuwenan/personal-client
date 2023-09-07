import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/LoginView.vue'
import NotFound from '~/pages/http/404.vue'
import BillListView from '~/pages/main/bill/BillListView.vue'
import UserListView from '~/pages/main/user/UserListView.vue'

// 这些都会传给createRouter
const routes = [
    {
        path: "/index",
        component: Index,
        children: [
            {
                path: "billList",
                component: BillListView
            },{
                path: "userList",
                component: UserListView
            }
        ]
    },{
        path: "/login",
        component: Login
    },{
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router