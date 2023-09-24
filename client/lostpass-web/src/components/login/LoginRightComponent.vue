<template>
        <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
        <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
            <span class="h-[1px] w-16 bg-gray-100"></span>
            <span>账号密码登录</span>
            <span class="h-[1px] w-16 bg-gray-100"></span>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="form">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" class="w-[500px]">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" class="w-[500px]">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit">登 录</el-button>
            </el-form-item>
        </el-form>
        <div class="flex items-center justify-center my-5 text-gray-300 space-x-8">
            <span class="h-[1px] w-8 bg-gray-100"></span>
            <button class="text-sm text-blue-600" @click="click" id="register">注册账户</button>
            <button class="text-sm text-blue-600" @click="click" id="forget">忘记密码</button>
            <span class="h-[1px] w-8 bg-gray-100"></span>
        </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { login } from '~/api/manager.js'
import { useStore } from 'vuex'
import { toast } from '~/util/util'
import router from '~/router/index.js'


const store = useStore()
const emit = defineEmits(['response'])

const loginForm = ref(null)
const form = reactive({
    username: "",
    password: ""
})

// 表单验证
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }, {
            min: 3,
            max: 5,
            message: '用户名长度在3-5之间',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
}

const onSubmit = () => {
    console.log('submit!')
    // 验证通过才能请求，没有这个相当于页面提示错了，但是还是提交了
    loginForm.value.validate((valid) => {
        console.log(valid)
        if (valid) {
            login(form.username, form.password)
                .then((res) => {
                    if (res.data.data) {
                        //todo store
                        console.log(res.data.data)
                        store.commit("set_userinfo", res.data.data)
                        router.push("/index/main")
                    } else {
                        toast("登录失败", "error")
                    }

                })
                .catch((err) => {
                    toast(err, "error")
                })
        }
    })

}


function click(event) {
    console.log(event.target)
    emit("response", event.target.id)
    // if (event.target.id == 'register') {
    //     emit("response", RegisterComponent)
    // } else {
    //     console.log("forget")
    // }
}


</script>

<style scope></style>