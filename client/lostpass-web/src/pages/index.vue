<template>
    <el-container class="layout-container">
        <!-- 左侧导航栏 -->
        <el-aside class="left-side">
            <el-scrollbar>
                <el-menu 
                :default-openeds="[]" 
                router
                unique-opened="true"
                text-color="white"
                active-text-color="white"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <message />
                            </el-icon>总览
                        </template>
                            <el-menu-item index="/index/main">数据总览</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><icon-menu /></el-icon>密码管理
                        </template>
                            <el-menu-item index="2-1">Option 1</el-menu-item>
                            <el-menu-item index="2-2">Option 2</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>账务管理
                        </template>
                            <el-menu-item index="/index/billList" >账务列表</el-menu-item>
                            <el-menu-item index="/index/billAdd">添加账务</el-menu-item>
                            <el-menu-item index="/index/billOverview">账务总览</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>系统管理
                        </template>
                        <el-sub-menu index="4-1">
                            <template #title >用户管理</template>
                            <el-menu-item index="/index/userList">用户列表</el-menu-item>
                            <el-menu-item index="4-1-2">修改用户</el-menu-item>
                            <el-menu-item index="4-1-3">删除用户</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4-2">
                            <template #title>字典管理</template>
                            <el-menu-item index="4-2-1">添加字典</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <!-- 顶部信息显示 -->
        <el-container class="bg-gray-100">
            <el-header style="text-align: right" class="bg-indigo-900 leading-relaxed text-1xl">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting class="text-light-50"/>
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span class="text-light-50">Tom</span>
                </div>
            </el-header>

            <!-- 主体 -->
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
  
<script setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

</script>

<style scoped>
.layout-container {
    height: 100vh;
}

.layout-container .left-side {
    width: 200px;
    @apply bg-indigo-500
}

.layout-container .el-sub-menu {
    @apply bg-indigo-400
}
.layout-container .el-menu-item{
    @apply bg-indigo-300
}
.layout-container .el-sub-menu :hover{
    @apply bg-indigo-900
}



.layout-container .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>