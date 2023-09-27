// // 访问权限验证
import router from '~/router'
import { toast }  from '~/util/util'
import { getToken } from '~/util/auth.js'

const pathSet = new Set([
    "/login",
    "/register",
    "/forget"
])

router.beforeEach((to, from, next) => {
    if (!getToken() && !pathSet.has(to.path)) {
        toast("请先登录", "error")
        return next({
            path: "/login"
        })
    } else {
        next();
    }
})