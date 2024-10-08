import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/LoginView.vue'
import NotFound from '~/pages/http/404.vue'
import BillListView from '~/pages/main/bill/BillListView.vue'
import UserListView from '~/pages/main/user/UserListView.vue'
import AddBillView from '~/pages/main/bill/AddBillView.vue'
import BillOverviewView from '~/pages/main/bill/BillOverviewView.vue'
import BillCategoryView from '~/pages/main/bill/BillCategoryView.vue'
import BillBooksView from '~/pages/main/bill/BillBooksView.vue'
import Main from '~/pages/main/main/Main.vue'
import FemaleView from '~/pages/main/female/FemaleView.vue'

// 这些都会传给createRouter
const routes = [
    {
        path: "/:pathMatch(index?)*",
        component: Index,
        children: [
            {
                path: "billList",
                component: BillListView
            },{
                path: "billAdd",
                component: AddBillView
            },{
                path: "userList",
                component: UserListView
            },{
                path: "main",
                component: Main
            },{
                path: "billOverview",
                component: BillOverviewView
            },{
                path: "category",
                component: BillCategoryView
            },{
                path: "billBook",
                component: BillBooksView
            },{
                path: "female",
                component: FemaleView
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