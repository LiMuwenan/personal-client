<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">
                    你好！我的朋友
                </div>
                <div class="text-light-50 mb-4">
                    轻舟已过万重山
                </div>
            </div>

        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <LoginRightComponent />
        </el-col>
    </el-row>
</template>

<script setup>
import LoginRightComponent from '~/components/login/LoginRightComponent.vue';


</script>

<style>
/* windicss样式抽离方式 @apply */
.login-container {
    @apply min-h-screen bg-indigo-500
}

.login-container .left {
    @apply flex items-center justify-center
}

.login-container .right {
    @apply flex items-center justify-center flex-col bg-light-50
}
</style>