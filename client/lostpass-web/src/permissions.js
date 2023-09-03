// // 访问权限验证
import router from '~/router'
import { toast }  from '~/util/util'
import { useStore } from 'vuex'

router.beforeEach((to, from, next) => {

    const store = useStore();
    // to and from are both route objects. must call `next`.
    console.log(store.state.user.username)
    if (!store.state.user.username && to.path!="/login") {
        toast("请先登录", "error")
        return next({
            path: "/login"
        })
    }
    next();
})