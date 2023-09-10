// // 访问权限验证
import router from '~/router'
import { toast }  from '~/util/util'
import { useStore } from 'vuex'

const pathSet = new Set([
    "/login",
    "/register",
    "/forget"
])

// router.beforeEach((to, from, next) => {
//     console.log(to)
//     console.log(from)
//     console.log(next)
//     const store = useStore();
//     // to and from are both route objects. must call `next`.
//     console.log(store.state.user.username)
//     if (!store.state.user.username && !pathSet.has(to.path)) {
//         toast("请先登录", "error")
//         return next({
//             path: "/login"
//         })
//     } else {
//         next();
//     }
// })